import { describe, expect, it } from 'vitest';
import { useHabitatStore } from '../../store/habitatStore';

describe('End-to-End Studio Workflow (Store Integration)', () => {
  it('loads Cramped Faulty Baseline, runs Auto-Optimize, compares snapshots, and runs X10 Storm Stress Test', () => {
    const store = useHabitatStore.getState();

    // 1. Initial Cramped Faulty Baseline
    store.loadPreset('cramped-faulty-baseline');
    const baseline = useHabitatStore.getState();
    expect(baseline.mission.name).toBe('Cramped Faulty Baseline');
    expect(baseline.report.criticalCount).toBeGreaterThanOrEqual(2);
    const initialScore = baseline.report.score;
    const initialCrit = baseline.report.criticalCount;

    // 2. Save Baseline Snapshot, then run Auto-Optimize
    baseline.saveSnapshot('Baseline A');
    useHabitatStore.getState().runAutoOptimize();
    const optimized = useHabitatStore.getState();

    expect(optimized.lastOptimization).not.toBeNull();
    expect(optimized.report.score).toBeGreaterThan(initialScore);
    expect(optimized.report.criticalCount).toBeLessThan(initialCrit);
    expect(optimized.report.egress.overallReachable).toBe(true);

    // 3. Save Optimized Snapshot & verify Compare Mode pair
    optimized.saveSnapshot('Optimized B');
    const afterSnap = useHabitatStore.getState();
    const [leftId, rightId] = afterSnap.compareIds;
    const left = afterSnap.snapshots.find((s) => s.id === leftId)!;
    const right = afterSnap.snapshots.find((s) => s.id === rightId)!;
    expect(left).toBeDefined();
    expect(right).toBeDefined();
    expect(right.report.score).toBeGreaterThan(left.report.score);

    // 4. Undo / Revert optimization restores baseline score
    afterSnap.revertOptimization();
    expect(useHabitatStore.getState().report.score).toBe(initialScore);

    // 5. Solar-Flare Stress Test (X10 Extreme SPE)
    useHabitatStore.getState().selectWeatherPreset('extreme_x10');
    const stormState = useHabitatStore.getState();
    expect(stormState.weather.source).toBe('SIMULATED_PRESET');
    expect(stormState.weather.xrayClass).toBe('X10.5');
    expect(stormState.weather.protonFluxPfu).toBe(18500);
    expect(stormState.stormStress.unshieldedDoseMsv).toBeGreaterThan(500);
    expect(stormState.stormStress.shieldedDoseMsv).toBeLessThan(
      stormState.stormStress.unshieldedDoseMsv
    );

    // 6. Multi-deck Mars Inflatable & Surface Dome switching + Undo/Redo
    useHabitatStore.getState().loadPreset('mars-transit-inflatable');
    expect(useHabitatStore.getState().mission.hull.decks).toBe(2);
    useHabitatStore.getState().updateHull({ type: 'surface_dome', diameter: 9.0 });
    expect(useHabitatStore.getState().mission.hull.length).toBe(9.0);
    useHabitatStore.getState().undo();
    expect(useHabitatStore.getState().mission.hull.type).toBe('inflatable');
  });
});
