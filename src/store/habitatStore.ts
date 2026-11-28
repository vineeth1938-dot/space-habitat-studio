import { create } from 'zustand';
import {
  EvaluationReport,
  HullGeometry,
  LayoutSnapshot,
  LightingMode,
  MissionConfig,
  OptimizationSummary,
  SpaceWeatherTelemetry,
  StormPresetId,
  StormStressResult,
  ZoneNode,
  ZoneType,
} from '../types/habitat';
import { HABITAT_PRESETS } from '../data/presets';
import { ZONE_CATALOG } from '../data/zoneCatalog';
import { evaluateHabitat } from '../engine/ruleEngine';
import { autoOptimizeLayout } from '../engine/autoOptimize';
import {
  clampZoneToHull,
  getHullBounds,
  getRectOverlapArea,
  isRectInsideHull,
  resolveDeckAndHullCollisions,
  sanitizeMissionConfig,
  sanitizeZoneNode,
  snapToGrid,
} from '../engine/hullMath';
import {
  evaluateStormShelterStress,
  fetchNoaaSpaceWeather,
  getStormPreset,
} from '../services/noaaSpaceWeather';

export type ActiveView = 'studio' | 'compare' | 'weather';
export type MobileDrawer = 'none' | 'left' | 'right';
export const LIVE_SNAPSHOT_ID = '__live__';

const SNAPSHOT_STORAGE_KEY = 'shs_carbon4_snapshots_v1';

interface HistoryEntry {
  mission: MissionConfig;
  zones: ZoneNode[];
}

export interface HabitatState {
  activePresetId: string;
  mission: MissionConfig;
  zones: ZoneNode[];
  report: EvaluationReport;

  activeDeck: number;
  activeView: ActiveView;
  mobileDrawer: MobileDrawer;
  selectedZoneId: string | null;
  highlightedZoneIds: string[];
  focusPulseTick: number;

  showEgressOverlay: boolean;
  showHazardOverlay: boolean;
  showAirflowOverlay: boolean;
  showOrientationCues: boolean;
  lightingMode: LightingMode;

  judgeTourActive: boolean;
  judgeTourStep: 0 | 1 | 2 | 3;
  auditModalOpen: boolean;

  past: HistoryEntry[];
  future: HistoryEntry[];
  lastOptimization: OptimizationSummary | null;

  snapshots: LayoutSnapshot[];
  compareIds: [string, string];

  weather: SpaceWeatherTelemetry;
  weatherLoading: boolean;
  stormStress: StormStressResult;

  // Actions
  loadPreset: (presetId: string) => void;
  updateMission: (partial: Partial<Omit<MissionConfig, 'hull'>>) => void;
  updateHull: (partial: Partial<HullGeometry>) => void;
  addZone: (type: ZoneType, x?: number, y?: number) => void;
  updateZone: (id: string, partial: Partial<ZoneNode>, recordHistory?: boolean) => void;
  moveZone: (id: string, x: number, y: number, recordHistory?: boolean) => void;
  resizeZone: (
    id: string,
    width: number,
    height: number,
    x?: number,
    y?: number,
    recordHistory?: boolean
  ) => void;
  rotateZone: (id: string) => void;
  toggleZoneLock: (id: string) => void;
  duplicateZone: (id: string) => void;
  deleteZone: (id: string) => void;
  clearAllZones: () => void;
  selectZone: (id: string | null) => void;
  highlightZones: (ids: string[]) => void;
  setActiveDeck: (deck: number) => void;
  setActiveView: (view: ActiveView) => void;
  setMobileDrawer: (drawer: MobileDrawer) => void;
  toggleEgressOverlay: () => void;
  toggleHazardOverlay: () => void;
  toggleAirflowOverlay: () => void;
  toggleOrientationCues: () => void;
  setLightingMode: (mode: LightingMode) => void;
  setJudgeTour: (active: boolean, step?: 0 | 1 | 2 | 3) => void;
  runJudgeTourStep: (step: 0 | 1 | 2 | 3) => void;
  setAuditModalOpen: (open: boolean) => void;
  undo: () => void;
  redo: () => void;
  runAutoOptimize: () => void;
  revertOptimization: () => void;
  dismissOptimization: () => void;
  saveSnapshot: (customName?: string) => LayoutSnapshot;
  deleteSnapshot: (id: string) => void;
  loadSnapshotIntoStudio: (id: string) => void;
  setComparePair: (leftId: string, rightId: string) => void;
  fetchLiveWeather: () => Promise<void>;
  selectWeatherPreset: (presetId: Exclude<StormPresetId, 'live'>) => void;
}

