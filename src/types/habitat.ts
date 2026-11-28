export type GravityRegime = '0g' | '1/6g' | '3/8g';

export type HullType = 'rigid_cylinder' | 'inflatable' | 'surface_dome';

export type LightingMode = 'day' | 'sleep' | 'emergency';

export type ZoneType =
  | 'crew_quarters'
  | 'galley'
  | 'hygiene'
  | 'exercise'
  | 'eclss'
  | 'medical'
  | 'airlock'
  | 'storm_shelter'
  | 'stowage';

export type Severity = 'CRITICAL' | 'WARNING' | 'PASS';

export type RuleCategory =
  | 'NHV'
  | 'ACOUSTIC'
  | 'CONTAMINATION'
  | 'EGRESS'
  | 'CREW_SUPPORT'
  | 'GEOMETRY'
  | 'ORIENTATION'
  | 'LIGHTING'
  | 'AIRFLOW'
  | 'RADIATION';

export interface HullGeometry {
  type: HullType;
  diameter: number; // meters
  length: number; // meters (equals diameter for surface_dome)
  decks: number; // 1 to 3
  wallThickness: number; // meters
}

export interface MissionConfig {
  name: string;
  crewSize: number; // 2 - 12
  durationDays: number; // 30 - 1000
  gravity: GravityRegime;
  hull: HullGeometry;
}

export interface ZoneNode {
  id: string;
  type: ZoneType;
  label: string;
  deck: number; // 0-indexed deck
  x: number; // meters from hull left edge (snapped to 0.25m)
  y: number; // meters from hull top edge (snapped to 0.25m)
  width: number; // meters
  height: number; // meters
  zHeight: number; // meters
  rotation: 0 | 90 | 180 | 270;
  locked?: boolean;
}

export interface ZoneCatalogEntry {
  type: ZoneType;
  label: string;
  shortLabel: string;
  description: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  minHeight: number;
  defaultZHeight: number;
  color: string;
  accentColor: string;
  noiseEmitDba: number;
  illuminanceLux: number; // nominal operational task lux (NASA-STD-3001 Table 8.7-1)
  isQuietZone: boolean;
  isContaminationSource: boolean;
  isContaminationSensitive: boolean;
  isOccupied: boolean;
  isEquipmentOnly: boolean;
  isWaterMassShield: boolean; // contributes hydrogen-rich radiation attenuation
  equipmentFraction: number;
  massDensityKgPerM3: number;
}

export interface RuleViolation {
  id: string;
  ruleCode: string;
  category: RuleCategory;
  severity: Severity;
  title: string;
  detail: string;
  metric: string;
  affectedZoneIds: string[];
  recommendation: string;
}

export interface AcousticPair {
  sourceId: string;
  sourceLabel: string;
  targetId: string;
  targetLabel: string;
  sourceDba: number;
  receivedDba: number;
  limitDba: number;
  distanceM: number;
  violates: boolean;
}

export interface ContaminationPair {
  hygieneId: string;
  hygieneLabel: string;
  targetId: string;
  targetLabel: string;
  distanceM: number;
  minRequiredM: number;
  violates: boolean;
}

export interface EgressPoint {
  x: number;
  y: number;
}

export interface EgressPath {
  fromZoneId: string;
  fromLabel: string;
  targetZoneId: string;
  targetLabel: string;
  targetType: 'airlock' | 'storm_shelter';
  deck: number;
  reachable: boolean;
  distanceM: number; // finite number (0 if unreachable)
  transitTimeSec: number; // finite number (0 if unreachable)
  points: EgressPoint[];
  minClearanceM: number;
}

export interface BottleneckPoint {
  x: number;
  y: number;
  deck: number;
  clearanceM: number;
}

