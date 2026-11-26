export type AgencyStandard = 'NASA' | 'ISRO' | 'SPACEX' | 'UNIFIED';

export type HullGeometryType = 'cylinder' | 'inflatable' | 'dome' | 'multideck';

export type ZoneType =
  | 'sleep'
  | 'exercise'
  | 'hygiene'
  | 'galley'
  | 'eclss'
  | 'medical'
  | 'storage'
  | 'airlock';

export type IssueSeverity = 'FAIL' | 'WARN' | 'PASS';

export type ScoreCategory = 'volume' | 'acoustics' | 'adjacency' | 'egress' | 'radiation';

export interface HabitatHull {
  type: HullGeometryType;
  /** Usable bounding width along X-axis in meters (0.5m grid increments) */
  widthM: number;
  /** Usable bounding depth along Y-axis in meters (0.5m grid increments) */
  depthM: number;
  /** Clear deck ceiling height in meters */
  deckHeightM: number;
  /** Number of stacked pressurized decks (1 for single-deck, 2–3 for multideck) */
  decks: number;
}

export interface MissionConfig {
  name: string;
  standard: AgencyStandard;
  /** Crew complement clamped [1, 12] */
  crewSize: number;
  /** Mission duration clamped [3, 1000] days */
  durationDays: number;
  /** Active Solar Particle Event (X-Class Flare) stress simulation toggle */
  solarFlareSim: boolean;
  hull: HabitatHull;
}

export interface ZoneModule {
  id: string;
  type: ZoneType;
  label: string;
  /** 0-indexed deck level */
  deck: number;
  /** Top-left X coordinate in meters (0.5m increments) */
  x: number;
  /** Top-left Y coordinate in meters (0.5m increments) */
  y: number;
  /** Width along X in meters (0.5m increments) */
  w: number;
  /** Depth along Y in meters (0.5m increments) */
  h: number;
  /** Orientation angle in degrees */
  rotation: 0 | 90;
}

export interface ValidationIssue {
  id: string;
  code: string;
  agency: 'NASA' | 'ISRO' | 'SPACEX';
  severity: IssueSeverity;
  category: ScoreCategory;
  title: string;
  detail: string;
  action: string;
  metric: string;
  moduleIds: string[];
}

export interface ScoreBreakdown {
  overall: number;
  volume: number;
  acoustics: number;
  adjacency: number;
  egress: number;
  radiation: number;
}

export interface VolumeMetrics {
  grossHullVolumeM3: number;
  structuralOverheadM3: number;
  netHabitableVolumeM3: number;
  nhvPerCrewM3: number;
  requiredNhvPerCrewM3: number;
  sleepVolumeM3: number;
  sleepVolumePerCrewM3: number;
  requiredSleepPerCrewM3: number;
  totalHullFloorAreaM2: number;
  occupiedFloorAreaM2: number;
  volumetricEfficiencyPct: number;
}

export interface AcousticCell {
  x: number;
  y: number;
  deck: number;
  dba: number;
  nc: number;
}

export interface AcousticMetrics {
  cells: AcousticCell[];
  maxSleepDba: number;
  sleepLimitDba: number;
  maxHabitableDba: number;
  habitableLimitDba: number;
  violatingSleepIds: string[];
  violatingSourceIds: string[];
}

export interface AdjacencyMetrics {
  hygieneCount: number;
  requiredHygieneCount: number;
  eclssCorridorClearanceM: number;
  eclssBlocksTransit: boolean;
  exerciseAreaM2: number;
  medicalConnectedBonus: boolean;
  shieldedSleepPerimeterPct: number;
  requiredShieldPct: number;
  trappedDeadPocketCells: number;
  overlappingPairs: Array<[string, string]>;
  outOfBoundsIds: string[];
}

export interface EgressRoute {
  fromModuleId: string;
  fromLabel: string;
  fromType: ZoneType;
  targetAirlockId: string;
  deck: number;
  valid: boolean;
  distanceM: number;
  evacuationTimeSec: number;
  minCorridorWidthM: number;
  hasDisjointBackup: boolean;
  points: Array<{ x: number; y: number }>;
}

export interface EgressMetrics {
  routes: EgressRoute[];
  allValid: boolean;
  maxDistanceM: number;
  maxWorkSleepDistanceM: number;
  maxEvacuationTimeSec: number;
  minCorridorWidthM: number;
  dualEgressRequired: boolean;
  dualEgressSatisfied: boolean;
}

export interface HabitatEvaluation {
  scores: ScoreBreakdown;
  issues: ValidationIssue[];
  volume: VolumeMetrics;
  acoustics: AcousticMetrics;
  adjacency: AdjacencyMetrics;
  egress: EgressMetrics;
  computeMs: number;
}

export interface LayoutSnapshot {
  id: string;
  name: string;
  createdAt: string;
  mission: MissionConfig;
  modules: ZoneModule[];
  scores: ScoreBreakdown;
  summary: {
    nhvPerCrewM3: number;
    maxSleepDba: number;
    maxEgressDistanceM: number;
    shieldedSleepPerimeterPct: number;
    volumetricEfficiencyPct: number;
    failCount: number;
    warnCount: number;
  };
}

export interface ComparisonDiff {
  key: string;
  label: string;
  unit: string;
  valueA: number;
  valueB: number;
  delta: number;
  higherIsBetter: boolean;
  improved: boolean | null;
  displayA: string;
  displayB: string;
  displayDelta: string;
}
