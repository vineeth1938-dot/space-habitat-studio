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
      ? { label: 'PASS', color: '#10b981' }
      : failCount === 0 || scores.overall >= 60
        ? { label: 'WARN', color: '#f59e0b' }
        : { label: 'FAIL', color: '#ef4444' };

  const subBars: Array<{ label: string; val: number }> = [
    { label: 'VOLUME', val: scores.volume },
    { label: 'ACOUSTICS', val: scores.acoustics },
    { label: 'ADJACENCY', val: scores.adjacency },
    { label: 'EGRESS A*', val: scores.egress },
    { label: 'RAD / REDUND', val: scores.radiation },
  ];

  const containerClass = isMobile
    ? 'w-full h-full flex flex-col overflow-y-auto'
    : 'w-[300px] xl:w-[320px] shrink-0 h-full border-l flex flex-col overflow-hidden';

  return (
    <aside
      className={containerClass}
      style={{
        backgroundColor: 'var(--bg-panel)',
        borderColor: 'var(--border-hairline)',
        color: 'var(--fg-primary)',
      }}
    >
      {/* Top: Compliance Score + Sub-Scores */}
      <div
        className="p-3 border-b space-y-3 shrink-0"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider">
              Compliance Telemetry
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span
                data-testid="overall-score"
                className="font-mono-cad text-3xl font-bold leading-none"
              >
                {scores.overall}
              </span>
              <span className="font-mono-cad text-xs" style={{ color: 'var(--fg-muted)' }}>
                / 100
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 font-mono-cad">
            <span
              data-testid="overall-verdict"
              className="px-2 py-0.5 text-[10px] font-bold border"
              style={{
                borderColor: overallBadge.color,
                color: overallBadge.color,
              }}
            >
              {overallBadge.label}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>
              {failCount} FAIL · {warnCount} WARN
            </span>
          </div>
        </div>

        {/* 5 Sub-Score Hairline Bars */}
        <div className="space-y-1.5 font-mono-cad text-[10px]">
          {subBars.map((sb) => (
            <div key={sb.label} className="flex items-center gap-2">
              <span className="w-24 truncate" style={{ color: 'var(--fg-secondary)' }}>
                {sb.label}
              </span>
              <div
                className="flex-1 h-1.5 border overflow-hidden"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-subtle)',
                }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${sb.val}%`,
                    backgroundColor: statusColor(sb.val),
                  }}
                />
              </div>
              <span className="w-7 text-right font-semibold">{sb.val}</span>
            </div>
          ))}
        </div>

        {/* Key Numeric Readout Grid */}
        <div
          className="grid grid-cols-4 border font-mono-cad text-[10px]"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <div className="p-1.5 border-r min-w-0" style={{ borderColor: 'var(--border-hairline)' }}>
            <div style={{ color: 'var(--fg-muted)' }}>NHV/C</div>
            <div className="font-bold truncate">{volume.nhvPerCrewM3}m³</div>
          </div>
          <div className="p-1.5 border-r min-w-0" style={{ borderColor: 'var(--border-hairline)' }}>
            <div style={{ color: 'var(--fg-muted)' }}>SLEEP</div>
            <div className="font-bold truncate">{acoustics.maxSleepDba}dB</div>
          </div>
          <div className="p-1.5 border-r min-w-0" style={{ borderColor: 'var(--border-hairline)' }}>
            <div style={{ color: 'var(--fg-muted)' }}>EGRESS</div>
            <div className="font-bold truncate">
              {egress.allValid ? `${egress.maxDistanceM}m` : 'BLK'}
            </div>
          </div>
          <div className="p-1.5 min-w-0">
            <div style={{ color: 'var(--fg-muted)' }}>SHIELD</div>
            <div className="font-bold truncate">{adjacency.shieldedSleepPerimeterPct}%</div>
          </div>
        </div>

        {/* Action Buttons: AUTO-OPTIMIZE + SAVE & COMPARE */}
        <div className="grid grid-cols-1 gap-2 pt-0.5">
          <button
            type="button"
            data-testid="auto-optimize-btn"
            onClick={runAutoOptimize}
            className="w-full min-h-[42px] md:min-h-[36px] px-3 border font-mono-cad text-xs md:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
            style={{
              backgroundColor: 'var(--accent-bg)',
              color: 'var(--accent-fg)',
              borderColor: 'var(--border-strong)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AUTO-OPTIMIZE LAYOUT
          </button>

          {lastOptimizeInfo && (
            <div
              data-testid="optimize-delta-banner"
              className="px-2.5 py-1.5 border font-mono-cad text-[10px] flex items-center justify-between"
              style={{
                borderColor: '#10b981',
                color: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
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
            className="w-full min-h-[40px] md:min-h-[32px] px-3 border font-mono-cad text-xs md:text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--fg-primary)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <Columns2 className="w-3.5 h-3.5" />
            SAVE &amp; COMPARE ({snapshots.length})
          </button>
        </div>
      </div>

      {/* Prioritized Actionable Fix List */}
      <div className={isMobile ? 'flex-1' : 'flex-1 flex flex-col min-h-0 overflow-hidden'}>
        <div
          className="px-3 py-2 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Actionable Diagnostics
          </h2>
          <span className="font-mono-cad text-[10px]" style={{ color: 'var(--fg-muted)' }}>
            TAP TO FOCUS
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
                className="w-full text-left p-3 md:p-2.5 space-y-1 cursor-pointer transition-colors hover:opacity-90 active:opacity-80"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <div className="flex items-center justify-between gap-1.5 font-mono-cad text-[10px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="px-1 py-0.2 border font-bold shrink-0"
                      style={{ borderColor: sevCol, color: sevCol }}
                    >
                      {issue.severity}
                    </span>
                    <span
                      className="px-1 py-0.2 border shrink-0"
                      style={{
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--fg-muted)',
                      }}
                    >
                      {issue.agency}
                    </span>
                    <span className="truncate" style={{ color: 'var(--fg-muted)' }}>
                      {issue.code}
                    </span>
                  </div>
                  <span className="font-semibold shrink-0">{issue.metric}</span>
                </div>

                <div className="text-xs font-semibold leading-snug break-words">{issue.title}</div>
                <div className="text-[11px] leading-snug break-words" style={{ color: 'var(--fg-secondary)' }}>
                  {issue.detail}
                </div>
                {issue.severity !== 'PASS' && (
                  <div
                    className="font-mono-cad text-[10px] pt-0.5 break-words"
                    style={{ color: 'var(--fg-primary)' }}
                  >
                    FIX → {issue.action}
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