const initialPreset = HABITAT_PRESETS[0];
const initialMission: MissionConfig = sanitizeMissionConfig(structuredClone(initialPreset.mission));
const initialZones: ZoneNode[] = structuredClone(initialPreset.zones).map((z) =>
  clampZoneToHull(z, initialMission.hull)
);
const initialReport = evaluateHabitat(initialMission, initialZones);
const initialWeather = getStormPreset('quiet_b');
const initialStormStress = evaluateStormShelterStress(
  initialMission,
  initialZones,
  initialReport,
  initialWeather
);

const seedSnapshotA: LayoutSnapshot = {
  id: 'snap-baseline',
  name: 'Cramped Faulty Baseline (Before)',
  timestamp: Date.now() - 120000,
  mission: structuredClone(initialMission),
  zones: structuredClone(initialZones),
  report: initialReport,
};

const issPreset = HABITAT_PRESETS[1];
const issMission = sanitizeMissionConfig(structuredClone(issPreset.mission));
const issZones = structuredClone(issPreset.zones).map((z) => clampZoneToHull(z, issMission.hull));
const issReport = evaluateHabitat(issMission, issZones);

const seedSnapshotB: LayoutSnapshot = {
  id: 'snap-iss-heritage',
  name: 'ISS Destiny / Node Reference',
  timestamp: Date.now() - 60000,
  mission: issMission,
  zones: issZones,
  report: issReport,
};

function loadPersistedSnapshots(): LayoutSnapshot[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [seedSnapshotA, seedSnapshotB];
    }
    const raw = window.localStorage.getItem(SNAPSHOT_STORAGE_KEY);
    if (!raw) return [seedSnapshotA, seedSnapshotB];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [seedSnapshotA, seedSnapshotB];
    }
    const rebuilt: LayoutSnapshot[] = [];
    for (const item of parsed.slice(0, 24)) {
      if (!item || typeof item.id !== 'string' || !item.mission || !Array.isArray(item.zones)) {
        continue;
      }
      const m = sanitizeMissionConfig(item.mission);
      const zs = (item.zones as unknown[])
        .map((z, idx) => sanitizeZoneNode(z, m.hull, idx))
        .filter((z): z is ZoneNode => z !== null);
      if (zs.length === 0 && item.zones.length > 0) continue;
      const rep = evaluateHabitat(m, zs);
      rebuilt.push({
        id: item.id,
        name: String(item.name || m.name).slice(0, 60),
        timestamp: Number(item.timestamp) || Date.now(),
        mission: m,
        zones: zs,
        report: rep,
      });
    }
    if (rebuilt.length >= 2) return rebuilt;
    return [seedSnapshotA, seedSnapshotB];
  } catch {
    return [seedSnapshotA, seedSnapshotB];
  }
}

function persistSnapshots(snapshots: LayoutSnapshot[]) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const compact = snapshots.slice(-24).map((s) => ({
      id: s.id,
      name: s.name,
      timestamp: s.timestamp,
      mission: s.mission,
      zones: s.zones,
    }));
    window.localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(compact));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

const initialSnapshots = loadPersistedSnapshots();

function recompute(
  mission: MissionConfig,
  zones: ZoneNode[],
  weather: SpaceWeatherTelemetry
) {
  const report = evaluateHabitat(mission, zones);
  const stormStress = evaluateStormShelterStress(mission, zones, report, weather);
  return { report, stormStress };
}

