import { describe, expect, it } from 'vitest';
import { HABITAT_PRESETS } from '../../data/presets';
import { clampZoneToHull, isRectInsideHull, sanitizeMissionConfig } from '../hullMath';
import { evaluateHabitat, getRequiredNhvPerCrew } from '../ruleEngine';
import { evaluateEgressAStar } from '../egressAStar';
import { autoOptimizeLayout } from '../autoOptimize';
import {
  evaluateStormShelterStress,
  getStormPreset,
  parseNoaaPayloads,
} from '../../services/noaaSpaceWeather';
import { buildAuditJsonPayload, buildPrintableAuditHtml } from '../../utils/exportReport';
import { MissionConfig, ZoneNode } from '../../types/habitat';

function assertAllNumbersFinite(obj: unknown, path = 'root'): void {
  if (typeof obj === 'number') {
    expect(Number.isFinite(obj), `Expected finite number at ${path}, got ${obj}`).toBe(true);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => assertAllNumbersFinite(item, `${path}[${i}]`));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      assertAllNumbersFinite(v, `${path}.${k}`);
    }
  }
}

describe('Boundary Clamping & Zero-NaN Edge-Case Hardening', () => {
  it('handles 0 zones, 12 crew on smallest hull, and NaN inputs with strictly finite outputs', () => {
    const extremeMission = sanitizeMissionConfig({
      name: 'Extreme Stress Can',
      crewSize: 12,
      durationDays: 1000,
      gravity: '0g',
      hull: {
        type: 'rigid_cylinder',
        diameter: 4.2,
        length: 8.0,
        decks: 1,
        wallThickness: 0.25,
      },
    });
    const report = evaluateHabitat(extremeMission, []);
    const stress = evaluateStormShelterStress(
      extremeMission,
      [],
      report,
      getStormPreset('extreme_x10')
    );

    assertAllNumbersFinite(report);
    assertAllNumbersFinite(stress);
    expect(getRequiredNhvPerCrew(1000)).toBe(25);
    expect(report.egress.overallReachable).toBe(false);
    expect(stress.verdict).toBe('FAIL');
  });

  it('strictly clamps escaped zones inside Rigid Cylinder, Inflatable, and Circular Surface Dome', () => {
    for (const hullType of ['rigid_cylinder', 'inflatable', 'surface_dome'] as const) {
      const hull = {
        type: hullType,
        diameter: 8.0,
        length: hullType === 'surface_dome' ? 8.0 : 12.0,
        decks: 2,
        wallThickness: 0.3,
      };
      const wildZone: ZoneNode = {
        id: 'wild',
        type: 'crew_quarters',
        label: 'Escaped Zone',
        deck: 99,
        x: -25,
        y: 80,
        width: 50,
        height: 40,
        zHeight: 9,
        rotation: 0,
      };
      const clamped = clampZoneToHull(wildZone, hull);
      expect(clamped.deck).toBeLessThan(hull.decks);
      expect(isRectInsideHull(clamped.x, clamped.y, clamped.width, clamped.height, hull)).toBe(true);
    }
  });

  it('survives 100% overlapping zones and missing airlock/shelter without crashing', () => {
    const mission = HABITAT_PRESETS[0].mission;
    const stacked: ZoneNode[] = Array.from({ length: 6 }).map((_, idx) => ({
      id: `ov-${idx}`,
      type: idx % 2 === 0 ? 'crew_quarters' : 'exercise',
      label: `Stacked ${idx}`,
      deck: 0,
      x: 3.0,
      y: 2.0,
      width: 2.25,
      height: 1.75,
      zHeight: 2.2,
      rotation: 0,
    }));
    const report = evaluateHabitat(mission, stacked);
    assertAllNumbersFinite(report);
    expect(report.violations.some((v) => v.category === 'GEOMETRY')).toBe(true);
  });
});

