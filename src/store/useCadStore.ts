import { create } from 'zustand';
import {
  GRID_STEP_M,
  HULL_TEMPLATES,
  ZONE_SPECS,
} from '../engine/constants';
import {
  clamp,
  clampModuleToHull,
  cloneData,
  isModuleInHull,
  overlapArea2D,
  sanitizeMission,
  snapGrid,
} from '../engine/geometry';
import { evaluateHabitatLayout } from '../engine/scorer';
import { autoOptimizeHabitat, buildCleanSeedLayout } from '../engine/optimizer';
import { HABITAT_PRESETS } from '../engine/presets';
import {
  AgencyStandard,
  HabitatEvaluation,
  HullGeometryType,
  LayoutSnapshot,
  MissionConfig,
  ZoneModule,
  ZoneType,
} from '../types/habitat';

const STORAGE_KEY = 'bmsit_starforge_sw4_snapshots_v2';
const THEME_KEY = 'bmsit_starforge_sw4_theme_v1';
const MAX_MODULES_PER_DECK = 28;

export const LIVE_SNAPSHOT_ID = '__LIVE_WORKSPACE__';

export type MobilePanel = 'canvas' | 'build' | 'audit';

interface HistoryItem {
  mission: MissionConfig;
  modules: ZoneModule[];
}

export interface OverlayToggles {
  acoustics: boolean;
  egress: boolean;
  radiation: boolean;
}

interface CadState {
  theme: 'light' | 'dark';
  activePresetId: string;
  mission: MissionConfig;
  modules: ZoneModule[];
  evaluation: HabitatEvaluation;

  activeDeck: number;
  selectedModuleId: string | null;
  highlightedModuleIds: string[];
  viewMode: '2d' | 'iso';
  overlays: OverlayToggles;

  mobilePanel: MobilePanel;
  tabletDrawerOpen: boolean;
  statusNotice: string | null;

  animateZones: boolean;
  lastOptimizeInfo: {
    beforeScore: number;
    afterScore: number;
    iterations: number;
    elapsedMs: number;
  } | null;

  past: HistoryItem[];
  future: HistoryItem[];

  compareOpen: boolean;
  snapshots: LayoutSnapshot[];
  comparePair: [string, string];

  // Actions
  toggleTheme: () => void;
  setMobilePanel: (panel: MobilePanel) => void;
  setTabletDrawerOpen: (open: boolean) => void;
  clearNotice: () => void;

  loadPreset: (presetId: string) => void;
  loadSnapshotIntoEditor: (snapshotId: string) => void;
  setStandard: (standard: AgencyStandard) => void;
  setCrewSize: (crewSize: number) => void;
  setDurationDays: (durationDays: number) => void;
  toggleSolarFlare: () => void;
  setHullType: (type: HullGeometryType) => void;
  setHullDimensions: (widthM: number, depthM: number, decks?: number) => void;
  setActiveDeck: (deck: number) => void;
  setViewMode: (mode: '2d' | 'iso') => void;
  toggleOverlay: (key: keyof OverlayToggles) => void;

  addModule: (type: ZoneType, x?: number, y?: number) => void;
  moveModule: (id: string, x: number, y: number, recordHistory?: boolean) => void;
  nudgeSelected: (dx: number, dy: number) => void;
  resizeModule: (id: string, w: number, h: number, recordHistory?: boolean) => void;
  rotateModule: (id: string) => void;
  deleteModule: (id: string) => void;
  clearAllModules: () => void;
  selectModule: (id: string | null) => void;
  highlightModules: (ids: string[]) => void;

  runAutoOptimize: () => void;
  undo: () => void;
  redo: () => void;
  resetWorkspace: () => void;

  setCompareOpen: (open: boolean) => void;
  saveSnapshot: (customName?: string) => void;
  deleteSnapshot: (id: string) => void;
  setComparePair: (idA: string, idB: string) => void;
}

