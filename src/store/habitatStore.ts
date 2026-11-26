import { create } from 'zustand';
import {
  EvaluationReport,
  HullGeometry,
  LayoutSnapshot,
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
import { getHullBounds, getRectOverlapArea, isRectInsideHull, snapToGrid } from '../engine/hullMath';
import {
  evaluateStormShelterStress,
  fetchNoaaSpaceWeather,
  getStormPreset,
} from '../services/noaaSpaceWeather';

export type ActiveView = 'studio' | 'compare' | 'weather';

interface HistoryEntry {
  mission: MissionConfig;
  zones: ZoneNode[];
}

interface HabitatState {
  activePresetId: string;
  mission: MissionConfig;
  zones: ZoneNode[];
  report: EvaluationReport;

  activeDeck: number;
  activeView: ActiveView;
  selectedZoneId: string | null;
  highlightedZoneIds: string[];

  showEgressOverlay: boolean;
  showHazardOverlay: boolean;

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
  deleteZone: (id: string) => void;
  selectZone: (id: string | null) => void;
  highlightZones: (ids: string[]) => void;
  setActiveDeck: (deck: number) => void;
  setActiveView: (view: ActiveView) => void;
  toggleEgressOverlay: () => void;
  toggleHazardOverlay: () => void;
  undo: () => void;
  redo: () => void;
  runAutoOptimize: () => void;
  revertOptimization: () => void;
  dismissOptimization: () => void;
  saveSnapshot: (customName?: string) => void;
  deleteSnapshot: (id: string) => void;
  setComparePair: (leftId: string, rightId: string) => void;
  fetchLiveWeather: () => Promise<void>;
  selectWeatherPreset: (presetId: Exclude<StormPresetId, 'live'>) => void;
}

const initialPreset = HABITAT_PRESETS[0];
const initialMission: MissionConfig = structuredClone(initialPreset.mission);
const initialZones: ZoneNode[] = structuredClone(initialPreset.zones);
const initialReport = evaluateHabitat(initialMission, initialZones);
const initialWeather = getStormPreset('quiet_b');
const initialStormStress = evaluateStormShelterStress(
  initialMission,
  initialZones,
  initialReport,
  initialWeather
);

const initialSnapshotA: LayoutSnapshot = {
  id: 'snap-baseline',
  name: 'Baseline Layout A (Faulty)',
  timestamp: Date.now() - 60000,
  mission: structuredClone(initialMission),
  zones: structuredClone(initialZones),
  report: initialReport,
};

// Also pre-seed Gateway preset as a second comparison reference so Compare Mode works immediately
const gatewayPreset = HABITAT_PRESETS[1];
const gatewayReport = evaluateHabitat(gatewayPreset.mission, gatewayPreset.zones);
const initialSnapshotB: LayoutSnapshot = {
  id: 'snap-gateway',
  name: 'Lunar Gateway Reference',
  timestamp: Date.now() - 30000,
  mission: structuredClone(gatewayPreset.mission),
  zones: structuredClone(gatewayPreset.zones),
  report: gatewayReport,
};

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
  return [...state.past.slice(-39), entry];
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
  selectedZoneId: null,
  highlightedZoneIds: [],

  showEgressOverlay: true,
  showHazardOverlay: true,

  past: [],
  future: [],
  lastOptimization: null,

  snapshots: [initialSnapshotA, initialSnapshotB],
  compareIds: [initialSnapshotA.id, initialSnapshotB.id],

  weather: initialWeather,
  weatherLoading: false,
  stormStress: initialStormStress,

  loadPreset: (presetId) => {
    const preset = HABITAT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const state = get();
    const mission = structuredClone(preset.mission);
    const zones = structuredClone(preset.zones);
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
    const mission: MissionConfig = { ...state.mission, ...partial };
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
    const nextHull: HullGeometry = { ...state.mission.hull, ...partial };
    if (nextHull.type === 'surface_dome') {
      nextHull.length = nextHull.diameter;
    }
    const mission: MissionConfig = { ...state.mission, hull: nextHull };
    const nextZones = state.zones.map((z) => ({
      ...z,
      deck: Math.min(z.deck, nextHull.decks - 1),
    }));
    const activeDeck = Math.min(state.activeDeck, nextHull.decks - 1);
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
    const pos =
      typeof x === 'number' && typeof y === 'number'
        ? { x: snapToGrid(x), y: snapToGrid(y) }
        : findOpenPlacement(
            state.mission,
            state.zones,
            state.activeDeck,
            cat.defaultWidth,
            cat.defaultHeight
          );
    const count = state.zones.filter((z) => z.type === type).length + 1;
    const newZone: ZoneNode = {
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
    const zones = [...state.zones, newZone];
    const { report, stormStress } = recompute(state.mission, zones, state.weather);
    set({
      zones,
      report,
      stormStress,
      selectedZoneId: newZone.id,
      highlightedZoneIds: [],
      past: pushHistory(state),
      future: [],
    });
  },

  updateZone: (id, partial, recordHistory = true) => {
    const state = get();
    const zones = state.zones.map((z) => (z.id === id ? { ...z, ...partial } : z));
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
    const sx = snapToGrid(x);
    const sy = snapToGrid(y);
    const zones = state.zones.map((z) => (z.id === id ? { ...z, x: sx, y: sy } : z));
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
    const zones = state.zones.map((z) => {
      if (z.id !== id) return z;
      const cat = ZONE_CATALOG[z.type];
      const nw = Math.max(cat.minWidth, snapToGrid(width));
      const nh = Math.max(cat.minHeight, snapToGrid(height));
      return {
        ...z,
        width: nw,
        height: nh,
        x: typeof x === 'number' ? snapToGrid(x) : z.x,
        y: typeof y === 'number' ? snapToGrid(y) : z.y,
      };
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
    const zones = state.zones.map((z) => {
      if (z.id !== id) return z;
      return {
        ...z,
        width: z.height,
        height: z.width,
        rotation: ((z.rotation + 90) % 360) as 0 | 90 | 180 | 270,
      };
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

  deleteZone: (id) => {
    const state = get();
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

  selectZone: (id) => set({ selectedZoneId: id, highlightedZoneIds: id ? [id] : [] }),

  highlightZones: (ids) => {
    const state = get();
    if (ids.length > 0) {
      const first = state.zones.find((z) => z.id === ids[0]);
      set({
        highlightedZoneIds: ids,
        selectedZoneId: ids[0],
        activeDeck: first ? first.deck : state.activeDeck,
      });
    } else {
      set({ highlightedZoneIds: [] });
    }
  },

  setActiveDeck: (deck) => set({ activeDeck: deck }),
  setActiveView: (view) => set({ activeView: view }),
  toggleEgressOverlay: () => set((s) => ({ showEgressOverlay: !s.showEgressOverlay })),
  toggleHazardOverlay: () => set((s) => ({ showHazardOverlay: !s.showHazardOverlay })),

  undo: () => {
    const state = get();
    if (state.past.length === 0) return;
    const prev = state.past[state.past.length - 1];
    const currentEntry: HistoryEntry = {
      mission: structuredClone(state.mission),
      zones: structuredClone(state.zones),
    };
    const { report, stormStress } = recompute(prev.mission, prev.zones, state.weather);
    set({
      mission: prev.mission,
      zones: prev.zones,
      report,
      stormStress,
      past: state.past.slice(0, -1),
      future: [currentEntry, ...state.future.slice(0, 39)],
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
    const { report, stormStress } = recompute(next.mission, next.zones, state.weather);
    set({
      mission: next.mission,
      zones: next.zones,
      report,
      stormStress,
      past: [...state.past, currentEntry],
      future: state.future.slice(1),
    });
  },

  runAutoOptimize: () => {
    const state = get();
    const previousZones = structuredClone(state.zones);
    const res = autoOptimizeLayout(state.mission, state.zones, 42);
    const stormStress = evaluateStormShelterStress(
      state.mission,
      res.zones,
      res.afterReport,
      state.weather
    );
    set({
      zones: res.zones,
      report: res.afterReport,
      stormStress,
      highlightedZoneIds: [],
      past: pushHistory(state),
      future: [],
      lastOptimization: {
        beforeScore: res.beforeReport.score,
        afterScore: res.afterReport.score,
        beforeCritical: res.beforeReport.criticalCount,
        afterCritical: res.afterReport.criticalCount,
        beforeWarning: res.beforeReport.warningCount,
        afterWarning: res.afterReport.warningCount,
        iterations: res.iterations,
        previousZones,
      },
    });
  },

  revertOptimization: () => {
    const state = get();
    if (!state.lastOptimization) return;
    const restored = structuredClone(state.lastOptimization.previousZones);
    const { report, stormStress } = recompute(state.mission, restored, state.weather);
    set({
      zones: restored,
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
      id: `snap-${Date.now().toString(36)}`,
      name: customName?.trim() || `${state.mission.name} — Rev ${idx}`,
      timestamp: Date.now(),
      mission: structuredClone(state.mission),
      zones: structuredClone(state.zones),
      report: state.report,
    };
    const snapshots = [...state.snapshots, snap];
    const leftId = state.snapshots[0]?.id ?? snap.id;
    set({
      snapshots,
      compareIds: [leftId, snap.id],
    });
  },

  deleteSnapshot: (id) => {
    const state = get();
    if (state.snapshots.length <= 2) return;
    const snapshots = state.snapshots.filter((s) => s.id !== id);
    const [l, r] = state.compareIds;
    set({
      snapshots,
      compareIds: [
        snapshots.some((s) => s.id === l) ? l : snapshots[0].id,
        snapshots.some((s) => s.id === r) ? r : snapshots[snapshots.length - 1].id,
      ],
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
    set({
      weather: telemetry,
      weatherLoading: false,
      stormStress,
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
    set({
      weather: telemetry,
      stormStress,
    });
  },
}));