describe('Phase 2 Space-Agency Heritage Rulebook (NASA-STD-3001)', () => {
  it('detects acoustic (>50 dBA) and hygiene-to-galley (<3.0m) violations', () => {
    const faulty = HABITAT_PRESETS[0];
    const report = evaluateHabitat(faulty.mission, faulty.zones);
    expect(report.criticalCount).toBeGreaterThanOrEqual(2);
    expect(report.score).toBeLessThan(65);
    expect(report.violations.some((v) => v.category === 'ACOUSTIC' && v.severity !== 'PASS')).toBe(
      true
    );
    expect(
      report.violations.some((v) => v.category === 'CONTAMINATION' && v.severity === 'CRITICAL')
    ).toBe(true);
  });

  it('enforces NASA-STD-3001 [V2 8011] 0g local-vertical orientation consistency', () => {
    const mission0g: MissionConfig = {
      ...HABITAT_PRESETS[0].mission,
      gravity: '0g',
    };
    const zones: ZoneNode[] = [
      {
        id: 'z1',
        type: 'crew_quarters',
        label: 'Rack A',
        deck: 0,
        x: 1.5,
        y: 1.0,
        width: 2.0,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'z2',
        type: 'medical',
        label: 'Rack B',
        deck: 0,
        x: 3.75,
        y: 1.0,
        width: 2.0,
        height: 1.75,
        zHeight: 2.2,
        rotation: 90,
      },
    ];
    const rep0g = evaluateHabitat(mission0g, zones);
    expect(rep0g.orientationConflicts.length).toBeGreaterThan(0);
    expect(
      rep0g.violations.some((v) => v.category === 'ORIENTATION' && v.severity === 'WARNING')
    ).toBe(true);

    // Same layout in 1/6g Lunar partial gravity has natural gravity vector
    const repLunar = evaluateHabitat({ ...mission0g, gravity: '1/6g' }, zones);
    expect(repLunar.orientationConflicts.length).toBe(0);
  });

  it('detects ISS CO2 stagnation risk when Crew Quarters are far (>8m) from ECLSS', () => {
    const mission = HABITAT_PRESETS[0].mission;
    const zones: ZoneNode[] = [
      {
        id: 'cq-far',
        type: 'crew_quarters',
        label: 'Far Sleep Bunk',
        deck: 0,
        x: 0.75,
        y: 0.75,
        width: 2.0,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'eclss-far',
        type: 'eclss',
        label: 'Distant IMV Fan',
        deck: 0,
        x: 11.25,
        y: 3.75,
        width: 1.75,
        height: 1.5,
        zHeight: 2.2,
        rotation: 0,
      },
    ];
    const rep = evaluateHabitat(mission, zones);
    expect(rep.stagnantZoneIds).toContain('cq-far');
    expect(rep.violations.some((v) => v.category === 'AIRFLOW' && v.severity !== 'PASS')).toBe(
      true
    );
  });

  it('detects circadian sleep light-spill when high-lux Galley abuts Crew Quarters', () => {
    const mission = HABITAT_PRESETS[0].mission;
    const zones: ZoneNode[] = [
      {
        id: 'cq',
        type: 'crew_quarters',
        label: 'Sleep Pod',
        deck: 0,
        x: 1.5,
        y: 1.0,
        width: 2.0,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'gal',
        type: 'galley',
        label: 'Bright Wardroom',
        deck: 0,
        x: 3.5,
        y: 1.0,
        width: 2.25,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
    ];
    const rep = evaluateHabitat(mission, zones);
    expect(rep.illuminance.lightSpillZoneIds).toContain('cq');
    expect(rep.violations.some((v) => v.category === 'LIGHTING' && v.severity === 'WARNING')).toBe(
      true
    );
  });

  it('awards TransHab Water-Wall radiation shielding bonus and cuts X10 SPE dose', () => {
    const mission = HABITAT_PRESETS[1].mission;
    const x10 = getStormPreset('extreme_x10');

    const bareZones: ZoneNode[] = [
      {
        id: 'sh',
        type: 'storm_shelter',
        label: 'Core Shelter',
        deck: 0,
        x: 4.0,
        y: 3.5,
        width: 2.5,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'cq',
        type: 'crew_quarters',
        label: 'Quarters',
        deck: 0,
        x: 1.0,
        y: 0.75,
        width: 2.25,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'air',
        type: 'airlock',
        label: 'Airlock',
        deck: 0,
        x: 11.5,
        y: 2.0,
        width: 1.5,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
    ];

    const jacketedZones: ZoneNode[] = [
      ...bareZones,
      {
        id: 'water-stow',
        type: 'stowage',
        label: 'Potable Water Wall',
        deck: 0,
        x: 6.5,
        y: 3.5,
        width: 2.0,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
      {
        id: 'water-eclss',
        type: 'eclss',
        label: 'WPA Tank Rack',
        deck: 0,
        x: 2.0,
        y: 3.5,
        width: 2.0,
        height: 1.75,
        zHeight: 2.2,
        rotation: 0,
      },
    ];

    const bareRep = evaluateHabitat(mission, bareZones);
    const jacketRep = evaluateHabitat(mission, jacketedZones);
    expect(jacketRep.waterWall.shieldingBonusGcm2).toBeGreaterThan(
      bareRep.waterWall.shieldingBonusGcm2
    );

    const bareStress = evaluateStormShelterStress(mission, bareZones, bareRep, x10);
    const jacketStress = evaluateStormShelterStress(mission, jacketedZones, jacketRep, x10);
    expect(jacketStress.shieldedDoseMsv).toBeLessThan(bareStress.shieldedDoseMsv);
    expect(jacketStress.doseReductionFromWaterWallMsv).toBeGreaterThan(0);
  });

  it('validates all 3 Heritage Reference Presets achieve high readiness and clear A* egress', () => {
    for (const presetId of [
      'iss-destiny-node',
      'transhab-mars-inflatable',
      'artemis-lunar-dome',
    ]) {
      const preset = HABITAT_PRESETS.find((p) => p.id === presetId)!;
      expect(preset).toBeDefined();
      const rep = evaluateHabitat(preset.mission, preset.zones);
      assertAllNumbersFinite(rep);
      expect(rep.egress.overallReachable, `${presetId} egress`).toBe(true);
      expect(
        rep.criticalCount,
        `${presetId} crits: ${rep.violations.filter((v) => v.severity === 'CRITICAL').map((v) => v.id).join(',')}`
      ).toBe(0);
      expect(rep.score, `${presetId} score`).toBeGreaterThanOrEqual(85);
    }
  });
});

describe('A* Egress, Auto-Optimize (<250ms), NOAA Parser & Export Report', () => {
  it('detects 100% blocked corridor cleanly with finite 0 distance', () => {
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
        label: 'Seal Wall',
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
    assertAllNumbersFinite(res);
    expect(res.overallReachable).toBe(false);
    expect(res.airlockPaths[0].distanceM).toBe(0);
  });

  it('converges deterministically in <250ms and never worsens Readiness Score', () => {
    const faulty = HABITAT_PRESETS[0];
    const r1 = autoOptimizeLayout(faulty.mission, faulty.zones, 42);
    const r2 = autoOptimizeLayout(faulty.mission, faulty.zones, 42);

    expect(r1.elapsedMs).toBeLessThan(250);
    expect(r1.afterReport.score).toBe(r2.afterReport.score);
    expect(r1.afterReport.score).toBeGreaterThan(r1.beforeReport.score);
    expect(r1.afterReport.criticalCount).toBeLessThan(r1.beforeReport.criticalCount);

    // Re-running on an already high-scoring layout must never worsen score
    const iss = HABITAT_PRESETS[1];
    const rIss = autoOptimizeLayout(iss.mission, iss.zones, 42);
    expect(rIss.afterReport.score).toBeGreaterThanOrEqual(rIss.beforeReport.score);
  });

  it('parses NOAA GOES X-ray and Proton JSON payloads and generates printable HTML/JSON reports', () => {
    const mockXray = [
      { time_tag: '2026-11-28T10:00:00Z', energy: '0.1-0.8nm', flux: 2.5e-5 },
      { time_tag: '2026-11-28T10:05:00Z', energy: '0.1-0.8nm', flux: 5.2e-5 },
    ];
    const mockProtons = [
      { time_tag: '2026-11-28T10:00:00Z', energy: '>=10 MeV', flux: 45 },
      { time_tag: '2026-11-28T10:05:00Z', energy: '>=10 MeV', flux: 120 },
    ];
    const telemetry = parseNoaaPayloads(mockXray, mockProtons);
    expect(telemetry).not.toBeNull();
    expect(telemetry!.source).toBe('LIVE_NOAA_GOES');
    expect(telemetry!.xrayClass).toBe('M5.2');
    expect(telemetry!.protonFluxPfu).toBe(120);

    expect(parseNoaaPayloads([], [])).toBeNull();

    const preset = HABITAT_PRESETS[2];
    const rep = evaluateHabitat(preset.mission, preset.zones);
    const stress = evaluateStormShelterStress(preset.mission, preset.zones, rep, telemetry!);
    const audit = buildAuditJsonPayload(preset.mission, preset.zones, rep, telemetry!, stress, []);
    const html = buildPrintableAuditHtml(audit);
    expect(audit.schemaVersion).toBe('NASA-STD-3001-SHS-CARBON4-1.0');
    expect(html).toContain('NASA-STD-3001 ENGINEERING VERIFICATION REPORT');
    expect(html).toContain(preset.mission.name);
  });
});
