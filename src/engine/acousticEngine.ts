import {
  GRID_STEP_M,
  NASA_DECK_ATTENUATION_DBA,
  NASA_HABITABLE_NC50_DBA,
  NASA_SLEEP_NC40_DBA,
  NASA_SLEEP_SHORT_NC50_DBA,
  NASA_WALL_ATTENUATION_DBA,
  ZONE_SPECS,
} from './constants';
import { clamp, isPointInHull, sanitizeMission } from './geometry';
import {
  AcousticCell,
  AcousticMetrics,
  MissionConfig,
  ValidationIssue,
  ZoneModule,
} from '../types/habitat';

/**
 * Tests whether line segment P -> Q intersects an axis-aligned rectangle (used for acoustic baffle check).
 */
function segmentIntersectsBox(
  px: number,
  py: number,
  qx: number,
  qy: number,
  bx: number,
  by: number,
  bw: number,
  bh: number
): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = qx - px;
  const dy = qy - py;
  const checks: Array<[number, number]> = [
    [-dx, px - bx],
    [dx, bx + bw - px],
    [-dy, py - by],
    [dy, by + bh - py],
  ];
  for (const [p, q] of checks) {
    if (Math.abs(p) < 1e-8) {
      if (q < 0) return false;
    } else {
      const r = q / p;
      if (p < 0) {
        if (r > t1) return false;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return false;
        if (r < t1) t1 = r;
      }
    }
  }
  return t0 < t1 && t1 > 0.05 && t0 < 0.95;
}

function pointToModuleDistance(px: number, py: number, m: ZoneModule): number {
  const dx = Math.max(0, Math.max(m.x - px, px - (m.x + m.w)));
  const dy = Math.max(0, Math.max(m.y - py, py - (m.y + m.h)));
  return Math.hypot(dx, dy);
}

/**
 * 2D Grid Acoustic Propagation Engine (NASA-STD-3001 Vol. 2 [V2 6073]).
 * Models distance-decay + partition wall attenuation + intervening module baffling across all 0.5m cells.
 */