export interface EgressResult {
  airlockPaths: EgressPath[];
  shelterPaths: EgressPath[];
  overallReachable: boolean;
  shelterReachable: boolean;
  worstCaseDistanceM: number;
  worstCaseTimeSec: number;
  worstShelterDistanceM: number;
  worstShelterTimeSec: number;
  bottleneckPoints: BottleneckPoint[];
  gridResolutionM: number;
}

export interface AirflowLink {
  fromEclssId: string;
  toZoneId: string;
  toLabel: string;
  deck: number;
  distanceM: number;
  openDoorCells: number;
  stagnantRisk: boolean;
  points: EgressPoint[];
}

export interface OrientationConflict {
  zoneAId: string;
  zoneALabel: string;
  zoneBId: string;
  zoneBLabel: string;
  deltaDeg: number;
}

export interface WaterWallBonus {
  shieldingBonusGcm2: number;
  bufferedPerimeterRatio: number;
  contributingZoneIds: string[];
  doseSavedPct: number;
}

export interface IlluminanceReport {
  minCorridorLux: number;
  targetCorridorLux: number;
  lightSpillZoneIds: string[];
  underlitZoneIds: string[];
}

export interface EvaluationReport {
  score: number; // 0 - 100
  grossVolumeM3: number;
  structureVolumeM3: number;
  equipmentVolumeM3: number;
  deadSpaceM3: number;
  nhvM3: number;
  nhvPerCrewM3: number;
  requiredNhvPerCrewM3: number;
  estimatedMassKg: number;
  estimatedLaunchCostM: number;
  violations: RuleViolation[];
  criticalCount: number;
  warningCount: number;
  passCount: number;
  acousticPairs: AcousticPair[];
  contaminationPairs: ContaminationPair[];
  egress: EgressResult;
  airflowLinks: AirflowLink[];
  stagnantZoneIds: string[];
  orientationConflicts: OrientationConflict[];
  waterWall: WaterWallBonus;
  illuminance: IlluminanceReport;
  computeTimeMs: number;
}

export interface LayoutSnapshot {
  id: string;
  name: string;
  timestamp: number;
  mission: MissionConfig;
  zones: ZoneNode[];
  report: EvaluationReport;
}

export interface TelemetryPoint {
  timestamp: string;
  value: number;
}

export type WeatherSource = 'LIVE_NOAA_GOES' | 'SIMULATED_PRESET';

export type StormPresetId = 'live' | 'quiet_b' | 'moderate_m5' | 'extreme_x10';

export interface SpaceWeatherTelemetry {
  source: WeatherSource;
  presetId: StormPresetId;
  label: string;
  fetchedAt: string;
  xrayFluxWm2: number;
  xrayClass: string;
  protonFluxPfu: number;
  noaaRScale: string;
  noaaSScale: string;
  xraySeries: TelemetryPoint[];
  protonSeries: TelemetryPoint[];
  warningWindowSec: number;
}

export interface StormStressResult {
  verdict: 'PASS' | 'MARGINAL' | 'FAIL';
  hasShelter: boolean;
  shelterVolumeM3: number;
  shelterVolumePerCrewM3: number;
  requiredVolumePerCrewM3: number;
  allCrewReachable: boolean;
  worstTransitSec: number; // finite number (0 if unreachable)
  warningWindowSec: number;
  baseShieldingGcm2: number;
  waterWallBonusGcm2: number;
  shieldingArealDensityGcm2: number;
  unshieldedDoseMsv: number;
  shieldedDoseMsv: number;
  doseReductionFromWaterWallMsv: number;
  acuteLimitMsv: number;
  diagnostics: Array<{
    severity: Severity;
    title: string;
    detail: string;
  }>;
}

export interface OptimizationSummary {
  beforeScore: number;
  afterScore: number;
  beforeCritical: number;
  afterCritical: number;
  beforeWarning: number;
  afterWarning: number;
  violationsFixed: number;
  beforeWorstEgressM: number;
  afterWorstEgressM: number;
  elapsedMs: number;
  iterations: number;
  previousZones: ZoneNode[];
}
