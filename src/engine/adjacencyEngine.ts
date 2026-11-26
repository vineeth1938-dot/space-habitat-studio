import {
  GRID_STEP_M,
  ISRO_ECLSS_MAINTENANCE_CORRIDOR_M,
  ISRO_MIN_EXERCISE_FOOTPRINT_M2,
  NASA_DUAL_HYGIENE_CREW,
  NASA_DUAL_HYGIENE_DAYS,
  NASA_HYGIENE_SEPARATION_M,
  SPACEX_MAX_PACKING_EFFICIENCY_PCT,
  SPACEX_MIN_PACKING_EFFICIENCY_PCT,
  SPACEX_MIN_SHIELD_PERIMETER_RATIO,
  SPACEX_SHIELD_BUFFER_RANGE_M,
} from './constants';
import {
  edgeDistance2D,
  isModuleInHull,
  isPointInHull,
  overlapArea2D,
  safeDiv,
  sanitizeMission,
  usableFloorAreaPerDeckM2,
} from './geometry';
import { AdjacencyMetrics, MissionConfig, ValidationIssue, ZoneModule } from '../types/habitat';

/**
 * Computes fraction [0..1] of Sleep module perimeter segments buffered within 1.0m
 * by Storage/Water modules on the same deck (SpaceX SPE Storm Shelter Mass Buffering).
 */
function computeSleepShieldRatio(sleepMods: ZoneModule[], storageMods: ZoneModule[]): number {
  if (sleepMods.length === 0) return 0;
  let totalSamples = 0;
  let shieldedSamples = 0;

  for (const slp of sleepMods) {
    const sameDeckStorage = storageMods.filter((s) => s.deck === slp.deck);
    const stepsX = Math.max(1, Math.round(slp.w / GRID_STEP_M));
    const stepsY = Math.max(1, Math.round(slp.h / GRID_STEP_M));

    const samplePts: Array<[number, number]> = [];
    for (let i = 0; i < stepsX; i++) {
      const sx = slp.x + (i + 0.5) * GRID_STEP_M;
      samplePts.push([sx, slp.y]); // top edge
      samplePts.push([sx, slp.y + slp.h]); // bottom edge
    }
    for (let j = 0; j < stepsY; j++) {
      const sy = slp.y + (j + 0.5) * GRID_STEP_M;
      samplePts.push([slp.x, sy]); // left edge
      samplePts.push([slp.x + slp.w, sy]); // right edge
    }

    for (const [px, py] of samplePts) {
      totalSamples++;
      const buffered = sameDeckStorage.some((sto) => {
        const dx = Math.max(0, Math.max(sto.x - px, px - (sto.x + sto.w)));
        const dy = Math.max(0, Math.max(sto.y - py, py - (sto.y + sto.h)));
        return Math.hypot(dx, dy) <= SPACEX_SHIELD_BUFFER_RANGE_M + 1e-4;
      });
      if (buffered) shieldedSamples++;
    }
  }

  return safeDiv(shieldedSamples, totalSamples, 0);
}

/**
 * Evaluates ISRO ECLSS >= 1.0m unobstructed maintenance access corridor & trapped dead-space grid pockets.
 */
