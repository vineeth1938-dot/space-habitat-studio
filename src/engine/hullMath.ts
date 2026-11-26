import { HullGeometry, MissionConfig, ZoneNode } from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';

export const GRID_STEP = 0.25;

export function snapToGrid(value: number, step: number = GRID_STEP): number {
  return Math.round(value / step) * step;
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
  const deckHeight =
    hull.type === 'surface_dome'
      ? Math.max(2.2, Math.min(3.0, (hull.diameter * 0.5) / hull.decks))
      : Math.max(2.2, Math.min(2.6, (hull.diameter * 0.85) / hull.decks));
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

  // Rounded rectangle (cylindrical pressure vessel with end domes)
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
export function computeHullMetrics(mission: MissionConfig, zones: ZoneNode[]) {
  const { hull } = mission;
  const rOuter = hull.diameter / 2;
  const rInner = Math.max(0.5, rOuter - hull.wallThickness);

  let grossVolumeM3 = 0;
  let innerVolumeM3 = 0;

  if (hull.type === 'surface_dome') {
    // Hemispherical dome + short cylindrical skirt (0.25 * r)
    grossVolumeM3 = (2 / 3) * Math.PI * Math.pow(rOuter, 3) + Math.PI * rOuter * rOuter * 0.6;
    innerVolumeM3 = (2 / 3) * Math.PI * Math.pow(rInner, 3) + Math.PI * rInner * rInner * 0.5;
  } else {
    // Cylinder with elliptical/hemispherical endcaps
    const cylLen = Math.max(1, hull.length - hull.diameter * 0.35);
    grossVolumeM3 =
      Math.PI * rOuter * rOuter * cylLen + (4 / 3) * Math.PI * rOuter * rOuter * (hull.diameter * 0.175);
    innerVolumeM3 =
      Math.PI * rInner * rInner * Math.max(0.5, cylLen - hull.wallThickness) +
      (4 / 3) * Math.PI * rInner * rInner * Math.max(0.2, hull.diameter * 0.175 - hull.wallThickness);
  }

  // Account for multi-deck floor slabs as structural volume
  const deckSlabVolume =
    hull.decks > 1
      ? (hull.decks - 1) * (hull.type === 'surface_dome' ? Math.PI * rInner * rInner * 0.8 : hull.length * hull.diameter * 0.72) * 0.18
      : 0;

  const structureVolumeM3 = Math.max(0, grossVolumeM3 - innerVolumeM3 + deckSlabVolume);

  // Structural shell mass (kg/m^3 of shell material): inflatable Kevlar/Vectran is ~45% lighter per m^3 than Al-Li rigid hull
  const shellDensity =
    hull.type === 'inflatable' ? 210 : hull.type === 'surface_dome' ? 320 : 390;
  const structuralMassKg = structureVolumeM3 * shellDensity;

  // Outfitting & equipment mass from placed zones
  let outfittingMassKg = 0;
  let equipmentVolumeM3 = 0;
  for (const z of zones) {
    const cat = ZONE_CATALOG[z.type];
    const zVol = z.width * z.height * z.zHeight;
    equipmentVolumeM3 += zVol * cat.equipmentFraction;
    outfittingMassKg += zVol * cat.massDensityKgPerM3 * 0.38;
  }

  // Consumables mass (water, food, O2) ~ 4.2 kg / crew / day (with closed-loop ECLSS recycling)
  const consumablesMassKg = mission.crewSize * mission.durationDays * 4.2;

  const estimatedMassKg = Math.round(structuralMassKg + outfittingMassKg + consumablesMassKg);

  // Launch cost estimate ($M USD): ~$12,500/kg to TLI / Deep Space (SLS/Starship blended heavy-lift index)
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
