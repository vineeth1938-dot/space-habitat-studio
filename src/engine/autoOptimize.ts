import { EvaluationReport, MissionConfig, ZoneNode } from '../types/habitat';
import {
  getDistance3D,
  getHullBounds,
  getRectOverlapArea,
  isRectInsideHull,
  snapToGrid,
} from './hullMath';
import { evaluateHabitat, HYGIENE_MIN_SEPARATION_M, SLEEP_NOISE_LIMIT_DBA } from './ruleEngine';
import { ZONE_CATALOG } from '../data/zoneCatalog';

export interface AutoOptimizeResult {
  zones: ZoneNode[];
  beforeReport: EvaluationReport;
  afterReport: EvaluationReport;
  iterations: number;
  improved: boolean;
}

// Seeded PRNG (Mulberry32) so Auto-Optimize is deterministic and testable
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

/**
 * Fast surrogate energy function for Simulated Annealing (avoids running full A* on every inner step).
 * Lower energy = better layout.
 */
function computeLayoutEnergy(mission: MissionConfig, zones: ZoneNode[]): number {
  const { hull } = mission;
  const { width, depth, deckHeight } = getHullBounds(hull);
  const midY = depth / 2;
  let energy = 0;

  // 1. Out of bounds penalty
  for (const z of zones) {
    if (!isRectInsideHull(z.x, z.y, z.width, z.height, hull)) {
      energy += 500;
    }

    // 2. Central spine corridor preservation (encourage keeping a >= 1.25m aisle open near midY, except airlock at far end)
    if (z.type !== 'airlock') {
      const corridorTop = midY - 0.65;
      const corridorBot = midY + 0.65;
      const overlapCorridor = Math.max(
        0,
        Math.min(z.y + z.height, corridorBot) - Math.max(z.y, corridorTop)
      );
      if (overlapCorridor > 0) {
        energy += overlapCorridor * 140;
      }
    } else {
      // Airlocks prefer the hull perimeter ends (near x = width or x = 0)
      const distToEnd = Math.min(z.x, width - (z.x + z.width));
      energy += distToEnd * 12;
    }

    // Quiet zones prefer the left/quiet end; noisy zones prefer the right/active end
    if (z.type === 'crew_quarters') {
      energy += (z.x / Math.max(1, width)) * 18;
    } else if (z.type === 'exercise' || z.type === 'eclss') {
      energy += ((width - (z.x + z.width)) / Math.max(1, width)) * 18;
    }
  }

  // 3. Pairwise overlaps, acoustics & contamination
  for (let i = 0; i < zones.length; i++) {
    const a = zones[i];
    const catA = ZONE_CATALOG[a.type];
    for (let j = i + 1; j < zones.length; j++) {
      const b = zones[j];
      const catB = ZONE_CATALOG[b.type];

      const overlap = getRectOverlapArea(a, b);
      if (overlap > 0.001) {
        energy += 400 + overlap * 250;
      }

      const dist = getDistance3D(a, b, deckHeight);

      // Acoustic check
      const checkAcoustic = (src: ZoneNode, tgt: ZoneNode, srcDba: number) => {
        const dEff = Math.max(0.8, dist + 0.5);
        const atten = src.deck !== tgt.deck ? 14 : dist >= 0.75 ? 8 : 3;
        const rec = srcDba - 20 * Math.log10(dEff) - atten;
        if (rec > SLEEP_NOISE_LIMIT_DBA) {
          energy += (rec - SLEEP_NOISE_LIMIT_DBA) * 28 + 80;
        }
      };
      if (catA.noiseEmitDba >= 60 && catB.isQuietZone) checkAcoustic(a, b, catA.noiseEmitDba);
      if (catB.noiseEmitDba >= 60 && catA.isQuietZone) checkAcoustic(b, a, catB.noiseEmitDba);

      // Hygiene-to-Galley / Medical contamination check
      const checkContam = (hyg: ZoneNode, sens: ZoneNode) => {
        const effDist = hyg.deck !== sens.deck ? Math.max(dist, 3.5) : dist;
        if (effDist < HYGIENE_MIN_SEPARATION_M) {
          const weight = sens.type === 'galley' ? 120 : 60;
          energy += (HYGIENE_MIN_SEPARATION_M - effDist) * weight + 90;
        }
      };
      if (catA.isContaminationSource && catB.isContaminationSensitive) checkContam(a, b);
      if (catB.isContaminationSource && catA.isContaminationSensitive) checkContam(b, a);
    }
  }

  return energy;
}

