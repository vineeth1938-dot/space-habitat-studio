import { clamp, safeDiv, sanitizeMission } from './geometry';
import { evaluateVolume } from './volumeEngine';
import { evaluateAcoustics } from './acousticEngine';
import { evaluateAdjacency } from './adjacencyEngine';
import { evaluateEgress } from './egressEngine';
import {
  ComparisonDiff,
  HabitatEvaluation,
  LayoutSnapshot,
  MissionConfig,
  ScoreBreakdown,
  ValidationIssue,
  ZoneModule,
} from '../types/habitat';

/**
 * Computes full Multi-Agency Habitat Evaluation (Scores 0–100 + Ranked Actionable Issues).
 * Guaranteed NaN-free, Infinity-free, and deterministic.
 */
export function evaluateHabitatLayout(
  rawMission: MissionConfig,
  modules: ZoneModule[]
): HabitatEvaluation {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const mission = sanitizeMission(rawMission);

  const volRes = evaluateVolume(mission, modules);
  const acRes = evaluateAcoustics(mission, modules);
  const adjRes = evaluateAdjacency(mission, modules);
  const egRes = evaluateEgress(mission, modules);

  // Empty canvas guard
  if (modules.length === 0) {
    const emptyIssues: ValidationIssue[] = [
      {
        id: 'empty-canvas',
        code: 'CAD-INIT-00',
        agency: 'NASA',
        severity: 'FAIL',
        category: 'volume',
        title: 'Empty Habitat Floorplan',
        detail: 'No functional zone modules have been placed inside the pressure hull.',
        action: 'Click or drag zones from the Left Rail or load a Mission Preset.',
        metric: '0 Modules',
        moduleIds: [],
      },
    ];
    return {
      scores: {
        overall: 0,
        volume: 0,
        acoustics: 0,
        adjacency: 0,
        egress: 0,
        radiation: 0,
      },
      issues: emptyIssues,
      volume: volRes.metrics,
      acoustics: acRes.metrics,
      adjacency: adjRes.metrics,
      egress: egRes.metrics,
      computeMs: Number(
        ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0).toFixed(2)
      ),
    };
  }

  // 1. Volume Sub-Score (0–100)
  const nhvRatio = clamp(
    safeDiv(volRes.metrics.nhvPerCrewM3, volRes.metrics.requiredNhvPerCrewM3, 0),
    0,
    1.15
  );
  const sleepRatio = clamp(
    safeDiv(volRes.metrics.sleepVolumePerCrewM3, volRes.metrics.requiredSleepPerCrewM3, 0),
    0,
    1.15
  );
  let volumeScore = Math.round(clamp(nhvRatio * 60 + sleepRatio * 40, 0, 100));
  if (adjRes.metrics.trappedDeadPocketCells >= 4) {
    volumeScore = Math.max(0, volumeScore - Math.min(18, adjRes.metrics.trappedDeadPocketCells * 2));
  }

  // 2. Acoustics Sub-Score (0–100)
  let acousticsScore = 100;
  const sleepExcess = Math.max(0, acRes.metrics.maxSleepDba - acRes.metrics.sleepLimitDba);
  const habExcess = Math.max(0, acRes.metrics.maxHabitableDba - acRes.metrics.habitableLimitDba);
  acousticsScore -= sleepExcess * 4.5 + habExcess * 2.0;
  if (!modules.some((m) => m.type === 'sleep')) acousticsScore -= 40;
  acousticsScore = Math.round(clamp(acousticsScore, 0, 100));

  // 3. Adjacency Sub-Score (0–100)
  let adjacencyScore = 100;
  adjacencyScore -= adjRes.metrics.outOfBoundsIds.length * 28;
  adjacencyScore -= adjRes.metrics.overlappingPairs.length * 28;

  const adjIssues = adjRes.issues.filter((i) => i.category === 'adjacency');
  for (const iss of adjIssues) {
    if (iss.id === 'adj-oob' || iss.id === 'adj-overlap') continue;
    if (iss.severity === 'FAIL') adjacencyScore -= 22;
    else if (iss.severity === 'WARN') adjacencyScore -= 10;
    else if (iss.id === 'adj-med-bonus') adjacencyScore += 6;
  }
  adjacencyScore = Math.round(clamp(adjacencyScore, 0, 100));

  // 4. Egress Sub-Score (0–100)
  let egressScore = 100;
  if (!modules.some((m) => m.type === 'airlock')) {
    egressScore = 0;
  } else {
    const totalRoutes = Math.max(1, egRes.metrics.routes.length);
    const validCount = egRes.metrics.routes.filter((r) => r.valid).length;
    egressScore = (validCount / totalRoutes) * 100;

    if (
      (mission.standard === 'ISRO' || mission.standard === 'UNIFIED') &&
      egRes.metrics.maxWorkSleepDistanceM > 12.0
    ) {
      egressScore -= Math.min(35, (egRes.metrics.maxWorkSleepDistanceM - 12.0) * 6);
    }
  }
  egressScore = Math.round(clamp(egressScore, 0, 100));

  // 5. Radiation & Redundancy Sub-Score (0–100)
  const shieldNorm = clamp(
    safeDiv(adjRes.metrics.shieldedSleepPerimeterPct, adjRes.metrics.requiredShieldPct, 0),
    0,
    1
  );
  let radiationScore = shieldNorm * 70 + (egRes.metrics.dualEgressSatisfied ? 30 : 0);
  if (mission.solarFlareSim && shieldNorm < 1) {
    radiationScore *= 0.65;
  }
  if (
    mission.standard === 'NASA' &&
    !mission.solarFlareSim &&
    !egRes.metrics.dualEgressRequired
  ) {
    // Under pure NASA non-flare mode, give baseline credit while still rewarding water shielding
    radiationScore = 50 + shieldNorm * 50;
  }
  radiationScore = Math.round(clamp(radiationScore, 0, 100));

  // Agency-weighted Overall Score
  const weights =
    mission.standard === 'NASA'
      ? { volume: 0.26, acoustics: 0.24, adjacency: 0.22, egress: 0.2, radiation: 0.08 }
      : mission.standard === 'ISRO'
        ? { volume: 0.2, acoustics: 0.16, adjacency: 0.28, egress: 0.28, radiation: 0.08 }
        : mission.standard === 'SPACEX'
          ? { volume: 0.24, acoustics: 0.14, adjacency: 0.18, egress: 0.18, radiation: 0.26 }
          : { volume: 0.22, acoustics: 0.2, adjacency: 0.2, egress: 0.2, radiation: 0.18 };

  let overall =
    volumeScore * weights.volume +
    acousticsScore * weights.acoustics +
    adjacencyScore * weights.adjacency +
    egressScore * weights.egress +
    radiationScore * weights.radiation;

  // Hard penalty cap when overlapping or out-of-bounds geometry exists
  if (adjRes.metrics.overlappingPairs.length > 0 || adjRes.metrics.outOfBoundsIds.length > 0) {
    overall = Math.min(overall, 55);
  }

  const scores: ScoreBreakdown = {
    overall: Math.round(clamp(overall, 0, 100)),
    volume: volumeScore,
    acoustics: acousticsScore,
    adjacency: adjacencyScore,
    egress: egressScore,
    radiation: radiationScore,
  };

  const allIssues = [
    ...adjRes.issues,
    ...egRes.issues,
    ...acRes.issues,
    ...volRes.issues,
  ];

  const sevRank = { FAIL: 0, WARN: 1, PASS: 2 };
  allIssues.sort((a, b) => sevRank[a.severity] - sevRank[b.severity]);

  const computeMs = Number(
    ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0).toFixed(2)
  );

  return {
    scores,
    issues: allIssues,
    volume: volRes.metrics,
    acoustics: acRes.metrics,
    adjacency: adjRes.metrics,
    egress: egRes.metrics,
    computeMs,
  };
}

