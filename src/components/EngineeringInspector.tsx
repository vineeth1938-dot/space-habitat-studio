import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Route,
  Sparkles,
  X,
} from 'lucide-react';
import { useHabitatStore } from '../store/habitatStore';

export const EngineeringInspector: React.FC = () => {
  const {
    mission,
    report,
    lastOptimization,
    highlightZones,
    runAutoOptimize,
    revertOptimization,
    dismissOptimization,
  } = useHabitatStore();

  const score = report.score;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const gaugeColor =
    score >= 85 ? '#10b981' : score >= 60 ? '#f59e0b' : '#f43f5e';

  const gross = Math.max(1, report.grossVolumeM3);
  const structPct = Math.min(100, (report.structureVolumeM3 / gross) * 100);
  const equipPct = Math.min(100 - structPct, (report.equipmentVolumeM3 / gross) * 100);
  const deadPct = Math.min(100 - structPct - equipPct, (report.deadSpaceM3 / gross) * 100);
  const nhvPct = Math.max(0, 100 - structPct - equipPct - deadPct);

  return (
    <aside className="w-80 xl:w-88 shrink-0 bg-[#0D1320] border-l border-slate-800/90 flex flex-col h-full overflow-hidden">
      {/* Top Score + Auto-Optimize Header */}
      <div className="p-3.5 border-b border-slate-800/80 bg-[#111827]/70 space-y-3">
        <div className="flex items-center gap-3.5">
          {/* Circular Readiness Gauge */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 84 84">
              <circle
                cx="42"
                cy="42"
                r={radius}
                fill="none"
                stroke="#1e293b"
                strokeWidth="7"
              />
              <circle
                cx="42"
                cy="42"
                r={radius}
                fill="none"
                stroke={gaugeColor}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold font-mono-telemetry text-slate-100 leading-none">
                {score}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                SCORE
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Mission Readiness
              </span>
              <span className="text-[10px] font-mono-telemetry text-slate-500">
                {report.computeTimeMs}ms
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-mono-telemetry font-semibold">
                {report.criticalCount} CRIT
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] font-mono-telemetry font-semibold">
                {report.warningCount} WARN
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono-telemetry font-semibold">
                {report.passCount} PASS
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1.5">
              {mission.crewSize} Crew • {mission.durationDays}d • {mission.gravity}
            </div>
          </div>
        </div>

        {/* One-Click Auto-Optimize CTA */}
        <button
          onClick={runAutoOptimize}
          className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-cyan-950/50 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Auto-Optimize Layout
        </button>

        {/* Optimization Delta Summary Banner */}
        {lastOptimization && (
          <div className="bg-emerald-500/10 border border-emerald-500/35 rounded-lg p-2.5 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-[11px]">
                Optimization Complete ({lastOptimization.iterations} iters)
              </span>
              <button
                onClick={dismissOptimization}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between font-mono-telemetry text-[11px]">
              <span className="text-slate-300">
                Score: {lastOptimization.beforeScore} →{' '}
                <strong className="text-emerald-300">{lastOptimization.afterScore}</strong> (
                {lastOptimization.afterScore >= lastOptimization.beforeScore ? '+' : ''}
                {lastOptimization.afterScore - lastOptimization.beforeScore})
              </span>
              <span className="text-slate-300">
                Crit: {lastOptimization.beforeCritical} → {lastOptimization.afterCritical}
              </span>
            </div>
            <button
              onClick={revertOptimization}
              className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Undo / Revert Layout
            </button>
          </div>
        )}
      </div>

      {/* Scrollable Telemetry & Diagnostics */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* NHV Breakdown Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
              NHV Breakdown
            </span>
            <span
              className={`text-xs font-bold font-mono-telemetry ${
                report.nhvPerCrewM3 >= report.requiredNhvPerCrewM3
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              {report.nhvPerCrewM3} / {report.requiredNhvPerCrewM3} m³/crew
            </span>
          </div>

          {/* Stacked Volume Bar */}
          <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden flex border border-slate-800">
            <div
              style={{ width: `${nhvPct}%` }}
              className="bg-cyan-500 h-full"
              title={`NHV: ${report.nhvM3} m³`}
            />
            <div
              style={{ width: `${equipPct}%` }}
              className="bg-violet-500 h-full"
              title={`Equipment: ${report.equipmentVolumeM3} m³`}
            />
            <div
              style={{ width: `${structPct}%` }}
              className="bg-slate-500 h-full"
              title={`Structure: ${report.structureVolumeM3} m³`}
            />
            <div
              style={{ width: `${deadPct}%` }}
              className="bg-slate-700 h-full"
              title={`Dead Space: ${report.deadSpaceM3} m³`}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] font-mono-telemetry text-slate-400 pt-0.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Net Habitable
              </span>
              <span className="text-slate-200">{report.nhvM3} m³</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                Equipment
              </span>
              <span className="text-slate-200">{report.equipmentVolumeM3} m³</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Structure
              </span>
              <span className="text-slate-200">{report.structureVolumeM3} m³</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                Dead Space
              </span>
              <span className="text-slate-200">{report.deadSpaceM3} m³</span>
            </div>
          </div>
        </div>

        {/* A* Emergency Egress Telemetry */}
        <div className="bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Route className="w-3.5 h-3.5 text-emerald-400" />
              A* Egress Solver
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono-telemetry font-bold ${
                report.egress.overallReachable
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-rose-500/15 text-rose-300'
              }`}
            >
              {report.egress.overallReachable ? 'PASS' : 'BLOCKED'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-0.5">
            <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/80">
              <div className="text-[9px] uppercase text-slate-400">Worst Dist</div>
              <div className="text-xs font-bold font-mono-telemetry text-slate-100">
                {report.egress.overallReachable
                  ? `${report.egress.worstCaseDistanceM.toFixed(1)}m`
                  : 'N/A'}
              </div>
            </div>
            <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/80">
              <div className="text-[9px] uppercase text-slate-400">Transit</div>
              <div className="text-xs font-bold font-mono-telemetry text-slate-100">
                {report.egress.overallReachable
                  ? `${report.egress.worstCaseTimeSec}s`
                  : 'N/A'}
              </div>
            </div>
            <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/80">
              <div className="text-[9px] uppercase text-slate-400">Pinch Pts</div>
              <div
                className={`text-xs font-bold font-mono-telemetry ${
                  report.egress.bottleneckPoints.length > 0
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {report.egress.bottleneckPoints.length}
              </div>
            </div>
          </div>
        </div>

        {/* Severity-Ranked Diagnostics List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              NASA-STD-3001 Diagnostics
            </span>
            <span className="text-[10px] text-slate-500">Click to highlight</span>
          </div>

          <div className="space-y-2">
            {report.violations.map((v) => {
              const isCrit = v.severity === 'CRITICAL';
              const isWarn = v.severity === 'WARNING';
              const borderClass = isCrit
                ? 'border-rose-500/40 bg-rose-950/20 hover:bg-rose-950/35'
                : isWarn
                  ? 'border-amber-500/35 bg-amber-950/15 hover:bg-amber-950/30'
                  : 'border-emerald-500/25 bg-emerald-950/10 hover:bg-emerald-950/20';

              return (
                <button
                  key={v.id}
                  onClick={() => highlightZones(v.affectedZoneIds)}
                  className={`w-full text-left rounded-lg border p-2.5 transition-colors cursor-pointer ${borderClass}`}
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
                      <span className="text-xs font-semibold text-slate-100 leading-snug">
                        {v.title}
                      </span>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono-telemetry px-1.5 py-0.5 rounded bg-[#090D16]/80 text-slate-200 border border-slate-700/70">
                      {v.metric}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300/90 mt-1 leading-relaxed">
                    {v.detail}
                  </p>
                  <div className="flex items-center justify-between mt-1.5 text-[10px]">
                    <span className="font-mono-telemetry text-slate-500">{v.ruleCode}</span>
                    {v.affectedZoneIds.length > 0 && (
                      <span className="text-cyan-400 font-medium">Focus Zones →</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
