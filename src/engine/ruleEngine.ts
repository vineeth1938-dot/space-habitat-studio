import {
  AcousticPair,
  ContaminationPair,
  EvaluationReport,
  MissionConfig,
  RuleViolation,
  ZoneNode,
} from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';
import {
  computeHullMetrics,
  getDistance3D,
  getHullBounds,
  getRectOverlapArea,
  isRectInsideHull,
} from './hullMath';
import { evaluateEgressAStar } from './egressAStar';

export const SLEEP_NOISE_LIMIT_DBA = 50;
export const HYGIENE_MIN_SEPARATION_M = 3.0;

export function getRequiredNhvPerCrew(durationDays: number): number {
  if (durationDays <= 30) return 15.0;
  if (durationDays >= 180) return 25.0;
  const t = (durationDays - 30) / (180 - 30);
  return Number((15.0 + t * 10.0).toFixed(1));
}

export function estimateBunkCapacity(zone: ZoneNode): number {
  if (zone.type !== 'crew_quarters') return 0;
  const area = zone.width * zone.height;
  return Math.max(1, Math.floor(area / 1.85));
}

/**
 * Deterministic NASA-STD-3001 & HRP Habitat Human-Factors Rule Engine.
 * Executes synchronously in <16ms on every layout or mission change.
 */
