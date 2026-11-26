import { GRID_STEP_M, ZONE_SPECS } from './constants';
import {
  clampModuleToHull,
  edgeDistance2D,
  isModuleInHull,
  overlapArea2D,
  sanitizeMission,
  snapGrid,
} from './geometry';
import { evaluateHabitatLayout } from './scorer';
import { HabitatEvaluation, MissionConfig, ZoneModule } from '../types/habitat';

export interface OptimizationResult {
  modules: ZoneModule[];
  before: HabitatEvaluation;
  after: HabitatEvaluation;
  iterations: number;
  elapsedMs: number;
}

const MAX_SA_ITERATIONS = 1500;
const MAX_TIMEOUT_MS = 220; // Hard deterministic responsiveness guard so UI never freezes

function mulberry32(seed: number) {
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
 * Fast O(N^2) surrogate cost function for Simulated Annealing inner iterations.
 * Lower cost = higher multi-agency compliance.
 */
function fastEnergy(mission: MissionConfig, modules: ZoneModule[]): number {
  const { hull } = mission;
  const midY = hull.depthM / 2;
  let cost = 0;

  const sleepMods: ZoneModule[] = [];
  const storageMods: ZoneModule[] = [];
  const airlockMods: ZoneModule[] = [];

  for (const m of modules) {
    if (!isModuleInHull(m, hull)) {
      cost += 900;
    }
    if (m.type === 'sleep') sleepMods.push(m);
    if (m.type === 'storage') storageMods.push(m);
    if (m.type === 'airlock') airlockMods.push(m);

    // Keep a >= 1.0m central main spine corridor open along midY (except airlock at end wall)
    if (m.type !== 'airlock') {
      const cTop = midY - 0.6;
      const cBot = midY + 0.6;
      const spineOverlap = Math.max(0, Math.min(m.y + m.h, cBot) - Math.max(m.y, cTop));
      if (spineOverlap > 0) {
        cost += spineOverlap * 160;
      }

      // Encourage flush wall placement (reduces SpaceX trapped dead pockets & maximizes ECLSS >=1.0m aisle)
      const distWallY = Math.min(m.y, Math.max(0, hull.depthM - (m.y + m.h)));
      if (hull.type !== 'dome') {
        cost += distWallY * 22;
      }
    }

    // Spatial zoning along X: Sleep & Storage on quiet port end; Exercise & Hygiene on active starboard end;
    // Airlock near center-right for ISRO <= 12m rapid escape from both Sleep and Work/ECLSS
    const normX = (m.x + m.w / 2) / Math.max(1, hull.widthM);
    if (m.type === 'sleep') {
      cost += normX * 26;
    } else if (m.type === 'exercise') {
      cost += (1 - normX) * 28;
    } else if (m.type === 'eclss') {
      // Mid-right so it's far from Sleep yet <=12m from Airlock
      cost += Math.abs(normX - 0.68) * 22;
    }
  }

  // Pairwise constraints
  for (let i = 0; i < modules.length; i++) {
    const a = modules[i];
    const specA = ZONE_SPECS[a.type];
    for (let j = i + 1; j < modules.length; j++) {
      const b = modules[j];
      const specB = ZONE_SPECS[b.type];

      const ov = overlapArea2D(a, b);
      if (ov > 0.001) {
        cost += 800 + ov * 400;
      }

      if (a.deck === b.deck) {
        const dist = edgeDistance2D(a, b);

        // Acoustic separation: Exercise (72 dBA) & ECLSS (65 dBA) away from Sleep
        const checkNoise = (dba: number) => {
          const minTarget = dba >= 70 ? 4.5 : 3.0;
          if (dist < minTarget) {
            cost += (minTarget - dist) * 55 + (dist < 0.5 ? 110 : 0);
          }
        };
        if (specA.sourceDba >= 62 && b.type === 'sleep') checkNoise(specA.sourceDba);
        if (specB.sourceDba >= 62 && a.type === 'sleep') checkNoise(specB.sourceDba);

        // Hygiene odor separation (>= 1.5m from Galley & Sleep, >= 1.0m between dual Hygienes)
        const isHygSens =
          (a.type === 'hygiene' && (b.type === 'galley' || b.type === 'sleep')) ||
          (b.type === 'hygiene' && (a.type === 'galley' || a.type === 'sleep'));
        if (isHygSens && dist < 2.0) {
          cost += (2.0 - dist) * 85 + 70;
        }
        if (a.type === 'hygiene' && b.type === 'hygiene' && dist < 1.0) {
          cost += 65;
        }

        // ISRO rapid escape: keep Sleep & ECLSS within ~9.5m Euclidean of an Airlock
        if (
          (a.type === 'airlock' && (b.type === 'sleep' || b.type === 'eclss')) ||
          (b.type === 'airlock' && (a.type === 'sleep' || a.type === 'eclss'))
        ) {
          if (dist > 9.5) {
            cost += (dist - 9.5) * 35;
          }
        }
      }
    }
  }

  // SpaceX SPE Mass Shielding attraction: pull Storage/Water right next to Sleep (dist <= 0.5m)
  for (const slp of sleepMods) {
    const sameDeckSto = storageMods.filter((s) => s.deck === slp.deck);
    if (sameDeckSto.length > 0) {
      let bufferedEdges = 0;
      for (const sto of sameDeckSto) {
        const d = edgeDistance2D(slp, sto);
        if (d <= 0.5) bufferedEdges++;
        else cost += Math.min(8, d) * 14;
      }
      if (bufferedEdges === 0) cost += 95;
    }
  }

  // Ensure Airlock doorway is not boxed in on all sides
  for (const air of airlockMods) {
    let crowding = 0;
    for (const other of modules) {
      if (other.id !== air.id && other.deck === air.deck && edgeDistance2D(air, other) < 0.5) {
        crowding++;
      }
    }
    if (crowding >= 2) cost += crowding * 75;
  }

  return cost;
}

/**
 * Deterministic corridor-first constructive packer to seed Simulated Annealing.
 * Places Sleep + Storage water-shield on the quiet side, Galley/Medical mid-hull,
 * ECLSS/Exercise/Hygiene on the active side, and preserves a clear >= 1.0m central spine.
 */
function buildCleanSeedLayout(mission: MissionConfig, sourceModules: ZoneModule[]): ZoneModule[] {
  const { hull } = mission;
  const cloned = sourceModules.map((m) => clampModuleToHull({ ...m }, hull));

  const priority: Record<string, number> = {
    sleep: 0,
    storage: 1,
    galley: 2,
    medical: 3,
    airlock: 4,
    eclss: 5,
    hygiene: 6,
    exercise: 7,
  };

  for (let d = 0; d < hull.decks; d++) {
    const deckMods = cloned.filter((m) => m.deck === d);
    deckMods.sort((a, b) => (priority[a.type] ?? 5) - (priority[b.type] ?? 5));

    const placed: ZoneModule[] = [];

    for (const mod of deckMods) {
      // Candidate orientations: current & rotated 90 deg
      const orientations: Array<{ w: number; h: number; rot: 0 | 90 }> = [
        { w: mod.w, h: mod.h, rot: mod.rotation },
      ];
      if (mod.w !== mod.h) {
        orientations.push({
          w: mod.h,
          h: mod.w,
          rot: mod.rotation === 0 ? 90 : 0,
        });
      }

      let bestCandidate: ZoneModule | null = null;
      let bestScore = Infinity;

      for (const ori of orientations) {
        for (let y = 0; y <= hull.depthM - ori.h + 1e-6; y += GRID_STEP_M) {
          for (let x = 0; x <= hull.widthM - ori.w + 1e-6; x += GRID_STEP_M) {
            const sx = snapGrid(x);
            const sy = snapGrid(y);
            const probe: ZoneModule = {
              ...mod,
              x: sx,
              y: sy,
              w: ori.w,
              h: ori.h,
              rotation: ori.rot,
            };
            if (!isModuleInHull(probe, hull)) continue;
            if (placed.some((p) => overlapArea2D(probe, p) > 0.001)) continue;

            const e = fastEnergy(mission, [...placed, probe]);
            if (e < bestScore) {
              bestScore = e;
              bestCandidate = probe;
            }
          }
        }
      }

      if (bestCandidate) {
        Object.assign(mod, bestCandidate);
      }
      placed.push(mod);
    }
  }

  return cloned;
}

/**
 * Bounded Simulated Annealing Multi-Agency Habitat Layout Optimizer.
 * - Max 1,500 iterations
 * - Hard wall-clock timeout guard (220ms)
 * - Strictly non-degrading: returns best verified candidate with 0 overlaps & 0 OOB when feasible.
 */
export function autoOptimizeHabitat(
  rawMission: MissionConfig,
  modules: ZoneModule[],
  seed = 2026
): OptimizationResult {
  const startClock = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const mission = sanitizeMission(rawMission);
  const before = evaluateHabitatLayout(mission, modules);

  if (modules.length === 0) {
    return {
      modules: [],
      before,
      after: before,
      iterations: 0,
      elapsedMs: 0,
    };
  }

  const rng = mulberry32(seed);
  const clampedInitial = modules.map((m) => clampModuleToHull({ ...m }, mission.hull));
  const constructiveSeed = buildCleanSeedLayout(mission, clampedInitial);

  const seeds: ZoneModule[][] = [constructiveSeed, clampedInitial];

  let bestModules = modules.map((m) => ({ ...m }));
  let bestEval = before;
  let totalIters = 0;

  const isBetterEval = (cand: HabitatEvaluation, ref: HabitatEvaluation): boolean => {
    const candGeomBad =
      cand.adjacency.overlappingPairs.length + cand.adjacency.outOfBoundsIds.length;
    const refGeomBad =
      ref.adjacency.overlappingPairs.length + ref.adjacency.outOfBoundsIds.length;
    if (candGeomBad !== refGeomBad) return candGeomBad < refGeomBad;
    if (cand.scores.overall !== ref.scores.overall) {
      return cand.scores.overall > ref.scores.overall;
    }
    const candFails = cand.issues.filter((i) => i.severity === 'FAIL').length;
    const refFails = ref.issues.filter((i) => i.severity === 'FAIL').length;
    return candFails < refFails;
  };

  // Evaluate constructive seed immediately
  const seedEval = evaluateHabitatLayout(mission, constructiveSeed);
  if (isBetterEval(seedEval, bestEval)) {
    bestEval = seedEval;
    bestModules = constructiveSeed.map((m) => ({ ...m }));
  }

  const perSeedBudget = Math.floor(MAX_SA_ITERATIONS / seeds.length);

  for (const startState of seeds) {
    let current = startState.map((m) => ({ ...m }));
    let currentCost = fastEnergy(mission, current);
    let localBest = current.map((m) => ({ ...m }));
    let localBestCost = currentCost;

    let temp = 95.0;
    const cooling = 0.993;

    for (let iter = 0; iter < perSeedBudget; iter++) {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (now - startClock >= MAX_TIMEOUT_MS) {
        break;
      }
      totalIters++;

      const idx = Math.floor(rng() * current.length);
      const orig = { ...current[idx] };
      const roll = rng();

      if (roll < 0.68) {
        // Snap-grid translation
        const maxSteps = temp > 25 ? 6 : 2;
        const dx = Math.round((rng() * 2 - 1) * maxSteps) * GRID_STEP_M;
        const dy = Math.round((rng() * 2 - 1) * maxSteps) * GRID_STEP_M;
        current[idx] = clampModuleToHull(
          { ...orig, x: orig.x + dx, y: orig.y + dy },
          mission.hull
        );
      } else if (roll < 0.86 && current.length >= 2) {
        // Module position swap
        const idx2 = Math.floor(rng() * current.length);
        if (idx2 !== idx) {
          const orig2 = { ...current[idx2] };
          current[idx] = clampModuleToHull(
            { ...orig, x: orig2.x, y: orig2.y, deck: orig2.deck },
            mission.hull
          );
          current[idx2] = clampModuleToHull(
            { ...orig2, x: orig.x, y: orig.y, deck: orig.deck },
            mission.hull
          );

          const nextCost = fastEnergy(mission, current);
          const delta = nextCost - currentCost;
          if (delta <= 0 || rng() < Math.exp(-delta / Math.max(0.5, temp))) {
            currentCost = nextCost;
            if (currentCost < localBestCost) {
              localBestCost = currentCost;
              localBest = current.map((m) => ({ ...m }));
            }
          } else {
            current[idx] = orig;
            current[idx2] = orig2;
          }
          temp *= cooling;
          continue;
        }
      } else {
        // 90-degree rotation
        const rotated: ZoneModule = clampModuleToHull(
          {
            ...orig,
            w: orig.h,
            h: orig.w,
            rotation: orig.rotation === 0 ? 90 : 0,
          },
          mission.hull
        );
        current[idx] = rotated;
      }

      const nextCost = fastEnergy(mission, current);
      const delta = nextCost - currentCost;
      if (delta <= 0 || rng() < Math.exp(-delta / Math.max(0.5, temp))) {
        currentCost = nextCost;
        if (currentCost < localBestCost) {
          localBestCost = currentCost;
          localBest = current.map((m) => ({ ...m }));
        }
      } else {
        current[idx] = orig;
      }

      temp *= cooling;
    }

    const candidateEval = evaluateHabitatLayout(mission, localBest);
    if (isBetterEval(candidateEval, bestEval)) {
      bestEval = candidateEval;
      bestModules = localBest.map((m) => ({ ...m }));
    }
  }

  const elapsedMs = Number(
    ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - startClock).toFixed(2)
  );

  return {
    modules: bestModules,
    before,
    after: bestEval,
    iterations: totalIters,
    elapsedMs,
  };
}
