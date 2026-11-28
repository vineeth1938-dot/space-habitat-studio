import {
  AcousticPair,
  AirflowLink,
  ContaminationPair,
  EvaluationReport,
  IlluminanceReport,
  MissionConfig,
  OrientationConflict,
  RuleViolation,
  WaterWallBonus,
  ZoneNode,
} from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';
import {
  computeHullMetrics,
  getDistance3D,
  getEdgeDistance2D,
  getHullBounds,
  getRectOverlapArea,
  isRectInsideHull,
  sanitizeMissionConfig,
} from './hullMath';
import {
  buildDeckGrid,
  cellsToPoints,
  evaluateEgressAStar,
  getZoneDoorCells,
  runAStarMultiSourceTarget,
} from './egressAStar';

export const SLEEP_NOISE_LIMIT_DBA = 50;
export const HYGIENE_MIN_SEPARATION_M = 3.0;
export const CORRIDOR_MIN_ILLUMINANCE_LUX = 108; // NASA-STD-3001 Table 8.7-1
export const CO2_MAX_DUCT_DISTANCE_M = 8.0; // ISS IMV supply ventilation effective span

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
 * Evaluates TransHab Water-Wall & Stowage adjunct radiation shielding bonus ([V2 6095] / [V2 6161]).
 */
function evaluateWaterWallShielding(zones: ZoneNode[]): WaterWallBonus {
  const coreTargets = zones.filter(
    (z) => z.type === 'storm_shelter' || z.type === 'crew_quarters'
  );
  const massShields = zones.filter((z) => z.type === 'stowage' || z.type === 'eclss');

  if (coreTargets.length === 0 || massShields.length === 0) {
    return {
      shieldingBonusGcm2: 0,
      bufferedPerimeterRatio: 0,
      contributingZoneIds: [],
      doseSavedPct: 0,
    };
  }

  let totalSamples = 0;
  let bufferedSamples = 0;
  const contributors = new Set<string>();

  for (const tgt of coreTargets) {
    const sameDeckMass = massShields.filter((m) => m.deck === tgt.deck && m.id !== tgt.id);
    const stepsX = Math.max(2, Math.round(tgt.width / 0.5));
    const stepsY = Math.max(2, Math.round(tgt.height / 0.5));
    const pts: Array<[number, number]> = [];
    for (let i = 0; i < stepsX; i++) {
      const px = tgt.x + ((i + 0.5) / stepsX) * tgt.width;
      pts.push([px, tgt.y], [px, tgt.y + tgt.height]);
    }
    for (let j = 0; j < stepsY; j++) {
      const py = tgt.y + ((j + 0.5) / stepsY) * tgt.height;
      pts.push([tgt.x, py], [tgt.x + tgt.width, py]);
    }

    for (const [px, py] of pts) {
      totalSamples++;
      let hit = false;
      for (const shield of sameDeckMass) {
        const dx = Math.max(0, Math.max(shield.x - px, px - (shield.x + shield.width)));
        const dy = Math.max(0, Math.max(shield.y - py, py - (shield.y + shield.height)));
        if (Math.hypot(dx, dy) <= 1.25) {
          hit = true;
          contributors.add(shield.id);
        }
      }
      if (hit) bufferedSamples++;
    }
  }

  const ratio = totalSamples > 0 ? bufferedSamples / totalSamples : 0;
  const shieldingBonusGcm2 = Number(Math.min(9.5, ratio * 15.0).toFixed(1));
  const doseSavedPct = Math.round((1 - Math.exp(-shieldingBonusGcm2 / 14.5)) * 100);

  return {
    shieldingBonusGcm2,
    bufferedPerimeterRatio: Number(ratio.toFixed(2)),
    contributingZoneIds: Array.from(contributors),
    doseSavedPct,
  };
}

/**
 * Evaluates ISS CO2 Pocket & Inter-Module Ventilation (IMV) Airflow (NASA-STD-3001 ppCO2).
 */
