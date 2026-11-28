import { EvaluationReport, MissionConfig, ZoneNode } from '../types/habitat';
import {
  clampZoneToHull,
  getDistance3D,
  getEdgeDistance2D,
  getHullBounds,
  getRectOverlapArea,
  isRectInsideHull,
  sanitizeMissionConfig,
  snapToGrid,
} from './hullMath';
import { evaluateHabitat, HYGIENE_MIN_SEPARATION_M, SLEEP_NOISE_LIMIT_DBA } from './ruleEngine';
import { ZONE_CATALOG } from '../data/zoneCatalog';

export interface AutoOptimizeResult {
  zones: ZoneNode[];
  beforeReport: EvaluationReport;
  afterReport: EvaluationReport;
  iterations: number;
  elapsedMs: number;
  improved: boolean;
}

const MAX_OPTIMIZE_MS = 210; // Hard <250ms deterministic convergence budget

function createRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hasCollisionOrOob(mission: MissionConfig, zones: ZoneNode[]): boolean {
  const { hull } = mission;
  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    if (!isRectInsideHull(z.x, z.y, z.width, z.height, hull)) return true;
    for (let j = i + 1; j < zones.length; j++) {
      if (getRectOverlapArea(z, zones[j]) > 0.01) return true;
    }
  }
  return false;
}

/**
 * Fast surrogate energy function incorporating NHV geometry, central corridor clearance,
 * acoustic attenuation, hygiene separation, 0g orientation alignment, circadian light-spill,
 * IMV CO2 ventilation proximity, and TransHab water-wall shielding attraction.
 */
