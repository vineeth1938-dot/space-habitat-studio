import { HullGeometry, MissionConfig, ZoneNode } from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';

export const GRID_STEP = 0.25;

export function clampFinite(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  if (min > max) return min;
  return Math.min(max, Math.max(min, value));
}

export function snapToGrid(value: number, step: number = GRID_STEP): number {
  if (!Number.isFinite(value) || step <= 0) return 0;
  return Math.round(value / step) * step;
}

export function sanitizeMissionConfig(mission: MissionConfig): MissionConfig {
  const hullType = mission.hull?.type ?? 'rigid_cylinder';
  const diameter = Number(clampFinite(mission.hull?.diameter ?? 6.0, 4.2, 14.0).toFixed(2));
  const length =
    hullType === 'surface_dome'
      ? diameter
      : Number(clampFinite(mission.hull?.length ?? 12.0, 6.0, 22.0).toFixed(2));
  const decks = Math.round(clampFinite(mission.hull?.decks ?? 1, 1, 3));
  const wallThickness = Number(clampFinite(mission.hull?.wallThickness ?? 0.25, 0.15, 0.6).toFixed(2));

  return {
    name: (mission.name || 'Space Habitat').slice(0, 80),
    crewSize: Math.round(clampFinite(mission.crewSize, 2, 12)),
    durationDays: Math.round(clampFinite(mission.durationDays, 30, 1000)),
    gravity:
      mission.gravity === '1/6g' || mission.gravity === '3/8g' ? mission.gravity : '0g',
    hull: {
      type: hullType,
      diameter,
      length,
      decks,
      wallThickness,
    },
  };
}

export interface HullBounds {
  width: number; // X span (m)
  depth: number; // Y span (m)
  wall: number;
  deckHeight: number;
}

export function getHullBounds(hull: HullGeometry): HullBounds {
  const width = hull.type === 'surface_dome' ? hull.diameter : hull.length;
  const depth = hull.diameter;
  const safeDecks = Math.max(1, hull.decks);
  const deckHeight =
    hull.type === 'surface_dome'
      ? Math.max(2.2, Math.min(3.0, (hull.diameter * 0.55) / safeDecks))
      : Math.max(2.2, Math.min(2.6, (hull.diameter * 0.85) / safeDecks));
  return {
    width,
    depth,
    wall: hull.wallThickness,
    deckHeight,
  };
}

export function getHullCornerRadius(hull: HullGeometry): number {
  if (hull.type === 'surface_dome') return hull.diameter / 2;
  if (hull.type === 'inflatable') return Math.min(hull.diameter * 0.24, 1.6);
  return Math.min(hull.diameter * 0.16, 0.9);
}

/**
 * Tests whether a 2D point (x, y) is inside the pressurized usable interior of the hull.
 */
export function isPointInsideHull(
  x: number,
  y: number,
  hull: HullGeometry,
  extraInset = 0
): boolean {
  const { width, depth, wall } = getHullBounds(hull);
  const inset = wall + extraInset;

  if (hull.type === 'surface_dome') {
    const cx = width / 2;
    const cy = depth / 2;
    const maxR = Math.max(0.5, width / 2 - inset);
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= maxR * maxR + 1e-6;
  }

  const minX = inset;
  const maxX = width - inset;
  const minY = inset;
  const maxY = depth - inset;
  if (x < minX - 1e-6 || x > maxX + 1e-6 || y < minY - 1e-6 || y > maxY + 1e-6) {
    return false;
  }

  const r = Math.max(0, getHullCornerRadius(hull) - inset);
  if (r <= 0) return true;

  const innerMinX = minX + r;
  const innerMaxX = maxX - r;
  const innerMinY = minY + r;
  const innerMaxY = maxY - r;

  if (x >= innerMinX && x <= innerMaxX) return true;
  if (y >= innerMinY && y <= innerMaxY) return true;

  const cornerX = x < innerMinX ? innerMinX : innerMaxX;
  const cornerY = y < innerMinY ? innerMinY : innerMaxY;
  const dx = x - cornerX;
  const dy = y - cornerY;
  return dx * dx + dy * dy <= r * r + 1e-6;
}

/**
 * Tests whether a rectangular zone lies completely within the usable hull interior.
 */