export function buildSnapshotFromEval(
  id: string,
  name: string,
  mission: MissionConfig,
  modules: ZoneModule[],
  ev: HabitatEvaluation
): LayoutSnapshot {
  return {
    id,
    name: name.slice(0, 80),
    createdAt: new Date().toISOString(),
    mission: cloneData(mission),
    modules: cloneData(modules),
    scores: { ...ev.scores },
    summary: {
      nhvPerCrewM3: ev.volume.nhvPerCrewM3,
      maxSleepDba: ev.acoustics.maxSleepDba,
      maxEgressDistanceM: ev.egress.maxDistanceM,
      shieldedSleepPerimeterPct: ev.adjacency.shieldedSleepPerimeterPct,
      volumetricEfficiencyPct: ev.volume.volumetricEfficiencyPct,
      failCount: ev.issues.filter((i) => i.severity === 'FAIL').length,
      warnCount: ev.issues.filter((i) => i.severity === 'WARN').length,
    },
  };
}

function isValidSnapshot(item: unknown): item is LayoutSnapshot {
  if (!item || typeof item !== 'object') return false;
  const s = item as Partial<LayoutSnapshot>;
  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    Boolean(s.mission && typeof s.mission === 'object' && s.mission.hull) &&
    Array.isArray(s.modules) &&
    Boolean(s.scores && typeof s.scores.overall === 'number') &&
    Boolean(s.summary && typeof s.summary.nhvPerCrewM3 === 'number')
  );
}

function loadInitialTheme(): 'light' | 'dark' {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    }
  } catch {
    // Ignore storage read errors
  }
  return 'dark';
}

function loadInitialSnapshots(): LayoutSnapshot[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(isValidSnapshot);
          if (valid.length >= 1) return valid;
        }
      }
    }
  } catch {
    // Ignore corrupted JSON or storage access restrictions
  }

  const pBroken = HABITAT_PRESETS[0];
  const evBroken = evaluateHabitatLayout(pBroken.mission, pBroken.modules);
  const pNasa = HABITAT_PRESETS[1];
  const evNasa = evaluateHabitatLayout(pNasa.mission, pNasa.modules);

  return [
    buildSnapshotFromEval(
      'seed-broken',
      'Flawed Baseline (4 Crew)',
      pBroken.mission,
      pBroken.modules,
      evBroken
    ),
    buildSnapshotFromEval(
      'seed-nasa',
      'NASA Artemis Reference (4 Crew)',
      pNasa.mission,
      pNasa.modules,
      evNasa
    ),
  ];
}

function persistSnapshots(snapshots: LayoutSnapshot[]) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
    }
  } catch {
    // Ignore quota errors gracefully
  }
}

/**
 * Finds a genuinely collision-free slot across active deck or alternate decks,
 * trying default dimensions, rotated 90°, and minimum dimensions before failing cleanly.
 */
function findSmartOpenSlot(
  mission: MissionConfig,
  modules: ZoneModule[],
  preferredDeck: number,
  type: ZoneType
): { deck: number; x: number; y: number; w: number; h: number; rotation: 0 | 90 } | null {
  const { hull } = mission;
  const spec = ZONE_SPECS[type];

  const deckOrder = [preferredDeck];
  for (let d = 0; d < hull.decks; d++) {
    if (d !== preferredDeck) deckOrder.push(d);
  }

  const candidates: Array<{ w: number; h: number; rotation: 0 | 90 }> = [
    { w: spec.defaultW, h: spec.defaultH, rotation: 0 },
  ];
  if (spec.defaultW !== spec.defaultH) {
    candidates.push({ w: spec.defaultH, h: spec.defaultW, rotation: 90 });
  }
  if (spec.minW < spec.defaultW || spec.minH < spec.defaultH) {
    candidates.push({ w: spec.minW, h: spec.minH, rotation: 0 });
    if (spec.minW !== spec.minH) {
      candidates.push({ w: spec.minH, h: spec.minW, rotation: 90 });
    }
  }

  for (const d of deckOrder) {
    const deckMods = modules.filter((m) => m.deck === d);
    if (deckMods.length >= MAX_MODULES_PER_DECK) continue;

    for (const cand of candidates) {
      for (let y = 0; y <= hull.depthM - cand.h + 1e-6; y += GRID_STEP_M) {
        for (let x = 0; x <= hull.widthM - cand.w + 1e-6; x += GRID_STEP_M) {
          const sx = snapGrid(x);
          const sy = snapGrid(y);
          const probe: ZoneModule = {
            id: '__probe__',
            type,
            label: '',
            deck: d,
            x: sx,
            y: sy,
            w: cand.w,
            h: cand.h,
            rotation: cand.rotation,
          };
          if (!isModuleInHull(probe, hull)) continue;
          if (deckMods.every((other) => overlapArea2D(probe, other) < 0.001)) {
            return {
              deck: d,
              x: sx,
              y: sy,
              w: cand.w,
              h: cand.h,
              rotation: cand.rotation,
            };
          }
        }
      }
    }
  }

  return null;
}

