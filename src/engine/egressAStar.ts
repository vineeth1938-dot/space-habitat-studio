import {
  BottleneckPoint,
  EgressPath,
  EgressPoint,
  EgressResult,
  HullGeometry,
  ZoneNode,
} from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';
import { getHullBounds, isPointInsideHull } from './hullMath';

export const EGRESS_GRID_RES = 0.25; // meters per grid cell
const TRANSIT_SPEED_M_S = 0.85;
const DECK_TRANSFER_PENALTY_M = 3.0;

export interface GridData {
  cols: number;
  rows: number;
  blocked: Uint8Array;
  clearance: Float32Array;
  zoneMap: Int16Array;
}

export function buildDeckGrid(hull: HullGeometry, deckZones: ZoneNode[]): GridData {
  const { width, depth } = getHullBounds(hull);
  const cols = Math.max(4, Math.ceil(width / EGRESS_GRID_RES));
  const rows = Math.max(4, Math.ceil(depth / EGRESS_GRID_RES));
  const total = cols * rows;

  const blocked = new Uint8Array(total);
  const zoneMap = new Int16Array(total);
  zoneMap.fill(-1);

  for (let r = 0; r < rows; r++) {
    const cy = (r + 0.5) * EGRESS_GRID_RES;
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * EGRESS_GRID_RES;
      if (!isPointInsideHull(cx, cy, hull)) {
        blocked[r * cols + c] = 1;
      }
    }
  }

  for (let zi = 0; zi < deckZones.length; zi++) {
    const z = deckZones[zi];
    const c0 = Math.max(0, Math.floor(z.x / EGRESS_GRID_RES));
    const c1 = Math.min(cols - 1, Math.floor((z.x + z.width - 0.001) / EGRESS_GRID_RES));
    const r0 = Math.max(0, Math.floor(z.y / EGRESS_GRID_RES));
    const r1 = Math.min(rows - 1, Math.floor((z.y + z.height - 0.001) / EGRESS_GRID_RES));

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const idx = r * cols + c;
        blocked[idx] = 1;
        zoneMap[idx] = zi;
      }
    }
  }

  const distCells = new Float32Array(total);
  distCells.fill(999);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  for (let i = 0; i < total; i++) {
    if (blocked[i] === 1) {
      distCells[i] = 0;
      queue[tail++] = i;
    }
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (head < tail) {
    const curr = queue[head++];
    const cr = Math.floor(curr / cols);
    const cc = curr % cols;
    const cd = distCells[curr];

    for (let d = 0; d < 4; d++) {
      const nr = cr + dirs[d][0];
      const nc = cc + dirs[d][1];
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const nIdx = nr * cols + nc;
      if (distCells[nIdx] > cd + 1) {
        distCells[nIdx] = cd + 1;
        queue[tail++] = nIdx;
      }
    }
  }

  const clearance = new Float32Array(total);
  for (let i = 0; i < total; i++) {
    clearance[i] = distCells[i] * EGRESS_GRID_RES;
  }

  return { cols, rows, blocked, clearance, zoneMap };
}

export function getZoneDoorCells(grid: GridData, z: ZoneNode): number[] {
  const { cols, rows, blocked } = grid;
  const c0 = Math.max(0, Math.floor(z.x / EGRESS_GRID_RES) - 1);
  const c1 = Math.min(cols - 1, Math.ceil((z.x + z.width) / EGRESS_GRID_RES));
  const r0 = Math.max(0, Math.floor(z.y / EGRESS_GRID_RES) - 1);
  const r1 = Math.min(rows - 1, Math.ceil((z.y + z.height) / EGRESS_GRID_RES));

  const doors: number[] = [];
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const idx = r * cols + c;
      if (blocked[idx] === 1) continue;
      const cx = (c + 0.5) * EGRESS_GRID_RES;
      const cy = (r + 0.5) * EGRESS_GRID_RES;
      const dx = Math.max(0, Math.max(z.x - cx, cx - (z.x + z.width)));
      const dy = Math.max(0, Math.max(z.y - cy, cy - (z.y + z.height)));
      if (dx <= EGRESS_GRID_RES * 0.75 && dy <= EGRESS_GRID_RES * 0.75) {
        doors.push(idx);
      }
    }
  }
  return doors;
}