export function isRectInsideHull(
  x: number,
  y: number,
  w: number,
  h: number,
  hull: HullGeometry
): boolean {
  if (!Number.isFinite(x) || !Number.isFinite(y) || w <= 0 || h <= 0) return false;
  const eps = 0.02;
  const corners: Array<[number, number]> = [
    [x + eps, y + eps],
    [x + w - eps, y + eps],
    [x + eps, y + h - eps],
    [x + w - eps, y + h - eps],
    [x + w / 2, y + eps],
    [x + w / 2, y + h - eps],
    [x + eps, y + h / 2],
    [x + w - eps, y + h / 2],
  ];
  return corners.every(([cx, cy]) => isPointInsideHull(cx, cy, hull));
}

/**
 * Strictly clamps a zone's dimensions, deck, and (x, y) coordinates inside the active hull geometry
 * (including rounded endcaps on Cylinders/Inflatables and circular perimeter on Surface Domes).
 */
export function clampZoneToHull(zone: ZoneNode, hull: HullGeometry): ZoneNode {
  const { width, depth, wall } = getHullBounds(hull);
  const cat = ZONE_CATALOG[zone.type] ?? ZONE_CATALOG.stowage;

  const maxSpan =
    hull.type === 'surface_dome'
      ? Math.max(
          1.25,
          snapToGrid(((width / 2 - wall) * Math.SQRT2) - 0.25)
        )
      : width - wall * 2;

  const maxW = Math.max(1.0, snapToGrid(Math.min(width - wall * 2, hull.type === 'surface_dome' ? maxSpan : width - wall * 2)));
  const maxH = Math.max(1.0, snapToGrid(Math.min(depth - wall * 2, hull.type === 'surface_dome' ? maxSpan : depth - wall * 2)));

  let w = clampFinite(snapToGrid(zone.width), Math.min(cat.minWidth, maxW), maxW);
  let h = clampFinite(snapToGrid(zone.height), Math.min(cat.minHeight, maxH), maxH);
  const deck = Math.round(clampFinite(zone.deck, 0, Math.max(0, hull.decks - 1)));

  let x = clampFinite(snapToGrid(zone.x), snapToGrid(wall), Math.max(snapToGrid(wall), snapToGrid(width - wall - w)));
  let y = clampFinite(snapToGrid(zone.y), snapToGrid(wall), Math.max(snapToGrid(wall), snapToGrid(depth - wall - h)));

  const pullTowardCenter = (cw: number, ch: number): { ok: boolean; nx: number; ny: number } => {
    if (isRectInsideHull(x, y, cw, ch, hull)) return { ok: true, nx: x, ny: y };
    const cx = width / 2;
    const cy = depth / 2;
    for (let t = 0.92; t >= 0; t -= 0.04) {
      const mx = x + cw / 2;
      const my = y + ch / 2;
      const nx = snapToGrid(cx + (mx - cx) * t - cw / 2);
      const ny = snapToGrid(cy + (my - cy) * t - ch / 2);
      if (isRectInsideHull(nx, ny, cw, ch, hull)) {
        return { ok: true, nx, ny };
      }
    }
    return { ok: false, nx: snapToGrid(cx - cw / 2), ny: snapToGrid(cy - ch / 2) };
  };

  let attempt = pullTowardCenter(w, h);
  // If an oversized box still clips rounded hull endcaps/dome perimeter, step down dimensions cleanly
  let guard = 0;
  while (!attempt.ok && (w > 1.0 || h > 1.0) && guard < 48) {
    guard++;
    if (w >= h && w > 1.0) w = Math.max(1.0, snapToGrid(w - 0.25));
    else if (h > 1.0) h = Math.max(1.0, snapToGrid(h - 0.25));
    else if (w > 1.0) w = Math.max(1.0, snapToGrid(w - 0.25));
    x = clampFinite(x, snapToGrid(wall), Math.max(snapToGrid(wall), snapToGrid(width - wall - w)));
    y = clampFinite(y, snapToGrid(wall), Math.max(snapToGrid(wall), snapToGrid(depth - wall - h)));
    attempt = pullTowardCenter(w, h);
  }
  x = attempt.nx;
  y = attempt.ny;

  return {
    ...zone,
    deck,
    x,
    y,
    width: w,
    height: h,
    zHeight: clampFinite(zone.zHeight || cat.defaultZHeight, 1.8, 3.0),
  };
}