function computeLayoutEnergy(mission: MissionConfig, zones: ZoneNode[]): number {
  const { hull } = mission;
  const { width, depth, deckHeight } = getHullBounds(hull);
  const midY = depth / 2;
  let energy = 0;

  const sleepZones: ZoneNode[] = [];
  const shelterZones: ZoneNode[] = [];
  const massZones: ZoneNode[] = [];
  const eclssZones: ZoneNode[] = [];

  for (const z of zones) {
    if (!isRectInsideHull(z.x, z.y, z.width, z.height, hull)) {
      energy += 900;
    }
    if (z.type === 'crew_quarters') sleepZones.push(z);
    if (z.type === 'storm_shelter') shelterZones.push(z);
    if (z.type === 'stowage' || z.type === 'eclss') massZones.push(z);
    if (z.type === 'eclss') eclssZones.push(z);

    // 0g local-vertical alignment preference (NASA-STD-3001 [V2 8011])
    if (mission.gravity === '0g' && z.rotation !== 0) {
      energy += 18;
    }

    // Preserve clear >=1.25m central spine corridor along midY (except airlock at endcap)
    if (z.type !== 'airlock') {
      const corridorTop = midY - 0.65;
      const corridorBot = midY + 0.65;
      const overlapCorridor = Math.max(
        0,
        Math.min(z.y + z.height, corridorBot) - Math.max(z.y, corridorTop)
      );
      if (overlapCorridor > 0) {
        energy += overlapCorridor * 155;
      }
    } else {
      const distToEnd = Math.min(z.x, width - (z.x + z.width));
      energy += distToEnd * 14;
    }

    // Axial zoning: Quiet Crew Quarters on port end -> Stowage/Shelter/ECLSS mid -> Galley/Med -> Exercise/Hygiene starboard
    const normX = (z.x + z.width / 2) / Math.max(1, width);
    if (z.type === 'crew_quarters') {
      energy += normX * 24;
    } else if (z.type === 'exercise') {
      energy += (1 - normX) * 28;
    } else if (z.type === 'eclss') {
      // Mid-hull (~45% X) so it's >=2.5m from Sleep (<50 dBA) AND <=7.0m for IMV CO2 airflow!
      energy += Math.abs(normX - 0.45) * 26;
    }
  }

  for (let i = 0; i < zones.length; i++) {
    const a = zones[i];
    const catA = ZONE_CATALOG[a.type];
    for (let j = i + 1; j < zones.length; j++) {
      const b = zones[j];
      const catB = ZONE_CATALOG[b.type];

      const overlap = getRectOverlapArea(a, b);
      if (overlap > 0.001) {
        energy += 800 + overlap * 400;
      }

      const dist = getDistance3D(a, b, deckHeight);

      // Acoustic check
      const checkAcoustic = (src: ZoneNode, tgt: ZoneNode, srcDba: number) => {
        const dEff = Math.max(0.8, dist + 0.5);
        const atten = src.deck !== tgt.deck ? 14 : dist >= 0.75 ? 8 : 3;
        const rec = srcDba - 20 * Math.log10(dEff) - atten;
        if (rec > SLEEP_NOISE_LIMIT_DBA) {
          energy += (rec - SLEEP_NOISE_LIMIT_DBA) * 32 + 95;
        }
      };
      if (catA.noiseEmitDba >= 60 && catB.isQuietZone) checkAcoustic(a, b, catA.noiseEmitDba);
      if (catB.noiseEmitDba >= 60 && catA.isQuietZone) checkAcoustic(b, a, catB.noiseEmitDba);

      // Hygiene-to-Galley / Medical contamination check
      const checkContam = (hyg: ZoneNode, sens: ZoneNode) => {
        const effDist = hyg.deck !== sens.deck ? Math.max(dist, 3.5) : dist;
        if (effDist < HYGIENE_MIN_SEPARATION_M) {
          const weight = sens.type === 'galley' ? 130 : 70;
          energy += (HYGIENE_MIN_SEPARATION_M - effDist) * weight + 100;
        }
      };
      if (catA.isContaminationSource && catB.isContaminationSensitive) checkContam(a, b);
      if (catB.isContaminationSource && catA.isContaminationSensitive) checkContam(b, a);

      // Circadian light-spill check (Sleep vs Galley/Medical < 1.25m on same deck)
      if (a.deck === b.deck) {
        const isLightSpill =
          (a.type === 'crew_quarters' && (b.type === 'galley' || b.type === 'medical')) ||
          (b.type === 'crew_quarters' && (a.type === 'galley' || a.type === 'medical'));
        if (isLightSpill && dist < 1.35) {
          energy += (1.35 - dist) * 55 + 35;
        }
      }
    }
  }

  // TransHab Water-Wall attraction: encourage Stowage adjacent (<=1.0m) to Sleep or Storm Shelter
  const refugeZones = [...shelterZones, ...sleepZones];
  for (const sto of zones.filter((z) => z.type === 'stowage')) {
    const sameDeckRefuge = refugeZones.filter((r) => r.deck === sto.deck);
    if (sameDeckRefuge.length > 0) {
      const minD = Math.min(...sameDeckRefuge.map((r) => getEdgeDistance2D(sto, r)));
      if (minD > 1.0) {
        energy += Math.min(6, minD - 1.0) * 8;
      } else {
        energy -= 12; // Bonus!
      }
    }
  }

  // IMV CO2 airflow: ensure Crew Quarters are within 6.5m of ECLSS
  if (eclssZones.length > 0) {
    for (const slp of sleepZones) {
      const minEclssDist = Math.min(
        ...eclssZones.map((e) => getDistance3D(slp, e, deckHeight))
      );
      if (minEclssDist > 6.5) {
        energy += (minEclssDist - 6.5) * 24;
      }
    }
  }

  return energy;
}

/**
 * Constructive collision-free layout builder across all available hull decks.
 * Also exported for hull-type/deck-count transitions so zones never collapse onto each other.
 */
