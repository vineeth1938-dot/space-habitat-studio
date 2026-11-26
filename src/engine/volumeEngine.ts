import {
  HULL_TEMPLATES,
  NASA_NHV_LONG_DURATION_M3,
  NASA_NHV_SHORT_DURATION_M3,
  NASA_PRIVATE_SLEEP_DURATION_DAYS,
  NASA_PRIVATE_SLEEP_MIN_M3,
  NASA_SMALL_CREW_REF,
  NASA_STRUCTURAL_OVERHEAD_RATIO,
} from './constants';
import {
  clamp,
  isModuleInHull,
  safeDiv,
  sanitizeMission,
  usableFloorAreaPerDeckM2,
} from './geometry';
import { MissionConfig, ValidationIssue, VolumeMetrics, ZoneModule } from '../types/habitat';

/**
 * Computes required Net Habitable Volume (NHV) per crew member using the NASA-STD-3001
 * Celentano duration curve (3–179 days) + 25.0 m³ plateau (>=180 days) + non-linear
 * small-crew functional floor when crewSize < 6.
 */
export function computeRequiredNhvPerCrew(crewSize: number, durationDays: number): number {
  const safeCrew = clamp(Math.round(crewSize), 1, 12);
  const safeDays = clamp(durationDays, 3, 1000);

  let basePerCrew = NASA_NHV_LONG_DURATION_M3;
  if (safeDays < 180) {
    const logRatio = safeDiv(Math.log(safeDays / 3), Math.log(180 / 3), 1);
    basePerCrew =
      NASA_NHV_SHORT_DURATION_M3 +
      (NASA_NHV_LONG_DURATION_M3 - NASA_NHV_SHORT_DURATION_M3) * clamp(logRatio, 0, 1);
  }

  // Non-linear minimum floor for small crews (< 6) on short/medium missions:
  // shared common stations (airlock, hygiene, wardroom) impose an irreducible base volume.
  if (safeCrew < NASA_SMALL_CREW_REF && safeDays < 180) {
    const smallCrewBoost = 1 + 0.04 * (NASA_SMALL_CREW_REF - safeCrew);
    basePerCrew = Math.min(NASA_NHV_LONG_DURATION_M3, basePerCrew * smallCrewBoost);
  }

  // Absolute functional floor so a 1-crew capsule still holds basic translation volume
  const minTotalFloorM3 = 16.0;
  const effectivePerCrew = Math.max(basePerCrew, safeDiv(minTotalFloorM3, safeCrew, basePerCrew));

  return Number(effectivePerCrew.toFixed(2));
}