function evaluateVentilationAirflow(
  mission: MissionConfig,
  zones: ZoneNode[]
): { links: AirflowLink[]; stagnantZoneIds: string[] } {
  const { hull } = mission;
  const eclssZones = zones.filter((z) => z.type === 'eclss');
  const occupiedZones = zones.filter((z) => ZONE_CATALOG[z.type]?.isOccupied);

  const links: AirflowLink[] = [];
  const stagnantSet = new Set<string>();

  for (let d = 0; d < Math.max(1, hull.decks); d++) {
    const deckZones = zones.filter((z) => z.deck === d);
    const grid = buildDeckGrid(hull, deckZones);
    const deckEclss = eclssZones.filter((e) => e.deck === d);
    const fallbackEclss = deckEclss[0] ?? eclssZones[0] ?? null;

    for (const occ of occupiedZones.filter((z) => z.deck === d)) {
      const occDoors = getZoneDoorCells(grid, occ);
      const openDoorCells = occDoors.length;

      if (!fallbackEclss) {
        if (occ.type === 'crew_quarters') stagnantSet.add(occ.id);
        continue;
      }

      if (fallbackEclss.deck === d) {
        const eclssDoors = getZoneDoorCells(grid, fallbackEclss);
        const aStar = runAStarMultiSourceTarget(grid, eclssDoors, occDoors);
        const distM = aStar.found
          ? aStar.distanceM
          : Number((getEdgeDistance2D(fallbackEclss, occ) + 2.0).toFixed(2));
        // Stagnant CO2 pocket if Crew Quarters is boxed into a dead-end (<=3 open 0.25m door cells)
        // OR IMV duct/corridor distance exceeds 8.0m without local air revitalization
        const stagnantRisk =
          occ.type === 'crew_quarters' &&
          (!aStar.found || openDoorCells <= 3 || distM > CO2_MAX_DUCT_DISTANCE_M);

        if (stagnantRisk) stagnantSet.add(occ.id);

        links.push({
          fromEclssId: fallbackEclss.id,
          toZoneId: occ.id,
          toLabel: occ.label,
          deck: d,
          distanceM: distM,
          openDoorCells,
          stagnantRisk,
          points: aStar.found
            ? cellsToPoints(aStar.pathCells, grid.cols, fallbackEclss, occ)
            : [
                {
                  x: Number((fallbackEclss.x + fallbackEclss.width / 2).toFixed(2)),
                  y: Number((fallbackEclss.y + fallbackEclss.height / 2).toFixed(2)),
                },
                {
                  x: Number((occ.x + occ.width / 2).toFixed(2)),
                  y: Number((occ.y + occ.height / 2).toFixed(2)),
                },
              ],
        });
      } else {
        // Cross-deck IMV jumper ducting (+3.5m equivalent resistance)
        const distM = Number((getDistance3D(fallbackEclss, occ, 2.4) + 2.0).toFixed(2));
        const stagnantRisk =
          occ.type === 'crew_quarters' && (openDoorCells <= 3 || distM > CO2_MAX_DUCT_DISTANCE_M + 1.5);
        if (stagnantRisk) stagnantSet.add(occ.id);

        links.push({
          fromEclssId: fallbackEclss.id,
          toZoneId: occ.id,
          toLabel: occ.label,
          deck: d,
          distanceM: distM,
          openDoorCells,
          stagnantRisk,
          points: [
            { x: Number((hull.length / 2).toFixed(2)), y: Number((hull.diameter / 2).toFixed(2)) },
            {
              x: Number((occ.x + occ.width / 2).toFixed(2)),
              y: Number((occ.y + occ.height / 2).toFixed(2)),
            },
          ],
        });
      }
    }
  }

  return { links, stagnantZoneIds: Array.from(stagnantSet) };
}

/**
 * Evaluates NASA-STD-3001 Table 8.7-1 Illuminance (>=108 lux translation/stowage) & Circadian Light-Spill.
 */