const defaultPreset = HABITAT_PRESETS[0];
const initialMission = sanitizeMission(cloneData(defaultPreset.mission));
const initialModules = cloneData(defaultPreset.modules);
const initialEval = evaluateHabitatLayout(initialMission, initialModules);
const initialSnapshots = loadInitialSnapshots();

export const useCadStore = create<CadState>((set, get, api) => {
  api.getInitialState = get;
  return {
    theme: loadInitialTheme(),
    activePresetId: defaultPreset.id,
    mission: initialMission,
    modules: initialModules,
    evaluation: initialEval,

    activeDeck: 0,
    selectedModuleId: null,
    highlightedModuleIds: [],
    viewMode: '2d',
    overlays: {
      acoustics: false,
      egress: true,
      radiation: true,
    },

    mobilePanel: 'canvas',
    tabletDrawerOpen: false,
    statusNotice: null,

    animateZones: false,
    lastOptimizeInfo: null,

    past: [],
    future: [],

    compareOpen: false,
    snapshots: initialSnapshots,
    // Default compare: Baseline A vs Live Workspace so A & B are never duplicate identical cards!
    comparePair: [initialSnapshots[0]?.id ?? '', LIVE_SNAPSHOT_ID],

    toggleTheme: () =>
      set((s) => {
        const next = s.theme === 'dark' ? 'light' : 'dark';
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(THEME_KEY, next);
          }
        } catch {
          // Ignore storage write errors
        }
        return { theme: next };
      }),

    setMobilePanel: (mobilePanel) => set({ mobilePanel }),
    setTabletDrawerOpen: (tabletDrawerOpen) => set({ tabletDrawerOpen }),
    clearNotice: () => set({ statusNotice: null }),

    loadPreset: (presetId) => {
      const preset = HABITAT_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      const s = get();
      const mission = sanitizeMission(cloneData(preset.mission));
      const modules = cloneData(preset.modules);
      const evaluation = evaluateHabitatLayout(mission, modules);
      set({
        activePresetId: presetId,
        mission,
        modules,
        evaluation,
        activeDeck: 0,
        selectedModuleId: null,
        highlightedModuleIds: [],
        lastOptimizeInfo: null,
        statusNotice: `Loaded ${preset.label}`,
        animateZones: true,
        mobilePanel: 'canvas',
        tabletDrawerOpen: false,
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    loadSnapshotIntoEditor: (snapshotId) => {
      if (snapshotId === LIVE_SNAPSHOT_ID) {
        set({ compareOpen: false, mobilePanel: 'canvas' });
        return;
      }
      const s = get();
      const snap = s.snapshots.find((x) => x.id === snapshotId);
      if (!snap) return;
      const mission = sanitizeMission(cloneData(snap.mission));
      const modules = cloneData(snap.modules);
      const evaluation = evaluateHabitatLayout(mission, modules);
      set({
        mission,
        modules,
        evaluation,
        activeDeck: 0,
        selectedModuleId: null,
        highlightedModuleIds: [],
        compareOpen: false,
        mobilePanel: 'canvas',
        animateZones: true,
        statusNotice: `Restored "${snap.name}" into editor`,
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    setStandard: (standard) => {
      const s = get();
      const mission = sanitizeMission({ ...s.mission, standard });
      const evaluation = evaluateHabitatLayout(mission, s.modules);
      set({ mission, evaluation });
    },

    setCrewSize: (crewSize) => {
      const s = get();
      const mission = sanitizeMission({ ...s.mission, crewSize });
      const evaluation = evaluateHabitatLayout(mission, s.modules);
      set({
        mission,
        evaluation,
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    setDurationDays: (durationDays) => {
      const s = get();
      const mission = sanitizeMission({ ...s.mission, durationDays });
      const evaluation = evaluateHabitatLayout(mission, s.modules);
      set({
        mission,
        evaluation,
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    toggleSolarFlare: () => {
      const s = get();
      const nextFlare = !s.mission.solarFlareSim;
      const mission = sanitizeMission({ ...s.mission, solarFlareSim: nextFlare });
      const evaluation = evaluateHabitatLayout(mission, s.modules);
      set({
        mission,
        evaluation,
        overlays: nextFlare ? { ...s.overlays, radiation: true } : s.overlays,
        statusNotice: nextFlare
          ? 'Solar Flare Simulation ON — checking water-wall shielding around Sleep'
          : 'Solar Flare Simulation OFF',
      });
    },

    setHullType: (type) => {
      const s = get();
      const tpl = HULL_TEMPLATES[type];
      const mission = sanitizeMission({
        ...s.mission,
        hull: {
          type,
          widthM: tpl.defaultWidthM,
          depthM: tpl.defaultDepthM,
          deckHeightM: tpl.defaultDeckHeightM,
          decks: tpl.defaultDecks,
        },
      });
      // Repack cleanly if deck count shrank or dome curvature clips existing corners
      const clamped = s.modules.map((m) => clampModuleToHull(m, mission.hull));
      const hadDeckCollapse = s.mission.hull.decks > mission.hull.decks;
      const hasOobOrOverlap =
        hadDeckCollapse ||
        clamped.some(
          (m, i) =>
            !isModuleInHull(m, mission.hull) ||
            clamped.some((o, j) => j > i && overlapArea2D(m, o) > 0.001)
        );
      const modules = hasOobOrOverlap ? buildCleanSeedLayout(mission, clamped) : clamped;
      const evaluation = evaluateHabitatLayout(mission, modules);
      set({
        mission,
        modules,
        evaluation,
        animateZones: true,
        activeDeck: Math.min(s.activeDeck, mission.hull.decks - 1),
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    setHullDimensions: (widthM, depthM, decks) => {
      const s = get();
      const mission = sanitizeMission({
        ...s.mission,
        hull: {
          ...s.mission.hull,
          widthM,
          depthM: s.mission.hull.type === 'dome' ? widthM : depthM,
          decks: typeof decks === 'number' ? decks : s.mission.hull.decks,
        },
      });
      const modules = s.modules.map((m) => clampModuleToHull(m, mission.hull));
      const evaluation = evaluateHabitatLayout(mission, modules);
      set({
        mission,
        modules,
        evaluation,
        activeDeck: Math.min(s.activeDeck, mission.hull.decks - 1),
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    setActiveDeck: (deck) => {
      const s = get();
      set({ activeDeck: Math.round(clamp(deck, 0, s.mission.hull.decks - 1)) });
    },

    setViewMode: (viewMode) => set({ viewMode }),

    toggleOverlay: (key) =>
      set((s) => ({
        overlays: { ...s.overlays, [key]: !s.overlays[key] },
      })),

    addModule: (type, x, y) => {
      const s = get();
      const spec = ZONE_SPECS[type];
      if (!spec) return;

      const deckCount = s.modules.filter((m) => m.deck === s.activeDeck).length;
      if (deckCount >= MAX_MODULES_PER_DECK && typeof x === 'number') {
        set({
          statusNotice: `Deck ${s.activeDeck + 1} has reached maximum module capacity (${MAX_MODULES_PER_DECK}).`,
        });
        return;
      }

      let targetDeck = s.activeDeck;
      let targetX = 0;
      let targetY = 0;
      let targetW = spec.defaultW;
      let targetH = spec.defaultH;
      let targetRot: 0 | 90 = 0;

      if (typeof x === 'number' && typeof y === 'number') {
        targetX = snapGrid(x);
        targetY = snapGrid(y);
      } else {
        const slot = findSmartOpenSlot(s.mission, s.modules, s.activeDeck, type);
        if (!slot) {
          set({
            statusNotice:
              'Hull floor is full — increase Hull Width/Depth or remove a module before adding more.',
          });
          return;
        }
        targetDeck = slot.deck;
        targetX = slot.x;
        targetY = slot.y;
        targetW = slot.w;
        targetH = slot.h;
        targetRot = slot.rotation;
      }

      const count = s.modules.filter((m) => m.type === type).length + 1;
      const rawNew: ZoneModule = {
        id: `${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
        type,
        label: count > 1 ? `${spec.label} ${count}` : spec.label,
        deck: targetDeck,
        x: targetX,
        y: targetY,
        w: targetW,
        h: targetH,
        rotation: targetRot,
      };
      const clampedNew = clampModuleToHull(rawNew, s.mission.hull);
      const modules = [...s.modules, clampedNew];
      const evaluation = evaluateHabitatLayout(s.mission, modules);
      set({
        modules,
        evaluation,
        activeDeck: targetDeck,
        selectedModuleId: clampedNew.id,
        highlightedModuleIds: [clampedNew.id],
        statusNotice:
          targetDeck !== s.activeDeck
            ? `Deck ${s.activeDeck + 1} full — placed ${clampedNew.label} on Deck ${targetDeck + 1}`
            : `Added ${clampedNew.label} (${clampedNew.w}×${clampedNew.h}m)`,
        animateZones: false,
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    moveModule: (id, x, y, recordHistory = false) => {
      const s = get();
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      const modules = s.modules.map((m) =>
        m.id === id
          ? clampModuleToHull({ ...m, x: snapGrid(x), y: snapGrid(y) }, s.mission.hull)
          : m
      );
      const evaluation = evaluateHabitatLayout(s.mission, modules);
      set({
        modules,
        evaluation,
        animateZones: false,
        ...(recordHistory
          ? {
              past: [
                ...s.past.slice(-49),
                { mission: cloneData(s.mission), modules: cloneData(s.modules) },
              ],
              future: [],
            }
          : {}),
      });
    },

    nudgeSelected: (dx, dy) => {
      const s = get();
      if (!s.selectedModuleId) return;
      const target = s.modules.find((m) => m.id === s.selectedModuleId);
      if (!target) return;
      s.moveModule(target.id, target.x + dx, target.y + dy, true);
    },

    resizeModule: (id, w, h, recordHistory = false) => {
      const s = get();
      if (!Number.isFinite(w) || !Number.isFinite(h)) return;
      const modules = s.modules.map((m) => {
        if (m.id !== id) return m;
        const spec = ZONE_SPECS[m.type];
        const nw = clamp(snapGrid(w), spec.minW, s.mission.hull.widthM);
        const nh = clamp(snapGrid(h), spec.minH, s.mission.hull.depthM);
        return clampModuleToHull({ ...m, w: nw, h: nh }, s.mission.hull);
      });
      const evaluation = evaluateHabitatLayout(s.mission, modules);
      set({
        modules,
        evaluation,
        animateZones: false,
        ...(recordHistory
          ? {
              past: [
                ...s.past.slice(-49),
                { mission: cloneData(s.mission), modules: cloneData(s.modules) },
              ],
              future: [],
            }
          : {}),
      });
    },

    rotateModule: (id) => {
      const s = get();
      const modules = s.modules.map((m) => {
        if (m.id !== id) return m;
        return clampModuleToHull(
          {
            ...m,
            w: m.h,
            h: m.w,
            rotation: m.rotation === 0 ? 90 : 0,
          },
          s.mission.hull
        );
      });
      const evaluation = evaluateHabitatLayout(s.mission, modules);
      set({
        modules,
        evaluation,
        animateZones: false,
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    deleteModule: (id) => {
      const s = get();
      const modules = s.modules.filter((m) => m.id !== id);
      const evaluation = evaluateHabitatLayout(s.mission, modules);
      set({
        modules,
        evaluation,
        selectedModuleId: s.selectedModuleId === id ? null : s.selectedModuleId,
        highlightedModuleIds: s.highlightedModuleIds.filter((x) => x !== id),
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    clearAllModules: () => {
      const s = get();
      if (s.modules.length === 0) return;
      const evaluation = evaluateHabitatLayout(s.mission, []);
      set({
        modules: [],
        evaluation,
        selectedModuleId: null,
        highlightedModuleIds: [],
        lastOptimizeInfo: null,
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    selectModule: (id) =>
      set({
        selectedModuleId: id,
        highlightedModuleIds: id ? [id] : [],
      }),

    highlightModules: (ids) => {
      const s = get();
      if (ids.length === 0) {
        set({ highlightedModuleIds: [], mobilePanel: 'canvas' });
        return;
      }
      const first = s.modules.find((m) => m.id === ids[0]);
      set({
        highlightedModuleIds: ids,
        selectedModuleId: ids[0],
        activeDeck: first ? first.deck : s.activeDeck,
        mobilePanel: 'canvas',
      });
    },

    runAutoOptimize: () => {
      const s = get();
      if (s.modules.length === 0) return;
      const res = autoOptimizeHabitat(s.mission, s.modules, 2026);
      set({
        modules: res.modules,
        evaluation: res.after,
        animateZones: true,
        highlightedModuleIds: [],
        mobilePanel: 'canvas',
        statusNotice: `Layout optimized: Readiness ${res.before.scores.overall} → ${res.after.scores.overall}/100`,
        lastOptimizeInfo: {
          beforeScore: res.before.scores.overall,
          afterScore: res.after.scores.overall,
          iterations: res.iterations,
          elapsedMs: res.elapsedMs,
        },
        past: [
          ...s.past.slice(-49),
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: [],
      });
    },

    undo: () => {
      const s = get();
      if (s.past.length === 0) return;
      const prev = s.past[s.past.length - 1];
      const evaluation = evaluateHabitatLayout(prev.mission, prev.modules);
      set({
        mission: prev.mission,
        modules: prev.modules,
        evaluation,
        animateZones: true,
        lastOptimizeInfo: null,
        past: s.past.slice(0, -1),
        future: [
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
          ...s.future.slice(0, 49),
        ],
      });
    },

    redo: () => {
      const s = get();
      if (s.future.length === 0) return;
      const next = s.future[0];
      const evaluation = evaluateHabitatLayout(next.mission, next.modules);
      set({
        mission: next.mission,
        modules: next.modules,
        evaluation,
        animateZones: true,
        past: [
          ...s.past,
          { mission: cloneData(s.mission), modules: cloneData(s.modules) },
        ],
        future: s.future.slice(1),
      });
    },

    resetWorkspace: () => {
      const p = HABITAT_PRESETS[0];
      const mission = sanitizeMission(cloneData(p.mission));
      const modules = cloneData(p.modules);
      const evaluation = evaluateHabitatLayout(mission, modules);
      set({
        activePresetId: p.id,
        mission,
        modules,
        evaluation,
        activeDeck: 0,
        selectedModuleId: null,
        highlightedModuleIds: [],
        lastOptimizeInfo: null,
        statusNotice: null,
        mobilePanel: 'canvas',
        tabletDrawerOpen: false,
        compareOpen: false,
        past: [],
        future: [],
      });
    },

    setCompareOpen: (compareOpen) => set({ compareOpen }),

    saveSnapshot: (customName) => {
      const s = get();
      const trimmed = customName?.trim() ?? '';
      const label =
        trimmed ||
        `Checkpoint #${s.snapshots.length + 1} (${s.mission.standard} · ${s.mission.crewSize} Crew)`;
      const snap = buildSnapshotFromEval(
        `snap-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
        label,
        s.mission,
        s.modules,
        s.evaluation
      );
      const nextSnapshots = [...s.snapshots, snap];
      persistSnapshots(nextSnapshots);
      const baselineId =
        s.comparePair[0] && s.comparePair[0] !== LIVE_SNAPSHOT_ID
          ? s.comparePair[0]
          : s.snapshots[0]?.id ?? snap.id;
      set({
        snapshots: nextSnapshots,
        comparePair: [
          baselineId === snap.id && nextSnapshots.length > 1 ? nextSnapshots[0].id : baselineId,
          snap.id,
        ],
        statusNotice: `Saved checkpoint "${snap.name}"`,
      });
    },

    deleteSnapshot: (id) => {
      if (id === LIVE_SNAPSHOT_ID) return;
      const s = get();
      if (s.snapshots.length <= 1) return;
      const nextSnapshots = s.snapshots.filter((x) => x.id !== id);
      persistSnapshots(nextSnapshots);
      const [a, b] = s.comparePair;
      set({
        snapshots: nextSnapshots,
        comparePair: [
          a === LIVE_SNAPSHOT_ID || nextSnapshots.some((x) => x.id === a)
            ? a
            : nextSnapshots[0].id,
          b === LIVE_SNAPSHOT_ID || nextSnapshots.some((x) => x.id === b)
            ? b
            : LIVE_SNAPSHOT_ID,
        ],
      });
    },

    setComparePair: (idA, idB) => set({ comparePair: [idA, idB] }),
  };
});
