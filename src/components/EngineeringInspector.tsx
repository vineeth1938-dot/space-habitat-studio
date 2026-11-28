import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  FileCheck2,
  RotateCcw,
  Route,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { useHabitatStore } from '../store/habitatStore';

interface EngineeringInspectorProps {
  isMobileDrawer?: boolean;
}

export const EngineeringInspector: React.FC<EngineeringInspectorProps> = ({
  isMobileDrawer = false,
}) => {
  const {
    mission,
    zones,
    report,
    lastOptimization,
    highlightZones,
    runAutoOptimize,
    revertOptimization,
    dismissOptimization,
    setAuditModalOpen,
    setMobileDrawer,
  } = useHabitatStore();

  const score = report.score;
  const radius = 32;
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
    <aside
      className={`${
        isMobileDrawer ? 'w-84 max-w-[90vw]' : 'w-72 xl:w-80'
      } shrink-0 bg-[#0D1320] border-l border-slate-800/90 flex flex-col h-full overflow-hidden`}
    >
      {/* Top Score + Auto-Optimize Header */}
      <div className="p-3 border-b border-slate-800/80 bg-[#111827]/70 space-y-2.5">
        <div className="flex items-center gap-3">
          {/* Circular Readiness Gauge */}
          <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
            <svg className="w-18 h-18 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="#1e293b"
                strokeWidth="6.5"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke={gaugeColor}
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold font-mono-telemetry text-slate-100 leading-none">
                {score}
              </span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">
                SCORE
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-slate-100 truncate">Mission Readiness</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono-telemetry text-slate-500">
                  {report.computeTimeMs}ms
                </span>
                {isMobileDrawer && (
                  <button
                    type="button"
                    aria-label="Close Inspector"
                    onClick={() => setMobileDrawer('none')}
                    className="p-1 rounded text-slate-400 hover:text-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-mono-telemetry font-semibold">
                {report.criticalCount} CRIT
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] font-mono-telemetry font-semibold">
                {report.warningCount} WARN
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono-telemetry font-semibold">
                {report.passCount} PASS
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono-telemetry">
              {mission.crewSize} Crew • {mission.durationDays}d • {mission.gravity}
            </div>
          </div>
        </div>

        {/* One-Click Auto-Optimize CTA */}
        <button
          type="button"
          onClick={runAutoOptimize}
          disabled={zones.length === 0}
          className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Auto-Optimize Layout
        </button>

        {/* Before vs. After Optimization Delta Toast */}
        {lastOptimization && (
          <div
            role="status"
            className="bg-emerald-500/10 border border-emerald-500/35 rounded-lg p-2.5 text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-[11px]">
                Optimized in {lastOptimization.elapsedMs}ms ({lastOptimization.iterations} steps)
              </span>
              <button
                type="button"
                aria-label="Dismiss Optimization Summary"
                onClick={dismissOptimization}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1 font-mono-telemetry text-[10px] text-slate-200">
              <div>
                Score: {lastOptimization.beforeScore} →{' '}
                <strong className="text-emerald-300">{lastOptimization.afterScore}</strong> (
                {lastOptimization.afterScore >= lastOptimization.beforeScore ? '+' : ''}
                {lastOptimization.afterScore - lastOptimization.beforeScore})
              </div>
              <div>Fixed: {lastOptimization.violationsFixed} violations</div>
              <div className="col-span-2 text-slate-300">
                Worst Egress: {lastOptimization.beforeWorstEgressM.toFixed(1)}m →{' '}
                {lastOptimization.afterWorstEgressM.toFixed(1)}m
              </div>
            </div>

            <button
              type="button"
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
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* NHV Breakdown Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-lg p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-200">NHV Allocation</span>
            <span
              className={`text-xs font-bold font-mono-telemetry ${
                report.nhvPerCrewM3 >= report.requiredNhvPerCrewM3
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              {report.nhvPerCrewM3} / {report.requiredNhvPerCrewM3} m³
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden flex border border-slate-800">
            <div style={{ width: `${nhvPct}%` }} className="bg-cyan-500 h-full" />
            <div style={{ width: `${equipPct}%` }} className="bg-violet-500 h-full" />
            <div style={{ width: `${structPct}%` }} className="bg-slate-500 h-full" />
            <div style={{ width: `${deadPct}%` }} className="bg-slate-700 h-full" />
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-mono-telemetry text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                NHV
              </span>
              <span className="text-slate-200">{report.nhvM3} m³</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                Equip
              </span>
              <span className="text-slate-200">{report.equipmentVolumeM3} m³</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Shell
              </span>
              <span className="text-slate-200">{report.structureVolumeM3} m³</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                Corridor
              </span>
              <span className="text-slate-200">{report.deadSpaceM3} m³</span>
            </div>
          </div>
        </div>

        {/* Egress + Water-Wall + Illuminance Telemetry Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-lg p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
              <Route className="w-3.5 h-3.5 text-emerald-400" />
              Egress &amp; Heritage Shielding
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono-telemetry font-bold ${
                report.egress.overallReachable
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-rose-500/15 text-rose-300'
              }`}
            >
              {report.egress.overallReachable ? 'CLEAR' : 'BLOCKED'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/80">
              <div className="text-[9px] uppercase text-slate-400">Worst A*</div>
              <div className="text-xs font-bold font-mono-telemetry text-slate-100">
                {report.egress.overallReachable
                  ? `${report.egress.worstCaseDistanceM.toFixed(1)}m`
                  : 'N/A'}
              </div>
            </div>
            <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/80">
              <div className="text-[9px] uppercase text-slate-400 flex items-center gap-0.5">
                <Droplets className="w-2.5 h-2.5 text-sky-400" />
                H₂O Wall
              </div>
              <div className="text-xs font-bold font-mono-telemetry text-sky-300">
                +{report.waterWall.shieldingBonusGcm2}
              </div>
            </div>
            <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/80">
              <div className="text-[9px] uppercase text-slate-400 flex items-center gap-0.5">
                <Sun className="w-2.5 h-2.5 text-amber-300" />
                Egress lx
              </div>
              <div className="text-xs font-bold font-mono-telemetry text-slate-100">
                {report.illuminance.minCorridorLux} lx
              </div>
            </div>
          </div>
        </div>

        {/* Severity-Ranked Diagnostics List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-300">
              NASA-STD-3001 Diagnostics
            </span>
            <button
              type="button"
              onClick={() => setAuditModalOpen(true)}
              className="inline-flex items-center gap-1 text-[10px] text-cyan-300 hover:text-cyan-200 font-medium cursor-pointer"
            >
              <FileCheck2 className="w-3 h-3" />
              Audit Sheet
            </button>
          </div>

          <div className="space-y-1.5">
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
                  type="button"
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
                      <span className="text-cyan-300 font-medium">Focus Module →</span>
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