class MinHeap {
  private nodes: number[] = [];
  private scores: number[] = [];

  get size() {
    return this.nodes.length;
  }

  push(node: number, score: number) {
    this.nodes.push(node);
    this.scores.push(score);
    this.bubbleUp(this.nodes.length - 1);
  }

  pop(): number {
    const top = this.nodes[0];
    const lastNode = this.nodes.pop()!;
    const lastScore = this.scores.pop()!;
    if (this.nodes.length > 0) {
      this.nodes[0] = lastNode;
      this.scores[0] = lastScore;
      this.sinkDown(0);
    }
    return top;
  }

  private bubbleUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.scores[i] >= this.scores[p]) break;
      [this.nodes[i], this.nodes[p]] = [this.nodes[p], this.nodes[i]];
      [this.scores[i], this.scores[p]] = [this.scores[p], this.scores[i]];
      i = p;
    }
  }

  private sinkDown(i: number) {
    const n = this.nodes.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.scores[l] < this.scores[smallest]) smallest = l;
      if (r < n && this.scores[r] < this.scores[smallest]) smallest = r;
      if (smallest === i) break;
      [this.nodes[i], this.nodes[smallest]] = [this.nodes[smallest], this.nodes[i]];
      [this.scores[i], this.scores[smallest]] = [this.scores[smallest], this.scores[i]];
      i = smallest;
    }
  }
}

const NEIGHBORS_8: Array<[number, number, number]> = [
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [1, 1, Math.SQRT2],
  [1, -1, Math.SQRT2],
  [-1, 1, Math.SQRT2],
  [-1, -1, Math.SQRT2],
];