function evaluateIlluminance(zones: ZoneNode[]): IlluminanceReport {
  const sleepZones = zones.filter((z) => z.type === 'crew_quarters');
  const brightZones = zones.filter((z) => z.type === 'galley' || z.type === 'medical');
  const stowageZones = zones.filter((z) => z.type === 'stowage');

  const lightSpillSet = new Set<string>();
  for (const slp of sleepZones) {
    for (const br of brightZones) {
      if (slp.deck === br.deck && getEdgeDistance2D(slp, br) < 1.25) {
        lightSpillSet.add(slp.id);
        lightSpillSet.add(br.id);
      }
    }
  }

  // Check if any stowage module is isolated (>6.5m from all bright/occupied lit bays -> <108 lux)
  const litBays = zones.filter((z) => ZONE_CATALOG[z.type]?.illuminanceLux >= 180);
  const underlitIds: string[] = [];
  let minCorridorLux = zones.length === 0 ? 0 : 145;

  for (const st of stowageZones) {
    const sameDeckLit = litBays.filter((b) => b.deck === st.deck);
    if (sameDeckLit.length === 0) {
      underlitIds.push(st.id);
      minCorridorLux = Math.min(minCorridorLux, 78);
    } else {
      const nearest = Math.min(...sameDeckLit.map((b) => getEdgeDistance2D(st, b)));
      const estLux = Math.round(210 / (1 + nearest * 0.18));
      minCorridorLux = Math.min(minCorridorLux, estLux);
      if (estLux < CORRIDOR_MIN_ILLUMINANCE_LUX) {
        underlitIds.push(st.id);
      }
    }
  }

  return {
    minCorridorLux,
    targetCorridorLux: CORRIDOR_MIN_ILLUMINANCE_LUX,
    lightSpillZoneIds: Array.from(lightSpillSet),
    underlitZoneIds: underlitIds,
  };
}

/**
 * Deterministic NASA-STD-3001 & Historical Aerospace Heritage Rule Engine.
 * Executes synchronously in <16ms on every layout or mission change.
 */
