import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { RuleCategory, Severity } from '../types/habitat';
import { useHabitatStore } from '../store/habitatStore';

interface EngineeringInspectorProps {
  isMobileDrawer?: boolean;
}

type SubsystemKey = 'all' | 'NHV' | 'ACOUSTIC' | 'CONTAMINATION' | 'EGRESS' | 'AIRFLOW' | 'RADIATION';
type SeverityFilter = 'all' | 'issues' | 'pass';

export const EngineeringInspector: React.FC<EngineeringInspectorProps> = ({
  isMobileDrawer = false,
}) => {
  const {
    activePresetId,
    mission,
    zones,
    report,
    lastOptimization,
    loadPreset,
    highlightZones,
    runAutoOptimize,
    revertOptimization,
    dismissOptimization,
    setAuditModalOpen,
    setMobileDrawer,
  } = useHabitatStore();

  const [categoryFilter, setCategoryFilter] = useState<SubsystemKey>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');

  const score = report.score;
  const readinessBand =
    score >= 85
      ? { label: 'FLIGHT READY', cls: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40' }
      : score >= 60
        ? { label: 'MARGINAL', cls: 'bg-amber-500/15 text-amber-200 border-amber-500/40' }
        : { label: 'HAZARDOUS', cls: 'bg-rose-500/15 text-rose-200 border-rose-500/40' };

  const gross = Math.max(1, report.grossVolumeM3);
  const structPct = Math.min(100, (report.structureVolumeM3 / gross) * 100);
  const equipPct = Math.min(100 - structPct, (report.equipmentVolumeM3 / gross) * 100);
  const deadPct = Math.min(100 - structPct - equipPct, (report.deadSpaceM3 / gross) * 100);
  const nhvPct = Math.max(0, 100 - structPct - equipPct - deadPct);

  // Build the 6-Subsystem Compliance Matrix (Signature Operate Move)
  const subsystemCells = useMemo(() => {
    const worstSeverity = (cats: RuleCategory[]): Severity => {
      const matching = report.violations.filter((v) => cats.includes(v.category));
      if (matching.some((v) => v.severity === 'CRITICAL')) return 'CRITICAL';
      if (matching.some((v) => v.severity === 'WARNING')) return 'WARNING';
      return 'PASS';
    };

    const maxDba =
      report.acousticPairs.length > 0
        ? Math.max(...report.acousticPairs.map((p) => p.receivedDba))
        : 0;
    const minContamM =
      report.contaminationPairs.length > 0
        ? Math.min(...report.contaminationPairs.map((p) => p.distanceM))
        : null;

    return [
      {
        key: 'NHV' as const,
        label: 'Volume',
        metric: `${report.nhvPerCrewM3} m³`,
        severity: worstSeverity(['NHV', 'CREW_SUPPORT', 'GEOMETRY']),
      },
      {
        key: 'ACOUSTIC' as const,
        label: 'Acoustics',
        metric: maxDba > 0 ? `${maxDba} dBA` : '≤50 dBA',
        severity: worstSeverity(['ACOUSTIC', 'LIGHTING']),
      },
      {
        key: 'CONTAMINATION' as const,
        label: 'Bio-Sep',
        metric: minContamM !== null ? `${minContamM.toFixed(1)} m` : '≥3.0 m',
        severity: worstSeverity(['CONTAMINATION']),
      },
      {
        key: 'EGRESS' as const,
        label: 'Egress A*',
        metric: report.egress.overallReachable
          ? `${report.egress.worstCaseDistanceM.toFixed(1)} m`
          : 'BLOCKED',
        severity: worstSeverity(['EGRESS', 'ORIENTATION']),
      },
      {
        key: 'AIRFLOW' as const,
        label: 'Airflow',
        metric:
          report.stagnantZoneIds.length > 0 ? `${report.stagnantZoneIds.length} CO₂` : 'IMV OK',
        severity: worstSeverity(['AIRFLOW']),
      },
      {
        key: 'RADIATION' as const,
        label: 'Shielding',
        metric: `+${report.waterWall.shieldingBonusGcm2} g`,
        severity: worstSeverity(['RADIATION']),
      },
    ];
  }, [report]);

  const categoryMatches = (vCat: RuleCategory, filter: SubsystemKey): boolean => {
    if (filter === 'all') return true;
    if (filter === 'NHV') return vCat === 'NHV' || vCat === 'CREW_SUPPORT' || vCat === 'GEOMETRY';
    if (filter === 'ACOUSTIC') return vCat === 'ACOUSTIC' || vCat === 'LIGHTING';
    if (filter === 'EGRESS') return vCat === 'EGRESS' || vCat === 'ORIENTATION';
    return vCat === filter;
  };

  const filteredViolations = useMemo(() => {
    return report.violations.filter((v) => {
      if (!categoryMatches(v.category, categoryFilter)) return false;
      if (severityFilter === 'issues') return v.severity !== 'PASS';
      if (severityFilter === 'pass') return v.severity === 'PASS';
      return true;
    });
  }, [report.violations, categoryFilter, severityFilter]);

  const issueCount = report.criticalCount + report.warningCount;

  return (
    <aside
      className={`${
        isMobileDrawer ? 'w-84 max-w-[90vw]' : 'w-72 xl:w-80'
      } shrink-0 bg-[var(--surface-panel)] border-l border-[var(--border-subtle)] flex flex-col h-full overflow-hidden`}
    >
      {/* Precision Readiness Telemetry Header */}
      <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--surface-panel)] space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono-telemetry text-[var(--text-primary)] leading-none">
                {score}
              </span>
              <span className="text-xs font-mono-telemetry text-[var(--text-muted)]">/ 100</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded border text-[10px] font-mono-telemetry font-semibold ${readinessBand.cls}`}
              >
                {readinessBand.label}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono-telemetry">
              <span className={report.criticalCount > 0 ? 'text-rose-300 font-semibold' : 'text-[var(--text-muted)]'}>
                {report.criticalCount} Crit
              </span>
              <span className={report.warningCount > 0 ? 'text-amber-300 font-semibold' : 'text-[var(--text-muted)]'}>
                {report.warningCount} Warn
              </span>
              <span className="text-emerald-300">{report.passCount} Pass</span>
              <span className="text-[var(--text-muted)]">• {report.computeTimeMs}ms</span>
            </div>
          </div>

          {isMobileDrawer && (
            <button
              type="button"
              aria-label="Close Inspector"
              onClick={() => setMobileDrawer('none')}
              className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={runAutoOptimize}
          disabled={zones.length === 0}
          className="w-full py-2 px-3 rounded-md bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-Optimize Layout</span>
        </button>

        {/* Before vs After Optimization Delta Banner */}
        {lastOptimization && (
          <div
            role="status"
            className="bg-emerald-950/35 border border-emerald-500/40 rounded-md p-2.5 text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-200 text-[11px]">
                {lastOptimization.beforeScore === 100 && lastOptimization.afterScore === 100
                  ? `Already Optimal (${lastOptimization.elapsedMs}ms check)`
                  : `Optimized in ${lastOptimization.elapsedMs}ms (${lastOptimization.iterations} steps)`}
              </span>
              <button
                type="button"
                aria-label="Dismiss Optimization Summary"
                onClick={dismissOptimization}
                className="text-emerald-200/80 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1 font-mono-telemetry text-[11px] text-emerald-100">
              <div>
                Score: {lastOptimization.beforeScore} →{' '}
                <strong>{lastOptimization.afterScore}</strong> (
                {lastOptimization.afterScore >= lastOptimization.beforeScore ? '+' : ''}
                {lastOptimization.afterScore - lastOptimization.beforeScore})
              </div>
              <div>Fixed: {lastOptimization.violationsFixed} issues</div>
              <div className="col-span-2 text-[10px] text-emerald-200/90">
                Worst Egress: {lastOptimization.beforeWorstEgressM.toFixed(1)}m →{' '}
                {lastOptimization.afterWorstEgressM.toFixed(1)}m
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-0.5">
              <button
                type="button"
                onClick={revertOptimization}
                className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Undo / Revert Layout</span>
              </button>

              {lastOptimization.beforeScore === lastOptimization.afterScore && (
                <button
                  type="button"
                  onClick={() => loadPreset(activePresetId)}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 font-medium cursor-pointer"
                >
                  <span>Reset Preset</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive 6-Subsystem Compliance Matrix (Signature Operate Move) */}
      <div
        role="group"
        aria-label="Subsystem Compliance Filter Matrix"
        className="grid grid-cols-3 border-b border-[var(--border-subtle)] bg-[var(--surface-canvas)]/55"
      >
        {subsystemCells.map((cell, idx) => {
          const active = categoryFilter === cell.key;
          const dotColor =
            cell.severity === 'CRITICAL'
              ? 'bg-rose-400'
              : cell.severity === 'WARNING'
                ? 'bg-amber-400'
                : 'bg-emerald-400';
          return (
            <button
              key={cell.key}
              type="button"
              aria-pressed={active}
              onClick={() => setCategoryFilter(active ? 'all' : cell.key)}
              className={`px-2 py-2 text-left transition-colors cursor-pointer ${
                idx % 3 !== 2 ? 'border-r border-[var(--border-subtle)]' : ''
              } ${idx < 3 ? 'border-b border-[var(--border-subtle)]' : ''} ${
                active
                  ? 'bg-cyan-500/15 text-[var(--text-primary)]'
                  : 'hover:bg-[var(--surface-elevated)]/70 text-[var(--text-secondary)]'
              }`}
              title={`Filter diagnostics by ${cell.label}`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                <span className="truncate">{cell.label}</span>
              </div>
              <div className="text-[11px] font-mono-telemetry font-bold text-[var(--text-primary)] mt-0.5 truncate">
                {cell.metric}
              </div>
            </button>
          );
        })}
      </div>

      {/* Volumetric Allocation Hairline Strip */}
      <div className="px-3 py-2 border-b border-[var(--border-subtle)] space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-[var(--text-secondary)]">
            NHV ({mission.crewSize} crew • {mission.durationDays}d)
          </span>
          <span
            className={`font-bold font-mono-telemetry ${
              report.nhvPerCrewM3 >= report.requiredNhvPerCrewM3
                ? 'text-emerald-300'
                : 'text-rose-300'
            }`}
          >
            {report.nhvPerCrewM3} / {report.requiredNhvPerCrewM3} m³
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-[var(--surface-canvas)] overflow-hidden flex border border-[var(--border-subtle)]">
          <div style={{ width: `${nhvPct}%` }} className="bg-cyan-400 h-full" />
          <div style={{ width: `${equipPct}%` }} className="bg-violet-400 h-full" />
          <div style={{ width: `${structPct}%` }} className="bg-slate-400 h-full" />
          <div style={{ width: `${deadPct}%` }} className="bg-slate-600 h-full" />
        </div>
      </div>

      {/* Diagnostics Filter Controls */}
      <div className="px-3 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2 bg-[var(--surface-panel)]">
        <div className="flex items-center bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded p-0.5 gap-0.5 text-[10px]">
          {(
            [
              { id: 'all', label: `All (${report.violations.length})` },
              { id: 'issues', label: `Issues (${issueCount})` },
              { id: 'pass', label: `Pass (${report.passCount})` },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSeverityFilter(f.id)}
              className={`px-1.5 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                severityFilter === f.id
                  ? 'bg-[var(--surface-elevated)] text-cyan-200'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAuditModalOpen(true)}
          className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200 font-medium cursor-pointer"
        >
          <FileCheck2 className="w-3 h-3" />
          <span>Audit Sheet</span>
        </button>
      </div>

      {/* Active Category Filter Reset Pill */}
      {categoryFilter !== 'all' && (
        <div className="px-3 py-1 bg-cyan-500/10 border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-cyan-200">
          <span>Filtered: {subsystemCells.find((c) => c.key === categoryFilter)?.label}</span>
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className="text-cyan-300 hover:text-white underline cursor-pointer"
          >
            Show All
          </button>
        </div>
      )}

      {/* Diagnostics Feed */}
      <div className="flex-1 overflow-y-auto divide-y divide-[var(--border-subtle)]/75">
        {filteredViolations.length === 0 ? (
          <div className="p-5 text-center space-y-1.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-xs font-semibold text-[var(--text-primary)]">
              No matching diagnostics
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {issueCount === 0 && severityFilter === 'issues'
                ? 'All NASA-STD-3001 checks currently pass.'
                : 'Clear category filter to inspect every subsystem check.'}
            </p>
          </div>
        ) : (
          filteredViolations.map((v) => {
            const isCrit = v.severity === 'CRITICAL';
            const isWarn = v.severity === 'WARNING';
            const rowBg = isCrit
              ? 'bg-rose-950/20 hover:bg-rose-950/35'
              : isWarn
                ? 'bg-amber-950/15 hover:bg-amber-950/28'
                : 'hover:bg-[var(--surface-elevated)]/55';

            return (
              <button
                key={v.id}
                type="button"
                onClick={() => highlightZones(v.affectedZoneIds)}
                className={`w-full text-left px-3 py-2.5 transition-colors cursor-pointer ${rowBg}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5 min-w-0">
                    {isCrit ? (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    ) : isWarn ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                      {v.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono-telemetry px-1.5 py-0.5 rounded bg-[var(--surface-canvas)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                    {v.metric}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed text-pretty">
                  {v.detail}
                </p>
                <div className="flex items-center justify-between mt-1.5 text-[10px]">
                  <span className="font-mono-telemetry text-[var(--text-muted)]">{v.ruleCode}</span>
                  {v.affectedZoneIds.length > 0 && (
                    <span className="text-cyan-300 font-medium">Focus Module →</span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