export function evaluateHabitat(mission: MissionConfig, zones: ZoneNode[]): EvaluationReport {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const { hull } = mission;
  const { deckHeight } = getHullBounds(hull);

  const violations: RuleViolation[] = [];
  const acousticPairs: AcousticPair[] = [];
  const contaminationPairs: ContaminationPair[] = [];

  // 1. Hull Volume, Mass, Cost & NHV
  const hullMetrics = computeHullMetrics(mission, zones);
  const innerVol = Math.max(0, hullMetrics.grossVolumeM3 - hullMetrics.structureVolumeM3);
  const deadSpaceFraction = hull.type === 'surface_dome' ? 0.14 : 0.1;
  const deadSpaceM3 = Number((innerVol * deadSpaceFraction).toFixed(1));
  const nhvM3 = Number(
    Math.max(0, innerVol - hullMetrics.equipmentVolumeM3 - deadSpaceM3).toFixed(1)
  );
  const nhvPerCrewM3 = Number((nhvM3 / Math.max(1, mission.crewSize)).toFixed(1));
  const requiredNhvPerCrewM3 = getRequiredNhvPerCrew(mission.durationDays);

  let penalty = 0;

  if (nhvPerCrewM3 < requiredNhvPerCrewM3 * 0.85) {
    penalty += 18;
    violations.push({
      id: 'nhv-critical',
      ruleCode: 'NASA-STD-3001-V2-8.2',
      category: 'NHV',
      severity: 'CRITICAL',
      title: 'Insufficient Net Habitable Volume (NHV)',
      detail: `NHV per crewmember is ${nhvPerCrewM3} m³/crew, well below the ${requiredNhvPerCrewM3} m³/crew threshold for a ${mission.durationDays}-day mission.`,
      metric: `${nhvPerCrewM3} / ${requiredNhvPerCrewM3} m³`,
      affectedZoneIds: [],
      recommendation:
        'Increase hull diameter/length, add a deck, switch to an Inflatable hull, or reduce excess equipment/stowage volume.',
    });
  } else if (nhvPerCrewM3 < requiredNhvPerCrewM3) {
    penalty += 8;
    violations.push({
      id: 'nhv-warning',
      ruleCode: 'NASA-STD-3001-V2-8.2',
      category: 'NHV',
      severity: 'WARNING',
      title: 'Marginal Net Habitable Volume (NHV)',
      detail: `NHV per crewmember is ${nhvPerCrewM3} m³/crew, slightly under the ${requiredNhvPerCrewM3} m³/crew NASA HRP benchmark.`,
      metric: `${nhvPerCrewM3} / ${requiredNhvPerCrewM3} m³`,
      affectedZoneIds: [],
      recommendation:
        'Slightly expand hull length/diameter or trim oversized stowage racks to reach full NHV compliance.',
    });
  } else {
    violations.push({
      id: 'nhv-pass',
      ruleCode: 'NASA-STD-3001-V2-8.2',
      category: 'NHV',
      severity: 'PASS',
      title: 'Net Habitable Volume Compliant',
      detail: `NHV of ${nhvPerCrewM3} m³/crew satisfies the ${requiredNhvPerCrewM3} m³/crew requirement for ${mission.crewSize} crew over ${mission.durationDays} days.`,
      metric: `${nhvPerCrewM3} m³/crew`,
      affectedZoneIds: [],
      recommendation: 'NHV margin is healthy.',
    });
  }

  // 2. Geometry Integrity: Out-of-bounds & Overlaps
  const oobZones: ZoneNode[] = [];
  for (const z of zones) {
    if (z.deck >= hull.decks || !isRectInsideHull(z.x, z.y, z.width, z.height, hull)) {
      oobZones.push(z);
    }
  }
  if (oobZones.length > 0) {
    penalty += Math.min(24, oobZones.length * 10);
    violations.push({
      id: 'geom-oob',
      ruleCode: 'HAB-GEOM-101',
      category: 'GEOMETRY',
      severity: 'CRITICAL',
      title: `${oobZones.length} Zone(s) Breach Pressure Hull Boundary`,
      detail: `${oobZones.map((z) => z.label).join(', ')} extend outside the pressurized hull envelope.`,
      metric: `${oobZones.length} OOB`,
      affectedZoneIds: oobZones.map((z) => z.id),
      recommendation: 'Drag zones inward inside the hull contour or run Auto-Optimize.',
    });
  }

  const overlapIds = new Set<string>();
  let overlapPairsCount = 0;
  for (let i = 0; i < zones.length; i++) {
    for (let j = i + 1; j < zones.length; j++) {
      const area = getRectOverlapArea(zones[i], zones[j]);
      if (area > 0.05) {
        overlapPairsCount++;
        overlapIds.add(zones[i].id);
        overlapIds.add(zones[j].id);
      }
    }
  }
  if (overlapPairsCount > 0) {
    penalty += Math.min(24, overlapPairsCount * 12);
    violations.push({
      id: 'geom-overlap',
      ruleCode: 'HAB-GEOM-102',
      category: 'GEOMETRY',
      severity: 'CRITICAL',
      title: `${overlapPairsCount} Overlapping Zone Collision(s)`,
      detail: 'Two or more interior modules intersect on the same deck floorplan.',
      metric: `${overlapPairsCount} overlaps`,
      affectedZoneIds: Array.from(overlapIds),
      recommendation: 'Separate colliding modules or click Auto-Optimize to pack cleanly.',
    });
  }

  // 3. Acoustic Isolation & Sleep Fatigue (NASA-STD-3001 Vol 2, Sec 6.6)
  const sleepZones = zones.filter((z) => ZONE_CATALOG[z.type].isQuietZone);
  const noisyZones = zones.filter((z) => ZONE_CATALOG[z.type].noiseEmitDba >= 60);

  let acousticViolationCount = 0;
  for (const src of noisyZones) {
    const srcDba = ZONE_CATALOG[src.type].noiseEmitDba;
    for (const tgt of sleepZones) {
      const dist = getDistance3D(src, tgt, deckHeight);
      const dEff = Math.max(0.8, dist + 0.5);
      const bulkheadAtten =
        src.deck !== tgt.deck ? 14 : dist >= 0.75 ? 8 : 3;
      const receivedDba = Number((srcDba - 20 * Math.log10(dEff) - bulkheadAtten).toFixed(1));
      const violates = receivedDba > SLEEP_NOISE_LIMIT_DBA;

      acousticPairs.push({
        sourceId: src.id,
        sourceLabel: src.label,
        targetId: tgt.id,
        targetLabel: tgt.label,
        sourceDba: srcDba,
        receivedDba,
        limitDba: SLEEP_NOISE_LIMIT_DBA,
        distanceM: Number(dist.toFixed(2)),
        violates,
      });

      if (violates) {
        acousticViolationCount++;
        const excess = Number((receivedDba - SLEEP_NOISE_LIMIT_DBA).toFixed(1));
        const isSevere = excess >= 6;
        penalty += isSevere ? 12 : 6;
        violations.push({
          id: `acoustic-${src.id}-${tgt.id}`,
          ruleCode: 'NASA-STD-3001-V2-6.6',
          category: 'ACOUSTIC',
          severity: isSevere ? 'CRITICAL' : 'WARNING',
          title: `Acoustic Limit Exceeded: ${src.label} → ${tgt.label}`,
          detail: `Projected sleep-zone noise is ${receivedDba} dBA (+${excess} dBA over ${SLEEP_NOISE_LIMIT_DBA} dBA limit) at ${dist.toFixed(1)}m separation.`,
          metric: `${receivedDba} dBA`,
          affectedZoneIds: [src.id, tgt.id],
          recommendation: `Relocate ${src.label} farther from ${tgt.label} (target ≥ 5.5m for Exercise or ≥ 2.5m for ECLSS/Galley) or separate across decks.`,
        });
      }
    }
  }

  if (acousticViolationCount === 0 && sleepZones.length > 0) {
    violations.push({
      id: 'acoustic-pass',
      ruleCode: 'NASA-STD-3001-V2-6.6',
      category: 'ACOUSTIC',
      severity: 'PASS',
      title: 'Sleep-Zone Acoustic Isolation Verified',
      detail: `All Crew Quarters remain ≤ ${SLEEP_NOISE_LIMIT_DBA} dBA from Exercise, ECLSS, and Galley noise sources.`,
      metric: `≤ ${SLEEP_NOISE_LIMIT_DBA} dBA`,
      affectedZoneIds: [],
      recommendation: 'Acoustic zoning meets NASA sleep hygiene requirements.',
    });
  }

  // 4. Hygiene-to-Galley / Medical Contamination Separation
  const hygieneZones = zones.filter((z) => ZONE_CATALOG[z.type].isContaminationSource);
  const sensitiveZones = zones.filter((z) => ZONE_CATALOG[z.type].isContaminationSensitive);

  let contamViolationCount = 0;
  for (const hyg of hygieneZones) {
    for (const sens of sensitiveZones) {
      const dist = getDistance3D(hyg, sens, deckHeight);
      // Different decks have physical pressure-deck bulkhead separation
      const effectiveDist = hyg.deck !== sens.deck ? Math.max(dist, 3.5) : dist;
      const violates = effectiveDist < HYGIENE_MIN_SEPARATION_M;

      contaminationPairs.push({
        hygieneId: hyg.id,
        hygieneLabel: hyg.label,
        targetId: sens.id,
        targetLabel: sens.label,
        distanceM: Number(dist.toFixed(2)),
        minRequiredM: HYGIENE_MIN_SEPARATION_M,
        violates,
      });

      if (violates) {
        contamViolationCount++;
        const isGalley = sens.type === 'galley';
        penalty += isGalley ? 14 : 7;
        violations.push({
          id: `contam-${hyg.id}-${sens.id}`,
          ruleCode: 'NASA-STD-3001-V2-7.4',
          category: 'CONTAMINATION',
          severity: isGalley ? 'CRITICAL' : 'WARNING',
          title: `Contamination Hazard: ${hyg.label} ↔ ${sens.label}`,
          detail: `Only ${dist.toFixed(1)}m edge separation (minimum ${HYGIENE_MIN_SEPARATION_M.toFixed(1)}m required between waste management and ${isGalley ? 'food preparation' : 'medical care'}).`,
          metric: `${dist.toFixed(1)}m / 3.0m`,
          affectedZoneIds: [hyg.id, sens.id],
          recommendation: `Separate ${hyg.label} and ${sens.label} by at least 3.0m or relocate to opposite ends of the habitat.`,
        });
      }
    }
  }

  if (contamViolationCount === 0 && hygieneZones.length > 0 && sensitiveZones.length > 0) {
    violations.push({
      id: 'contam-pass',
      ruleCode: 'NASA-STD-3001-V2-7.4',
      category: 'CONTAMINATION',
      severity: 'PASS',
      title: 'Hygiene-to-Galley Isolation Verified',
      detail: `All Hygiene/UWMS modules maintain ≥ ${HYGIENE_MIN_SEPARATION_M.toFixed(1)}m clearance from Galley and Medical zones.`,
      metric: '≥ 3.0m',
      affectedZoneIds: [],
      recommendation: 'Bio-contamination zoning is compliant.',
    });
  }

  // 5. Crew Support Ratios (Bunks, Hygiene, Exercise, Stowage, Shelter, Airlock)
  const totalBunks = sleepZones.reduce((acc, z) => acc + estimateBunkCapacity(z), 0);
  if (totalBunks < mission.crewSize) {
    penalty += 14;
    violations.push({
      id: 'support-bunks',
      ruleCode: 'HRP-CREW-201',
      category: 'CREW_SUPPORT',
      severity: 'CRITICAL',
      title: 'Insufficient Crew Sleep Stations',
      detail: `Layout supports ${totalBunks} bunk(s) for a crew of ${mission.crewSize}.`,
      metric: `${totalBunks} / ${mission.crewSize} bunks`,
      affectedZoneIds: sleepZones.map((z) => z.id),
      recommendation: 'Add another Crew Quarters module or enlarge existing quarters.',
    });
  }

  const requiredHygiene = Math.ceil(mission.crewSize / 4);
  if (hygieneZones.length < requiredHygiene) {
    penalty += 8;
    violations.push({
      id: 'support-hygiene',
      ruleCode: 'HRP-CREW-202',
      category: 'CREW_SUPPORT',
      severity: 'WARNING',
      title: 'Hygiene / UWMS Capacity Shortage',
      detail: `Found ${hygieneZones.length} Hygiene module(s); recommended ≥ ${requiredHygiene} for ${mission.crewSize} crew.`,
      metric: `${hygieneZones.length} / ${requiredHygiene}`,
      affectedZoneIds: hygieneZones.map((z) => z.id),
      recommendation: 'Add an additional Hygiene & Waste (UWMS) station.',
    });
  }

  const exerciseZones = zones.filter((z) => z.type === 'exercise');
  if (mission.durationDays > 30 && exerciseZones.length === 0) {
    penalty += 10;
    violations.push({
      id: 'support-exercise',
      ruleCode: 'NASA-STD-3001-V2-10.3',
      category: 'CREW_SUPPORT',
      severity: 'CRITICAL',
      title: 'Missing Exercise Countermeasures Zone',
      detail: `Missions exceeding 30 days (${mission.durationDays}d) require dedicated resistive/aerobic exercise hardware.`,
      metric: '0 Exercise',
      affectedZoneIds: [],
      recommendation: 'Place an Exercise & ARED module far from Crew Quarters.',
    });
  }

  const airlockZones = zones.filter((z) => z.type === 'airlock');
  if (airlockZones.length === 0) {
    penalty += 16;
    violations.push({
      id: 'support-airlock',
      ruleCode: 'NASA-STD-3001-EGRESS-1',
      category: 'EGRESS',
      severity: 'CRITICAL',
      title: 'Missing Airlock / Emergency Egress Hatch',
      detail: 'No Airlock or emergency egress hatch is placed in the habitat.',
      metric: '0 Airlocks',
      affectedZoneIds: [],
      recommendation: 'Add at least one Airlock / Egress Hatch along the hull perimeter.',
    });
  }

  const shelterZones = zones.filter((z) => z.type === 'storm_shelter');
  if (shelterZones.length === 0) {
    penalty += 12;
    violations.push({
      id: 'support-shelter',
      ruleCode: 'NASA-STD-3001-RAD-1',
      category: 'CREW_SUPPORT',
      severity: 'CRITICAL',
      title: 'Missing Radiation Storm Shelter',
      detail: 'Deep-space habitats require a shielded Solar Particle Event (SPE) refuge.',
      metric: '0 Shelters',
      affectedZoneIds: [],
      recommendation: 'Add a Radiation Storm Shelter sized ≥ 1.5 m³/crew.',
    });
  }

  // 6. A* Emergency Egress Pathfinding
  const egress = evaluateEgressAStar(hull, zones);

  const blockedAirlock = egress.airlockPaths.filter((p) => !p.reachable);
  if (airlockZones.length > 0 && blockedAirlock.length > 0) {
    penalty += 18;
    violations.push({
      id: 'egress-airlock-blocked',
      ruleCode: 'NASA-STD-3001-EGRESS-2',
      category: 'EGRESS',
      severity: 'CRITICAL',
      title: `Emergency Egress Blocked (${blockedAirlock.length} Zone${blockedAirlock.length > 1 ? 's' : ''})`,
      detail: `A* pathfinding found no traversable corridor from ${blockedAirlock.map((p) => p.fromLabel).join(', ')} to an Airlock.`,
      metric: 'BLOCKED',
      affectedZoneIds: blockedAirlock.map((p) => p.fromZoneId),
      recommendation: 'Clear obstacles blocking the central corridor to maintain ≥ 1.0m unobstructed passage.',
    });
  }

  const blockedShelter = egress.shelterPaths.filter((p) => !p.reachable);
  if (shelterZones.length > 0 && blockedShelter.length > 0) {
    penalty += 14;
    violations.push({
      id: 'egress-shelter-blocked',
      ruleCode: 'NASA-STD-3001-RAD-2',
      category: 'EGRESS',
      severity: 'CRITICAL',
      title: `Storm Shelter Unreachable (${blockedShelter.length} Zone${blockedShelter.length > 1 ? 's' : ''})`,
      detail: `Crew cannot reach the Radiation Storm Shelter from ${blockedShelter.map((p) => p.fromLabel).join(', ')}.`,
      metric: 'BLOCKED',
      affectedZoneIds: blockedShelter.map((p) => p.fromZoneId),
      recommendation: 'Open a continuous ≥ 1.0m corridor to the Radiation Storm Shelter.',
    });
  }

  if (egress.bottleneckPoints.length > 0 && blockedAirlock.length === 0) {
    penalty += 6;
    violations.push({
      id: 'egress-pinch',
      ruleCode: 'NASA-STD-3001-EGRESS-3',
      category: 'EGRESS',
      severity: 'WARNING',
      title: `${egress.bottleneckPoints.length} Corridor Clearance Pinch-Point(s)`,
      detail: `Egress corridor narrows below 1.0m minimum clearance (min ${Math.min(...egress.bottleneckPoints.map((b) => b.clearanceM)).toFixed(2)}m).`,
      metric: `< 1.0m wide`,
      affectedZoneIds: [],
      recommendation: 'Widen central aisle to at least 1.0m–1.25m for suited crew translation.',
    });
  }

  if (
    airlockZones.length > 0 &&
    blockedAirlock.length === 0 &&
    egress.bottleneckPoints.length === 0
  ) {
    violations.push({
      id: 'egress-pass',
      ruleCode: 'NASA-STD-3001-EGRESS-2',
      category: 'EGRESS',
      severity: 'PASS',
      title: 'A* Emergency Egress Clear',
      detail: `All occupied zones reach an Airlock in ≤ ${egress.worstCaseDistanceM.toFixed(1)}m (${egress.worstCaseTimeSec}s) with ≥ 1.0m clearance.`,
      metric: `${egress.worstCaseDistanceM.toFixed(1)}m max`,
      affectedZoneIds: [],
      recommendation: 'Emergency translation corridors are unobstructed.',
    });
  }

  // Sort diagnostics: CRITICAL -> WARNING -> PASS
  const order = { CRITICAL: 0, WARNING: 1, PASS: 2 };
  violations.sort((a, b) => order[a.severity] - order[b.severity]);

  const criticalCount = violations.filter((v) => v.severity === 'CRITICAL').length;
  const warningCount = violations.filter((v) => v.severity === 'WARNING').length;
  const passCount = violations.filter((v) => v.severity === 'PASS').length;

  const score = Math.max(0, Math.min(100, Math.round(100 - penalty)));
  const computeTimeMs = Number(
    ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0).toFixed(2)
  );

  return {
    score,
    grossVolumeM3: hullMetrics.grossVolumeM3,
    structureVolumeM3: hullMetrics.structureVolumeM3,
    equipmentVolumeM3: hullMetrics.equipmentVolumeM3,
    deadSpaceM3,
    nhvM3,
    nhvPerCrewM3,
    requiredNhvPerCrewM3,
    estimatedMassKg: hullMetrics.estimatedMassKg,
    estimatedLaunchCostM: hullMetrics.estimatedLaunchCostM,
    violations,
    criticalCount,
    warningCount,
    passCount,
    acousticPairs,
    contaminationPairs,
    egress,
    computeTimeMs,
  };
}