export function evaluateAcoustics(
  rawMission: MissionConfig,
  modules: ZoneModule[]
): { metrics: AcousticMetrics; issues: ValidationIssue[] } {
  const mission = sanitizeMission(rawMission);
  const { hull, durationDays, standard } = mission;

  const sleepLimitDba =
    durationDays > 30 ? NASA_SLEEP_NC40_DBA : NASA_SLEEP_SHORT_NC50_DBA;
  const habitableLimitDba = NASA_HABITABLE_NC50_DBA;

  const cols = Math.max(1, Math.round(hull.widthM / GRID_STEP_M));
  const rows = Math.max(1, Math.round(hull.depthM / GRID_STEP_M));

  const cells: AcousticCell[] = [];
  let maxSleepDba = 32;
  let maxHabitableDba = 32;
  const violatingSleepSet = new Set<string>();
  const violatingSourceSet = new Set<string>();

  const noisyModules = modules.filter((m) => ZONE_SPECS[m.type].sourceDba >= 54);

  for (let d = 0; d < hull.decks; d++) {
    const deckModules = modules.filter((m) => m.deck === d);

    for (let r = 0; r < rows; r++) {
      const cy = (r + 0.5) * GRID_STEP_M;
      for (let c = 0; c < cols; c++) {
        const cx = (c + 0.5) * GRID_STEP_M;
        if (!isPointInHull(cx, cy, hull)) continue;

        // Identify module containing this cell (if any)
        const hostMod = deckModules.find(
          (m) => cx >= m.x && cx <= m.x + m.w && cy >= m.y && cy <= m.y + m.h
        );

        // Ambient quiet background power (32 dBA)
        let acousticPowerSum = Math.pow(10, 32 / 10);

        for (const src of noisyModules) {
          const srcDba = ZONE_SPECS[src.type].sourceDba;

          if (hostMod && hostMod.id === src.id) {
            acousticPowerSum += Math.pow(10, srcDba / 10);
            continue;
          }

          const dist2d = pointToModuleDistance(cx, cy, src);
          const deckDiff = Math.abs(src.deck - d);

          // Spherical/cylindrical inverse-square indoor decay: 20*log10(1 + dist)
          const decayDba = 20 * Math.log10(1 + dist2d);

          // Wall transmission loss:
          // - Source enclosure wall + target enclosure wall when separated by >=0.5m
          // - Reduced flanking attenuation (4 dBA) if host module directly touches noisy source!
          let wallLoss = 0;
          if (deckDiff > 0) {
            wallLoss += deckDiff * NASA_DECK_ATTENUATION_DBA;
          } else if (hostMod) {
            const modGap = Math.hypot(
              Math.max(0, Math.max(hostMod.x - (src.x + src.w), src.x - (hostMod.x + hostMod.w))),
              Math.max(0, Math.max(hostMod.y - (src.y + src.h), src.y - (hostMod.y + hostMod.h)))
            );
            wallLoss += modGap < 0.25 ? 4 : NASA_WALL_ATTENUATION_DBA + 4;
          } else {
            // Open corridor cell outside source's own partition
            wallLoss += 6;
          }

          // Check if an intervening module acts as an acoustic baffle on the same deck
          if (deckDiff === 0) {
            const sx = src.x + src.w / 2;
            const sy = src.y + src.h / 2;
            const baffled = deckModules.some(
              (other) =>
                other.id !== src.id &&
                other.id !== hostMod?.id &&
                segmentIntersectsBox(sx, sy, cx, cy, other.x, other.y, other.w, other.h)
            );
            if (baffled) {
              wallLoss += 8;
            }
          }

          const received = Math.max(28, srcDba - decayDba - wallLoss);
          acousticPowerSum += Math.pow(10, received / 10);
        }

        const totalDba = Number(clamp(10 * Math.log10(acousticPowerSum), 30, 85).toFixed(1));
        const nc = Math.round(totalDba - 8);
        cells.push({ x: cx, y: cy, deck: d, dba: totalDba, nc });

        if (hostMod?.type === 'sleep') {
          if (totalDba > maxSleepDba) maxSleepDba = totalDba;
          if (totalDba > sleepLimitDba) {
            violatingSleepSet.add(hostMod.id);
            // Attribute to closest high-noise source(s)
            for (const src of modules) {
              if (ZONE_SPECS[src.type].sourceDba >= 60) {
                const dist = pointToModuleDistance(cx, cy, src);
                if (src.deck === d && dist < 5.5) {
                  violatingSourceSet.add(src.id);
                }
              }
            }
          }
        } else if (
          !hostMod ||
          (hostMod.type !== 'exercise' && hostMod.type !== 'eclss' && hostMod.type !== 'airlock')
        ) {
          if (totalDba > maxHabitableDba) maxHabitableDba = totalDba;
        }
      }
    }
  }

  const issues: ValidationIssue[] = [];
  const sleepModules = modules.filter((m) => m.type === 'sleep');
  const strictAcoustics = standard === 'NASA' || standard === 'UNIFIED';

  if (sleepModules.length > 0) {
    if (maxSleepDba > sleepLimitDba) {
      const excess = Number((maxSleepDba - sleepLimitDba).toFixed(1));
      issues.push({
        id: 'ac-sleep-exceeded',
        code: 'NASA-3001-V2-6073',
        agency: 'NASA',
        severity: strictAcoustics || excess >= 5 ? 'FAIL' : 'WARN',
        category: 'acoustics',
        title: `Sleep Quarters Exceed ${durationDays > 30 ? 'NC-40' : 'NC-50'} Limit`,
        detail: `Peak noise inside Sleep Quarters reaches ${maxSleepDba} dBA (+${excess} dBA above ${sleepLimitDba} dBA threshold) due to nearby Exercise/ECLSS equipment.`,
        action:
          'Separate Sleep Quarters from Exercise (72 dBA) & Work/ECLSS (65 dBA), or place Storage/Galley modules between them as an acoustic baffle.',
        metric: `${maxSleepDba} / ${sleepLimitDba} dBA`,
        moduleIds: [...Array.from(violatingSleepSet), ...Array.from(violatingSourceSet)],
      });
    } else {
      issues.push({
        id: 'ac-sleep-pass',
        code: 'NASA-3001-V2-6073',
        agency: 'NASA',
        severity: 'PASS',
        category: 'acoustics',
        title: 'Sleep Acoustic Isolation Compliant',
        detail: `All Sleep Quarters remain <= ${maxSleepDba} dBA (limit ${sleepLimitDba} dBA / ${durationDays > 30 ? 'NC-40' : 'NC-50'}).`,
        action: 'Acoustic zoning meets NASA sleep recovery criteria.',
        metric: `${maxSleepDba} dBA`,
        moduleIds: [],
      });
    }
  }

  if (maxHabitableDba > habitableLimitDba + 3) {
    issues.push({
      id: 'ac-hab-warn',
      code: 'NASA-3001-V2-6074',
      agency: 'NASA',
      severity: 'WARN',
      category: 'acoustics',
      title: 'Elevated Corridor / Wardroom Noise (> NC-50)',
      detail: `General habitable corridor/wardroom peaks at ${maxHabitableDba} dBA (NC-50 target <= ${habitableLimitDba} dBA).`,
      action: 'Cluster Exercise and ECLSS racks at one end of the pressure hull.',
      metric: `${maxHabitableDba} dBA`,
      moduleIds: Array.from(violatingSourceSet),
    });
  }

  return {
    metrics: {
      cells,
      maxSleepDba,
      sleepLimitDba,
      maxHabitableDba,
      habitableLimitDba,
      violatingSleepIds: Array.from(violatingSleepSet),
      violatingSourceIds: Array.from(violatingSourceSet),
    },
    issues,
  };
}