export function runAStarMultiSourceTarget(
  grid: GridData,
  startCells: number[],
  goalCells: number[]
): { found: boolean; pathCells: number[]; distanceM: number; minCorridorWidthM: number } {
  if (startCells.length === 0 || goalCells.length === 0) {
    return { found: false, pathCells: [], distanceM: 0, minCorridorWidthM: 0 };
  }

  const { cols, rows, blocked, clearance } = grid;
  const total = cols * rows;
  const goalSet = new Uint8Array(total);
  let goalMeanR = 0;
  let goalMeanC = 0;
  for (const g of goalCells) {
    goalSet[g] = 1;
    goalMeanR += Math.floor(g / cols);
    goalMeanC += g % cols;
  }
  goalMeanR /= goalCells.length;
  goalMeanC /= goalCells.length;

  const gScore = new Float32Array(total);
  gScore.fill(Infinity);
  const cameFrom = new Int32Array(total);
  cameFrom.fill(-1);
  const closed = new Uint8Array(total);

  const open = new MinHeap();
  for (const s of startCells) {
    gScore[s] = 0;
    const sr = Math.floor(s / cols);
    const sc = s % cols;
    const h = Math.hypot(sr - goalMeanR, sc - goalMeanC) * EGRESS_GRID_RES;
    open.push(s, h);
  }

  let reachedGoal = -1;

  while (open.size > 0) {
    const curr = open.pop();
    if (closed[curr]) continue;
    closed[curr] = 1;

    if (goalSet[curr] === 1) {
      reachedGoal = curr;
      break;
    }

    const cr = Math.floor(curr / cols);
    const cc = curr % cols;
    const currG = gScore[curr];

    for (let i = 0; i < 8; i++) {
      const dr = NEIGHBORS_8[i][0];
      const dc = NEIGHBORS_8[i][1];
      const stepFactor = NEIGHBORS_8[i][2];
      const nr = cr + dr;
      const nc = cc + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

      const nIdx = nr * cols + nc;
      if (blocked[nIdx] === 1 || closed[nIdx] === 1) continue;

      if (dr !== 0 && dc !== 0) {
        if (blocked[cr * cols + nc] === 1 || blocked[nr * cols + cc] === 1) {
          continue;
        }
      }

      const stepDist = stepFactor * EGRESS_GRID_RES;
      const tightPenalty = clearance[nIdx] <= EGRESS_GRID_RES ? 0.35 : 0;
      const tentativeG = currG + stepDist + tightPenalty;

      if (tentativeG < gScore[nIdx]) {
        cameFrom[nIdx] = curr;
        gScore[nIdx] = tentativeG;
        const h = Math.hypot(nr - goalMeanR, nc - goalMeanC) * EGRESS_GRID_RES;
        open.push(nIdx, tentativeG + h);
      }
    }
  }

  if (reachedGoal === -1) {
    return { found: false, pathCells: [], distanceM: 0, minCorridorWidthM: 0 };
  }

  const revPath: number[] = [];
  let cur = reachedGoal;
  while (cur !== -1) {
    revPath.push(cur);
    cur = cameFrom[cur];
  }
  revPath.reverse();

  let trueDist = 0;
  let minWidthM = Infinity;

  for (let i = 0; i < revPath.length; i++) {
    const idx = revPath[i];
    const r = Math.floor(idx / cols);
    const c = idx % cols;

    if (i > 0) {
      const prev = revPath[i - 1];
      const pr = Math.floor(prev / cols);
      const pc = prev % cols;
      trueDist += Math.hypot(r - pr, c - pc) * EGRESS_GRID_RES;
    }

    if (i > 0 && i < revPath.length - 1) {
      let spanX = 1;
      for (let k = c - 1; k >= 0 && blocked[r * cols + k] === 0; k--) spanX++;
      for (let k = c + 1; k < cols && blocked[r * cols + k] === 0; k++) spanX++;

      let spanY = 1;
      for (let k = r - 1; k >= 0 && blocked[k * cols + c] === 0; k--) spanY++;
      for (let k = r + 1; k < rows && blocked[k * cols + c] === 0; k++) spanY++;

      const localCorridorM = Math.min(spanX, spanY) * EGRESS_GRID_RES;
      if (localCorridorM < minWidthM) {
        minWidthM = localCorridorM;
      }
    }
  }

  if (!Number.isFinite(minWidthM)) {
    minWidthM = 1.25;
  }

  if (minWidthM < 0.5) {
    return { found: false, pathCells: [], distanceM: 0, minCorridorWidthM: Number(minWidthM.toFixed(2)) };
  }

  return {
    found: true,
    pathCells: revPath,
    distanceM: Number(trueDist.toFixed(2)),
    minCorridorWidthM: Number(minWidthM.toFixed(2)),
  };
}

function clampToZoneDoorPerimeter(px: number, py: number, z: ZoneNode): EgressPoint {
  const cx = Math.max(z.x, Math.min(z.x + z.width, px));
  const cy = Math.max(z.y, Math.min(z.y + z.height, py));
  return {
    x: Number(cx.toFixed(2)),
    y: Number(cy.toFixed(2)),
  };
}

export function cellsToPoints(
  pathCells: number[],
  cols: number,
  fromZone: ZoneNode,
  targetZone: ZoneNode
): EgressPoint[] {
  if (pathCells.length === 0) return [];

  const firstIdx = pathCells[0];
  const firstX = (firstIdx % cols + 0.5) * EGRESS_GRID_RES;
  const firstY = (Math.floor(firstIdx / cols) + 0.5) * EGRESS_GRID_RES;

  const lastIdx = pathCells[pathCells.length - 1];
  const lastX = (lastIdx % cols + 0.5) * EGRESS_GRID_RES;
  const lastY = (Math.floor(lastIdx / cols) + 0.5) * EGRESS_GRID_RES;

  const pts: EgressPoint[] = [clampToZoneDoorPerimeter(firstX, firstY, fromZone)];
  for (let i = 0; i < pathCells.length; i++) {
    const idx = pathCells[i];
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    pts.push({
      x: Number(((c + 0.5) * EGRESS_GRID_RES).toFixed(2)),
      y: Number(((r + 0.5) * EGRESS_GRID_RES).toFixed(2)),
    });
  }
  pts.push(clampToZoneDoorPerimeter(lastX, lastY, targetZone));
  return pts;
}

