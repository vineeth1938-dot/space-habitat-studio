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
const MAX_TIMEOUT_MS = 220;

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

function hasAnyCollisionOrOob(mission: MissionConfig, modules: ZoneModule[]): boolean {
  const { hull } = mission;
  for (let i = 0; i < modules.length; i++) {
    if (!isModuleInHull(modules[i], hull)) return true;
    for (let j = i + 1; j < modules.length; j++) {
      if (overlapArea2D(modules[i], modules[j]) > 0.001) return true;
    }
  }
  return false;
}

function fastEnergy(mission: MissionConfig, modules: ZoneModule[]): number {
  const { hull } = mission;
  const midY = hull.depthM / 2;
  let cost = 0;

  const sleepMods: ZoneModule[] = [];
  const storageMods: ZoneModule[] = [];
  const airlockMods: ZoneModule[] = [];

  for (const m of modules) {
    if (!isModuleInHull(m, hull)) {
      cost += 1200;
    }
    if (m.type === 'sleep') sleepMods.push(m);
    if (m.type === 'storage') storageMods.push(m);
    if (m.type === 'airlock') airlockMods.push(m);

    if (m.type !== 'airlock') {
      const cTop = midY - 0.6;
      const cBot = midY + 0.6;
      const spineOverlap = Math.max(0, Math.min(m.y + m.h, cBot) - Math.max(m.y, cTop));
      if (spineOverlap > 0) {
        cost += spineOverlap * 160;
      }

      const distWallY = Math.min(m.y, Math.max(0, hull.depthM - (m.y + m.h)));
      if (hull.type !== 'dome') {
        cost += distWallY * 22;
      }
    }

    const normX = (m.x + m.w / 2) / Math.max(1, hull.widthM);
    if (m.type === 'sleep') {
      cost += normX * 26;
    } else if (m.type === 'exercise') {
      cost += (1 - normX) * 28;
    } else if (m.type === 'eclss') {
      cost += Math.abs(normX - 0.68) * 22;
    }
  }

  for (let i = 0; i < modules.length; i++) {
    const a = modules[i];
    const specA = ZONE_SPECS[a.type];
    for (let j = i + 1; j < modules.length; j++) {
      const b = modules[j];
      const specB = ZONE_SPECS[b.type];

      const ov = overlapArea2D(a, b);
      if (ov > 0.001) {
        cost += 2000 + ov * 800;
      }

      if (a.deck === b.deck) {
        const dist = edgeDistance2D(a, b);

        const checkNoise = (dba: number) => {
          const minTarget = dba >= 70 ? 4.5 : 3.0;
          if (dist < minTarget) {
            cost += (minTarget - dist) * 55 + (dist < 0.5 ? 110 : 0);
          }
        };
        if (specA.sourceDba >= 62 && b.type === 'sleep') checkNoise(specA.sourceDba);
        if (specB.sourceDba >= 62 && a.type === 'sleep') checkNoise(specB.sourceDba);

        const isHygSens =
          (a.type === 'hygiene' && (b.type === 'galley' || b.type === 'sleep')) ||
          (b.type === 'hygiene' && (a.type === 'galley' || a.type === 'sleep'));
        if (isHygSens && dist < 2.0) {
          cost += (2.0 - dist) * 85 + 70;
        }
        if (a.type === 'hygiene' && b.type === 'hygiene' && dist < 1.0) {
          cost += 65;
        }

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
 * Packs modules into the hull across all available decks without overlaps.
 * Also exported so hull-geometry switches can safely repack displaced modules.
 */
export function buildCleanSeedLayout(
  mission: MissionConfig,
  sourceModules: ZoneModule[]
): ZoneModule[] {
  const { hull } = mission;
  const cloned = sourceModules.map((m) => clampModuleToHull({ ...m }, hull));

  const priority: Record<string, number> = {
    airlock: 0,
    sleep: 1,
    storage: 2,
    galley: 3,
    medical: 4,
    eclss: 5,
    exercise: 6,
    hygiene: 7,
  };

  cloned.sort((a, b) => (priority[a.type] ?? 5) - (priority[b.type] ?? 5));

  const placed: ZoneModule[] = [];

  for (const mod of cloned) {
    const spec = ZONE_SPECS[mod.type];

    // Try preferred deck first, then spillover to other decks if hull has multiple decks
    const deckOrder: number[] = [mod.deck];
    for (let d = 0; d < hull.decks; d++) {
      if (d !== mod.deck) deckOrder.push(d);
    }

    // Candidate footprints: current w×h (0° and 90°), then compact minW×minH if deck is crowded
    const sizeCandidates: Array<{ w: number; h: number; rot: 0 | 90 }> = [
      { w: mod.w, h: mod.h, rot: mod.rotation },
    ];
    if (mod.w !== mod.h) {
      sizeCandidates.push({ w: mod.h, h: mod.w, rot: mod.rotation === 0 ? 90 : 0 });
    }
    if (mod.w > spec.minW || mod.h > spec.minH) {
      sizeCandidates.push({ w: spec.minW, h: spec.minH, rot: 0 });
      if (spec.minW !== spec.minH) {
        sizeCandidates.push({ w: spec.minH, h: spec.minW, rot: 90 });
      }
    }

    let bestCandidate: ZoneModule | null = null;
    let bestScore = Infinity;

    for (const d of deckOrder) {
      for (const sz of sizeCandidates) {
        for (let y = 0; y <= hull.depthM - sz.h + 1e-6; y += GRID_STEP_M) {
          for (let x = 0; x <= hull.widthM - sz.w + 1e-6; x += GRID_STEP_M) {
            const sx = snapGrid(x);
            const sy = snapGrid(y);
            const probe: ZoneModule = {
              ...mod,
              deck: d,
              x: sx,
              y: sy,
              w: sz.w,
              h: sz.h,
              rotation: sz.rot,
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
      if (bestCandidate) break;
    }

    if (bestCandidate) {
      Object.assign(mod, bestCandidate);
    }
    placed.push(mod);
  }

  return cloned;
}

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

  const seeds: ZoneModule[][] = hasAnyCollisionOrOob(mission, clampedInitial)
    ? [constructiveSeed]
    : [constructiveSeed, clampedInitial];

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
        const maxSteps = temp > 25 ? 6 : 2;
        const dx = Math.round((rng() * 2 - 1) * maxSteps) * GRID_STEP_M;
        const dy = Math.round((rng() * 2 - 1) * maxSteps) * GRID_STEP_M;
        const moved = clampModuleToHull(
          { ...orig, x: orig.x + dx, y: orig.y + dy },
          mission.hull
        );
        // Hard collision rejection so SA never introduces overlapping modules
        const collides = current.some(
          (other, j) => j !== idx && overlapArea2D(moved, other) > 0.001
        );
        if (collides || !isModuleInHull(moved, mission.hull)) {
          temp *= cooling;
          continue;
        }
        current[idx] = moved;
      } else if (roll < 0.86 && current.length >= 2) {
        const idx2 = Math.floor(rng() * current.length);
        if (idx2 !== idx) {
          const orig2 = { ...current[idx2] };
          const swap1 = clampModuleToHull(
            { ...orig, x: orig2.x, y: orig2.y, deck: orig2.deck },
            mission.hull
          );
          const swap2 = clampModuleToHull(
            { ...orig2, x: orig.x, y: orig.y, deck: orig.deck },
            mission.hull
          );
          current[idx] = swap1;
          current[idx2] = swap2;

          if (hasAnyCollisionOrOob(mission, current)) {
            current[idx] = orig;
            current[idx2] = orig2;
            temp *= cooling;
            continue;
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
            current[idx2] = orig2;
          }
          temp *= cooling;
          continue;
        }
      } else {
        const rotated: ZoneModule = clampModuleToHull(
          {
            ...orig,
            w: orig.h,
            h: orig.w,
            rotation: orig.rotation === 0 ? 90 : 0,
          },
          mission.hull
        );
        const collides = current.some(
          (other, j) => j !== idx && overlapArea2D(rotated, other) > 0.001
        );
        if (collides || !isModuleInHull(rotated, mission.hull)) {
          temp *= cooling;
          continue;
        }
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