/**
 * Validates and normalizes an untrusted ZoneNode (e.g. from localStorage snapshots),
 * returning null if its structural identity or ZoneType is invalid.
 */
export function sanitizeZoneNode(
  raw: unknown,
  hull: HullGeometry,
  fallbackIndex = 0
): ZoneNode | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (typeof obj.type !== 'string' || !(obj.type in ZONE_CATALOG)) {
    return null;
  }
  const zoneType = obj.type as ZoneNode['type'];
  const cat = ZONE_CATALOG[zoneType];
  const rotRaw = Number(obj.rotation);
  const rotation: 0 | 90 | 180 | 270 =
    rotRaw === 90 || rotRaw === 180 || rotRaw === 270 ? rotRaw : 0;
  const id =
    typeof obj.id === 'string' && obj.id.trim().length > 0
      ? obj.id.trim().slice(0, 64)
      : `${zoneType}-${fallbackIndex}`;
  const label =
    typeof obj.label === 'string' && obj.label.trim().length > 0
      ? obj.label.trim().slice(0, 60)
      : cat.label;

  return clampZoneToHull(
    {
      id,
      type: zoneType,
      label,
      deck: typeof obj.deck === 'number' ? obj.deck : 0,
      x: typeof obj.x === 'number' ? obj.x : 1.0,
      y: typeof obj.y === 'number' ? obj.y : 1.0,
      width: typeof obj.width === 'number' ? obj.width : cat.defaultWidth,
      height: typeof obj.height === 'number' ? obj.height : cat.defaultHeight,
      zHeight: typeof obj.zHeight === 'number' ? obj.zHeight : cat.defaultZHeight,
      rotation,
      locked: Boolean(obj.locked),
    },
    hull
  );
}

/**
 * Relocates colliding or out-of-hull modules onto the nearest open 0.25m slot
 * after hull shrinkage or deck-count reduction (e.g. 2D -> 1D), preserving
 * non-colliding modules at their original positions whenever possible.
 */
export function resolveDeckAndHullCollisions(
  rawMission: MissionConfig,
  zones: ZoneNode[]
): ZoneNode[] {
  const mission = sanitizeMissionConfig(rawMission);
  const { hull } = mission;
  const { width, depth, wall } = getHullBounds(hull);
  const placed: ZoneNode[] = [];

  for (const raw of zones) {
    const z = clampZoneToHull(raw, hull);
    const fitsCurrent =
      isRectInsideHull(z.x, z.y, z.width, z.height, hull) &&
      placed.every((p) => getRectOverlapArea(z, p) <= 0.02);

    if (fitsCurrent) {
      placed.push(z);
      continue;
    }

    const deckOrder = [z.deck];
    for (let d = 0; d < hull.decks; d++) {
      if (d !== z.deck) deckOrder.push(d);
    }

    let best: ZoneNode | null = null;
    let bestDist = Infinity;

    for (const d of deckOrder) {
      for (let py = snapToGrid(wall + 0.25); py <= depth - wall - z.height + 1e-6; py += 0.25) {
        for (let px = snapToGrid(wall + 0.25); px <= width - wall - z.width + 1e-6; px += 0.25) {
          const sx = snapToGrid(px);
          const sy = snapToGrid(py);
          if (!isRectInsideHull(sx, sy, z.width, z.height, hull)) continue;
          const probe: ZoneNode = { ...z, deck: d, x: sx, y: sy };
          if (placed.some((p) => getRectOverlapArea(probe, p) > 0.02)) continue;
          const dist = Math.hypot(sx - z.x, sy - z.y) + (d === z.deck ? 0 : 12);
          if (dist < bestDist) {
            bestDist = dist;
            best = probe;
          }
        }
      }
      if (best) break;
    }

    placed.push(best ?? z);
  }

  return placed;
}

export function getRectOverlapArea(a: ZoneNode, b: ZoneNode): number {
  if (a.deck !== b.deck) return 0;
  const ox = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  const oy = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  return ox * oy;
}