function analyzeGridServiceAndPockets(mission: MissionConfig, modules: ZoneModule[]) {
  const { hull } = mission;
  const cols = Math.max(1, Math.round(hull.widthM / GRID_STEP_M));
  const rows = Math.max(1, Math.round(hull.depthM / GRID_STEP_M));

  let minEclssClearanceM = 0;
  let eclssBlocksTransit = false;
  let trappedDeadPocketCells = 0;

  const eclssMods = modules.filter((m) => m.type === 'eclss');
  if (eclssMods.length > 0) {
    minEclssClearanceM = Infinity;
  }

  for (let d = 0; d < hull.decks; d++) {
    const deckMods = modules.filter((m) => m.deck === d);
    const total = cols * rows;
    const blocked = new Uint8Array(total);
    let openCellCount = 0;

    for (let r = 0; r < rows; r++) {
      const cy = (r + 0.5) * GRID_STEP_M;
      for (let c = 0; c < cols; c++) {
        const cx = (c + 0.5) * GRID_STEP_M;
        if (!isPointInHull(cx, cy, hull)) {
          blocked[r * cols + c] = 1;
        }
      }
    }

    for (const m of deckMods) {
      const c0 = Math.max(0, Math.floor((m.x + 0.01) / GRID_STEP_M));
      const c1 = Math.min(cols - 1, Math.floor((m.x + m.w - 0.01) / GRID_STEP_M));
      const r0 = Math.max(0, Math.floor((m.y + 0.01) / GRID_STEP_M));
      const r1 = Math.min(rows - 1, Math.floor((m.y + m.h - 0.01) / GRID_STEP_M));
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          blocked[r * cols + c] = 1;
        }
      }
    }

    for (let i = 0; i < total; i++) {
      if (blocked[i] === 0) openCellCount++;
    }

    // Flood-fill connected components of open cells to detect trapped unreachable dead pockets
    if (openCellCount > 0) {
      const visited = new Uint8Array(total);
      const compSizes: number[] = [];
      const queue = new Int32Array(total);

      for (let i = 0; i < total; i++) {
        if (blocked[i] === 1 || visited[i] === 1) continue;
        let head = 0;
        let tail = 0;
        queue[tail++] = i;
        visited[i] = 1;
        let size = 0;
        while (head < tail) {
          const cur = queue[head++];
          size++;
          const cr = Math.floor(cur / cols);
          const cc = cur % cols;
          const nbrs = [
            [cr + 1, cc],
            [cr - 1, cc],
            [cr, cc + 1],
            [cr, cc - 1],
          ];
          for (const [nr, nc] of nbrs) {
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            const nIdx = nr * cols + nc;
            if (blocked[nIdx] === 0 && visited[nIdx] === 0) {
              visited[nIdx] = 1;
              queue[tail++] = nIdx;
            }
          }
        }
        compSizes.push(size);
      }

      if (compSizes.length > 1) {
        const largest = Math.max(...compSizes);
        trappedDeadPocketCells += openCellCount - largest;
      }
    }

    // Check ECLSS maintenance clearance along best accessible face on this deck
    for (const ecl of deckMods.filter((m) => m.type === 'eclss')) {
      const c0 = Math.floor((ecl.x + 0.01) / GRID_STEP_M);
      const c1 = Math.floor((ecl.x + ecl.w - 0.01) / GRID_STEP_M);
      const r0 = Math.floor((ecl.y + 0.01) / GRID_STEP_M);
      const r1 = Math.floor((ecl.y + ecl.h - 0.01) / GRID_STEP_M);

      // Measure orthogonal free depth on Top, Bottom, Left, Right faces
      const measureFaceDepth = (
        cellsAlongFace: Array<[number, number]>,
        dr: number,
        dc: number
      ): number => {
        if (cellsAlongFace.length === 0) return 0;
        let validCols = 0;
        let minDepthCells = Infinity;
        for (const [sr, sc] of cellsAlongFace) {
          let dCells = 0;
          let rr = sr + dr;
          let cc = sc + dc;
          while (
            rr >= 0 &&
            rr < rows &&
            cc >= 0 &&
            cc < cols &&
            blocked[rr * cols + cc] === 0 &&
            dCells < 6
          ) {
            dCells++;
            rr += dr;
            cc += dc;
          }
          if (dCells > 0) {
            validCols++;
            if (dCells < minDepthCells) minDepthCells = dCells;
          } else {
            minDepthCells = 0;
          }
        }
        if (validCols < Math.min(2, cellsAlongFace.length)) return 0;
        return (Number.isFinite(minDepthCells) ? minDepthCells : 0) * GRID_STEP_M;
      };

      const topFace: Array<[number, number]> = [];
      const botFace: Array<[number, number]> = [];
      for (let c = c0; c <= c1; c++) {
        topFace.push([r0, c]);
        botFace.push([r1, c]);
      }
      const leftFace: Array<[number, number]> = [];
      const rightFace: Array<[number, number]> = [];
      for (let r = r0; r <= r1; r++) {
        leftFace.push([r, c0]);
        rightFace.push([r, c1]);
      }

      const bestFaceClearance = Math.max(
        measureFaceDepth(topFace, -1, 0),
        measureFaceDepth(botFace, 1, 0),
        measureFaceDepth(leftFace, 0, -1),
        measureFaceDepth(rightFace, 0, 1)
      );

      if (bestFaceClearance < minEclssClearanceM) {
        minEclssClearanceM = bestFaceClearance;
      }

      // Check if ECLSS sits right in the middle of the hull choking transit on both sides (<1.0m)
      const topClear = measureFaceDepth(topFace, -1, 0);
      const botClear = measureFaceDepth(botFace, 1, 0);
      if (
        ecl.y > 0.5 &&
        ecl.y + ecl.h < hull.depthM - 0.5 &&
        topClear < 1.0 &&
        botClear < 1.0
      ) {
        eclssBlocksTransit = true;
      }
    }
  }

  if (!Number.isFinite(minEclssClearanceM)) {
    minEclssClearanceM = 0;
  }

  return { minEclssClearanceM, eclssBlocksTransit, trappedDeadPocketCells };
}

