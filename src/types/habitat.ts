export type GravityRegime = '0g' | '1/6g' | '3/8g';

export type HullType = 'rigid_cylinder' | 'inflatable' | 'surface_dome';

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
  | 'GEOMETRY';

export interface HullGeometry {
  type: HullType;
  diameter: number; // meters (Y span for cylinder/inflatable, full diameter for dome)
  length: number; // meters (X span for cylinder/inflatable; equals diameter for dome)
  decks: number; // 1 to 3
  wallThickness: number; // meters (structural hull wall)
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
  width: number; // meters (X span in current orientation)
  height: number; // meters (Y span in current orientation)
  zHeight: number; // meters (vertical ceiling height inside deck)
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
  noiseEmitDba: number; // 0 if quiet
  isQuietZone: boolean;
  isContaminationSource: boolean;
  isContaminationSensitive: boolean;
  isOccupied: boolean; // requires egress paths
  isEquipmentOnly: boolean; // deducted from NHV as equipment/stowage
  equipmentFraction: number; // fraction of zone volume occupied by hardware racks/equipment (0..1)
  massDensityKgPerM3: number; // estimated outfitting equipment mass density
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
  distanceM: number;
  transitTimeSec: number;
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
  estimatedLaunchCostM: number; // $M USD
  violations: RuleViolation[];
  criticalCount: number;
  warningCount: number;
  passCount: number;
  acousticPairs: AcousticPair[];
  contaminationPairs: ContaminationPair[];
  egress: EgressResult;
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
  xrayFluxWm2: number; // 0.1-0.8 nm W/m^2
  xrayClass: string; // e.g., "B4.2", "M5.4", "X10.0"
  protonFluxPfu: number; // >=10 MeV particles / (cm^2 s sr)
  noaaRScale: string; // R0 - R5
  noaaSScale: string; // S0 - S5
  xraySeries: TelemetryPoint[];
  protonSeries: TelemetryPoint[];
  warningWindowSec: number; // estimated time from flare detection to peak proton arrival
}

export interface StormStressResult {
  verdict: 'PASS' | 'MARGINAL' | 'FAIL';
  hasShelter: boolean;
  shelterVolumeM3: number;
  shelterVolumePerCrewM3: number;
  requiredVolumePerCrewM3: number;
  allCrewReachable: boolean;
  worstTransitSec: number;
  warningWindowSec: number;
  shieldingArealDensityGcm2: number;
  unshieldedDoseMsv: number;
  shieldedDoseMsv: number;
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
  iterations: number;
  previousZones: ZoneNode[];
}