function pushHistory(state: HabitatState): HistoryEntry[] {
  const entry: HistoryEntry = {
    mission: structuredClone(state.mission),
    zones: structuredClone(state.zones),
  };
  return [...state.past.slice(-49), entry];
}

function findOpenPlacement(
  mission: MissionConfig,
  zones: ZoneNode[],
  deck: number,
  w: number,
  h: number
): { x: number; y: number } {
  const { width, depth, wall } = getHullBounds(mission.hull);
  const deckZones = zones.filter((z) => z.deck === deck);

  for (let y = snapToGrid(wall + 0.25); y <= depth - wall - h; y += 0.25) {
    for (let x = snapToGrid(wall + 0.25); x <= width - wall - w; x += 0.25) {
      const sx = snapToGrid(x);
      const sy = snapToGrid(y);
      if (!isRectInsideHull(sx, sy, w, h, mission.hull)) continue;
      const probe: ZoneNode = {
        id: '__probe__',
        type: 'stowage',
        label: '',
        deck,
        x: sx,
        y: sy,
        width: w,
        height: h,
        zHeight: 2.2,
        rotation: 0,
      };
      if (deckZones.every((other) => getRectOverlapArea(probe, other) < 0.01)) {
        return { x: sx, y: sy };
      }
    }
  }
  return {
    x: snapToGrid(Math.max(wall + 0.25, (width - w) / 2)),
    y: snapToGrid(Math.max(wall + 0.25, (depth - h) / 2)),
  };
}