/**
 * Generates a structured, corridor-aware initial arrangement by zoning quiet modules
 * on one end, noisy/hygiene modules on the opposite end, and maintaining a clear central spine.
 */
function buildStructuredCandidate(mission: MissionConfig, originalZones: ZoneNode[]): ZoneNode[] {
  const { hull } = mission;
  const { width, depth, wall } = getHullBounds(hull);
  const cloned: ZoneNode[] = originalZones.map((z) => ({ ...z }));

  // Priority ordering along X axis: quiet -> shelter/med -> galley/stowage -> eclss/exercise/hygiene -> airlock
  const xOrder: Record<string, number> = {
    crew_quarters: 0,
    storm_shelter: 1,
    medical: 2,
    galley: 3,
    stowage: 4,
    eclss: 5,
    exercise: 6,
    hygiene: 7,
    airlock: 8,
  };

  for (let d = 0; d < hull.decks; d++) {
    const deckZones = cloned.filter((z) => z.deck === d && !z.locked);
    deckZones.sort((a, b) => (xOrder[a.type] ?? 5) - (xOrder[b.type] ?? 5));

    const midY = depth / 2;
    const topBandY = snapToGrid(wall + 0.25);
    const botBandMaxY = snapToGrid(depth - wall - 0.25);

    let cursorTop = snapToGrid(wall + 0.5);
    let cursorBot = snapToGrid(wall + 0.5);

    for (const z of deckZones) {
      if (z.type === 'airlock') {
        // Place airlock at far right end centered on corridor
        const ax = snapToGrid(width - wall - z.width - 0.25);
        const ay = snapToGrid(midY - z.height / 2);
        if (isRectInsideHull(ax, ay, z.width, z.height, hull)) {
          z.x = ax;
          z.y = ay;
          continue;
        }
      }

      // Alternate between top wall band and bottom wall band to keep central spine clear
      // Put hygiene on opposite band from galley if possible
      const preferTop =
        z.type === 'galley'
          ? false
          : z.type === 'hygiene'
            ? true
            : cursorTop <= cursorBot;

      const tryBand = (isTop: boolean): boolean => {
        const yPos = isTop ? topBandY : snapToGrid(botBandMaxY - z.height);
        const xStart = isTop ? cursorTop : cursorBot;

        // Scan forward in 0.25m steps until inside hull and non-overlapping
        for (let tx = xStart; tx <= width - wall - z.width; tx += 0.25) {
          const sx = snapToGrid(tx);
          if (!isRectInsideHull(sx, yPos, z.width, z.height, hull)) continue;
          const overlaps = deckZones.some(
            (other) =>
              other !== z &&
              getRectOverlapArea({ ...z, x: sx, y: yPos }, other) > 0.01
          );
          if (!overlaps) {
            z.x = sx;
            z.y = yPos;
            if (isTop) cursorTop = snapToGrid(sx + z.width + 0.25);
            else cursorBot = snapToGrid(sx + z.width + 0.25);
            return true;
          }
        }
        return false;
      };

      if (!tryBand(preferTop)) {
        tryBand(!preferTop);
      }
    }
  }

  return cloned;
}

/**
 * Constraint-Guided Simulated Annealing + Heuristic Placement Optimizer.
 * Guarantees returning a layout whose NASA-STD-3001 Readiness Score is >= baseline.
 */