/**
 * Runs A* emergency egress pathfinding across all decks from every occupied zone
 * to the nearest Airlock / Egress Hatch and to the nearest Radiation Storm Shelter.
 * All returned distances & times are guaranteed finite numbers (0 if unreachable).
 */
export function evaluateEgressAStar(hull: HullGeometry, zones: ZoneNode[]): EgressResult {
  const airlocks = zones.filter((z) => z.type === 'airlock');
  const shelters = zones.filter((z) => z.type === 'storm_shelter');
  const occupiedZones = zones.filter((z) => ZONE_CATALOG[z.type]?.isOccupied);

  const deckGrids = new Map<number, GridData>();
  for (let d = 0; d < Math.max(1, hull.decks); d++) {
    const dz = zones.filter((z) => z.deck === d);
    deckGrids.set(d, buildDeckGrid(hull, dz));
  }

  const airlockPaths: EgressPath[] = [];
  const shelterPaths: EgressPath[] = [];
  const bottleneckMap = new Map<string, BottleneckPoint>();

  const findBestPathToTargets = (
    from: ZoneNode,
    targets: ZoneNode[],
    targetType: 'airlock' | 'storm_shelter'
  ): EgressPath => {
    const safeDeck = Math.max(0, Math.min(hull.decks - 1, from.deck));
    if (targets.length === 0) {
      return {
        fromZoneId: from.id,
        fromLabel: from.label,
        targetZoneId: '',
        targetLabel: targetType === 'airlock' ? 'No Airlock' : 'No Storm Shelter',
        targetType,
        deck: safeDeck,
        reachable: false,
        distanceM: 0,
        transitTimeSec: 0,
        points: [],
        minClearanceM: 0,
      };
    }

    const grid = deckGrids.get(safeDeck)!;
    const startDoors = getZoneDoorCells(grid, from);
    const sameDeckTargets = targets.filter((t) => t.deck === safeDeck);

    let bestPath: EgressPath | null = null;

    for (const target of sameDeckTargets) {
      const goalDoors = getZoneDoorCells(grid, target);
      const res = runAStarMultiSourceTarget(grid, startDoors, goalDoors);
      if (res.found) {
        const candidate: EgressPath = {
          fromZoneId: from.id,
          fromLabel: from.label,
          targetZoneId: target.id,
          targetLabel: target.label,
          targetType,
          deck: safeDeck,
          reachable: true,
          distanceM: res.distanceM,
          transitTimeSec: Number((res.distanceM / TRANSIT_SPEED_M_S).toFixed(1)),
          points: cellsToPoints(res.pathCells, grid.cols, from, target),
          minClearanceM: res.minCorridorWidthM,
        };

        if (!bestPath || candidate.distanceM < bestPath.distanceM) {
          bestPath = candidate;
        }

        if (res.minCorridorWidthM < 1.0 && res.pathCells.length > 2) {
          const midIdx = res.pathCells[Math.floor(res.pathCells.length / 2)];
          const r = Math.floor(midIdx / grid.cols);
          const c = midIdx % grid.cols;
          const bx = Number(((c + 0.5) * EGRESS_GRID_RES).toFixed(2));
          const by = Number(((r + 0.5) * EGRESS_GRID_RES).toFixed(2));
          const key = `${safeDeck}:${Math.round(bx)}:${Math.round(by)}`;
          if (!bottleneckMap.has(key)) {
            bottleneckMap.set(key, {
              x: bx,
              y: by,
              deck: safeDeck,
              clearanceM: res.minCorridorWidthM,
            });
          }
        }
      }
    }

    if (!bestPath && sameDeckTargets.length === 0 && targets.length > 0) {
      const target = targets[0];
      const { width, depth } = getHullBounds(hull);
      const shaftC = Math.floor(width / 2 / EGRESS_GRID_RES);
      const shaftR = Math.floor(depth / 2 / EGRESS_GRID_RES);
      const shaftGoals: number[] = [];
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const rr = shaftR + dr;
          const cc = shaftC + dc;
          if (rr >= 0 && rr < grid.rows && cc >= 0 && cc < grid.cols) {
            const idx = rr * grid.cols + cc;
            if (grid.blocked[idx] === 0) shaftGoals.push(idx);
          }
        }
      }
      const res = runAStarMultiSourceTarget(grid, startDoors, shaftGoals);
      if (res.found) {
        const deckDelta = Math.abs(safeDeck - target.deck);
        const totalDist = Number((res.distanceM + deckDelta * DECK_TRANSFER_PENALTY_M).toFixed(2));
        bestPath = {
          fromZoneId: from.id,
          fromLabel: from.label,
          targetZoneId: target.id,
          targetLabel: `${target.label} (Deck ${target.deck + 1})`,
          targetType,
          deck: safeDeck,
          reachable: true,
          distanceM: totalDist,
          transitTimeSec: Number((totalDist / TRANSIT_SPEED_M_S).toFixed(1)),
          points: cellsToPoints(res.pathCells, grid.cols, from, {
            ...target,
            x: width / 2 - 0.5,
            y: depth / 2 - 0.5,
            width: 1,
            height: 1,
          }),
          minClearanceM: res.minCorridorWidthM,
        };
      }
    }

    if (bestPath) return bestPath;

    const fallbackTarget = sameDeckTargets[0] ?? targets[0];
    return {
      fromZoneId: from.id,
      fromLabel: from.label,
      targetZoneId: fallbackTarget.id,
      targetLabel: fallbackTarget.label,
      targetType,
      deck: safeDeck,
      reachable: false,
      distanceM: 0,
      transitTimeSec: 0,
      points: [
        {
          x: Number((from.x + from.width / 2).toFixed(2)),
          y: Number((from.y + from.height / 2).toFixed(2)),
        },
        {
          x: Number((fallbackTarget.x + fallbackTarget.width / 2).toFixed(2)),
          y: Number((fallbackTarget.y + fallbackTarget.height / 2).toFixed(2)),
        },
      ],
      minClearanceM: 0,
    };
  };

  for (const occ of occupiedZones) {
    airlockPaths.push(findBestPathToTargets(occ, airlocks, 'airlock'));
    shelterPaths.push(findBestPathToTargets(occ, shelters, 'storm_shelter'));
  }

  const overallReachable =
    airlocks.length > 0 && (occupiedZones.length === 0 || airlockPaths.every((p) => p.reachable));
  const shelterReachable =
    shelters.length > 0 && (occupiedZones.length === 0 || shelterPaths.every((p) => p.reachable));

  const reachableAirlockDists = airlockPaths.filter((p) => p.reachable).map((p) => p.distanceM);
  const worstCaseDistanceM =
    reachableAirlockDists.length > 0 ? Math.max(...reachableAirlockDists) : 0;
  const worstCaseTimeSec = Number((worstCaseDistanceM / TRANSIT_SPEED_M_S).toFixed(1));

  const reachableShelterDists = shelterPaths.filter((p) => p.reachable).map((p) => p.distanceM);
  const worstShelterDistanceM =
    reachableShelterDists.length > 0 ? Math.max(...reachableShelterDists) : 0;
  const worstShelterTimeSec = Number((worstShelterDistanceM / TRANSIT_SPEED_M_S).toFixed(1));

  return {
    airlockPaths,
    shelterPaths,
    overallReachable,
    shelterReachable,
    worstCaseDistanceM,
    worstCaseTimeSec,
    worstShelterDistanceM,
    worstShelterTimeSec,
    bottleneckPoints: Array.from(bottleneckMap.values()),
    gridResolutionM: EGRESS_GRID_RES,
  };
}