export function buildStructuredCandidate(
  rawMission: MissionConfig,
  originalZones: ZoneNode[]
): ZoneNode[] {
  const mission = sanitizeMissionConfig(rawMission);
  const { hull } = mission;
  const { width, depth, wall } = getHullBounds(hull);

  const cloned: ZoneNode[] = originalZones.map((z) => {
    // Normalize 90/270 rotated zones back to 0° in 0g to eliminate local-vertical mismatch
    if (!z.locked && mission.gravity === '0g' && (z.rotation === 90 || z.rotation === 270)) {
      return clampZoneToHull(
        { ...z, width: z.height, height: z.width, rotation: 0 },
        hull
      );
    }
    return clampZoneToHull({ ...z }, hull);
  });

  const xOrder: Record<string, number> = {
    airlock: 0,
    crew_quarters: 1,
    stowage: 2,
    storm_shelter: 3,
    eclss: 4,
    medical: 5,
    galley: 6,
    exercise: 7,
    hygiene: 8,
  };

  const locked = cloned.filter((z) => z.locked);
  const movable = cloned.filter((z) => !z.locked);
  movable.sort((a, b) => (xOrder[a.type] ?? 5) - (xOrder[b.type] ?? 5));

  const placed: ZoneNode[] = [...locked];
  const midY = depth / 2;

  for (const z of movable) {
    const deckOrder = [z.deck];
    for (let d = 0; d < hull.decks; d++) {
      if (d !== z.deck) deckOrder.push(d);
    }

    let bestPose: ZoneNode | null = null;
    let bestScore = Infinity;

    for (const d of deckOrder) {
      if (z.type === 'airlock') {
        const ax = snapToGrid(width - wall - z.width - 0.25);
        const ay = snapToGrid(midY - z.height / 2);
        const airProbe: ZoneNode = { ...z, deck: d, x: ax, y: ay };
        if (
          isRectInsideHull(airProbe.x, airProbe.y, airProbe.width, airProbe.height, hull) &&
          placed.every((p) => getRectOverlapArea(airProbe, p) <= 0.01)
        ) {
          bestPose = airProbe;
          break;
        }
      }

      // Candidate Y rows: prioritize top wall & bottom wall bands first, then scan full grid
      const yCandidates: number[] = [
        snapToGrid(wall + 0.25),
        snapToGrid(depth - wall - z.height - 0.25),
      ];
      for (let gy = snapToGrid(wall + 0.25); gy <= depth - wall - z.height; gy += 0.5) {
        yCandidates.push(snapToGrid(gy));
      }

      for (const sy of yCandidates) {
        for (let tx = snapToGrid(wall + 0.25); tx <= width - wall - z.width; tx += 0.25) {
          const sx = snapToGrid(tx);
          if (!isRectInsideHull(sx, sy, z.width, z.height, hull)) continue;
          const probe: ZoneNode = { ...z, deck: d, x: sx, y: sy };
          if (placed.some((p) => getRectOverlapArea(probe, p) > 0.01)) continue;

          const e = computeLayoutEnergy(mission, [...placed, probe]);
          if (e < bestScore) {
            bestScore = e;
            bestPose = probe;
          }
        }
      }

      if (bestPose) break;
    }

    if (bestPose) {
      Object.assign(z, bestPose);
    }
    placed.push(z);
  }

  return cloned;
}

/**
 * Constraint-Guided Simulated Annealing + Heuristic Placement Optimizer.
 * Converges deterministically in <250ms and strictly preserves best-seen NASA Readiness Score.
 */
