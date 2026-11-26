import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Camera, Columns2, Minus } from 'lucide-react';
import { useHabitatStore } from '../store/habitatStore';
import { Floorplan2D } from './Floorplan2D';
import { Viewport3D } from './Viewport3D';

export const CompareView: React.FC = () => {
  const { snapshots, compareIds, setComparePair, saveSnapshot } = useHabitatStore();
  const [previewMode, setPreviewMode] = useState<'2d' | '3d'>('2d');

  const leftSnap = snapshots.find((s) => s.id === compareIds[0]) ?? snapshots[0];
  const rightSnap =
    snapshots.find((s) => s.id === compareIds[1]) ?? snapshots[snapshots.length - 1];

  const acousticViolations = (snap: typeof leftSnap) =>
    snap.report.acousticPairs.filter((p) => p.violates).length;
  const contamViolations = (snap: typeof leftSnap) =>
    snap.report.contaminationPairs.filter((p) => p.violates).length;

  const rows: Array<{
    label: string;
    aVal: string;
    bVal: string;
    delta: number;
    unit: string;
    higherIsBetter: boolean;
  }> = [
    {
      label: 'Mission Readiness Score',
      aVal: `${leftSnap.report.score} / 100`,
      bVal: `${rightSnap.report.score} / 100`,
      delta: rightSnap.report.score - leftSnap.report.score,
      unit: 'pts',
      higherIsBetter: true,
    },
    {
      label: 'Net Habitable Volume / Crew',
      aVal: `${leftSnap.report.nhvPerCrewM3} m³`,
      bVal: `${rightSnap.report.nhvPerCrewM3} m³`,
      delta: Number((rightSnap.report.nhvPerCrewM3 - leftSnap.report.nhvPerCrewM3).toFixed(1)),
      unit: 'm³',
      higherIsBetter: true,
    },
    {
      label: 'Acoustic Violations (>50 dBA)',
      aVal: `${acousticViolations(leftSnap)}`,
      bVal: `${acousticViolations(rightSnap)}`,
      delta: acousticViolations(rightSnap) - acousticViolations(leftSnap),
      unit: '',
      higherIsBetter: false,
    },
    {
      label: 'Contamination Violations (<3.0m)',
      aVal: `${contamViolations(leftSnap)}`,
      bVal: `${contamViolations(rightSnap)}`,
      delta: contamViolations(rightSnap) - contamViolations(leftSnap),
      unit: '',
      higherIsBetter: false,
    },
    {
      label: 'Worst-Case A* Egress Distance',
      aVal: leftSnap.report.egress.overallReachable
        ? `${leftSnap.report.egress.worstCaseDistanceM.toFixed(1)} m`
        : 'BLOCKED',
      bVal: rightSnap.report.egress.overallReachable
        ? `${rightSnap.report.egress.worstCaseDistanceM.toFixed(1)} m`
        : 'BLOCKED',
      delta:
        leftSnap.report.egress.overallReachable && rightSnap.report.egress.overallReachable
          ? Number(
              (
                rightSnap.report.egress.worstCaseDistanceM -
                leftSnap.report.egress.worstCaseDistanceM
              ).toFixed(1)
            )
          : 0,
      unit: 'm',
      higherIsBetter: false,
    },
    {
      label: 'Estimated Pressurized Mass',
      aVal: `${leftSnap.report.estimatedMassKg.toLocaleString()} kg`,
      bVal: `${rightSnap.report.estimatedMassKg.toLocaleString()} kg`,
      delta: rightSnap.report.estimatedMassKg - leftSnap.report.estimatedMassKg,
      unit: 'kg',
      higherIsBetter: false,
    },
    {
      label: 'Estimated Launch Cost',
      aVal: `$${leftSnap.report.estimatedLaunchCostM}M`,
      bVal: `$${rightSnap.report.estimatedLaunchCostM}M`,
      delta: Number(
        (rightSnap.report.estimatedLaunchCostM - leftSnap.report.estimatedLaunchCostM).toFixed(1)
      ),
      unit: 'M',
      higherIsBetter: false,
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090D16]">
      {/* Compare Toolbar */}
      <div className="px-4 py-2.5 bg-[#0D1320] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Columns2 className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Side-by-Side Layout Comparison
          </h2>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono-telemetry">A:</span>
            <select
              aria-label="Layout A Snapshot"
              value={leftSnap.id}
              onChange={(e) => setComparePair(e.target.value, rightSnap.id)}
              className="bg-[#111827] border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 outline-none focus:border-cyan-500"
            >
              {snapshots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Score {s.report.score})
                </option>
              ))}
            </select>
          </div>

          <span className="text-slate-500 text-xs font-bold">VS</span>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono-telemetry">B:</span>
            <select
              aria-label="Layout B Snapshot"
              value={rightSnap.id}
              onChange={(e) => setComparePair(leftSnap.id, e.target.value)}
              className="bg-[#111827] border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 outline-none focus:border-cyan-500"
            >
              {snapshots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Score {s.report.score})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-[#111827] border border-slate-700 rounded p-0.5 text-[11px]">
            <button
              onClick={() => setPreviewMode('2d')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                previewMode === '2d' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              2D CAD
            </button>
            <button
              onClick={() => setPreviewMode('3d')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                previewMode === '3d' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              3D WebGL
            </button>
          </div>

          <button
            onClick={() => saveSnapshot()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            Snapshot Active Layout
          </button>
        </div>
      </div>

      {/* Split-Screen Previews + Delta Table */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[340px]">
          {[
            { tag: 'LAYOUT A', snap: leftSnap, accent: 'border-slate-700' },
            { tag: 'LAYOUT B', snap: rightSnap, accent: 'border-cyan-500/50' },
          ].map(({ tag, snap, accent }) => (
            <div
              key={tag}
              className={`bg-[#0D1320] border ${accent} rounded-xl overflow-hidden flex flex-col`}
            >
              <div className="px-3 py-2 bg-[#111827] border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-telemetry text-cyan-400 uppercase tracking-wider">
                    {tag}
                  </span>
                  <div className="text-xs font-semibold text-slate-100">{snap.name}</div>
                </div>
                <div className="flex items-center gap-2 font-mono-telemetry text-xs">
                  <span className="text-slate-400">
                    {snap.mission.crewSize} Crew • {snap.mission.hull.diameter}×
                    {snap.mission.hull.length}m
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      snap.report.score >= 85
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : snap.report.score >= 60
                          ? 'bg-amber-500/15 text-amber-300'
                          : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    {snap.report.score}/100
                  </span>
                </div>
              </div>
              <div className="h-[290px] w-full">
                {previewMode === '2d' ? (
                  <Floorplan2D
                    missionOverride={snap.mission}
                    zonesOverride={snap.zones}
                    reportOverride={snap.report}
                    deckOverride={0}
                    readonly
                    compact
                  />
                ) : (
                  <Viewport3D
                    missionOverride={snap.mission}
                    zonesOverride={snap.zones}
                    reportOverride={snap.report}
                    readonly
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Delta Metrics Table */}
        <div className="bg-[#0D1320] border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-[#111827] border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-200">
            Engineering Trade-Study Delta Matrix (B vs A)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-[#090D16]/60">
                  <th className="py-2.5 px-4">Metric</th>
                  <th className="py-2.5 px-4 font-mono-telemetry">Layout A ({leftSnap.name})</th>
                  <th className="py-2.5 px-4 font-mono-telemetry">Layout B ({rightSnap.name})</th>
                  <th className="py-2.5 px-4 font-mono-telemetry">Delta (B − A)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs">
                {rows.map((row) => {
                  const improved =
                    row.delta === 0
                      ? null
                      : row.higherIsBetter
                        ? row.delta > 0
                        : row.delta < 0;
                  const deltaColor =
                    improved === null
                      ? 'text-slate-400'
                      : improved
                        ? 'text-emerald-400'
                        : 'text-rose-400';

                  return (
                    <tr key={row.label} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-4 font-medium text-slate-200">{row.label}</td>
                      <td className="py-2.5 px-4 font-mono-telemetry text-slate-300">{row.aVal}</td>
                      <td className="py-2.5 px-4 font-mono-telemetry text-slate-100 font-semibold">
                        {row.bVal}
                      </td>
                      <td className={`py-2.5 px-4 font-mono-telemetry font-bold ${deltaColor}`}>
                        <span className="inline-flex items-center gap-1">
                          {row.delta > 0 ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : row.delta < 0 ? (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          ) : (
                            <Minus className="w-3.5 h-3.5" />
                          )}
                          {row.delta > 0 ? '+' : ''}
                          {row.delta}
                          {row.unit ? ` ${row.unit}` : ''}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
