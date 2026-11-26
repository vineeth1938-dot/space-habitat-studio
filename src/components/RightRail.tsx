import React from 'react';
import { Columns2, Sparkles } from 'lucide-react';
import { useCadStore } from '../store/useCadStore';

function statusColor(score: number): string {
  if (score >= 82) return '#10b981';
  if (score >= 58) return '#f59e0b';
  return '#ef4444';
}

interface RightRailProps {
  variant?: 'desktop' | 'mobile';
}

export const RightRail: React.FC<RightRailProps> = ({ variant = 'desktop' }) => {
  const {
    evaluation,
    lastOptimizeInfo,
    snapshots,
    highlightModules,
    runAutoOptimize,
    setCompareOpen,
  } = useCadStore();

  const isMobile = variant === 'mobile';
  const { scores, issues, volume, acoustics, adjacency, egress } = evaluation;
  const failCount = issues.filter((i) => i.severity === 'FAIL').length;
  const warnCount = issues.filter((i) => i.severity === 'WARN').length;

  const overallBadge =
    failCount === 0 && scores.overall >= 82
      ? { label: 'FLIGHT READY', color: '#10b981' }
      : failCount === 0 || scores.overall >= 60
        ? { label: 'NEEDS REVIEW', color: '#f59e0b' }
        : { label: 'HAZARDS FOUND', color: '#ef4444' };

  const subBars: Array<{ label: string; val: number }> = [
    { label: 'Habitable Volume', val: scores.volume },
    { label: 'Quietness (dBA)', val: scores.acoustics },
    { label: 'Zone Separation', val: scores.adjacency },
    { label: 'Escape Corridors', val: scores.egress },
    { label: 'Radiation Shield', val: scores.radiation },
  ];

  const containerClass = isMobile
    ? 'w-full h-full flex flex-col overflow-y-auto'
    : 'w-[308px] xl:w-[324px] shrink-0 h-full border-l flex flex-col overflow-hidden';

  return (
    <aside
      className={containerClass}
      style={{
        backgroundColor: 'var(--bg-panel)',
        borderColor: 'var(--border-hairline)',
        color: 'var(--fg-primary)',
      }}
    >
      {/* Top: Mission Readiness Score + Sub-Scores */}
      <div
        className="p-3.5 border-b space-y-3 shrink-0"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider">
              Mission Readiness
            </h2>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span
                data-testid="overall-score"
                className="font-mono-cad text-3xl font-bold leading-none"
                style={{ color: overallBadge.color }}
              >
                {scores.overall}
              </span>
              <span className="font-mono-cad text-xs" style={{ color: 'var(--fg-muted)' }}>
                / 100
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              data-testid="overall-verdict"
              className="px-2 py-0.5 rounded text-[10px] font-bold border"
              style={{
                borderColor: overallBadge.color,
                color: overallBadge.color,
              }}
            >
              {overallBadge.label}
            </span>
            <span className="font-mono-cad text-[11px]" style={{ color: 'var(--fg-muted)' }}>
              {failCount} Critical · {warnCount} Warnings
            </span>
          </div>
        </div>

        {/* 5 Sub-Score Bars */}
        <div className="space-y-1.5 text-xs">
          {subBars.map((sb) => (
            <div key={sb.label} className="flex items-center gap-2">
              <span className="w-28 truncate text-[11px]" style={{ color: 'var(--fg-secondary)' }}>
                {sb.label}
              </span>
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--bg-subtle)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${sb.val}%`,
                    backgroundColor: statusColor(sb.val),
                  }}
                />
              </div>
              <span className="w-7 text-right font-mono-cad text-[11px] font-semibold">
                {sb.val}
              </span>
            </div>
          ))}
        </div>

        {/* Key Human-Readable Telemetry Cards */}
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div
            className="p-2 rounded-md border"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-elevated)' }}
          >
            <div className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>
              Volume / Crew
            </div>
            <div className="font-mono-cad font-bold mt-0.5">
              {volume.nhvPerCrewM3} m³{' '}
              <span className="font-normal text-[10px]" style={{ color: 'var(--fg-muted)' }}>
                (min {volume.requiredNhvPerCrewM3})
              </span>
            </div>
          </div>

          <div
            className="p-2 rounded-md border"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-elevated)' }}
          >
            <div className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>
              Sleep Noise
            </div>
            <div className="font-mono-cad font-bold mt-0.5">
              {acoustics.maxSleepDba} dBA{' '}
              <span className="font-normal text-[10px]" style={{ color: 'var(--fg-muted)' }}>
                (≤{acoustics.sleepLimitDba})
              </span>
            </div>
          </div>

          <div
            className="p-2 rounded-md border"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-elevated)' }}
          >
            <div className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>
              Escape Path
            </div>
            <div className="font-mono-cad font-bold mt-0.5">
              {egress.allValid ? `${egress.maxDistanceM} m` : 'Blocked'}
            </div>
          </div>

          <div
            className="p-2 rounded-md border"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-elevated)' }}
          >
            <div className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>
              Water Shield
            </div>
            <div className="font-mono-cad font-bold mt-0.5">
              {adjacency.shieldedSleepPerimeterPct}%{' '}
              <span className="font-normal text-[10px]" style={{ color: 'var(--fg-muted)' }}>
                (≥50%)
              </span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-1 gap-2 pt-0.5">
          <button
            type="button"
            data-testid="auto-optimize-btn"
            onClick={runAutoOptimize}
            className="w-full min-h-[44px] md:min-h-[38px] px-3 rounded-lg text-xs font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-95 active:scale-[0.99]"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
            }}
          >
            <Sparkles className="w-4 h-4" />
            AUTO-OPTIMIZE LAYOUT
          </button>

          {lastOptimizeInfo && (
            <div
              data-testid="optimize-delta-banner"
              className="px-3 py-1.5 rounded-md border font-mono-cad text-[11px] flex items-center justify-between"
              style={{
                borderColor: '#10b981',
                color: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.10)',
              }}
            >
              <span>
                SOLVED: {lastOptimizeInfo.beforeScore} → {lastOptimizeInfo.afterScore} PTS
              </span>
              <span>{lastOptimizeInfo.elapsedMs}ms</span>
            </div>
          )}

          <button
            type="button"
            data-testid="open-compare-btn"
            onClick={() => setCompareOpen(true)}
            className="w-full min-h-[42px] md:min-h-[34px] px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--fg-primary)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <Columns2 className="w-3.5 h-3.5" />
            Compare &amp; Checkpoints ({snapshots.length})
          </button>
        </div>
      </div>

      {/* Prioritized Engineering Fix List */}
      <div className={isMobile ? 'flex-1 pb-4' : 'flex-1 flex flex-col min-h-0 overflow-hidden'}>
        <div
          className="px-3.5 py-2 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Safety &amp; Habitability Checks
          </h2>
          <span className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>
            Tap to locate
          </span>
        </div>

        <div
          className={`${isMobile ? '' : 'flex-1 overflow-y-auto'} divide-y`}
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          {issues.map((issue) => {
            const sevCol =
              issue.severity === 'FAIL'
                ? '#ef4444'
                : issue.severity === 'WARN'
                  ? '#f59e0b'
                  : '#10b981';
            return (
              <button
                type="button"
                key={issue.id}
                data-testid={`issue-${issue.id}`}
                onClick={() => highlightModules(issue.moduleIds)}
                className="w-full text-left p-3.5 md:p-3 space-y-1 cursor-pointer transition-colors hover:opacity-90 active:opacity-80"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <div className="flex items-center justify-between gap-1.5 font-mono-cad text-[10px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="px-1.5 py-0.5 rounded font-bold shrink-0"
                      style={{
                        color: sevCol,
                        backgroundColor:
                          issue.severity === 'FAIL'
                            ? 'rgba(239, 68, 68, 0.14)'
                            : issue.severity === 'WARN'
                              ? 'rgba(245, 158, 11, 0.14)'
                              : 'rgba(16, 185, 129, 0.14)',
                      }}
                    >
                      {issue.severity}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded border shrink-0"
                      style={{
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--fg-muted)',
                      }}
                    >
                      {issue.agency}
                    </span>
                  </div>
                  <span className="font-semibold shrink-0">{issue.metric}</span>
                </div>

                <div className="text-xs font-semibold leading-snug break-words">{issue.title}</div>
                <div className="text-[11px] leading-relaxed break-words" style={{ color: 'var(--fg-secondary)' }}>
                  {issue.detail}
                </div>
                {issue.severity !== 'PASS' && (
                  <div
                    className="text-[11px] font-medium pt-0.5 break-words"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    How to fix: {issue.action}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
