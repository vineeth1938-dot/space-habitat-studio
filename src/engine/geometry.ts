import {
  CREW_MAX,
  CREW_MIN,
  DURATION_MAX_DAYS,
  DURATION_MIN_DAYS,
  GRID_STEP_M,
} from './constants';
import { HabitatHull, MissionConfig, ZoneModule } from '../types/habitat';

export function clamp(val: number, min: number, max: number): number {
  if (!Number.isFinite(val)) return min;
  if (min > max) return min;
  return Math.min(max, Math.max(min, val));
}

export function safeDiv(num: number, den: number, fallback = 0): number {
  if (!Number.isFinite(num) || !Number.isFinite(den) || Math.abs(den) < 1e-9) {
    return fallback;
  }
  return num / den;
}

export function snapGrid(val: number, step: number = GRID_STEP_M): number {
  if (!Number.isFinite(val) || step <= 0) return 0;
  return Math.round(val / step) * step;
}

export function cloneData<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}

export function sanitizeMission(mission: MissionConfig): MissionConfig {
  const widthM = snapGrid(clamp(mission.hull.widthM, 4.0, 24.0));
  const depthM =
    mission.hull.type === 'dome'
      ? widthM
      : snapGrid(clamp(mission.hull.depthM, 4.0, 20.0));
  const deckHeightM = Number(clamp(mission.hull.deckHeightM, 2.0, 4.0).toFixed(2));
  const decks =
    mission.hull.type === 'multideck'
      ? Math.round(clamp(mission.hull.decks, 2, 3))
      : Math.round(clamp(mission.hull.decks, 1, 3));

  return {
    ...mission,
    name: (mission.name || 'Habitat Layout').slice(0, 80),
    crewSize: Math.round(clamp(mission.crewSize, CREW_MIN, CREW_MAX)),
    durationDays: Math.round(clamp(mission.durationDays, DURATION_MIN_DAYS, DURATION_MAX_DAYS)),
    solarFlareSim: Boolean(mission.solarFlareSim),
    hull: {
      ...mission.hull,
      widthM,
      depthM,
      deckHeightM,
      decks,
    },
  };
}

/**
 * Checks whether a 2D point (x, y) lies inside the usable hull floorplan footprint.
 */
export function isPointInHull(x: number, y: number, hull: HabitatHull): boolean {
  if (x < -1e-6 || y < -1e-6 || x > hull.widthM + 1e-6 || y > hull.depthM + 1e-6) {
    return false;
  }
  if (hull.type === 'dome') {
    const cx = hull.widthM / 2;
    const cy = hull.depthM / 2;
    const r = Math.min(hull.widthM, hull.depthM) / 2;
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= r * r + 1e-5;
  }
  return true;
}

/**
 * Checks whether an axis-aligned rectangular module lies completely inside the hull on a valid deck.
 */
export function isModuleInHull(mod: ZoneModule, hull: HabitatHull): boolean {
  if (mod.deck < 0 || mod.deck >= hull.decks) return false;
  if (mod.w <= 0 || mod.h <= 0) return false;
  const eps = 0.02;
  const pts: Array<[number, number]> = [
    [mod.x + eps, mod.y + eps],
    [mod.x + mod.w - eps, mod.y + eps],
    [mod.x + eps, mod.y + mod.h - eps],
    [mod.x + mod.w - eps, mod.y + mod.h - eps],
  ];
  return pts.every(([px, py]) => isPointInHull(px, py, hull));
}

/**
 * Clamps a module's dimensions and (x, y) coordinates on the 0.5m grid so it stays inside the hull boundary.
 */
export function clampModuleToHull(mod: ZoneModule, hull: HabitatHull): ZoneModule {
  const maxDomeBox =
    hull.type === 'dome'
      ? Math.max(1.0, Math.floor(((Math.min(hull.widthM, hull.depthM) / Math.SQRT2) - 0.1) / GRID_STEP_M) * GRID_STEP_M)
      : hull.widthM;

  const w = clamp(snapGrid(mod.w), GRID_STEP_M * 2, Math.min(hull.widthM, hull.type === 'dome' ? maxDomeBox : hull.widthM));
  const h = clamp(snapGrid(mod.h), GRID_STEP_M * 2, Math.min(hull.depthM, hull.type === 'dome' ? maxDomeBox : hull.depthM));
  let x = snapGrid(clamp(mod.x, 0, Math.max(0, hull.widthM - w)));
  let y = snapGrid(clamp(mod.y, 0, Math.max(0, hull.depthM - h)));
  const deck = Math.round(clamp(mod.deck, 0, Math.max(0, hull.decks - 1)));

  if (hull.type === 'dome') {
    const candidate = { ...mod, x, y, w, h, deck };
    if (!isModuleInHull(candidate, hull)) {
      const cx = hull.widthM / 2;
      const cy = hull.depthM / 2;
      for (let step = 0.92; step >= 0; step -= 0.06) {
        const mx = x + w / 2;
        const my = y + h / 2;
        const nx = snapGrid(cx + (mx - cx) * step - w / 2);
        const ny = snapGrid(cy + (my - cy) * step - h / 2);
        if (isModuleInHull({ ...candidate, x: nx, y: ny }, hull)) {
          x = nx;
          y = ny;
          break;
        }
      }
    }
  }

  return { ...mod, x, y, w, h, deck };
}

export function overlapArea2D(a: ZoneModule, b: ZoneModule): number {
  if (a.deck !== b.deck) return 0;
  const ox = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const oy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return ox * oy;
}

export function edgeDistance2D(a: ZoneModule, b: ZoneModule): number {
  const dx = Math.max(0, Math.max(a.x - (b.x + b.w), b.x - (a.x + a.w)));
  const dy = Math.max(0, Math.max(a.y - (b.y + b.h), b.y - (a.y + a.h)));
  return Math.hypot(dx, dy);
}

export function usableFloorAreaPerDeckM2(hull: HabitatHull): number {
  if (hull.type === 'dome') {
    const r = Math.min(hull.widthM, hull.depthM) / 2;
    return Math.PI * r * r;
  }
  return hull.widthM * hull.depthM;
}