export const useHabitatStore = create<HabitatState>((set, get) => ({
  activePresetId: initialPreset.id,
  mission: initialMission,
  zones: initialZones,
  report: initialReport,

  activeDeck: 0,
  activeView: 'studio',
  mobileDrawer: 'none',
  selectedZoneId: null,
  highlightedZoneIds: [],
  focusPulseTick: 0,

  showEgressOverlay: true,
  showHazardOverlay: true,
  showAirflowOverlay: false,
  showOrientationCues: true,
  lightingMode: 'day',

  judgeTourActive: false,
  judgeTourStep: 0,
  auditModalOpen: false,

  past: [],
  future: [],
  lastOptimization: null,

  snapshots: initialSnapshots,
  compareIds: [initialSnapshots[0]?.id ?? seedSnapshotA.id, LIVE_SNAPSHOT_ID],

  weather: initialWeather,
  weatherLoading: false,
  stormStress: initialStormStress,

  loadPreset: (presetId) => {
    const preset = HABITAT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const state = get();
    const mission = sanitizeMissionConfig(structuredClone(preset.mission));
    const zones = structuredClone(preset.zones).map((z) => clampZoneToHull(z, mission.hull));
    const { report, stormStress } = recompute(mission, zones, state.weather);
    set({
      activePresetId: presetId,
      mission,
      zones,
      report,
      stormStress,
      activeDeck: 0,
      selectedZoneId: null,
      highlightedZoneIds: [],
      lastOptimization: null,
      past: pushHistory(state),
      future: [],
    });
  },

  updateMission: (partial) => {
    const state = get();
    const mission = sanitizeMissionConfig({ ...state.mission, ...partial });
    const { report, stormStress } = recompute(mission, state.zones, state.weather);
    set({
      mission,
      report,
      stormStress,
      past: pushHistory(state),
      future: [],
    });
  },

  updateHull: (partial) => {
    const state = get();
    const nextHullRaw: HullGeometry = { ...state.mission.hull, ...partial };
    if (nextHullRaw.type === 'surface_dome') {
      nextHullRaw.length = nextHullRaw.diameter;
    } else if (state.mission.hull.type === 'surface_dome' && partial.type && !partial.length) {
      nextHullRaw.length = Math.max(12.0, nextHullRaw.diameter * 1.8);
    }
    const mission = sanitizeMissionConfig({ ...state.mission, hull: nextHullRaw });
    const clampedZones = state.zones.map((z) => clampZoneToHull(z, mission.hull));
    const decksReduced = mission.hull.decks < state.mission.hull.decks;
    const shrankBounds =
      mission.hull.diameter < state.mission.hull.diameter ||
      mission.hull.length < state.mission.hull.length ||
      mission.hull.type !== state.mission.hull.type;
    const nextZones =
      decksReduced || shrankBounds
        ? resolveDeckAndHullCollisions(mission, clampedZones)
        : clampedZones;
    const activeDeck = Math.min(state.activeDeck, mission.hull.decks - 1);
    const { report, stormStress } = recompute(mission, nextZones, state.weather);
    set({
      mission,
      zones: nextZones,
      activeDeck,
      report,
      stormStress,
      past: pushHistory(state),
      future: [],
    });
  },

  addZone: (type, x, y) => {
    const state = get();
    const cat = ZONE_CATALOG[type];
    if (!cat) return;
    const pos =
      typeof x === 'number' && typeof y === 'number' && Number.isFinite(x) && Number.isFinite(y)
        ? { x: snapToGrid(x), y: snapToGrid(y) }
        : findOpenPlacement(
            state.mission,
            state.zones,
            state.activeDeck,
            cat.defaultWidth,
            cat.defaultHeight
          );
    const count = state.zones.filter((z) => z.type === type).length + 1;
    const rawZone: ZoneNode = {
      id: `${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
      type,
      label: count > 1 ? `${cat.label} #${count}` : cat.label,
      deck: state.activeDeck,
      x: pos.x,
      y: pos.y,
      width: cat.defaultWidth,
      height: cat.defaultHeight,
      zHeight: cat.defaultZHeight,
      rotation: 0,
    };
    const newZone = clampZoneToHull(rawZone, state.mission.hull);
    const zones = [...state.zones, newZone];
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      selectedZoneId: newZone.id,
      highlightedZoneIds: [newZone.id],
      mobileDrawer: 'none',
      past: pushHistory(state),
      future: [],
    });
  },

  updateZone: (id, partial, recordHistory = true) => {
    const state = get();
    const zones = state.zones.map((z) =>
      z.id === id ? clampZoneToHull({ ...z, ...partial }, state.mission.hull) : z
    );
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      ...(recordHistory ? { past: pushHistory(state), future: [] } : {}),
    });
  },

  moveZone: (id, x, y, recordHistory = false) => {
    const state = get();
    const target = state.zones.find((z) => z.id === id);
    if (!target || target.locked) return;
    const sx = snapToGrid(x);
    const sy = snapToGrid(y);
    const zones = state.zones.map((z) =>
      z.id === id ? clampZoneToHull({ ...z, x: sx, y: sy }, state.mission.hull) : z
    );
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      ...(recordHistory ? { past: pushHistory(state), future: [] } : {}),
    });
  },

  resizeZone: (id, width, height, x, y, recordHistory = false) => {
    const state = get();
    const target = state.zones.find((z) => z.id === id);
    if (!target || target.locked) return;
    const zones = state.zones.map((z) => {
      if (z.id !== id) return z;
      const cat = ZONE_CATALOG[z.type] ?? ZONE_CATALOG.stowage;
      const nw = Math.max(cat.minWidth, snapToGrid(width));
      const nh = Math.max(cat.minHeight, snapToGrid(height));
      return clampZoneToHull(
        {
          ...z,
          width: nw,
          height: nh,
          x: typeof x === 'number' ? snapToGrid(x) : z.x,
          y: typeof y === 'number' ? snapToGrid(y) : z.y,
        },
        state.mission.hull
      );
    });
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      ...(recordHistory ? { past: pushHistory(state), future: [] } : {}),
    });
  },

  rotateZone: (id) => {
    const state = get();
    const target = state.zones.find((z) => z.id === id);
    if (!target || target.locked) return;
    const zones = state.zones.map((z) => {
      if (z.id !== id) return z;
      const rotated: ZoneNode = {
        ...z,
        width: z.height,
        height: z.width,
        rotation: ((z.rotation + 90) % 360) as 0 | 90 | 180 | 270,
      };
      return clampZoneToHull(rotated, state.mission.hull);
    });
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      past: pushHistory(state),
      future: [],
    });
  },

  toggleZoneLock: (id) => {
    const state = get();
    const zones = state.zones.map((z) => (z.id === id ? { ...z, locked: !z.locked } : z));
    set({
      zones,
      past: pushHistory(state),
      future: [],
    });
  },

  duplicateZone: (id) => {
    const state = get();
    const src = state.zones.find((z) => z.id === id);
    if (!src) return;
    const pos = findOpenPlacement(state.mission, state.zones, src.deck, src.width, src.height);
    const sameTypeCount = state.zones.filter((z) => z.type === src.type).length + 1;
    const baseCat = ZONE_CATALOG[src.type] ?? ZONE_CATALOG.stowage;
    const clone: ZoneNode = clampZoneToHull(
      {
        ...src,
        id: `${src.type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
        label: `${baseCat.label} #${sameTypeCount}`,
        x: pos.x,
        y: pos.y,
        locked: false,
      },
      state.mission.hull
    );
    const zones = [...state.zones, clone];
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      selectedZoneId: clone.id,
      highlightedZoneIds: [clone.id],
      activeDeck: clone.deck,
      past: pushHistory(state),
      future: [],
    });
  },

  deleteZone: (id) => {
    const state = get();
    const target = state.zones.find((z) => z.id === id);
    if (!target || target.locked) return;
    const zones = state.zones.filter((z) => z.id !== id);
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      selectedZoneId: state.selectedZoneId === id ? null : state.selectedZoneId,
      highlightedZoneIds: state.highlightedZoneIds.filter((zid) => zid !== id),
      past: pushHistory(state),
      future: [],
    });
  },

  clearAllZones: () => {
    const state = get();
    if (state.zones.length === 0) return;
    const { report, stormStress } = recompute(state.mission, [], state.weather);
    set({
      zones: [],
      report,
      stormStress,
      selectedZoneId: null,
      highlightedZoneIds: [],
      past: pushHistory(state),
      future: [],
    });
  },

  selectZone: (id) => set({ selectedZoneId: id, highlightedZoneIds: id ? [id] : [] }),

  highlightZones: (ids) => {
    const state = get();
    if (ids.length > 0) {
      const first = state.zones.find((z) => z.id === ids[0]);
      set({
        highlightedZoneIds: ids,
        selectedZoneId: ids[0],
        activeDeck: first ? first.deck : state.activeDeck,
        focusPulseTick: state.focusPulseTick + 1,
        mobileDrawer: 'none',
      });
    } else {
      set({ highlightedZoneIds: [], selectedZoneId: null });
    }
  },

  setActiveDeck: (deck) => {
    const state = get();
    const safeDeck = Math.max(0, Math.min(state.mission.hull.decks - 1, Math.round(deck)));
    set({ activeDeck: safeDeck });
  },

  setActiveView: (view) => set({ activeView: view, mobileDrawer: 'none' }),
  setMobileDrawer: (drawer) => set({ mobileDrawer: drawer }),
  toggleEgressOverlay: () => set((s) => ({ showEgressOverlay: !s.showEgressOverlay })),
  toggleHazardOverlay: () => set((s) => ({ showHazardOverlay: !s.showHazardOverlay })),
  toggleAirflowOverlay: () => set((s) => ({ showAirflowOverlay: !s.showAirflowOverlay })),
  toggleOrientationCues: () => set((s) => ({ showOrientationCues: !s.showOrientationCues })),
  setLightingMode: (mode) => set({ lightingMode: mode }),

  setJudgeTour: (active, step = 0) => {
    set({ judgeTourActive: active, judgeTourStep: step });
    if (active) {
      get().runJudgeTourStep(step);
    }
  },

  runJudgeTourStep: (step) => {
    const state = get();
    if (step === 0) {
      state.loadPreset('cramped-faulty-baseline');
      const fresh = get();
      const firstCrit = fresh.report.violations.find((v) => v.severity === 'CRITICAL');
      set({
        activeView: 'studio',
        judgeTourStep: 0,
        lightingMode: 'day',
        showHazardOverlay: true,
        showEgressOverlay: true,
        showAirflowOverlay: true,
        highlightedZoneIds: firstCrit?.affectedZoneIds ?? [],
        selectedZoneId: firstCrit?.affectedZoneIds[0] ?? null,
      });
    } else if (step === 1) {
      set({ activeView: 'studio', judgeTourStep: 1 });
      get().runAutoOptimize();
    } else if (step === 2) {
      get().selectWeatherPreset('extreme_x10');
      set({ activeView: 'weather', judgeTourStep: 2 });
    } else if (step === 3) {
      const cur = get();
      const baseId = cur.snapshots[0]?.id ?? seedSnapshotA.id;
      set({
        activeView: 'compare',
        judgeTourStep: 3,
        compareIds: [baseId, LIVE_SNAPSHOT_ID],
      });
    }
  },

  setAuditModalOpen: (open) => set({ auditModalOpen: open }),

  undo: () => {
    const state = get();
    if (state.past.length === 0) return;
    const prev = state.past[state.past.length - 1];
    const currentEntry: HistoryEntry = {
      mission: structuredClone(state.mission),
      zones: structuredClone(state.zones),
    };
    const validIds = new Set(prev.zones.map((z) => z.id));
    const { report, stormStress } = recompute(prev.mission, prev.zones, state.weather);
    set({
      mission: prev.mission,
      zones: prev.zones,
      activeDeck: Math.min(state.activeDeck, prev.mission.hull.decks - 1),
      selectedZoneId:
        state.selectedZoneId && validIds.has(state.selectedZoneId) ? state.selectedZoneId : null,
      highlightedZoneIds: state.highlightedZoneIds.filter((id) => validIds.has(id)),
      report,
      stormStress,
      past: state.past.slice(0, -1),
      future: [currentEntry, ...state.future.slice(0, 49)],
      lastOptimization: null,
    });
  },

  redo: () => {
    const state = get();
    if (state.future.length === 0) return;
    const next = state.future[0];
    const currentEntry: HistoryEntry = {
      mission: structuredClone(state.mission),
      zones: structuredClone(state.zones),
    };
    const validIds = new Set(next.zones.map((z) => z.id));
    const { report, stormStress } = recompute(next.mission, next.zones, state.weather);
    set({
      mission: next.mission,
      zones: next.zones,
      activeDeck: Math.min(state.activeDeck, next.mission.hull.decks - 1),
      selectedZoneId:
        state.selectedZoneId && validIds.has(state.selectedZoneId) ? state.selectedZoneId : null,
      highlightedZoneIds: state.highlightedZoneIds.filter((id) => validIds.has(id)),
      report,
      stormStress,
      past: [...state.past, currentEntry],
      future: state.future.slice(1),
    });
  },

  runAutoOptimize: () => {
    const state = get();
    if (state.zones.length === 0) return;
    const previousZones = structuredClone(state.zones);
    const res = autoOptimizeLayout(state.mission, state.zones, 42);
    const stormStress = evaluateStormShelterStress(
      state.mission,
      res.zones,
      res.afterReport,
      state.weather
    );
    const beforeViolations = res.beforeReport.criticalCount + res.beforeReport.warningCount;
    const afterViolations = res.afterReport.criticalCount + res.afterReport.warningCount;
    set({
      zones: res.zones,
      report: res.afterReport,
      stormStress,
      highlightedZoneIds: [],
      selectedZoneId: null,
      past: pushHistory(state),
      future: [],
      lastOptimization: {
        beforeScore: res.beforeReport.score,
        afterScore: res.afterReport.score,
        beforeCritical: res.beforeReport.criticalCount,
        afterCritical: res.afterReport.criticalCount,
        beforeWarning: res.beforeReport.warningCount,
        afterWarning: res.afterReport.warningCount,
        violationsFixed: Math.max(0, beforeViolations - afterViolations),
        beforeWorstEgressM: res.beforeReport.egress.worstCaseDistanceM,
        afterWorstEgressM: res.afterReport.egress.worstCaseDistanceM,
        elapsedMs: res.elapsedMs,
        iterations: res.iterations,
        previousZones,
      },
    });
  },

  revertOptimization: () => {
    const state = get();
    if (!state.lastOptimization) return;
    const restored = structuredClone(state.lastOptimization.previousZones);
    const validIds = new Set(restored.map((z) => z.id));
    const { report, stormStress } = recompute(state.mission, restored, state.weather);
    set({
      zones: restored,
      selectedZoneId:
        state.selectedZoneId && validIds.has(state.selectedZoneId) ? state.selectedZoneId : null,
      highlightedZoneIds: state.highlightedZoneIds.filter((id) => validIds.has(id)),
      report,
      stormStress,
      lastOptimization: null,
    });
  },

  dismissOptimization: () => set({ lastOptimization: null }),

  saveSnapshot: (customName) => {
    const state = get();
    const idx = state.snapshots.length + 1;
    const snap: LayoutSnapshot = {
      id: `snap-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
      name: customName?.trim() || `${state.mission.name} — Rev ${idx} (${state.report.score}/100)`,
      timestamp: Date.now(),
      mission: structuredClone(state.mission),
      zones: structuredClone(state.zones),
      report: state.report,
    };
    const snapshots = [...state.snapshots, snap];
    persistSnapshots(snapshots);
    const leftId =
      state.compareIds[0] && state.compareIds[0] !== snap.id
        ? state.compareIds[0]
        : state.snapshots[0]?.id ?? snap.id;
    set({
      snapshots,
      compareIds: [leftId, snap.id],
    });
    return snap;
  },

  deleteSnapshot: (id) => {
    const state = get();
    if (state.snapshots.length <= 1) return;
    const snapshots = state.snapshots.filter((s) => s.id !== id);
    persistSnapshots(snapshots);
    const [l, r] = state.compareIds;
    set({
      snapshots,
      compareIds: [
        l === LIVE_SNAPSHOT_ID || snapshots.some((s) => s.id === l) ? l : snapshots[0].id,
        r === LIVE_SNAPSHOT_ID || snapshots.some((s) => s.id === r) ? r : LIVE_SNAPSHOT_ID,
      ],
    });
  },

  loadSnapshotIntoStudio: (id) => {
    const state = get();
    if (id === LIVE_SNAPSHOT_ID) {
      set({ activeView: 'studio' });
      return;
    }
    const snap = state.snapshots.find((s) => s.id === id);
    if (!snap) return;
    const mission = sanitizeMissionConfig(structuredClone(snap.mission));
    const zones = structuredClone(snap.zones).map((z) => clampZoneToHull(z, mission.hull));
    const { report, stormStress } = recompute(mission, zones, state.weather);
    set({
      mission,
      zones,
      report,
      stormStress,
      activeDeck: 0,
      activeView: 'studio',
      selectedZoneId: null,
      highlightedZoneIds: [],
      lastOptimization: null,
      past: pushHistory(state),
      future: [],
    });
  },

  setComparePair: (leftId, rightId) => set({ compareIds: [leftId, rightId] }),

  fetchLiveWeather: async () => {
    set({ weatherLoading: true });
    const telemetry = await fetchNoaaSpaceWeather();
    const state = get();
    const stormStress = evaluateStormShelterStress(
      state.mission,
      state.zones,
      state.report,
      telemetry
    );
    const isSevere = telemetry.protonFluxPfu >= 100 || telemetry.xrayClass.startsWith('X');
    set({
      weather: telemetry,
      weatherLoading: false,
      stormStress,
      ...(isSevere ? { lightingMode: 'emergency' as const } : {}),
    });
  },

  selectWeatherPreset: (presetId) => {
    const telemetry = getStormPreset(presetId);
    const state = get();
    const stormStress = evaluateStormShelterStress(
      state.mission,
      state.zones,
      state.report,
      telemetry
    );
    const nextLighting: LightingMode =
      presetId === 'extreme_x10' || presetId === 'moderate_m5' ? 'emergency' : 'day';
    set({
      weather: telemetry,
      stormStress,
      lightingMode: nextLighting,
    });
  },
}));