/**
 * Multi-Agency Spatial Adjacency, Serviceability & Radiation Mass Buffering Engine.
 */
export function evaluateAdjacency(
  rawMission: MissionConfig,
  modules: ZoneModule[]
): { metrics: AdjacencyMetrics; issues: ValidationIssue[] } {
  const mission = sanitizeMission(rawMission);
  const { hull, crewSize, durationDays, standard, solarFlareSim } = mission;
  const issues: ValidationIssue[] = [];

  // 1. Out-of-bounds & Module Overlaps (Hard Geometry Invariants)
  const outOfBoundsIds = modules.filter((m) => !isModuleInHull(m, hull)).map((m) => m.id);
  if (outOfBoundsIds.length > 0) {
    issues.push({
      id: 'adj-oob',
      code: 'CAD-GEOM-01',
      agency: 'NASA',
      severity: 'FAIL',
      category: 'adjacency',
      title: `${outOfBoundsIds.length} Module(s) Outside Hull Envelope`,
      detail: 'Modules extend beyond the pressurized hull wall or dome curvature.',
      action: 'Drag highlighted modules inside the hull contour or click AUTO-OPTIMIZE LAYOUT.',
      metric: `${outOfBoundsIds.length} OOB`,
      moduleIds: outOfBoundsIds,
    });
  }

  const overlappingPairs: Array<[string, string]> = [];
  const overlapSet = new Set<string>();
  for (let i = 0; i < modules.length; i++) {
    for (let j = i + 1; j < modules.length; j++) {
      if (overlapArea2D(modules[i], modules[j]) > 0.01) {
        overlappingPairs.push([modules[i].id, modules[j].id]);
        overlapSet.add(modules[i].id);
        overlapSet.add(modules[j].id);
      }
    }
  }
  if (overlappingPairs.length > 0) {
    issues.push({
      id: 'adj-overlap',
      code: 'CAD-GEOM-02',
      agency: 'NASA',
      severity: 'FAIL',
      category: 'adjacency',
      title: `${overlappingPairs.length} Overlapping Zone Collision(s)`,
      detail: 'Solid interior functional bays intersect on the same deck.',
      action: 'Separate colliding modules on the 0.5m grid or click AUTO-OPTIMIZE LAYOUT.',
      metric: `${overlappingPairs.length} Collisions`,
      moduleIds: Array.from(overlapSet),
    });
  }

  // 2. NASA Hygiene Isolation & Dual-Hygiene Redundancy
  const hygieneMods = modules.filter((m) => m.type === 'hygiene');
  const galleyMods = modules.filter((m) => m.type === 'galley');
  const sleepMods = modules.filter((m) => m.type === 'sleep');
  const medicalMods = modules.filter((m) => m.type === 'medical');
  const exerciseMods = modules.filter((m) => m.type === 'exercise');
  const airlockMods = modules.filter((m) => m.type === 'airlock');
  const eclssMods = modules.filter((m) => m.type === 'eclss');
  const storageMods = modules.filter((m) => m.type === 'storage');

  const odorViolators = new Set<string>();
  for (const hyg of hygieneMods) {
    for (const sens of [...galleyMods, ...sleepMods]) {
      if (hyg.deck !== sens.deck) continue;
      const dist = edgeDistance2D(hyg, sens);
      if (dist < NASA_HYGIENE_SEPARATION_M - 1e-4) {
        odorViolators.add(hyg.id);
        odorViolators.add(sens.id);
      }
    }
  }

  if (odorViolators.size > 0) {
    issues.push({
      id: 'adj-nasa-odor',
      code: 'NASA-3001-V2-7041',
      agency: 'NASA',
      severity: 'FAIL',
      category: 'adjacency',
      title: 'Hygiene/Waste Adjacent to Galley or Sleep',
      detail: `Hygiene bay is within ${NASA_HYGIENE_SEPARATION_M}m of Food/Galley or Sleep Quarters (microbial & olfactory hazard).`,
      action: `Maintain >= ${NASA_HYGIENE_SEPARATION_M}m separation between Hygiene and Galley/Sleep.`,
      metric: `< ${NASA_HYGIENE_SEPARATION_M}m`,
      moduleIds: Array.from(odorViolators),
    });
  }

  const requiredHygieneCount =
    crewSize >= NASA_DUAL_HYGIENE_CREW && durationDays >= NASA_DUAL_HYGIENE_DAYS ? 2 : 1;

  // Verify separated hygiene when >= 2 required
  let separatedHygieneOk = hygieneMods.length >= requiredHygieneCount;
  if (requiredHygieneCount >= 2 && hygieneMods.length >= 2) {
    let foundSeparatedPair = false;
    for (let i = 0; i < hygieneMods.length; i++) {
      for (let j = i + 1; j < hygieneMods.length; j++) {
        if (
          hygieneMods[i].deck !== hygieneMods[j].deck ||
          edgeDistance2D(hygieneMods[i], hygieneMods[j]) >= 1.0
        ) {
          foundSeparatedPair = true;
        }
      }
    }
    separatedHygieneOk = foundSeparatedPair;
  }

  if (!separatedHygieneOk && (standard === 'NASA' || standard === 'UNIFIED')) {
    issues.push({
      id: 'adj-nasa-dual-hyg',
      code: 'NASA-3001-V2-7042',
      agency: 'NASA',
      severity: hygieneMods.length === 0 ? 'FAIL' : 'WARN',
      category: 'adjacency',
      title: `Requires >= ${requiredHygieneCount} Separated Hygiene Bays`,
      detail: `Crew of ${crewSize} over ${durationDays}d requires ${requiredHygieneCount} spatially separated UWMS hygiene enclosures.`,
      action:
        hygieneMods.length < requiredHygieneCount
          ? `Add ${requiredHygieneCount - hygieneMods.length} more Hygiene module(s).`
          : 'Separate the two Hygiene bays by >= 1.0m for fault isolation.',
      metric: `${hygieneMods.length} / ${requiredHygieneCount} HYG`,
      moduleIds: hygieneMods.map((m) => m.id),
    });
  } else if (hygieneMods.length === 0) {
    issues.push({
      id: 'adj-hyg-missing',
      code: 'NASA-3001-V2-7042',
      agency: 'NASA',
      severity: 'FAIL',
      category: 'adjacency',
      title: 'Missing Hygiene / Waste Station',
      detail: 'No Hygiene/UWMS module placed in habitat.',
      action: 'Add a Hygiene / Waste zone away from Galley and Sleep.',
      metric: '0 HYG',
      moduleIds: [],
    });
  }

  // NASA Medical Clinical Proximity Bonus (near Exercise and Airlock)
  const medicalConnectedBonus =
    medicalMods.length > 0 &&
    exerciseMods.length > 0 &&
    airlockMods.length > 0 &&
    medicalMods.some(
      (med) =>
        exerciseMods.some((ex) => ex.deck === med.deck && edgeDistance2D(med, ex) <= 4.0) &&
        airlockMods.some((air) => air.deck === med.deck && edgeDistance2D(med, air) <= 4.0)
    );

  if (medicalConnectedBonus && (standard === 'NASA' || standard === 'UNIFIED')) {
    issues.push({
      id: 'adj-med-bonus',
      code: 'NASA-HRP-MED-04',
      agency: 'NASA',
      severity: 'PASS',
      category: 'adjacency',
      title: 'Medical Trauma Triage Adjacency Bonus',
      detail: 'Medical Bay has direct rapid corridor proximity to both Exercise and EVA Airlock.',
      action: 'Optimal trauma/EVA contingency layout.',
      metric: '+BONUS',
      moduleIds: medicalMods.map((m) => m.id),
    });
  }

  // 3. ISRO BAS / Gaganyaan Standards (ECLSS >=1.0m Serviceability & Exercise >=3.5m²)
  const { minEclssClearanceM, eclssBlocksTransit, trappedDeadPocketCells } =
    analyzeGridServiceAndPockets(mission, modules);

  const checkIsro = standard === 'ISRO' || standard === 'UNIFIED';
  if (eclssMods.length === 0) {
    issues.push({
      id: 'adj-isro-no-eclss',
      code: 'ISRO-BAS-ECL-01',
      agency: 'ISRO',
      severity: checkIsro ? 'FAIL' : 'WARN',
      category: 'adjacency',
      title: 'Missing Dedicated Work / ECLSS Bay',
      detail: 'ISRO BAS/Gaganyaan requires a dedicated Work/ECLSS zone for regenerative CO2/O2 & thermal racks.',
      action: 'Place a Work / ECLSS module along a hull wall with >= 1.0m aisle clearance.',
      metric: '0 ECLSS',
      moduleIds: [],
    });
  } else if (checkIsro) {
    if (minEclssClearanceM < ISRO_ECLSS_MAINTENANCE_CORRIDOR_M - 1e-4 || eclssBlocksTransit) {
      issues.push({
        id: 'adj-isro-eclss-aisle',
        code: 'ISRO-BAS-ECL-01',
        agency: 'ISRO',
        severity: 'FAIL',
        category: 'adjacency',
        title: 'Insufficient ISRO ECLSS Maintenance Clearance (<1.0m)',
        detail: eclssBlocksTransit
          ? 'Work/ECLSS bay obstructs primary central crew transit.'
          : `Work/ECLSS access corridor is ${minEclssClearanceM.toFixed(1)}m; requires >= 1.0m unobstructed LRU service bay.`,
        action: 'Place Work/ECLSS flush against an outer wall with at least 1.0m (2 grid squares) open corridor in front.',
        metric: `${minEclssClearanceM.toFixed(1)} / 1.0m`,
        moduleIds: eclssMods.map((m) => m.id),
      });
    } else {
      issues.push({
        id: 'adj-isro-eclss-pass',
        code: 'ISRO-BAS-ECL-01',
        agency: 'ISRO',
        severity: 'PASS',
        category: 'adjacency',
        title: 'ISRO ECLSS Rack Serviceability Verified',
        detail: `Work/ECLSS bay maintains ${minEclssClearanceM.toFixed(1)}m unobstructed maintenance corridor without choking transit.`,
        action: 'Regenerative life-support access compliant.',
        metric: `${minEclssClearanceM.toFixed(1)}m`,
        moduleIds: eclssMods.map((m) => m.id),
      });
    }
  }

  const exerciseAreaM2 = Number(
    exerciseMods.reduce((acc, m) => acc + m.w * m.h, 0).toFixed(2)
  );
  if (durationDays >= 14 || checkIsro) {
    if (exerciseAreaM2 < ISRO_MIN_EXERCISE_FOOTPRINT_M2 - 1e-4) {
      issues.push({
        id: 'adj-isro-exr-area',
        code: 'ISRO-BAS-CM-03',
        agency: 'ISRO',
        severity: checkIsro ? 'FAIL' : 'WARN',
        category: 'adjacency',
        title: 'Exercise Countermeasure Envelope < 3.5 m²',
        detail: `Current Exercise footprint is ${exerciseAreaM2} m²; ISRO microgravity conditioning protocol requires >= 3.5 m².`,
        action: 'Add or resize Exercise Bay to at least 2.0m × 2.0m (4.0 m²) or 2.5m × 1.5m (3.75 m²).',
        metric: `${exerciseAreaM2} / 3.5 m²`,
        moduleIds: exerciseMods.map((m) => m.id),
      });
    } else if (checkIsro) {
      issues.push({
        id: 'adj-isro-exr-pass',
        code: 'ISRO-BAS-CM-03',
        agency: 'ISRO',
        severity: 'PASS',
        category: 'adjacency',
        title: 'ISRO Countermeasure Envelope Compliant',
        detail: `Exercise footprint (${exerciseAreaM2} m²) meets >= 3.5 m² kinematic clearance.`,
        action: 'Exercise bay envelope nominal.',
        metric: `${exerciseAreaM2} m²`,
        moduleIds: [],
      });
    }
  }

  // 4. SpaceX Starship HLS Standards (SPE Water/Storage Mass Shielding & Dead Pockets)
  const shieldRatio = computeSleepShieldRatio(sleepMods, storageMods);
  const shieldedSleepPerimeterPct = Number((shieldRatio * 100).toFixed(1));
  const requiredShieldPct = SPACEX_MIN_SHIELD_PERIMETER_RATIO * 100;
  const checkSpacex = standard === 'SPACEX' || standard === 'UNIFIED' || solarFlareSim;

  if (checkSpacex && sleepMods.length > 0) {
    if (shieldRatio < SPACEX_MIN_SHIELD_PERIMETER_RATIO - 1e-4) {
      issues.push({
        id: 'rad-spacex-shield',
        code: 'SPX-SPE-SHLD-01',
        agency: 'SPACEX',
        severity: solarFlareSim || standard === 'SPACEX' || standard === 'UNIFIED' ? 'FAIL' : 'WARN',
        category: 'radiation',
        title: solarFlareSim
          ? 'SOLAR FLARE ALERT: Inadequate Water/Mass Shielding (<50%)'
          : 'Insufficient SPE Mass Buffering Around Sleep (<50%)',
        detail: `Only ${shieldedSleepPerimeterPct}% of Sleep Quarters perimeter is buffered within 1.0m by Storage/Water mass bays (target >= ${requiredShieldPct}%).`,
        action: 'Place Storage / Water zones directly alongside (>=50% perimeter) Sleep Quarters to form a water-wall SPE shelter.',
        metric: `${shieldedSleepPerimeterPct}% / 50%`,
        moduleIds: [...sleepMods.map((m) => m.id), ...storageMods.map((m) => m.id)],
      });
    } else {
      issues.push({
        id: 'rad-spacex-shield-pass',
        code: 'SPX-SPE-SHLD-01',
        agency: 'SPACEX',
        severity: 'PASS',
        category: 'radiation',
        title: solarFlareSim
          ? 'X-Class Solar Flare Shelter Verified (>=50% Mass Buffer)'
          : 'SpaceX SPE Water-Wall Mass Buffering Verified',
        detail: `${shieldedSleepPerimeterPct}% of Sleep Quarters perimeter is shielded by high-hydrogen Storage/Water bays.`,
        action: 'Passive SPE storm-shelter mass buffering is active.',
        metric: `${shieldedSleepPerimeterPct}% Shielded`,
        moduleIds: [],
      });
    }
  }

  // SpaceX Volumetric Efficiency & Trapped Dead Pockets
  const totalFloor = usableFloorAreaPerDeckM2(hull) * hull.decks;
  const usedFloor = modules.filter((m) => isModuleInHull(m, hull)).reduce((s, m) => s + m.w * m.h, 0);
  const packingPct = safeDiv(usedFloor, totalFloor, 0) * 100;

  if ((standard === 'SPACEX' || standard === 'UNIFIED') && modules.length > 0) {
    if (trappedDeadPocketCells >= 4) {
      issues.push({
        id: 'vol-spacex-pockets',
        code: 'SPX-VOL-EFF-02',
        agency: 'SPACEX',
        severity: 'WARN',
        category: 'volume',
        title: `${trappedDeadPocketCells} Trapped Unreachable Grid Cells`,
        detail: `Module arrangement seals off ${(trappedDeadPocketCells * 0.25).toFixed(1)} m² of dead floor pockets unreachable from corridors.`,
        action: 'Push modules flush against outer hull walls to consolidate open corridor volume.',
        metric: `${(trappedDeadPocketCells * 0.25).toFixed(1)} m² dead`,
        moduleIds: [],
      });
    } else if (packingPct < SPACEX_MIN_PACKING_EFFICIENCY_PCT) {
      issues.push({
        id: 'vol-spacex-underpack',
        code: 'SPX-VOL-EFF-03',
        agency: 'SPACEX',
        severity: 'WARN',
        category: 'volume',
        title: `Low Floor Packing Efficiency (${packingPct.toFixed(0)}%)`,
        detail: `Only ${packingPct.toFixed(1)}% of deck area is outfitted (SpaceX optimal range ${SPACEX_MIN_PACKING_EFFICIENCY_PCT}%–${SPACEX_MAX_PACKING_EFFICIENCY_PCT}%).`,
        action: 'Add Storage/Water shielding or enlarge crew functional modules.',
        metric: `${packingPct.toFixed(0)}% Floor`,
        moduleIds: [],
      });
    } else if (packingPct > SPACEX_MAX_PACKING_EFFICIENCY_PCT) {
      issues.push({
        id: 'vol-spacex-overpack',
        code: 'SPX-VOL-EFF-03',
        agency: 'SPACEX',
        severity: 'WARN',
        category: 'volume',
        title: `Over-Packed Deck Footprint (${packingPct.toFixed(0)}%)`,
        detail: `${packingPct.toFixed(1)}% floor utilization leaves minimal translation corridor margin.`,
        action: 'Compact oversized modules or increase hull footprint.',
        metric: `${packingPct.toFixed(0)}% Floor`,
        moduleIds: [],
      });
    }
  }

  return {
    metrics: {
      hygieneCount: hygieneMods.length,
      requiredHygieneCount,
      eclssCorridorClearanceM: minEclssClearanceM,
      eclssBlocksTransit,
      exerciseAreaM2,
      medicalConnectedBonus,
      shieldedSleepPerimeterPct,
      requiredShieldPct,
      trappedDeadPocketCells,
      overlappingPairs,
      outOfBoundsIds,
    },
    issues,
  };
}
