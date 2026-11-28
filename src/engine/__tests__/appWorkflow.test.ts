import { describe, expect, it } from 'vitest';
import { LIVE_SNAPSHOT_ID, useHabitatStore } from '../../store/habitatStore';

describe('End-to-End Studio Workflow & Interactive Judge Tour (Store Integration)', () => {
  it('executes full baseline -> auto-optimize -> revert -> compare -> X10 storm -> hull clamping workflow', () => {
    const store = useHabitatStore.getState();

    // 1. Load Cramped Faulty Baseline
    store.loadPreset('cramped-faulty-baseline');
    const baseline = useHabitatStore.getState();
    expect(baseline.mission.name).toBe('Cramped Faulty Baseline');
    expect(baseline.report.criticalCount).toBeGreaterThanOrEqual(2);
    const initialScore = baseline.report.score;
    const initialCrit = baseline.report.criticalCount;

    // 2. Save Baseline Snapshot, then run Auto-Optimize
    const snapA = baseline.saveSnapshot('Baseline A');
    useHabitatStore.getState().runAutoOptimize();
    const optimized = useHabitatStore.getState();

    expect(optimized.lastOptimization).not.toBeNull();
    expect(optimized.lastOptimization!.elapsedMs).toBeLessThan(250);
    expect(optimized.lastOptimization!.violationsFixed).toBeGreaterThan(0);
    expect(optimized.report.score).toBeGreaterThan(initialScore);
    expect(optimized.report.criticalCount).toBeLessThan(initialCrit);
    expect(optimized.report.egress.overallReachable).toBe(true);

    // 3. Save Optimized Snapshot & verify Compare Mode pair
    const snapB = optimized.saveSnapshot('Optimized B');
    useHabitatStore.getState().setComparePair(snapA.id, snapB.id);
    const afterSnap = useHabitatStore.getState();
    const left = afterSnap.snapshots.find((s) => s.id === snapA.id)!;
    const right = afterSnap.snapshots.find((s) => s.id === snapB.id)!;
    expect(right.report.score).toBeGreaterThan(left.report.score);

    // 4. Revert optimization restores baseline score cleanly
    afterSnap.revertOptimization();
    expect(useHabitatStore.getState().report.score).toBe(initialScore);

    // 5. Solar-Flare Stress Test (X10 Extreme SPE) engages Emergency Red-Alert lighting
    useHabitatStore.getState().selectWeatherPreset('extreme_x10');
    const stormState = useHabitatStore.getState();
    expect(stormState.lightingMode).toBe('emergency');
    expect(stormState.weather.xrayClass).toBe('X10.5');
    expect(stormState.stormStress.unshieldedDoseMsv).toBeGreaterThan(500);
    expect(stormState.stormStress.shieldedDoseMsv).toBeLessThan(
      stormState.stormStress.unshieldedDoseMsv
    );

    // 6. Heritage TransHab Inflatable -> Artemis Surface Dome clamping & rapid Undo/Redo
    useHabitatStore.getState().loadPreset('transhab-mars-inflatable');
    expect(useHabitatStore.getState().mission.hull.decks).toBe(2);
    useHabitatStore.getState().updateHull({ type: 'surface_dome', diameter: 9.0, decks: 1 });
    const domeState = useHabitatStore.getState();
    expect(domeState.mission.hull.length).toBe(9.0);
    expect(domeState.zones.every((z) => z.deck === 0)).toBe(true);

    domeState.undo();
    expect(useHabitatStore.getState().mission.hull.type).toBe('inflatable');
    useHabitatStore.getState().redo();
    expect(useHabitatStore.getState().mission.hull.type).toBe('surface_dome');

    // 7. Judge Demo Mode 4-Step Guided Tour state machine
    useHabitatStore.getState().setJudgeTour(true, 0);
    expect(useHabitatStore.getState().judgeTourActive).toBe(true);
    expect(useHabitatStore.getState().activePresetId).toBe('cramped-faulty-baseline');

    useHabitatStore.getState().runJudgeTourStep(1);
    expect(useHabitatStore.getState().report.score).toBeGreaterThan(initialScore);

    useHabitatStore.getState().runJudgeTourStep(2);
    expect(useHabitatStore.getState().activeView).toBe('weather');
    expect(useHabitatStore.getState().lightingMode).toBe('emergency');

    useHabitatStore.getState().runJudgeTourStep(3);
    expect(useHabitatStore.getState().activeView).toBe('compare');
    expect(useHabitatStore.getState().compareIds[1]).toBe(LIVE_SNAPSHOT_ID);

    // 8. Clear all zones (0-zone edge case) & undo back
    useHabitatStore.getState().clearAllZones();
    expect(useHabitatStore.getState().zones.length).toBe(0);
    useHabitatStore.getState().undo();
    expect(useHabitatStore.getState().zones.length).toBeGreaterThan(0);
  });
});
