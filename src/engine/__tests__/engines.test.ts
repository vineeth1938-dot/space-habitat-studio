import { describe, expect, it } from 'vitest';
import { HABITAT_PRESETS } from '../../data/presets';
import { evaluateHabitat, getRequiredNhvPerCrew } from '../ruleEngine';
import { evaluateEgressAStar } from '../egressAStar';
import { autoOptimizeLayout } from '../autoOptimize';
import { evaluateStormShelterStress, getStormPreset } from '../../services/noaaSpaceWeather';
import { MissionConfig, ZoneNode } from '../../types/habitat';

describe('NASA-STD-3001 Rule Engine', () => {
  it('computes NHV and flags insufficient volume for tiny hulls', () => {
    const tinyMission: MissionConfig = {
      name: 'Tiny Can',
      crewSize: 6,
      durationDays: 365,
      gravity: '0g',
      hull: {
        type: 'rigid_cylinder',
        diameter: 4.2,
        length: 8.0,
        decks: 1,
        wallThickness: 0.25,
      },
    };
    const report = evaluateHabitat(tinyMission, []);
    expect(getRequiredNhvPerCrew(365)).toBe(25);
    expect(report.nhvPerCrewM3).toBeLessThan(25);
    expect(report.violations.some((v) => v.category === 'NHV' && v.severity === 'CRITICAL')).toBe(
      true
    );
  });

  it('detects acoustic violations when Exercise is adjacent to Crew Quarters', () => {
    const mission = HABITAT_PRESETS[0].mission;
    const zones: ZoneNode[] = [
      {
        id: 'cq',
        type: 'crew_quarters',
        label: 'Sleep',
        deck: 0,
        x: 1.0,
        y: 0.5,
        width: 2.0,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'ex',
        type: 'exercise',
        label: 'ARED',
        deck: 0,
        x: 3.0,
        y: 0.5,
        width: 2.0,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
    ];
    const report = evaluateHabitat(mission, zones);
    const acoustic = report.acousticPairs.find((p) => p.sourceId === 'ex' && p.targetId === 'cq');
    expect(acoustic).toBeDefined();
    expect(acoustic!.violates).toBe(true);
    expect(acoustic!.receivedDba).toBeGreaterThan(50);
    expect(report.violations.some((v) => v.category === 'ACOUSTIC' && v.severity !== 'PASS')).toBe(
      true
    );
  });

  it('detects hygiene-to-galley contamination violation when separation < 3.0m', () => {
    const mission = HABITAT_PRESETS[0].mission;
    const zones: ZoneNode[] = [
      {
        id: 'gal',
        type: 'galley',
        label: 'Galley',
        deck: 0,
        x: 2.0,
        y: 0.5,
        width: 2.25,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'hyg',
        type: 'hygiene',
        label: 'UWMS',
        deck: 0,
        x: 4.5,
        y: 0.5,
        width: 1.5,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
    ];
    const report = evaluateHabitat(mission, zones);
    const pair = report.contaminationPairs.find(
      (p) => p.hygieneId === 'hyg' && p.targetId === 'gal'
    );
    expect(pair).toBeDefined();
    expect(pair!.violates).toBe(true);
    expect(pair!.distanceM).toBeLessThan(3.0);
    expect(
      report.violations.some((v) => v.category === 'CONTAMINATION' && v.severity === 'CRITICAL')
    ).toBe(true);
  });

  it('flags real hazards on the Cramped Faulty Baseline preset', () => {
    const faulty = HABITAT_PRESETS[0];
    const report = evaluateHabitat(faulty.mission, faulty.zones);
    expect(report.criticalCount).toBeGreaterThanOrEqual(2);
    expect(report.score).toBeLessThan(70);
    expect(report.violations.some((v) => v.category === 'ACOUSTIC' && v.severity !== 'PASS')).toBe(
      true
    );
    expect(
      report.violations.some((v) => v.category === 'CONTAMINATION' && v.severity === 'CRITICAL')
    ).toBe(true);
  });
});

describe('A* Emergency Egress Pathfinding', () => {
  it('routes around obstacles when a clear corridor exists', () => {
    const hull = HABITAT_PRESETS[0].mission.hull;
    const zones: ZoneNode[] = [
      {
        id: 'cq',
        type: 'crew_quarters',
        label: 'Sleep',
        deck: 0,
        x: 1.0,
        y: 0.5,
        width: 2.0,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'obs',
        type: 'stowage',
        label: 'Obstacle',
        deck: 0,
        x: 5.5,
        y: 0.5,
        width: 2.0,
        height: 2.0,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'air',
        type: 'airlock',
        label: 'Airlock',
        deck: 0,
        x: 11.25,
        y: 2.25,
        width: 1.5,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
    ];
    const res = evaluateEgressAStar(hull, zones);
    expect(res.overallReachable).toBe(true);
    expect(res.airlockPaths[0].points.length).toBeGreaterThan(2);
    expect(res.worstCaseDistanceM).toBeGreaterThan(5);
  });

  it('detects blocked corridor when stowage completely seals the hull width', () => {
    const hull = HABITAT_PRESETS[0].mission.hull;
    const zones: ZoneNode[] = [
      {
        id: 'cq',
        type: 'crew_quarters',
        label: 'Sleep',
        deck: 0,
        x: 1.0,
        y: 2.0,
        width: 2.0,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'wall-block',
        type: 'stowage',
        label: 'Blocking Wall',
        deck: 0,
        x: 6.0,
        y: 0.25,
        width: 1.5,
        height: 5.5,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'air',
        type: 'airlock',
        label: 'Airlock',
        deck: 0,
        x: 11.25,
        y: 2.25,
        width: 1.5,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
    ];
    const res = evaluateEgressAStar(hull, zones);
    expect(res.overallReachable).toBe(false);
    expect(res.airlockPaths[0].reachable).toBe(false);
  });
});

describe('Auto-Optimize Solver', () => {
  it('strictly improves Readiness Score and resolves violations on Cramped Faulty Baseline', () => {
    const faulty = HABITAT_PRESETS[0];
    const result = autoOptimizeLayout(faulty.mission, faulty.zones, 42);
    expect(result.improved).toBe(true);
    expect(result.afterReport.score).toBeGreaterThan(result.beforeReport.score);
    expect(result.afterReport.criticalCount).toBeLessThan(result.beforeReport.criticalCount);
    expect(result.afterReport.egress.overallReachable).toBe(true);
  });
});

describe('Solar-Flare Storm-Shelter Stress Test', () => {
  it('fails an X10 event when no storm shelter is present and passes with an adequate shelter', () => {
    const mars = HABITAT_PRESETS[2];
    const x10 = getStormPreset('extreme_x10');

    const withShelterReport = evaluateHabitat(mars.mission, mars.zones);
    const stressWithShelter = evaluateStormShelterStress(
      mars.mission,
      mars.zones,
      withShelterReport,
      x10
    );
    expect(stressWithShelter.hasShelter).toBe(true);
    expect(stressWithShelter.verdict).toBe('PASS');
    expect(stressWithShelter.shieldedDoseMsv).toBeLessThan(stressWithShelter.acuteLimitMsv);

    const noShelterZones = mars.zones.filter((z) => z.type !== 'storm_shelter');
    const noShelterReport = evaluateHabitat(mars.mission, noShelterZones);
    const stressNoShelter = evaluateStormShelterStress(
      mars.mission,
      noShelterZones,
      noShelterReport,
      x10
    );
    expect(stressNoShelter.hasShelter).toBe(false);
    expect(stressNoShelter.verdict).toBe('FAIL');
  });
});
