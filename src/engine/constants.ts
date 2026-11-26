import { AgencyStandard, HullGeometryType, ZoneType } from '../types/habitat';

/**
 * Spatial discretization step for CAD placement, A* egress, and acoustic field modeling.
 * Specified by BMSIT StarForge 2026 SW-4 Section 1.3 (0.5m grid resolution).
 */
export const GRID_STEP_M = 0.5;

/** Clamping bounds for defensive input sanitation */
export const CREW_MIN = 1;
export const CREW_MAX = 12;
export const DURATION_MIN_DAYS = 3;
export const DURATION_MAX_DAYS = 1000;

// ============================================================================
// A. NASA-STD-3001 VOL. 2 REV E & HUMAN RESEARCH PROGRAM (HRP) THRESHOLDS
// ============================================================================

/**
 * NASA-STD-3001 Vol. 2 Rev E [V2 8001] / Stromgren et al. (NASA/TP-2020-220505):
 * Subtract 22% structural ribs, pressure shell standoffs, avionics coldplates, and IMV ducting
 * from gross internal pressurized hull volume to yield Net Habitable Volume (NHV).
 */
export const NASA_STRUCTURAL_OVERHEAD_RATIO = 0.22;

/**
 * NASA-STD-3001 Vol. 2 Rev E Section 8.2 / Celentano Curve (1963) & Simon (2015):
 * Minimum 25.0 m³ NHV per crew member for long-duration exploration missions (>= 180 days).
 */
export const NASA_NHV_LONG_DURATION_M3 = 25.0;

/**
 * Short-duration Celentano performance/optimal baseline at 3 days (~8.5 m³/crew).
 */
export const NASA_NHV_SHORT_DURATION_M3 = 8.5;

/**
 * Small-crew non-linear floor multiplier (NASA HRP Net Habitable Volume Workshop):
 * Shared functional spaces (galley, exercise, airlock) do not shrink linearly below 6 crew.
 */
export const NASA_SMALL_CREW_REF = 6;

/**
 * NASA-STD-3001 Vol. 2 Rev E [V2 8020] Private Crew Quarters:
 * Dedicated acoustic/visual private sleep enclosure >= 5.4 m³ per crew member for missions > 30 days
 * (approx. 1.8m x 1.2m x 2.5m or equivalent multi-bunk bay volume).
 */
export const NASA_PRIVATE_SLEEP_MIN_M3 = 5.4;
export const NASA_PRIVATE_SLEEP_DURATION_DAYS = 30;

/**
 * NASA-STD-3001 Vol. 2 Rev E [V2 6073] Continuous Noise Limits:
 * - Sleep Quarters (> 30 days): NC-40 (~48 dBA) maximum continuous background noise.
 * - Sleep Quarters (<= 30 days): NC-50 (~58 dBA) short-mission allowance.
 * - General Habitable Work/Living Spaces: NC-50 (~58 dBA).
 */
export const NASA_SLEEP_NC40_DBA = 48;
export const NASA_SLEEP_SHORT_NC50_DBA = 58;
export const NASA_HABITABLE_NC50_DBA = 58;

/**
 * Partition Bulkhead Acoustic Transmission Loss (dBA per intervening module wall boundary).
 * Derived from NASA ISS Crew Quarters acoustic liner performance (~10 dBA isolation).
 */
export const NASA_WALL_ATTENUATION_DBA = 10;

/**
 * Multi-deck structural pressure plate acoustic isolation (dBA per deck separation).
 */
export const NASA_DECK_ATTENUATION_DBA = 14;

/**
 * NASA-STD-3001 Vol. 2 Rev E [V2 8005] Translation Path & Emergency Egress:
 * Anthropometric 99th-percentile crew clearance >= 0.8m unobstructed corridor width.
 */
export const NASA_MIN_EGRESS_CORRIDOR_M = 0.8;

/**
 * NASA-STD-3001 Vol. 2 Rev E [V2 7041] Hygiene Redundancy & Cross-Contamination:
 * Minimum separation distance (m) between Hygiene/UWMS and Food/Galley or Sleep quarters,
 * and minimum 2 separated Hygiene bays when Crew >= 4 and Duration >= 30 days.
 */
export const NASA_HYGIENE_SEPARATION_M = 1.5;
export const NASA_DUAL_HYGIENE_CREW = 4;
export const NASA_DUAL_HYGIENE_DAYS = 30;

// ============================================================================
// B. ISRO STANDARDS (GAGANYAAN & BHARATIYA ANTARIKSH STATION - BAS)
// ============================================================================