export function evaluateHabitat(rawMission: MissionConfig, zones: ZoneNode[]): EvaluationReport {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const mission = sanitizeMissionConfig(rawMission);
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
    if (z.deck < 0 || z.deck >= hull.decks || !isRectInsideHull(z.x, z.y, z.width, z.height, hull)) {
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
  const sleepZones = zones.filter((z) => ZONE_CATALOG[z.type]?.isQuietZone);
  const noisyZones = zones.filter((z) => ZONE_CATALOG[z.type]?.noiseEmitDba >= 60);

  let acousticViolationCount = 0;
  for (const src of noisyZones) {
    const srcDba = ZONE_CATALOG[src.type].noiseEmitDba;
    for (const tgt of sleepZones) {
      const dist = getDistance3D(src, tgt, deckHeight);
      const dEff = Math.max(0.8, dist + 0.5);
      const bulkheadAtten = src.deck !== tgt.deck ? 14 : dist >= 0.75 ? 8 : 3;
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
  const hygieneZones = zones.filter((z) => ZONE_CATALOG[z.type]?.isContaminationSource);
  const sensitiveZones = zones.filter((z) => ZONE_CATALOG[z.type]?.isContaminationSensitive);

  let contamViolationCount = 0;
  for (const hyg of hygieneZones) {
    for (const sens of sensitiveZones) {
      const dist = getDistance3D(hyg, sens, deckHeight);
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

  // 5. Crew Support Ratios
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
      metric: '< 1.0m wide',
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

  // 7. ISS & Skylab Local-Vertical Orientation Check (NASA-STD-3001 [V2 8011])
  const orientationConflicts: OrientationConflict[] = [];
  if (mission.gravity === '0g') {
    const occupied = zones.filter((z) => ZONE_CATALOG[z.type]?.isOccupied);
    for (let i = 0; i < occupied.length; i++) {
      for (let j = i + 1; j < occupied.length; j++) {
        const a = occupied[i];
        const b = occupied[j];
        if (a.deck !== b.deck) continue;
        if (getEdgeDistance2D(a, b) > 3.5) continue;
        const rawDiff = Math.abs(a.rotation - b.rotation) % 360;
        const deltaDeg = rawDiff > 180 ? 360 - rawDiff : rawDiff;
        if (deltaDeg >= 45) {
          orientationConflicts.push({
            zoneAId: a.id,
            zoneALabel: a.label,
            zoneBId: b.id,
            zoneBLabel: b.label,
            deltaDeg,
          });
        }
      }
    }

    if (orientationConflicts.length > 0) {
      penalty += 5;
      const conflictIds = Array.from(
        new Set(orientationConflicts.flatMap((c) => [c.zoneAId, c.zoneBId]))
      );
      violations.push({
        id: 'orient-0g-mismatch',
        ruleCode: 'NASA-STD-3001-V2-8011',
        category: 'ORIENTATION',
        severity: 'WARNING',
        title: `0g Local-Vertical Mismatch (${orientationConflicts.length} Pair${orientationConflicts.length > 1 ? 's' : ''})`,
        detail: `Adjacent workstations (${orientationConflicts[0].zoneALabel} & ${orientationConflicts[0].zoneBLabel}) differ by ${orientationConflicts[0].deltaDeg}° in microgravity, risking Skylab/ISS crew spatial disorientation.`,
        metric: `${orientationConflicts[0].deltaDeg}° skew`,
        affectedZoneIds: conflictIds,
        recommendation:
          'Rotate misaligned modules (press [R]) to maintain consistent 0° nadir/zenith visual orientation across the deck.',
      });
    } else if (occupied.length >= 2) {
      violations.push({
        id: 'orient-0g-pass',
        ruleCode: 'NASA-STD-3001-V2-8011',
        category: 'ORIENTATION',
        severity: 'PASS',
        title: 'ISS / Skylab Local-Vertical Reference Aligned',
        detail: 'All adjacent 0g workstations share a consistent local-vertical reference plane.',
        metric: '0° skew',
        affectedZoneIds: [],
        recommendation: 'Microgravity visual cues are consistent.',
      });
    }
  }

  // 8. ISS CO2 Pocket & Ventilation Airflow Check (NASA-STD-3001 ppCO2)
  const eclssZones = zones.filter((z) => z.type === 'eclss');
  const { links: airflowLinks, stagnantZoneIds } = evaluateVentilationAirflow(mission, zones);

  if (sleepZones.length > 0 && eclssZones.length === 0) {
    penalty += 12;
    violations.push({
      id: 'airflow-no-eclss',
      ruleCode: 'NASA-STD-3001-V2-6.2',
      category: 'AIRFLOW',
      severity: 'CRITICAL',
      title: 'Missing ECLSS / IMV Ventilation Source (CO₂ Hazard)',
      detail:
        'No ECLSS & Water Tanks module is installed to scrub CO₂ and drive Inter-Module Ventilation into Crew Quarters.',
      metric: 'ppCO₂ > 4 mmHg',
      affectedZoneIds: sleepZones.map((z) => z.id),
      recommendation: 'Add an ECLSS & Water Tanks module within 2.5m–7.5m of Crew Quarters.',
    });
  } else if (stagnantZoneIds.length > 0) {
    penalty += 6;
    violations.push({
      id: 'airflow-co2-pocket',
      ruleCode: 'NASA-STD-3001-V2-6.2',
      category: 'AIRFLOW',
      severity: 'WARNING',
      title: `CO₂ Pocket / Stagnant Sleep Ventilation (${stagnantZoneIds.length} Bay${stagnantZoneIds.length > 1 ? 's' : ''})`,
      detail:
        'Crew Quarters are either >8.0m from ECLSS IMV ducting or boxed into a dead-end alcove with restricted air exchange.',
      metric: 'Low IMV Flow',
      affectedZoneIds: stagnantZoneIds,
      recommendation:
        'Position ECLSS within 2.5m–7.5m of Crew Quarters and keep ≥1.0m corridor airflow frontage open.',
    });
  } else if (sleepZones.length > 0 && eclssZones.length > 0) {
    violations.push({
      id: 'airflow-pass',
      ruleCode: 'NASA-STD-3001-V2-6.2',
      category: 'AIRFLOW',
      severity: 'PASS',
      title: 'IMV Ventilation & CO₂ Scrubbing Loop Nominal',
      detail: 'All Crew Quarters receive active ECLSS Inter-Module Ventilation without dead-end CO₂ pockets.',
      metric: 'ppCO₂ < 2.5 mmHg',
      affectedZoneIds: [],
      recommendation: 'Ventilation airflow meets ISS crew sleep limits.',
    });
  }

  // 9. Circadian Lighting & Illuminance Check (NASA-STD-3001 Table 8.7-1)
  const illuminance = evaluateIlluminance(zones);
  if (illuminance.lightSpillZoneIds.length > 0) {
    penalty += 5;
    violations.push({
      id: 'light-circadian-spill',
      ruleCode: 'NASA-STD-3001-T8.7-1',
      category: 'LIGHTING',
      severity: 'WARNING',
      title: 'Circadian Light-Spill into Crew Quarters',
      detail:
        'High-illuminance Galley (350 lux) or Medical Lab (500 lux) sits <1.25m from Crew Quarters, risking melatonin suppression.',
      metric: '> 40 lux spill',
      affectedZoneIds: illuminance.lightSpillZoneIds,
      recommendation:
        'Separate Crew Quarters from bright Galley/Lab bays by ≥1.5m or buffer with Stowage/Storm Shelter.',
    });
  } else if (illuminance.underlitZoneIds.length > 0) {
    penalty += 4;
    violations.push({
      id: 'light-corridor-low',
      ruleCode: 'NASA-STD-3001-T8.7-1',
      category: 'LIGHTING',
      severity: 'WARNING',
      title: 'Isolated Stowage Below 108 Lux Illuminance',
      detail: `Minimum translation/stowage illuminance (${illuminance.minCorridorLux} lux) falls below the 108 lux NASA-STD-3001 Table 8.7-1 threshold.`,
      metric: `${illuminance.minCorridorLux} / 108 lux`,
      affectedZoneIds: illuminance.underlitZoneIds,
      recommendation: 'Move isolated stowage closer to lit habitable bays.',
    });
  } else if (zones.length > 0) {
    violations.push({
      id: 'light-pass',
      ruleCode: 'NASA-STD-3001-T8.7-1',
      category: 'LIGHTING',
      severity: 'PASS',
      title: 'Circadian Isolation & ≥108 Lux Illuminance Verified',
      detail: `Corridor/stowage lighting (${illuminance.minCorridorLux} lux) exceeds 108 lux with zero sleep-bay light-spill.`,
      metric: `${illuminance.minCorridorLux} lux`,
      affectedZoneIds: [],
      recommendation: 'Lighting layout supports crew circadian entrainment.',
    });
  }

  // 10. TransHab Water-Wall & Stowage Radiation Shielding Bonus ([V2 6095] / [V2 6161])
  const waterWall = evaluateWaterWallShielding(zones);
  if (waterWall.shieldingBonusGcm2 >= 2.0) {
    // Reward parasitic mass shielding by offsetting up to 4 points of minor warnings
    penalty = Math.max(0, penalty - 4);
    violations.push({
      id: 'rad-waterwall-bonus',
      ruleCode: 'NASA-STD-3001-V2-6095',
      category: 'RADIATION',
      severity: 'PASS',
      title: 'TransHab Water-Wall Mass Shielding Bonus Active',
      detail: `Adjacent Stowage/ECLSS water mass adds +${waterWall.shieldingBonusGcm2} g/cm² areal density (~${waterWall.doseSavedPct}% extra SPE dose reduction).`,
      metric: `+${waterWall.shieldingBonusGcm2} g/cm²`,
      affectedZoneIds: waterWall.contributingZoneIds,
      recommendation: 'Optimal parasitic mass utilization around crew refuge.',
    });
  }

  const order = { CRITICAL: 0, WARNING: 1, PASS: 2 };
  violations.sort((a, b) => order[a.severity] - order[b.severity]);

  const criticalCount = violations.filter((v) => v.severity === 'CRITICAL').length;
  const warningCount = violations.filter((v) => v.severity === 'WARNING').length;
  const passCount = violations.filter((v) => v.severity === 'PASS').length;

  const rawScore =
    penalty <= 45 ? 100 - penalty : 55 * Math.exp(-(penalty - 45) / 65);
  const score =
    zones.length === 0 ? 0 : Math.max(5, Math.min(100, Math.round(rawScore)));
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
    airflowLinks,
    stagnantZoneIds,
    orientationConflicts,
    waterWall,
    illuminance,
    computeTimeMs,
  };
}