export function getEdgeDistance2D(a: ZoneNode, b: ZoneNode): number {
  const dx = Math.max(0, Math.max(a.x - (b.x + b.width), b.x - (a.x + a.width)));
  const dy = Math.max(0, Math.max(a.y - (b.y + b.height), b.y - (a.y + a.height)));
  return Math.hypot(dx, dy);
}

export function getDistance3D(a: ZoneNode, b: ZoneNode, deckHeight = 2.4): number {
  const d2d = getEdgeDistance2D(a, b);
  const dz = Math.abs(a.deck - b.deck) * deckHeight;
  return Math.hypot(d2d, dz);
}

export function getCenterDistance3D(a: ZoneNode, b: ZoneNode, deckHeight = 2.4): number {
  const ax = a.x + a.width / 2;
  const ay = a.y + a.height / 2;
  const bx = b.x + b.width / 2;
  const by = b.y + b.height / 2;
  const dz = Math.abs(a.deck - b.deck) * deckHeight;
  return Math.hypot(ax - bx, ay - by, dz);
}

/**
 * Computes Gross Pressurized Volume, Structural Wall Volume, Estimated Dry Mass, and Launch Cost.
 */
export function computeHullMetrics(rawMission: MissionConfig, zones: ZoneNode[]) {
  const mission = sanitizeMissionConfig(rawMission);
  const { hull } = mission;
  const rOuter = hull.diameter / 2;
  const rInner = Math.max(0.5, rOuter - hull.wallThickness);

  let grossVolumeM3 = 0;
  let innerVolumeM3 = 0;

  if (hull.type === 'surface_dome') {
    grossVolumeM3 = (2 / 3) * Math.PI * Math.pow(rOuter, 3) + Math.PI * rOuter * rOuter * 0.6;
    innerVolumeM3 = (2 / 3) * Math.PI * Math.pow(rInner, 3) + Math.PI * rInner * rInner * 0.5;
  } else {
    const cylLen = Math.max(1, hull.length - hull.diameter * 0.35);
    grossVolumeM3 =
      Math.PI * rOuter * rOuter * cylLen + (4 / 3) * Math.PI * rOuter * rOuter * (hull.diameter * 0.175);
    innerVolumeM3 =
      Math.PI * rInner * rInner * Math.max(0.5, cylLen - hull.wallThickness) +
      (4 / 3) * Math.PI * rInner * rInner * Math.max(0.2, hull.diameter * 0.175 - hull.wallThickness);
  }

  const deckSlabVolume =
    hull.decks > 1
      ? (hull.decks - 1) *
        (hull.type === 'surface_dome'
          ? Math.PI * rInner * rInner * 0.8
          : hull.length * hull.diameter * 0.72) *
        0.18
      : 0;

  const structureVolumeM3 = Math.max(0, grossVolumeM3 - innerVolumeM3 + deckSlabVolume);

  const shellDensity =
    hull.type === 'inflatable' ? 210 : hull.type === 'surface_dome' ? 320 : 390;
  const structuralMassKg = structureVolumeM3 * shellDensity;

  let outfittingMassKg = 0;
  let equipmentVolumeM3 = 0;
  for (const z of zones) {
    const cat = ZONE_CATALOG[z.type];
    if (!cat) continue;
    const zVol = Math.max(0, z.width * z.height * z.zHeight);
    equipmentVolumeM3 += zVol * cat.equipmentFraction;
    outfittingMassKg += zVol * cat.massDensityKgPerM3 * 0.38;
  }

  const consumablesMassKg = mission.crewSize * mission.durationDays * 4.2;
  const estimatedMassKg = Math.round(structuralMassKg + outfittingMassKg + consumablesMassKg);

  const costPerKgUsd = mission.gravity === '0g' ? 12500 : mission.gravity === '1/6g' ? 16000 : 21000;
  const estimatedLaunchCostM = Number(((estimatedMassKg * costPerKgUsd) / 1_000_000).toFixed(1));

  return {
    grossVolumeM3: Number(grossVolumeM3.toFixed(1)),
    structureVolumeM3: Number(structureVolumeM3.toFixed(1)),
    equipmentVolumeM3: Number(equipmentVolumeM3.toFixed(1)),
    estimatedMassKg,
    estimatedLaunchCostM,
  };
}
