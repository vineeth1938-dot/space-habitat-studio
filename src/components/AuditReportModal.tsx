import React, { useMemo, useState } from 'react';
import { Check, Download, FileCode2, FileText, Printer, ShieldCheck, X } from 'lucide-react';
import { useHabitatStore } from '../store/habitatStore';
import {
  buildAuditJsonPayload,
  downloadAuditHtml,
  downloadAuditJson,
  printAuditSheet,
} from '../utils/exportReport';

export const AuditReportModal: React.FC = () => {
  const {
    auditModalOpen,
    setAuditModalOpen,
    mission,
    zones,
    report,
    weather,
    stormStress,
    snapshots,
  } = useHabitatStore();

  const [downloadedTag, setDownloadedTag] = useState<string | null>(null);

  const payload = useMemo(
    () => buildAuditJsonPayload(mission, zones, report, weather, stormStress, snapshots),
    [mission, zones, report, weather, stormStress, snapshots]
  );

  if (!auditModalOpen) return null;

  const markDownload = (tag: string, fn: () => void) => {
    fn();
    setDownloadedTag(tag);
    setTimeout(() => setDownloadedTag(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="NASA-STD-3001 Engineering Verification Report"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={() => setAuditModalOpen(false)}
    >
      <div
        className="w-full max-w-3xl max-h-[88vh] bg-[#0D1320] border border-slate-700/90 rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#111827] border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                NASA-STD-3001 Compliance &amp; Trade-Study Audit Sheet
              </h2>
              <p className="text-[11px] font-mono-telemetry text-slate-400">
                {mission.name} • {mission.crewSize} Crew • {mission.durationDays}d • {mission.gravity}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close Audit Modal"
            onClick={() => setAuditModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Verification Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Executive KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#111827] border border-slate-800 rounded-lg p-3">
              <div className="text-[10px] uppercase text-slate-400">Readiness Score</div>
              <div className="text-lg font-bold font-mono-telemetry text-cyan-300 mt-0.5">
                {report.score} / 100
              </div>
              <div className="text-[10px] font-mono-telemetry text-slate-400">
                {report.criticalCount} CRIT • {report.warningCount} WARN • {report.passCount} PASS
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-lg p-3">
              <div className="text-[10px] uppercase text-slate-400">NHV Allocation</div>
              <div className="text-lg font-bold font-mono-telemetry text-slate-100 mt-0.5">
                {report.nhvPerCrewM3} m³
              </div>
              <div className="text-[10px] font-mono-telemetry text-slate-400">
                Target ≥ {report.requiredNhvPerCrewM3} m³/crew
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-lg p-3">
              <div className="text-[10px] uppercase text-slate-400">Water-Wall Shield</div>
              <div className="text-lg font-bold font-mono-telemetry text-sky-300 mt-0.5">
                +{report.waterWall.shieldingBonusGcm2} g/cm²
              </div>
              <div className="text-[10px] font-mono-telemetry text-slate-400">
                Dose cut: {report.waterWall.doseSavedPct}%
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-lg p-3">
              <div className="text-[10px] uppercase text-slate-400">Mass &amp; Launch</div>
              <div className="text-lg font-bold font-mono-telemetry text-emerald-300 mt-0.5">
                ${report.estimatedLaunchCostM}M
              </div>
              <div className="text-[10px] font-mono-telemetry text-slate-400">
                {(report.estimatedMassKg / 1000).toFixed(1)} t total wet+dry
              </div>
            </div>
          </div>

          {/* Heritage Rule Matrix */}
          <div className="bg-[#111827] border border-slate-800 rounded-lg overflow-hidden">
            <div className="px-3.5 py-2 bg-[#090D16] border-b border-slate-800 font-semibold text-slate-200">
              Standards Verification Matrix ({report.violations.length} Checks)
            </div>
            <div className="divide-y divide-slate-800/80 max-h-60 overflow-y-auto">
              {report.violations.map((v) => (
                <div key={v.id} className="px-3.5 py-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono-telemetry font-bold ${
                          v.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300'
                            : v.severity === 'WARNING'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {v.severity}
                      </span>
                      <span className="font-semibold text-slate-100">{v.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{v.detail}</div>
                  </div>
                  <div className="text-right shrink-0 font-mono-telemetry">
                    <div className="text-slate-200">{v.metric}</div>
                    <div className="text-[10px] text-slate-500">{v.ruleCode}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* JSON Schema Preview */}
          <details className="bg-[#090D16] border border-slate-800 rounded-lg p-3">
            <summary className="cursor-pointer font-mono-telemetry text-[11px] text-cyan-300 select-none">
              Inspect Machine-Readable JSON Telemetry Payload ({zones.length} modules)
            </summary>
            <pre className="mt-2 text-[10px] font-mono-telemetry text-slate-300 overflow-x-auto max-h-44 p-2 bg-[#0D1320] rounded border border-slate-800">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </details>
        </div>

        {/* Export Footer Actions */}
        <div className="px-5 py-3 bg-[#111827] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            Includes NHV, A* Egress, Acoustics, IMV CO₂, 0g Orientation &amp; GOES SPE Dose
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => markDownload('json', () => downloadAuditJson(payload))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs font-medium cursor-pointer transition-colors"
            >
              {downloadedTag === 'json' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
              )}
              Download JSON
            </button>

            <button
              type="button"
              onClick={() => markDownload('html', () => downloadAuditHtml(payload))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs font-medium cursor-pointer transition-colors"
            >
              {downloadedTag === 'html' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <FileText className="w-3.5 h-3.5 text-sky-400" />
              )}
              Download Audit HTML
            </button>

            <button
              type="button"
              onClick={() => markDownload('print', () => printAuditSheet(payload))}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              {downloadedTag === 'print' ? (
                <Download className="w-3.5 h-3.5" />
              ) : (
                <Printer className="w-3.5 h-3.5" />
              )}
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