/**
 * Computes structured side-by-side comparison diffs between Snapshot A and Snapshot B.
 */
export function compareSnapshots(a: LayoutSnapshot, b: LayoutSnapshot): ComparisonDiff[] {
  const specs: Array<{
    key: string;
    label: string;
    unit: string;
    valA: number;
    valB: number;
    higherIsBetter: boolean;
    decimals: number;
  }> = [
    {
      key: 'overall',
      label: 'Overall Compliance Score',
      unit: 'pts',
      valA: a.scores.overall,
      valB: b.scores.overall,
      higherIsBetter: true,
      decimals: 0,
    },
    {
      key: 'volume',
      label: 'Volume Sub-Score',
      unit: 'pts',
      valA: a.scores.volume,
      valB: b.scores.volume,
      higherIsBetter: true,
      decimals: 0,
    },
    {
      key: 'acoustics',
      label: 'Acoustics Sub-Score',
      unit: 'pts',
      valA: a.scores.acoustics,
      valB: b.scores.acoustics,
      higherIsBetter: true,
      decimals: 0,
    },
    {
      key: 'adjacency',
      label: 'Adjacency Sub-Score',
      unit: 'pts',
      valA: a.scores.adjacency,
      valB: b.scores.adjacency,
      higherIsBetter: true,
      decimals: 0,
    },
    {
      key: 'egress',
      label: 'Egress Sub-Score',
      unit: 'pts',
      valA: a.scores.egress,
      valB: b.scores.egress,
      higherIsBetter: true,
      decimals: 0,
    },
    {
      key: 'radiation',
      label: 'Radiation / Redundancy',
      unit: 'pts',
      valA: a.scores.radiation,
      valB: b.scores.radiation,
      higherIsBetter: true,
      decimals: 0,
    },
    {
      key: 'nhv',
      label: 'NHV per Crew',
      unit: 'm³',
      valA: a.summary.nhvPerCrewM3,
      valB: b.summary.nhvPerCrewM3,
      higherIsBetter: true,
      decimals: 1,
    },
    {
      key: 'sleepDba',
      label: 'Peak Sleep Noise',
      unit: 'dBA',
      valA: a.summary.maxSleepDba,
      valB: b.summary.maxSleepDba,
      higherIsBetter: false,
      decimals: 1,
    },
    {
      key: 'egressDist',
      label: 'Max Egress Distance',
      unit: 'm',
      valA: a.summary.maxEgressDistanceM,
      valB: b.summary.maxEgressDistanceM,
      higherIsBetter: false,
      decimals: 1,
    },
    {
      key: 'shieldPct',
      label: 'SPE Water-Shielded Sleep',
      unit: '%',
      valA: a.summary.shieldedSleepPerimeterPct,
      valB: b.summary.shieldedSleepPerimeterPct,
      higherIsBetter: true,
      decimals: 0,
    },
    {
      key: 'fails',
      label: 'Critical Failures (FAIL)',
      unit: '',
      valA: a.summary.failCount,
      valB: b.summary.failCount,
      higherIsBetter: false,
      decimals: 0,
    },
  ];

  return specs.map((s) => {
    const rawDelta = Number((s.valB - s.valA).toFixed(s.decimals));
    const improved =
      Math.abs(rawDelta) < 1e-6
        ? null
        : s.higherIsBetter
          ? rawDelta > 0
          : rawDelta < 0;
    const sign = rawDelta > 0 ? '+' : '';
    const suffix = s.unit ? ` ${s.unit}` : '';

    return {
      key: s.key,
      label: s.label,
      unit: s.unit,
      valueA: s.valA,
      valueB: s.valB,
      delta: rawDelta,
      higherIsBetter: s.higherIsBetter,
      improved,
      displayA: `${s.valA.toFixed(s.decimals)}${suffix}`,
      displayB: `${s.valB.toFixed(s.decimals)}${suffix}`,
      displayDelta: `${sign}${rawDelta.toFixed(s.decimals)}${suffix}`,
    };
  });
}
