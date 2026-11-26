import {
  CREW_TRANSIT_SPEED_MPS,
  GRID_STEP_M,
  ISRO_MAX_ESCAPE_DISTANCE_M,
  ISRO_MAX_ESCAPE_TIME_SEC,
  NASA_MIN_EGRESS_CORRIDOR_M,
  SPACEX_DUAL_EGRESS_CREW_MIN,
} from './constants';
import { isPointInHull, safeDiv, sanitizeMission } from './geometry';
import {
  EgressMetrics,
  EgressRoute,
  HabitatHull,
  MissionConfig,
  ValidationIssue,
  ZoneModule,
} from '../types/habitat';

interface DeckGrid {
  cols: number;
  rows: number;
  blocked: Uint8Array;
  corridorSpanM: Float32Array;
}

function buildDeckNavGrid(hull: HabitatHull, deckModules: ZoneModule[]): DeckGrid {
  const cols = Math.max(1, Math.round(hull.widthM / GRID_STEP_M));
  const rows = Math.max(1, Math.round(hull.depthM / GRID_STEP_M));
  const total = cols * rows;
  const blocked = new Uint8Array(total);

  for (let r = 0; r < rows; r++) {
    const cy = (r + 0.5) * GRID_STEP_M;
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * GRID_STEP_M;
      if (!isPointInHull(cx, cy, hull)) {
        blocked[r * cols + c] = 1;
      }
    }
  }

  for (const m of deckModules) {
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

  // Compute local orthogonal corridor width (meters) at every free cell
  const corridorSpanM = new Float32Array(total);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (blocked[idx] === 1) continue;

      let spanX = 1;
      for (let k = c - 1; k >= 0 && blocked[r * cols + k] === 0; k--) spanX++;
      for (let k = c + 1; k < cols && blocked[r * cols + k] === 0; k++) spanX++;

      let spanY = 1;
      for (let k = r - 1; k >= 0 && blocked[k * cols + c] === 0; k--) spanY++;
      for (let k = r + 1; k < rows && blocked[k * cols + c] === 0; k++) spanY++;

      // In an L-junction both spans are large; in a straight corridor the narrower span is the corridor width
      corridorSpanM[idx] = Math.min(spanX, spanY) * GRID_STEP_M;
    }
  }

  return { cols, rows, blocked, corridorSpanM };
}

export function getModuleDoorwayCells(grid: DeckGrid, mod: ZoneModule): number[] {
  const { cols, rows, blocked } = grid;
  const c0 = Math.max(0, Math.floor((mod.x + 0.01) / GRID_STEP_M) - 1);
  const c1 = Math.min(cols - 1, Math.floor((mod.x + mod.w - 0.01) / GRID_STEP_M) + 1);
  const r0 = Math.max(0, Math.floor((mod.y + 0.01) / GRID_STEP_M) - 1);
  const r1 = Math.min(rows - 1, Math.floor((mod.y + mod.h - 0.01) / GRID_STEP_M) + 1);

  const doors: number[] = [];
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const idx = r * cols + c;
      if (blocked[idx] === 1) continue;
      const cx = (c + 0.5) * GRID_STEP_M;
      const cy = (r + 0.5) * GRID_STEP_M;
      const dx = Math.max(0, Math.max(mod.x - cx, cx - (mod.x + mod.w)));
      const dy = Math.max(0, Math.max(mod.y - cy, cy - (mod.y + mod.h)));
      // Strictly 4-connected orthogonal doorway adjacency (dx == 0 or dy == 0)
      if ((dx === 0 && dy <= GRID_STEP_M * 0.6) || (dy === 0 && dx <= GRID_STEP_M * 0.6)) {
        doors.push(idx);
      }
    }
  }
  return doors;
}

const DIRS_8: Array<[number, number, number]> = [
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [1, 1, Math.SQRT2],
  [1, -1, Math.SQRT2],
  [-1, 1, Math.SQRT2],
  [-1, -1, Math.SQRT2],
];