/**
 * ISRO Gaganyaan / BAS Human-Rating & ECLSS Serviceability Guideline:
 * Dedicated Work/ECLSS rack bay requires >= 1.0m unobstructed maintenance access corridor
 * for regenerative CO2 scrubber, O2 generation, and thermal control LRU replacement.
 */
export const ISRO_ECLSS_MAINTENANCE_CORRIDOR_M = 1.0;

/**
 * ISRO Gaganyaan / BAS Rapid Crew Escape & Docking Adapter Access:
 * Maximum emergency translation path <= 12.0m OR <= 18.0 seconds from primary Sleep and Work
 * bays to the orbital module Airlock / Crew Escape Docking Adapter.
 */
export const ISRO_MAX_ESCAPE_DISTANCE_M = 12.0;
export const ISRO_MAX_ESCAPE_TIME_SEC = 18.0;

/**
 * Conservative emergency translation velocity in microgravity / partial gravity (0.70 m/s),
 * mapping 12.0m -> 17.1s (<= 18.0s).
 */
export const CREW_TRANSIT_SPEED_MPS = 0.7;

/**
 * ISRO BAS Microgravity Countermeasure Envelope:
 * Minimum 3.5 m² floor footprint for Exercise zone to accommodate resistive device + cycle/treadmill
 * kinematic envelope without wall impact.
 */
export const ISRO_MIN_EXERCISE_FOOTPRINT_M2 = 3.5;

// ============================================================================
// C. SPACEX STANDARDS (STARSHIP HLS / DEEP-SPACE HIGH-VOLUME ARCHITECTURE)
// ============================================================================

/**
 * SpaceX Starship Deep-Space / Lunar Architecture SPE Radiation Mass Buffering:
 * Storage/Water logistics bays must buffer >= 50% of the exposed perimeter of Sleep / Storm Shelter
 * zones (within 1.0m standoff) to attenuate Solar Particle Events (SPEs).
 */
export const SPACEX_MIN_SHIELD_PERIMETER_RATIO = 0.5;
export const SPACEX_SHIELD_BUFFER_RANGE_M = 1.0;

/**
 * SpaceX High-Crew / Multi-Deck Redundant Egress Rule:
 * When Crew >= 6 or Hull is Multi-Deck, require >= 2 Airlock/Escape hatches OR >= 2 vertex-disjoint
 * A* escape corridors from Sleep and Work zones.
 */
export const SPACEX_DUAL_EGRESS_CREW_MIN = 6;

/**
 * SpaceX Volumetric Floor Packing Efficiency Benchmarks:
 * Minimum usable floor packing ratio and maximum tolerated trapped dead-space grid cells.
 */
export const SPACEX_MIN_PACKING_EFFICIENCY_PCT = 42;
export const SPACEX_MAX_PACKING_EFFICIENCY_PCT = 82;

// ============================================================================
// CATALOG DEFINITIONS (ZONES, HULLS, AGENCY LABELS)
// ============================================================================

export interface ZoneSpec {
  type: ZoneType;
  label: string;
  code: string;
  defaultW: number;
  defaultH: number;
  minW: number;
  minH: number;
  /** Continuous sound pressure emission at 1m reference in dBA */
  sourceDba: number;
  /** Light/Dark neutral CAD hatch/fill tint */
  tintHex: string;
  description: string;
}