export function autoOptimizeLayout(
  mission: MissionConfig,
  zones: ZoneNode[],
  seed = 42
): AutoOptimizeResult {
  const beforeReport = evaluateHabitat(mission, zones);
  const { hull } = mission;
  const { width, depth, wall } = getHullBounds(hull);
  const rng = createRng(seed);

  const candidates: ZoneNode[][] = [
    zones.map((z) => ({ ...z })),
    buildStructuredCandidate(mission, zones),
  ];

  let bestZones = zones.map((z) => ({ ...z }));
  let bestReport = beforeReport;
  let totalIterations = 0;

  for (const startCandidate of candidates) {
    let current = startCandidate.map((z) => ({ ...z }));
    let currentEnergy = computeLayoutEnergy(mission, current);

    let localBest = current.map((z) => ({ ...z }));
    let localBestEnergy = currentEnergy;

    const iterations = 650;
    let temp = 120;
    const cooling = 0.992;

    const movableIndices = current
      .map((z, idx) => (z.locked ? -1 : idx))
      .filter((idx) => idx >= 0);

    if (movableIndices.length > 0) {
      for (let iter = 0; iter < iterations; iter++) {
        totalIterations++;
        const pick = movableIndices[Math.floor(rng() * movableIndices.length)];
        const z = current[pick];
        const prev = { ...z };

        const moveRoll = rng();
        if (moveRoll < 0.72) {
          // Local or medium-range translation snapped to 0.25m
          const radius = temp > 30 ? 3.5 : 1.25;
          const dx = snapToGrid((rng() * 2 - 1) * radius);
          const dy = snapToGrid((rng() * 2 - 1) * radius);
          const nx = Math.max(wall, Math.min(width - wall - z.width, snapToGrid(z.x + dx)));
          const ny = Math.max(wall, Math.min(depth - wall - z.height, snapToGrid(z.y + dy)));
          z.x = nx;
          z.y = ny;
        } else if (moveRoll < 0.88 && movableIndices.length >= 2) {
          // Swap two zones' positions (great for escaping acoustic/contamination traps)
          const pick2 = movableIndices[Math.floor(rng() * movableIndices.length)];
          if (pick2 !== pick && current[pick2].deck === z.deck) {
            const z2 = current[pick2];
            const prev2 = { ...z2 };
            z.x = snapToGrid(Math.min(width - wall - z.width, Math.max(wall, prev2.x)));
            z.y = snapToGrid(Math.min(depth - wall - z.height, Math.max(wall, prev2.y)));
            z2.x = snapToGrid(Math.min(width - wall - z2.width, Math.max(wall, prev.x)));
            z2.y = snapToGrid(Math.min(depth - wall - z2.height, Math.max(wall, prev.y)));

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
        } else {
          // 90-degree rotation
          const nw = z.height;
          const nh = z.width;
          if (z.x + nw <= width - wall && z.y + nh <= depth - wall) {
            z.width = nw;
            z.height = nh;
            z.rotation = ((z.rotation + 90) % 360) as 0 | 90 | 180 | 270;
          }
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

    // Evaluate both the structured seed and the annealed localBest with the full NASA rule + A* engine
    for (const candidateZones of [startCandidate, localBest]) {
      const rep = evaluateHabitat(mission, candidateZones);
      const isBetter =
        rep.score > bestReport.score ||
        (rep.score === bestReport.score && rep.criticalCount < bestReport.criticalCount) ||
        (rep.score === bestReport.score &&
          rep.criticalCount === bestReport.criticalCount &&
          rep.warningCount < bestReport.warningCount);
      if (isBetter) {
        bestReport = rep;
        bestZones = candidateZones.map((z) => ({ ...z }));
      }
    }
  }

  return {
    zones: bestZones,
    beforeReport,
    afterReport: bestReport,
    iterations: totalIterations,
    improved:
      bestReport.score > beforeReport.score ||
      bestReport.criticalCount < beforeReport.criticalCount,
  };
}