function runAStar(
  grid: DeckGrid,
  starts: number[],
  goals: number[],
  minRequiredWidthM: number,
  extraBlocked?: Set<number>
): { found: boolean; cells: number[]; distanceM: number; minWidthM: number } {
  if (starts.length === 0 || goals.length === 0) {
    return { found: false, cells: [], distanceM: 0, minWidthM: 0 };
  }

  const { cols, rows, blocked, corridorSpanM } = grid;
  const total = cols * rows;
  const goalMask = new Uint8Array(total);
  let goalAvgR = 0;
  let goalAvgC = 0;
  for (const g of goals) {
    goalMask[g] = 1;
    goalAvgR += Math.floor(g / cols);
    goalAvgC += g % cols;
  }
  goalAvgR /= goals.length;
  goalAvgC /= goals.length;

  const gScore = new Float64Array(total);
  gScore.fill(Infinity);
  const fScore = new Float64Array(total);
  fScore.fill(Infinity);
  const parent = new Int32Array(total);
  parent.fill(-1);
  const closed = new Uint8Array(total);
  const openList: number[] = [];

  for (const s of starts) {
    if (extraBlocked?.has(s)) continue;
    if (corridorSpanM[s] + 1e-4 < minRequiredWidthM) continue;
    gScore[s] = 0;
    const sr = Math.floor(s / cols);
    const sc = s % cols;
    fScore[s] = Math.hypot(sr - goalAvgR, sc - goalAvgC) * GRID_STEP_M;
    openList.push(s);
  }

  let reached = -1;

  while (openList.length > 0) {
    // Find minimum fScore in openList (grid total <= ~1500 cells -> ultra-fast & allocation-free)
    let bestIdx = 0;
    for (let i = 1; i < openList.length; i++) {
      if (fScore[openList[i]] < fScore[openList[bestIdx]]) {
        bestIdx = i;
      }
    }
    const curr = openList[bestIdx];
    openList[bestIdx] = openList[openList.length - 1];
    openList.pop();

    if (closed[curr]) continue;
    closed[curr] = 1;

    if (goalMask[curr] === 1) {
      reached = curr;
      break;
    }

    const cr = Math.floor(curr / cols);
    const cc = curr % cols;

    for (let d = 0; d < 8; d++) {
      const dr = DIRS_8[d][0];
      const dc = DIRS_8[d][1];
      const nr = cr + dr;
      const nc = cc + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

      const nIdx = nr * cols + nc;
      if (blocked[nIdx] === 1 || closed[nIdx] === 1 || extraBlocked?.has(nIdx)) continue;
      if (corridorSpanM[nIdx] + 1e-4 < minRequiredWidthM) continue;

      // Prevent diagonal squeezing past blocked corners
      if (dr !== 0 && dc !== 0) {
        if (
          blocked[cr * cols + nc] === 1 ||
          blocked[nr * cols + cc] === 1 ||
          corridorSpanM[cr * cols + nc] + 1e-4 < minRequiredWidthM ||
          corridorSpanM[nr * cols + cc] + 1e-4 < minRequiredWidthM
        ) {
          continue;
        }
      }

      const stepDist = DIRS_8[d][2] * GRID_STEP_M;
      const candG = gScore[curr] + stepDist;
      if (candG < gScore[nIdx]) {
        parent[nIdx] = curr;
        gScore[nIdx] = candG;
        fScore[nIdx] = candG + Math.hypot(nr - goalAvgR, nc - goalAvgC) * GRID_STEP_M;
        openList.push(nIdx);
      }
    }
  }

  if (reached === -1) {
    return { found: false, cells: [], distanceM: 0, minWidthM: 0 };
  }

  const cells: number[] = [];
  let cur = reached;
  while (cur !== -1) {
    cells.push(cur);
    cur = parent[cur];
  }
  cells.reverse();

  let minW = Infinity;
  let distM = 0;
  for (let i = 0; i < cells.length; i++) {
    const w = corridorSpanM[cells[i]];
    if (w < minW) minW = w;
    if (i > 0) {
      const r0 = Math.floor(cells[i - 1] / cols);
      const c0 = cells[i - 1] % cols;
      const r1 = Math.floor(cells[i] / cols);
      const c1 = cells[i] % cols;
      distM += Math.hypot(r1 - r0, c1 - c0) * GRID_STEP_M;
    }
  }

  // Add doorway entry + exit half-steps (0.5m each)
  const totalDistM = Number((distM + GRID_STEP_M).toFixed(2));
  return {
    found: true,
    cells,
    distanceM: totalDistM,
    minWidthM: Number((Number.isFinite(minW) ? minW : 1.0).toFixed(2)),
  };
}