export function autoOptimizeLayout(
  rawMission: MissionConfig,
  zones: ZoneNode[],
  seed = 42
): AutoOptimizeResult {
  const startClock = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const mission = sanitizeMissionConfig(rawMission);
  const beforeReport = evaluateHabitat(mission, zones);

  if (zones.length === 0) {
    return {
      zones: [],
      beforeReport,
      afterReport: beforeReport,
      iterations: 0,
      elapsedMs: 0,
      improved: false,
    };
  }

  const { hull } = mission;
  const rng = createRng(seed);

  const clampedStart = zones.map((z) => clampZoneToHull({ ...z }, hull));
  const structuredSeed = buildStructuredCandidate(mission, clampedStart);

  const candidates: ZoneNode[][] = hasCollisionOrOob(mission, clampedStart)
    ? [structuredSeed]
    : [structuredSeed, clampedStart];

  let bestZones = zones.map((z) => ({ ...z }));
  let bestReport = beforeReport;
  let totalIterations = 0;

  const isBetterReport = (cand: EvaluationReport, ref: EvaluationReport): boolean => {
    if (cand.score !== ref.score) return cand.score > ref.score;
    if (cand.criticalCount !== ref.criticalCount) return cand.criticalCount < ref.criticalCount;
    if (cand.warningCount !== ref.warningCount) return cand.warningCount < ref.warningCount;
    return cand.waterWall.shieldingBonusGcm2 > ref.waterWall.shieldingBonusGcm2;
  };

  // Immediately check structured seed
  const seedRep = evaluateHabitat(mission, structuredSeed);
  if (isBetterReport(seedRep, bestReport)) {
    bestReport = seedRep;
    bestZones = structuredSeed.map((z) => ({ ...z }));
  }

  for (const startCandidate of candidates) {
    let current = startCandidate.map((z) => ({ ...z }));
    let currentEnergy = computeLayoutEnergy(mission, current);

    let localBest = current.map((z) => ({ ...z }));
    let localBestEnergy = currentEnergy;

    const iterations = 600;
    let temp = 110;
    const cooling = 0.992;

    const movableIndices = current
      .map((z, idx) => (z.locked ? -1 : idx))
      .filter((idx) => idx >= 0);

    if (movableIndices.length > 0) {
      for (let iter = 0; iter < iterations; iter++) {
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        if (now - startClock >= MAX_OPTIMIZE_MS) break;

        totalIterations++;
        const pick = movableIndices[Math.floor(rng() * movableIndices.length)];
        const z = current[pick];
        const prev = { ...z };

        const moveRoll = rng();
        if (moveRoll < 0.75) {
          const radius = temp > 30 ? 3.25 : 1.25;
          const dx = snapToGrid((rng() * 2 - 1) * radius);
          const dy = snapToGrid((rng() * 2 - 1) * radius);
          const moved = clampZoneToHull({ ...z, x: z.x + dx, y: z.y + dy }, hull);

          const collides =
            !isRectInsideHull(moved.x, moved.y, moved.width, moved.height, hull) ||
            current.some((other, idx) => idx !== pick && getRectOverlapArea(moved, other) > 0.01);

          if (collides) {
            temp *= cooling;
            continue;
          }
          current[pick] = moved;
        } else if (moveRoll < 0.92 && movableIndices.length >= 2) {
          const pick2 = movableIndices[Math.floor(rng() * movableIndices.length)];
          if (pick2 !== pick && current[pick2].deck === z.deck) {
            const z2 = current[pick2];
            const prev2 = { ...z2 };
            current[pick] = clampZoneToHull({ ...z, x: prev2.x, y: prev2.y }, hull);
            current[pick2] = clampZoneToHull({ ...z2, x: prev.x, y: prev.y }, hull);

            if (hasCollisionOrOob(mission, current)) {
              current[pick] = prev;
              current[pick2] = prev2;
              temp *= cooling;
              continue;
            }

            const newEnergy = computeLayoutEnergy(mission, current);
            const delta = newEnergy - currentEnergy;
            if (delta < 0 || rng() < Math.exp(-delta / Math.max(0.5, temp))) {
              currentEnergy = newEnergy;
              if (currentEnergy < localBestEnergy) {
                localBestEnergy = currentEnergy;
                localBest = current.map((item) => ({ ...item }));
              }
            } else {
              current[pick] = prev;
              current[pick2] = prev2;
            }
            temp *= cooling;
            continue;
          }
        } else if (mission.gravity !== '0g' || z.rotation !== 0) {
          // Explore 90 deg rotations in partial-g, or align skewed modules back to 0 deg in 0g
          const swapDims =
            mission.gravity === '0g' ? z.rotation === 90 || z.rotation === 270 : true;
          const rotated = clampZoneToHull(
            {
              ...z,
              width: swapDims ? z.height : z.width,
              height: swapDims ? z.width : z.height,
              rotation:
                mission.gravity === '0g'
                  ? 0
                  : (((z.rotation + 90) % 360) as 0 | 90 | 180 | 270),
            },
            hull
          );
          const collides =
            !isRectInsideHull(rotated.x, rotated.y, rotated.width, rotated.height, hull) ||
            current.some((other, idx) => idx !== pick && getRectOverlapArea(rotated, other) > 0.01);
          if (collides) {
            temp *= cooling;
            continue;
          }
          current[pick] = rotated;
        }

        const newEnergy = computeLayoutEnergy(mission, current);
        const delta = newEnergy - currentEnergy;

        if (delta < 0 || rng() < Math.exp(-delta / Math.max(0.5, temp))) {
          currentEnergy = newEnergy;
          if (currentEnergy < localBestEnergy) {
            localBestEnergy = currentEnergy;
            localBest = current.map((item) => ({ ...item }));
          }
        } else {
          current[pick] = prev;
        }

        temp *= cooling;
      }
    }

    const rep = evaluateHabitat(mission, localBest);
    if (isBetterReport(rep, bestReport)) {
      bestReport = rep;
      bestZones = localBest.map((z) => ({ ...z }));
    }
  }

  const elapsedMs = Number(
    ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - startClock).toFixed(2)
  );

  return {
    zones: bestZones,
    beforeReport,
    afterReport: bestReport,
    iterations: totalIterations,
    elapsedMs,
    improved:
      bestReport.score > beforeReport.score ||
      bestReport.criticalCount < beforeReport.criticalCount ||
      bestReport.warningCount < beforeReport.warningCount,
  };
}