export const ZONE_SPECS: Record<ZoneType, ZoneSpec> = {
  sleep: {
    type: 'sleep',
    label: 'Sleep Quarters',
    code: 'SLP',
    defaultW: 2.5,
    defaultH: 2.0,
    minW: 1.5,
    minH: 1.5,
    sourceDba: 34,
    tintHex: '#3b82f6',
    description: 'Private crew bunks; NC-40 quiet zone & SPE shelter target.',
  },
  exercise: {
    type: 'exercise',
    label: 'Exercise Bay',
    code: 'EXR',
    defaultW: 2.5,
    defaultH: 2.0,
    minW: 1.5,
    minH: 1.5,
    sourceDba: 72,
    tintHex: '#ef4444',
    description: '72 dBA vibration/noise source; >=3.5m² ISRO envelope.',
  },
  hygiene: {
    type: 'hygiene',
    label: 'Hygiene / Waste',
    code: 'HYG',
    defaultW: 1.5,
    defaultH: 1.5,
    minW: 1.0,
    minH: 1.0,
    sourceDba: 54,
    tintHex: '#f59e0b',
    description: 'UWMS enclosure; isolate from Galley & Sleep.',
  },
  galley: {
    type: 'galley',
    label: 'Food / Galley',
    code: 'GAL',
    defaultW: 2.5,
    defaultH: 2.0,
    minW: 1.5,
    minH: 1.5,
    sourceDba: 55,
    tintHex: '#10b981',
    description: 'Wardroom & meal prep; keep clear of Hygiene odor path.',
  },
  eclss: {
    type: 'eclss',
    label: 'Work / ECLSS',
    code: 'ECL',
    defaultW: 2.5,
    defaultH: 1.5,
    minW: 1.5,
    minH: 1.0,
    sourceDba: 65,
    tintHex: '#8b5cf6',
    description: '65 dBA life-support/avionics; needs >=1.0m ISRO service aisle.',
  },
  medical: {
    type: 'medical',
    label: 'Medical Bay',
    code: 'MED',
    defaultW: 2.0,
    defaultH: 2.0,
    minW: 1.5,
    minH: 1.5,
    sourceDba: 45,
    tintHex: '#14b8a6',
    description: 'Clinical care; NASA adjacency bonus near Exercise & Airlock.',
  },
  storage: {
    type: 'storage',
    label: 'Storage / Water',
    code: 'STO',
    defaultW: 2.5,
    defaultH: 1.0,
    minW: 1.0,
    minH: 1.0,
    sourceDba: 30,
    tintHex: '#0ea5e9',
    description: 'High-Z water/consumables mass; SpaceX SPE radiation buffer.',
  },
  airlock: {
    type: 'airlock',
    label: 'Airlock / Escape',
    code: 'AIR',
    defaultW: 2.0,
    defaultH: 1.5,
    minW: 1.5,
    minH: 1.5,
    sourceDba: 48,
    tintHex: '#64748b',
    description: 'Primary EVA & docking escape hatch; A* egress terminus.',
  },
};

export const ZONE_SPEC_LIST: ZoneSpec[] = Object.values(ZONE_SPECS);

export interface HullTemplate {
  type: HullGeometryType;
  label: string;
  defaultWidthM: number;
  defaultDepthM: number;
  defaultDeckHeightM: number;
  defaultDecks: number;
  /** Geometric volume factor relative to bounding box W * D * H * decks */
  volumeShapeFactor: number;
}

export const HULL_TEMPLATES: Record<HullGeometryType, HullTemplate> = {
  cylinder: {
    type: 'cylinder',
    label: 'Cylinder (LEO / Gateway)',
    defaultWidthM: 12.0,
    defaultDepthM: 5.0,
    defaultDeckHeightM: 2.4,
    defaultDecks: 1,
    volumeShapeFactor: 0.86,
  },
  inflatable: {
    type: 'inflatable',
    label: 'Inflatable TransHab',
    defaultWidthM: 12.0,
    defaultDepthM: 8.0,
    defaultDeckHeightM: 2.6,
    defaultDecks: 1,
    volumeShapeFactor: 0.84,
  },
  dome: {
    type: 'dome',
    label: 'Lunar Dome (Circular)',
    defaultWidthM: 10.0,
    defaultDepthM: 10.0,
    defaultDeckHeightM: 3.0,
    defaultDecks: 1,
    volumeShapeFactor: 0.68,
  },
  multideck: {
    type: 'multideck',
    label: 'Multi-Deck Stack (Starship)',
    defaultWidthM: 9.0,
    defaultDepthM: 8.0,
    defaultDeckHeightM: 2.5,
    defaultDecks: 2,
    volumeShapeFactor: 0.82,
  },
};

export const AGENCY_STANDARDS_META: Record<
  AgencyStandard,
  { label: string; short: string; summary: string }
> = {
  NASA: {
    label: 'NASA-STD-3001',
    short: 'NASA',
    summary: '25 m³/crew NHV, NC-40 sleep acoustics, 0.8m A* egress, hygiene isolation.',
  },
  ISRO: {
    label: 'ISRO BAS / Gaganyaan',
    short: 'ISRO',
    summary: '1.0m ECLSS service aisle, <=12m/18s rapid escape, >=3.5m² exercise bay.',
  },
  SPACEX: {
    label: 'SpaceX Starship HLS',
    short: 'SPACEX',
    summary: '>=50% water/storage SPE shielding around sleep, dual-egress redundancy, packing.',
  },
  UNIFIED: {
    label: 'Unified Multi-Agency',
    short: 'UNIFIED',
    summary: 'Enforces all NASA-STD-3001 + ISRO BAS + SpaceX Starship criteria simultaneously.',
  },
};