export function evaluateVolume(
  rawMission: MissionConfig,
  modules: ZoneModule[]
): { metrics: VolumeMetrics; issues: ValidationIssue[] } {
  const mission = sanitizeMission(rawMission);
  const { hull, crewSize, durationDays, standard } = mission;
  const template = HULL_TEMPLATES[hull.type] ?? HULL_TEMPLATES.cylinder;

  const deckArea = usableFloorAreaPerDeckM2(hull);
  const totalHullFloorAreaM2 = Number((deckArea * hull.decks).toFixed(2));

  const grossHullVolumeM3 = Number(
    (hull.widthM * hull.depthM * hull.deckHeightM * hull.decks * template.volumeShapeFactor).toFixed(2)
  );
  const structuralOverheadM3 = Number(
    (grossHullVolumeM3 * NASA_STRUCTURAL_OVERHEAD_RATIO).toFixed(2)
  );

  // Sum valid in-hull module footprints; deduct excess solid storage/ECLSS rack displacement (>30% of hull)
  const validModules = modules.filter((m) => isModuleInHull(m, hull));
  const occupiedFloorAreaM2 = Number(
    validModules.reduce((acc, m) => acc + m.w * m.h, 0).toFixed(2)
  );

  const nonHabitableHardwareVol = validModules
    .filter((m) => m.type === 'eclss' || m.type === 'storage')
    .reduce((acc, m) => acc + m.w * m.h * hull.deckHeightM * 0.65, 0);

  const baseNhv = grossHullVolumeM3 - structuralOverheadM3;
  // Allow up to 18% of baseNhv for standard ECLSS/storage before over-stuffing eats into free NHV
  const excessHardwareDeduction = Math.max(0, nonHabitableHardwareVol - baseNhv * 0.18);
  const netHabitableVolumeM3 = Number(Math.max(0, baseNhv - excessHardwareDeduction).toFixed(2));

  const nhvPerCrewM3 = Number(safeDiv(netHabitableVolumeM3, crewSize, 0).toFixed(2));
  const requiredNhvPerCrewM3 = computeRequiredNhvPerCrew(crewSize, durationDays);

  const sleepModules = validModules.filter((m) => m.type === 'sleep');
  const sleepVolumeM3 = Number(
    sleepModules.reduce((acc, m) => acc + m.w * m.h * hull.deckHeightM, 0).toFixed(2)
  );
  const sleepVolumePerCrewM3 = Number(safeDiv(sleepVolumeM3, crewSize, 0).toFixed(2));
  const requiredSleepPerCrewM3 =
    durationDays > NASA_PRIVATE_SLEEP_DURATION_DAYS ? NASA_PRIVATE_SLEEP_MIN_M3 : 3.0;

  const volumetricEfficiencyPct = Number(
    clamp(safeDiv(occupiedFloorAreaM2, totalHullFloorAreaM2, 0) * 100, 0, 100).toFixed(1)
  );

  const issues: ValidationIssue[] = [];
  const checkNasa = standard === 'NASA' || standard === 'UNIFIED' || standard === 'ISRO' || standard === 'SPACEX';

  // 1. NHV per crew check (NASA-STD-3001 baseline applied across agencies with NASA citation)
  if (checkNasa) {
    if (nhvPerCrewM3 < requiredNhvPerCrewM3 * 0.85) {
      issues.push({
        id: 'vol-nhv-fail',
        code: 'NASA-3001-V2-8001',
        agency: 'NASA',
        severity: 'FAIL',
        category: 'volume',
        title: 'Insufficient Net Habitable Volume (NHV)',
        detail: `NHV is ${nhvPerCrewM3} m³/crew after 22% structural/avionics overhead; requires >= ${requiredNhvPerCrewM3} m³/crew for ${crewSize} crew (${durationDays}d).`,
        action: 'Select a larger hull (Inflatable TransHab / Multi-Deck) or increase hull dimensions.',
        metric: `${nhvPerCrewM3} / ${requiredNhvPerCrewM3} m³`,
        moduleIds: [],
      });
    } else if (nhvPerCrewM3 < requiredNhvPerCrewM3) {
      issues.push({
        id: 'vol-nhv-warn',
        code: 'NASA-3001-V2-8001',
        agency: 'NASA',
        severity: 'WARN',
        category: 'volume',
        title: 'Marginal Net Habitable Volume',
        detail: `NHV (${nhvPerCrewM3} m³/crew) is within 15% below target ${requiredNhvPerCrewM3} m³/crew.`,
        action: 'Expand hull width/depth slightly or trim oversized ECLSS/Storage bays.',
        metric: `${nhvPerCrewM3} / ${requiredNhvPerCrewM3} m³`,
        moduleIds: [],
      });
    } else {
      issues.push({
        id: 'vol-nhv-pass',
        code: 'NASA-3001-V2-8001',
        agency: 'NASA',
        severity: 'PASS',
        category: 'volume',
        title: 'Net Habitable Volume Compliant',
        detail: `${nhvPerCrewM3} m³/crew exceeds ${requiredNhvPerCrewM3} m³/crew Celentano/HRP curve.`,
        action: 'Maintain current pressurized envelope.',
        metric: `${nhvPerCrewM3} m³/crew`,
        moduleIds: [],
      });
    }
  }

  // 2. Private Sleep Quarters volume check
  if (sleepModules.length === 0) {
    issues.push({
      id: 'vol-sleep-missing',
      code: 'NASA-3001-V2-8020',
      agency: 'NASA',
      severity: 'FAIL',
      category: 'volume',
      title: 'Missing Crew Sleep Quarters',
      detail: 'No dedicated Sleep Quarters placed inside the hull boundary.',
      action: 'Add Sleep Quarters from the left palette.',
      metric: `0.0 / ${requiredSleepPerCrewM3} m³`,
      moduleIds: [],
    });
  } else if (sleepVolumePerCrewM3 < requiredSleepPerCrewM3) {
    const isLong = durationDays > NASA_PRIVATE_SLEEP_DURATION_DAYS;
    issues.push({
      id: 'vol-sleep-low',
      code: 'NASA-3001-V2-8020',
      agency: 'NASA',
      severity: isLong && (standard === 'NASA' || standard === 'UNIFIED') ? 'FAIL' : 'WARN',
      category: 'volume',
      title: 'Undersized Private Sleep Volume',
      detail: `Sleep volume is ${sleepVolumePerCrewM3} m³/crew; requires >= ${requiredSleepPerCrewM3} m³/crew (${durationDays}d mission).`,
      action: 'Enlarge Sleep Quarters or add an additional Sleep module.',
      metric: `${sleepVolumePerCrewM3} / ${requiredSleepPerCrewM3} m³`,
      moduleIds: sleepModules.map((m) => m.id),
    });
  } else {
    issues.push({
      id: 'vol-sleep-pass',
      code: 'NASA-3001-V2-8020',
      agency: 'NASA',
      severity: 'PASS',
      category: 'volume',
      title: 'Private Sleep Quarters Volume Verified',
      detail: `${sleepVolumePerCrewM3} m³/crew satisfies >= ${requiredSleepPerCrewM3} m³/crew private quarters standard.`,
      action: 'Sleep enclosure volume is nominal.',
      metric: `${sleepVolumePerCrewM3} m³/crew`,
      moduleIds: sleepModules.map((m) => m.id),
    });
  }

  return {
    metrics: {
      grossHullVolumeM3,
      structuralOverheadM3,
      netHabitableVolumeM3,
      nhvPerCrewM3,
      requiredNhvPerCrewM3,
      sleepVolumeM3,
      sleepVolumePerCrewM3,
      requiredSleepPerCrewM3,
      totalHullFloorAreaM2,
      occupiedFloorAreaM2,
      volumetricEfficiencyPct,
    },
    issues,
  };
}
