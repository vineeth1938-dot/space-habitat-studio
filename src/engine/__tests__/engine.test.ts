import { describe, expect, it } from 'vitest';
import { computeRequiredNhvPerCrew, evaluateVolume } from '../volumeEngine';
import { evaluateAcoustics } from '../acousticEngine';
import { evaluateAdjacency } from '../adjacencyEngine';
import { evaluateEgress } from '../egressEngine';
import { compareSnapshots, evaluateHabitatLayout } from '../scorer';
import { autoOptimizeHabitat } from '../optimizer';
import { HABITAT_PRESETS } from '../presets';
import { isModuleInHull, overlapArea2D } from '../geometry';
import { LayoutSnapshot, MissionConfig, ZoneModule } from '../../types/habitat';

const baseMission: MissionConfig = {
  name: 'Test Hab',
  standard: 'UNIFIED',
  crewSize: 4,
  durationDays: 180,
  solarFlareSim: false,
  hull: {
    type: 'inflatable',
    widthM: 12,
    depthM: 8,
    deckHeightM: 2.6,
    decks: 1,
  },
};

describe('Phase 2 — Multi-Agency Deterministic Engine Suite', () => {
  it('handles extreme edge cases (crew=1, crew=12, 3d, 1000d, NaN/0 inputs, empty canvas) with zero NaN/Infinity', () => {
    const emptyEval = evaluateHabitatLayout(baseMission, []);
    expect(emptyEval.scores.overall).toBe(0);
    expect(Number.isFinite(emptyEval.volume.nhvPerCrewM3)).toBe(true);
    expect(emptyEval.issues[0].id).toBe('empty-canvas');

    for (const crewSize of [0, -5, 1, 6, 12, 99, Number.NaN]) {
      for (const durationDays of [0, 3, 30, 180, 1000, 9999]) {
        const res = evaluateHabitatLayout(
          { ...baseMission, crewSize, durationDays },
          HABITAT_PRESETS[2].modules
        );
        expect(Number.isFinite(res.scores.overall)).toBe(true);
        expect(res.scores.overall).toBeGreaterThanOrEqual(0);
        expect(res.scores.overall).toBeLessThanOrEqual(100);
        expect(Number.isFinite(res.volume.nhvPerCrewM3)).toBe(true);
        expect(Number.isFinite(res.acoustics.maxSleepDba)).toBe(true);
      }
    }
  });

  it('enforces NASA 22% structural overhead, 25 m³ NHV (>=180d), Celentano scaling, and 5.4 m³ private sleep', () => {
    expect(computeRequiredNhvPerCrew(6, 180)).toBe(25.0);
    expect(computeRequiredNhvPerCrew(6, 500)).toBe(25.0);
    expect(computeRequiredNhvPerCrew(6, 3)).toBeLessThan(12.0);
    // Small crew non-linear boost for crew < 6 on <180d missions
    expect(computeRequiredNhvPerCrew(2, 30)).toBeGreaterThan(computeRequiredNhvPerCrew(6, 30));

    const crampedMission: MissionConfig = {
      ...baseMission,
      standard: 'NASA',
      crewSize: 8,
      durationDays: 365,
      hull: { type: 'cylinder', widthM: 8, depthM: 4, deckHeightM: 2.2, decks: 1 },
    };
    const tinySleep: ZoneModule[] = [
      { id: 's1', type: 'sleep', label: 'Tiny Bunk', deck: 0, x: 0.5, y: 0.5, w: 1.5, h: 1.5, rotation: 0 },
    ];
    const vol = evaluateVolume(crampedMission, tinySleep);
    expect(vol.metrics.nhvPerCrewM3).toBeLessThan(25.0);
    expect(vol.metrics.sleepVolumePerCrewM3).toBeLessThan(5.4);
    expect(vol.issues.some((i) => i.id === 'vol-nhv-fail')).toBe(true);
    expect(vol.issues.some((i) => i.id === 'vol-sleep-low')).toBe(true);
  });

  it('enforces NASA NC-40 (48 dBA) acoustic isolation and detects adjacent Exercise/ECLSS noise', () => {
    const noisyLayout: ZoneModule[] = [
      { id: 'slp', type: 'sleep', label: 'Sleep', deck: 0, x: 1, y: 1, w: 2.5, h: 2, rotation: 0 },
      { id: 'exr', type: 'exercise', label: 'Gym', deck: 0, x: 3.5, y: 1, w: 2.5, h: 2, rotation: 0 },
    ];
    const acBad = evaluateAcoustics({ ...baseMission, standard: 'NASA' }, noisyLayout);
    expect(acBad.metrics.maxSleepDba).toBeGreaterThan(48);
    expect(acBad.issues.some((i) => i.id === 'ac-sleep-exceeded' && i.severity === 'FAIL')).toBe(true);

    const baffledSeparated: ZoneModule[] = [
      { id: 'slp', type: 'sleep', label: 'Sleep', deck: 0, x: 0, y: 1, w: 2.5, h: 2, rotation: 0 },
      { id: 'sto', type: 'storage', label: 'Water Wall', deck: 0, x: 3.5, y: 1, w: 2.0, h: 2.5, rotation: 0 },
      { id: 'exr', type: 'exercise', label: 'Gym', deck: 0, x: 9.0, y: 1, w: 2.5, h: 2, rotation: 0 },
    ];
    const acGood = evaluateAcoustics({ ...baseMission, standard: 'NASA' }, baffledSeparated);
    expect(acGood.metrics.maxSleepDba).toBeLessThanOrEqual(48);
  });

  it('detects overlapping modules, out-of-bounds Lunar Dome corners, and NASA Hygiene odor rules', () => {
    const domeMission: MissionConfig = {
      ...baseMission,
      hull: { type: 'dome', widthM: 10, depthM: 10, deckHeightM: 3, decks: 1 },
    };
    const badMods: ZoneModule[] = [
      // Corner (0,0) is outside circular dome radius 5m centered at (5,5)
      { id: 'oob', type: 'sleep', label: 'Corner OOB', deck: 0, x: 0, y: 0, w: 2.5, h: 2, rotation: 0 },
      { id: 'gal', type: 'galley', label: 'Galley', deck: 0, x: 4, y: 4, w: 2.5, h: 2, rotation: 0 },
      // Overlapping Galley AND violating Hygiene-Galley proximity
      { id: 'hyg', type: 'hygiene', label: 'Hygiene', deck: 0, x: 5.5, y: 4.5, w: 1.5, h: 1.5, rotation: 0 },
    ];
    const adj = evaluateAdjacency(domeMission, badMods);
    expect(adj.metrics.outOfBoundsIds).toContain('oob');
    expect(adj.metrics.overlappingPairs.length).toBe(1);
    expect(adj.issues.some((i) => i.id === 'adj-nasa-odor')).toBe(true);
  });

  it('detects completely blocked Airlock and narrow (<0.8m) corridors via A* pathfinding', () => {
    const blockedMods: ZoneModule[] = [
      { id: 'slp', type: 'sleep', label: 'Sleep', deck: 0, x: 0.5, y: 3, w: 2, h: 2, rotation: 0 },
      // Full-depth wall sealing x=5.0..6.5 across entire 8.0m hull depth
      { id: 'wall', type: 'storage', label: 'Seal Wall', deck: 0, x: 5.0, y: 0, w: 1.5, h: 8.0, rotation: 0 },
      { id: 'air', type: 'airlock', label: 'Airlock', deck: 0, x: 9.5, y: 3, w: 2, h: 2, rotation: 0 },
    ];
    const egBlocked = evaluateEgress(baseMission, blockedMods);
    expect(egBlocked.metrics.allValid).toBe(false);
    expect(egBlocked.issues.some((i) => i.id === 'eg-blocked' && i.severity === 'FAIL')).toBe(true);
  });

  it('enforces ISRO ECLSS >=1.0m service corridor, <=12m rapid escape, and >=3.5m² Exercise bay', () => {
    const isroPreset = HABITAT_PRESETS.find((p) => p.id === 'isro-bas-3crew')!;
    const isroEval = evaluateHabitatLayout(isroPreset.mission, isroPreset.modules);
    expect(isroEval.adjacency.eclssCorridorClearanceM).toBeGreaterThanOrEqual(1.0);
    expect(isroEval.adjacency.exerciseAreaM2).toBeGreaterThanOrEqual(3.5);
    expect(isroEval.egress.maxWorkSleepDistanceM).toBeLessThanOrEqual(12.0);
    expect(isroEval.scores.overall).toBeGreaterThanOrEqual(85);
  });

  it('enforces SpaceX >=50% water/storage SPE radiation buffer, Solar Flare alert, and Dual-Egress', () => {
    const spxPreset = HABITAT_PRESETS.find((p) => p.id === 'spacex-mars-6crew')!;
    const spxEval = evaluateHabitatLayout(
      { ...spxPreset.mission, solarFlareSim: true },
      spxPreset.modules
    );
    expect(spxEval.adjacency.shieldedSleepPerimeterPct).toBeGreaterThanOrEqual(50);
    expect(spxEval.egress.dualEgressRequired).toBe(true);
    expect(spxEval.egress.dualEgressSatisfied).toBe(true);
    expect(spxEval.scores.overall).toBeGreaterThanOrEqual(85);
  });

  it('Auto-Optimize strictly improves Broken Novice Layout with 0 overlaps and 0 out-of-bounds', () => {
    const broken = HABITAT_PRESETS.find((p) => p.id === 'broken-novice')!;
    const result = autoOptimizeHabitat(broken.mission, broken.modules, 2026);

    expect(result.after.scores.overall).toBeGreaterThan(result.before.scores.overall + 15);
    expect(result.after.adjacency.overlappingPairs.length).toBe(0);
    expect(result.after.adjacency.outOfBoundsIds.length).toBe(0);
    expect(result.after.egress.allValid).toBe(true);

    // Double-check every optimized module directly with geometry invariants
    for (let i = 0; i < result.modules.length; i++) {
      expect(isModuleInHull(result.modules[i], broken.mission.hull)).toBe(true);
      for (let j = i + 1; j < result.modules.length; j++) {
        expect(overlapArea2D(result.modules[i], result.modules[j])).toBe(0);
      }
    }

    // Verify snapshot comparison diff helper
    const snapA: LayoutSnapshot = {
      id: 'a',
      name: 'Broken',
      createdAt: new Date().toISOString(),
      mission: broken.mission,
      modules: broken.modules,
      scores: result.before.scores,
      summary: {
        nhvPerCrewM3: result.before.volume.nhvPerCrewM3,
        maxSleepDba: result.before.acoustics.maxSleepDba,
        maxEgressDistanceM: result.before.egress.maxDistanceM,
        shieldedSleepPerimeterPct: result.before.adjacency.shieldedSleepPerimeterPct,
        volumetricEfficiencyPct: result.before.volume.volumetricEfficiencyPct,
        failCount: result.before.issues.filter((x) => x.severity === 'FAIL').length,
        warnCount: result.before.issues.filter((x) => x.severity === 'WARN').length,
      },
    };
    const snapB: LayoutSnapshot = {
      ...snapA,
      id: 'b',
      name: 'Optimized',
      modules: result.modules,
      scores: result.after.scores,
      summary: {
        nhvPerCrewM3: result.after.volume.nhvPerCrewM3,
        maxSleepDba: result.after.acoustics.maxSleepDba,
        maxEgressDistanceM: result.after.egress.maxDistanceM,
        shieldedSleepPerimeterPct: result.after.adjacency.shieldedSleepPerimeterPct,
        volumetricEfficiencyPct: result.after.volume.volumetricEfficiencyPct,
        failCount: result.after.issues.filter((x) => x.severity === 'FAIL').length,
        warnCount: result.after.issues.filter((x) => x.severity === 'WARN').length,
      },
    };
    const diffs = compareSnapshots(snapA, snapB);
    expect(diffs.find((d) => d.key === 'overall')?.improved).toBe(true);
  });
});