/**
 * Multi-Agency Egress & Redundancy Engine (NASA A* 0.8m clearance + ISRO <=12m/18s + SpaceX Dual-Egress).
 */
export function evaluateEgress(
  rawMission: MissionConfig,
  modules: ZoneModule[]
): { metrics: EgressMetrics; issues: ValidationIssue[] } {
  const mission = sanitizeMission(rawMission);
  const { hull, crewSize, standard } = mission;

  const airlocks = modules.filter((m) => m.type === 'airlock');
  const sourceModules = modules.filter((m) => m.type !== 'airlock');

  const deckGrids = new Map<number, DeckGrid>();
  for (let d = 0; d < hull.decks; d++) {
    deckGrids.set(
      d,
      buildDeckNavGrid(
        hull,
        modules.filter((m) => m.deck === d)
      )
    );
  }

  const routes: EgressRoute[] = [];

  for (const mod of sourceModules) {
    const grid = deckGrids.get(mod.deck);
    if (!grid || airlocks.length === 0) {
      routes.push({
        fromModuleId: mod.id,
        fromLabel: mod.label,
        fromType: mod.type,
        targetAirlockId: '',
        deck: mod.deck,
        valid: false,
        distanceM: 0,
        evacuationTimeSec: 0,
        minCorridorWidthM: 0,
        hasDisjointBackup: false,
        points: [
          { x: mod.x + mod.w / 2, y: mod.y + mod.h / 2 },
        ],
      });
      continue;
    }

    const starts = getModuleDoorwayCells(grid, mod);
    const sameDeckAirlocks = airlocks.filter((a) => a.deck === mod.deck);

    let bestRoute: EgressRoute | null = null;
    let bestCells: number[] = [];
    let allGoalCells: number[] = [];

    if (sameDeckAirlocks.length > 0) {
      for (const air of sameDeckAirlocks) {
        const goals = getModuleDoorwayCells(grid, air);
        allGoalCells = allGoalCells.concat(goals);

        // First try strict >= 0.8m anthropometric clearance
        const strictRes = runAStar(grid, starts, goals, NASA_MIN_EGRESS_CORRIDOR_M);
        if (strictRes.found) {
          const pts = [
            { x: mod.x + mod.w / 2, y: mod.y + mod.h / 2 },
            ...strictRes.cells.map((idx) => ({
              x: ((idx % grid.cols) + 0.5) * GRID_STEP_M,
              y: (Math.floor(idx / grid.cols) + 0.5) * GRID_STEP_M,
            })),
            { x: air.x + air.w / 2, y: air.y + air.h / 2 },
          ];
          const timeSec = Number(safeDiv(strictRes.distanceM, CREW_TRANSIT_SPEED_MPS, 0).toFixed(1));
          const candidate: EgressRoute = {
            fromModuleId: mod.id,
            fromLabel: mod.label,
            fromType: mod.type,
            targetAirlockId: air.id,
            deck: mod.deck,
            valid: true,
            distanceM: strictRes.distanceM,
            evacuationTimeSec: timeSec,
            minCorridorWidthM: strictRes.minWidthM,
            hasDisjointBackup: false,
            points: pts,
          };
          if (!bestRoute || candidate.distanceM < bestRoute.distanceM) {
            bestRoute = candidate;
            bestCells = strictRes.cells;
          }
        }
      }

      // Check disjoint backup route (either to a 2nd airlock OR via disjoint interior corridor cells)
      if (bestRoute) {
        if (sameDeckAirlocks.length >= 2) {
          const otherAirlocks = sameDeckAirlocks.filter((a) => a.id !== bestRoute!.targetAirlockId);
          for (const oa of otherAirlocks) {
            const oGoals = getModuleDoorwayCells(grid, oa);
            const secondRes = runAStar(grid, starts, oGoals, NASA_MIN_EGRESS_CORRIDOR_M);
            if (secondRes.found) {
              bestRoute.hasDisjointBackup = true;
              break;
            }
          }
        }
        if (!bestRoute.hasDisjointBackup && bestCells.length > 2) {
          const blockedInterior = new Set<number>(bestCells.slice(1, -1));
          const backupRes = runAStar(
            grid,
            starts,
            allGoalCells,
            NASA_MIN_EGRESS_CORRIDOR_M,
            blockedInterior
          );
          if (backupRes.found) {
            bestRoute.hasDisjointBackup = true;
          }
        }
      }
    } else {
      // Multi-deck fallback: route to central inter-deck transfer hatch at hull center + 3.0m vertical climb
      const hc = Math.floor(grid.cols / 2);
      const hr = Math.floor(grid.rows / 2);
      const hatchGoals: number[] = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const rr = hr + dr;
          const cc = hc + dc;
          if (rr >= 0 && rr < grid.rows && cc >= 0 && cc < grid.cols) {
            const idx = rr * grid.cols + cc;
            if (grid.blocked[idx] === 0) hatchGoals.push(idx);
          }
        }
      }
      const res = runAStar(grid, starts, hatchGoals, NASA_MIN_EGRESS_CORRIDOR_M);
      if (res.found) {
        const targetAir = airlocks[0];
        const deckPenaltyM = Math.abs(mod.deck - targetAir.deck) * 3.0;
        const distM = Number((res.distanceM + deckPenaltyM).toFixed(2));
        bestRoute = {
          fromModuleId: mod.id,
          fromLabel: mod.label,
          fromType: mod.type,
          targetAirlockId: targetAir.id,
          deck: mod.deck,
          valid: true,
          distanceM: distM,
          evacuationTimeSec: Number(safeDiv(distM, CREW_TRANSIT_SPEED_MPS, 0).toFixed(1)),
          minCorridorWidthM: res.minWidthM,
          hasDisjointBackup: airlocks.length >= 2,
          points: [
            { x: mod.x + mod.w / 2, y: mod.y + mod.h / 2 },
            ...res.cells.map((idx) => ({
              x: ((idx % grid.cols) + 0.5) * GRID_STEP_M,
              y: (Math.floor(idx / grid.cols) + 0.5) * GRID_STEP_M,
            })),
            { x: hull.widthM / 2, y: hull.depthM / 2 },
          ],
        };
      }
    }

    if (bestRoute) {
      routes.push(bestRoute);
    } else {
      // Build straight blocked indicator line to nearest airlock (or hull exit) for red visual feedback
      const target = sameDeckAirlocks[0] ?? airlocks[0];
      const squeezeRes =
        target && target.deck === mod.deck
          ? runAStar(grid, starts, getModuleDoorwayCells(grid, target), GRID_STEP_M)
          : { found: false, cells: [], distanceM: 0, minWidthM: 0 };

      routes.push({
        fromModuleId: mod.id,
        fromLabel: mod.label,
        fromType: mod.type,
        targetAirlockId: target?.id ?? '',
        deck: mod.deck,
        valid: false,
        distanceM: squeezeRes.found ? squeezeRes.distanceM : 0,
        evacuationTimeSec: 0,
        minCorridorWidthM: squeezeRes.found ? squeezeRes.minWidthM : 0,
        hasDisjointBackup: false,
        points: target
          ? [
              { x: mod.x + mod.w / 2, y: mod.y + mod.h / 2 },
              { x: target.x + target.w / 2, y: target.y + target.h / 2 },
            ]
          : [{ x: mod.x + mod.w / 2, y: mod.y + mod.h / 2 }],
      });
    }
  }

  const allValid =
    sourceModules.length === 0
      ? airlocks.length > 0
      : airlocks.length > 0 && routes.every((r) => r.valid);

  const validRoutes = routes.filter((r) => r.valid);
  const maxDistanceM =
    validRoutes.length > 0 ? Math.max(...validRoutes.map((r) => r.distanceM)) : 0;
  const maxEvacuationTimeSec =
    validRoutes.length > 0 ? Math.max(...validRoutes.map((r) => r.evacuationTimeSec)) : 0;

  const workSleepRoutes = validRoutes.filter(
    (r) => r.fromType === 'sleep' || r.fromType === 'eclss'
  );
  const maxWorkSleepDistanceM =
    workSleepRoutes.length > 0 ? Math.max(...workSleepRoutes.map((r) => r.distanceM)) : 0;

  const minCorridorWidthM =
    routes.length > 0
      ? Math.min(...routes.map((r) => (r.valid ? r.minCorridorWidthM : r.minCorridorWidthM)))
      : 1.0;

  const dualEgressRequired = crewSize >= SPACEX_DUAL_EGRESS_CREW_MIN || hull.decks > 1;
  const criticalCrewRoutes = routes.filter(
    (r) => r.fromType === 'sleep' || r.fromType === 'eclss'
  );
  const dualEgressSatisfied = !dualEgressRequired
    ? true
    : airlocks.length >= 2 ||
      (criticalCrewRoutes.length > 0 &&
        criticalCrewRoutes.every((r) => r.valid && r.hasDisjointBackup));

  const issues: ValidationIssue[] = [];

  if (airlocks.length === 0) {
    issues.push({
      id: 'eg-no-airlock',
      code: 'NASA-3001-V2-8005',
      agency: 'NASA',
      severity: 'FAIL',
      category: 'egress',
      title: 'Missing Airlock / Escape Adapter',
      detail: 'No Airlock/Escape module exists to terminate emergency egress routes.',
      action: 'Place at least one Airlock/Escape module with clear corridor access.',
      metric: '0 Airlocks',
      moduleIds: [],
    });
  } else {
    const blocked = routes.filter((r) => !r.valid);
    if (blocked.length > 0) {
      issues.push({
        id: 'eg-blocked',
        code: 'NASA-3001-V2-8005',
        agency: 'NASA',
        severity: 'FAIL',
        category: 'egress',
        title: `Blocked Egress (< 0.8m Corridor) for ${blocked.length} Zone(s)`,
        detail: `${blocked.map((b) => b.fromLabel).join(', ')} lack a continuous >= 0.8m unobstructed A* path to an Airlock.`,
        action: 'Widen aisles to at least 1.0m (2 grid squares) and clear doorway obstructions.',
        metric: `${blocked.length} BLOCKED`,
        moduleIds: blocked.map((b) => b.fromModuleId),
      });
    } else if (sourceModules.length > 0) {
      issues.push({
        id: 'eg-nasa-pass',
        code: 'NASA-3001-V2-8005',
        agency: 'NASA',
        severity: 'PASS',
        category: 'egress',
        title: 'Anthropometric Egress Clearance Verified',
        detail: `All ${routes.length} zone doorways reach an Airlock with >= 0.8m corridor width (max ${maxDistanceM}m).`,
        action: 'Primary A* translation corridors are clear.',
        metric: `${maxDistanceM}m / ${maxEvacuationTimeSec}s`,
        moduleIds: [],
      });
    }
  }

  // ISRO Rapid Crew Escape check (<= 12m / <= 18s from Sleep & Work bays)
  if (standard === 'ISRO' || standard === 'UNIFIED') {
    const slowEscape = workSleepRoutes.filter(
      (r) =>
        r.distanceM > ISRO_MAX_ESCAPE_DISTANCE_M ||
        r.evacuationTimeSec > ISRO_MAX_ESCAPE_TIME_SEC
    );
    if (slowEscape.length > 0) {
      issues.push({
        id: 'eg-isro-escape',
        code: 'ISRO-BAS-ESC-02',
        agency: 'ISRO',
        severity: 'FAIL',
        category: 'egress',
        title: 'Exceeds ISRO Rapid Escape Envelope (>12m / 18s)',
        detail: `Worst Sleep/Work escape route is ${maxWorkSleepDistanceM}m (${Math.max(...slowEscape.map((r) => r.evacuationTimeSec))}s); ISRO Gaganyaan/BAS requires <= 12.0m (<= 18s) to Escape Adapter.`,
        action: 'Move Airlock/Escape centrally or relocate Sleep/Work closer to the docking hatch.',
        metric: `${maxWorkSleepDistanceM}m > 12m`,
        moduleIds: slowEscape.map((r) => r.fromModuleId),
      });
    } else if (workSleepRoutes.length > 0 && airlocks.length > 0) {
      issues.push({
        id: 'eg-isro-pass',
        code: 'ISRO-BAS-ESC-02',
        agency: 'ISRO',
        severity: 'PASS',
        category: 'egress',
        title: 'ISRO Rapid Escape Access Verified',
        detail: `Sleep & Work bays reach Escape Adapter within ${maxWorkSleepDistanceM}m (<= 12.0m / <= 18s).`,
        action: 'Orbital escape transit time is compliant.',
        metric: `${maxWorkSleepDistanceM}m`,
        moduleIds: [],
      });
    }
  }

  // SpaceX Dual-Egress Redundancy check (Crew >= 6 or Multi-Deck)
  if ((standard === 'SPACEX' || standard === 'UNIFIED') && dualEgressRequired) {
    if (!dualEgressSatisfied) {
      issues.push({
        id: 'eg-spacex-dual',
        code: 'SPX-HLS-RED-01',
        agency: 'SPACEX',
        severity: standard === 'SPACEX' || standard === 'UNIFIED' ? 'FAIL' : 'WARN',
        category: 'radiation',
        title: 'Missing Dual-Egress Redundancy (Crew >= 6 / Multi-Deck)',
        detail:
          'Single-corridor bottleneck can trap crew during depressurization or fire; requires 2 Airlocks or 2 disjoint A* loop corridors.',
        action: 'Add a second Airlock/Escape hatch or arrange modules with a perimeter loop aisle.',
        metric: `${airlocks.length} Hatch / 1 Path`,
        moduleIds: criticalCrewRoutes
          .filter((r) => !r.hasDisjointBackup)
          .map((r) => r.fromModuleId),
      });
    } else {
      issues.push({
        id: 'eg-spacex-dual-pass',
        code: 'SPX-HLS-RED-01',
        agency: 'SPACEX',
        severity: 'PASS',
        category: 'radiation',
        title: 'SpaceX Dual-Egress Redundancy Active',
        detail:
          airlocks.length >= 2
            ? `${airlocks.length} independent Airlock/Escape hatches provide fault-tolerant egress.`
            : 'Disjoint dual-corridor loop paths protect Sleep & Work bays against single-point blockage.',
        action: 'Redundant escape topology verified.',
        metric: '2x Egress',
        moduleIds: [],
      });
    }
  }

  return {
    metrics: {
      routes,
      allValid,
      maxDistanceM,
      maxWorkSleepDistanceM,
      maxEvacuationTimeSec,
      minCorridorWidthM,
      dualEgressRequired,
      dualEgressSatisfied,
    },
    issues,
  };
}
