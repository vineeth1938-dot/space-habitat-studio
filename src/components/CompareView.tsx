import React, { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Columns2,
  ExternalLink,
  Minus,
  Trash2,
} from 'lucide-react';
import { LayoutSnapshot } from '../types/habitat';
import { LIVE_SNAPSHOT_ID, useHabitatStore } from '../store/habitatStore';
import { Floorplan2D } from './Floorplan2D';
import { Viewport3D } from './Viewport3D';
import { ErrorBoundary } from './ErrorBoundary';

export const CompareView: React.FC = () => {
  const {
    mission,
    zones,
    report,
    snapshots,
    compareIds,
    setComparePair,
    saveSnapshot,
    deleteSnapshot,
    loadSnapshotIntoStudio,
  } = useHabitatStore();

  const [previewMode, setPreviewMode] = useState<'2d' | '3d'>('2d');
  const [labelInput, setLabelInput] = useState('');

  const liveVirtualSnap: LayoutSnapshot = useMemo(
    () => ({
      id: LIVE_SNAPSHOT_ID,
      name: `Live Workspace — ${mission.name}`,
      timestamp: Date.now(),
      mission,
      zones,
      report,
    }),
    [mission, zones, report]
  );

  const allOptions = useMemo(
    () => [liveVirtualSnap, ...snapshots],
    [liveVirtualSnap, snapshots]
  );

  const resolveSnap = (id: string, fallback: LayoutSnapshot): LayoutSnapshot => {
    if (id === LIVE_SNAPSHOT_ID) return liveVirtualSnap;
    return snapshots.find((s) => s.id === id) ?? fallback;
  };

  const leftSnap = resolveSnap(compareIds[0], snapshots[0] ?? liveVirtualSnap);
  const rightSnap = resolveSnap(compareIds[1], liveVirtualSnap);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSnapshot(labelInput);
    setLabelInput('');
  };

  const acousticViolations = (snap: LayoutSnapshot) =>
    snap.report.acousticPairs.filter((p) => p.violates).length;
  const contamViolations = (snap: LayoutSnapshot) =>
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
      label: 'Hygiene Bio-Separation Violations',
      aVal: `${contamViolations(leftSnap)}`,
      bVal: `${contamViolations(rightSnap)}`,
      delta: contamViolations(rightSnap) - contamViolations(leftSnap),
      unit: '',
      higherIsBetter: false,
    },
    {
      label: 'CO₂ Stagnant Crew Zones',
      aVal: `${leftSnap.report.stagnantZoneIds?.length ?? 0}`,
      bVal: `${rightSnap.report.stagnantZoneIds?.length ?? 0}`,
      delta:
        (rightSnap.report.stagnantZoneIds?.length ?? 0) -
        (leftSnap.report.stagnantZoneIds?.length ?? 0),
      unit: '',
      higherIsBetter: false,
    },
    {
      label: 'TransHab Water-Wall Shield Bonus',
      aVal: `+${leftSnap.report.waterWall?.shieldingBonusGcm2 ?? 0} g/cm²`,
      bVal: `+${rightSnap.report.waterWall?.shieldingBonusGcm2 ?? 0} g/cm²`,
      delta: Number(
        (
          (rightSnap.report.waterWall?.shieldingBonusGcm2 ?? 0) -
          (leftSnap.report.waterWall?.shieldingBonusGcm2 ?? 0)
        ).toFixed(1)
      ),
      unit: 'g/cm²',
      higherIsBetter: true,
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
      <div className="px-3.5 py-2.5 bg-[#0D1320] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Columns2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <h2 className="text-xs font-bold text-slate-100">
            Side-by-Side Trade-Study Comparison
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <form onSubmit={handleSave} className="flex items-center gap-1.5">
            <input
              type="text"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              placeholder="Snapshot label (optional)"
              aria-label="Snapshot label"
              className="bg-[#111827] border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder:text-slate-500 w-40 sm:w-48 outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-200 text-xs font-medium cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Save Current</span>
            </button>
          </form>

          <div className="flex items-center bg-[#111827] border border-slate-700 rounded p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setPreviewMode('2d')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                previewMode === '2d' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              2D CAD
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('3d')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                previewMode === '3d' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              3D WebGL
            </button>
          </div>
        </div>
      </div>

      {/* Split-Screen Previews + Delta Table */}
      <div className="flex-1 flex flex-col overflow-y-auto p-3.5 gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {(
            [
              {
                slot: 'A' as const,
                title: 'Baseline A',
                snap: leftSnap,
                accent: 'border-slate-700',
                onSelect: (id: string) => setComparePair(id, rightSnap.id),
              },
              {
                slot: 'B' as const,
                title: 'Candidate B',
                snap: rightSnap,
                accent: 'border-cyan-500/50',
                onSelect: (id: string) => setComparePair(leftSnap.id, id),
              },
            ] as const
          ).map(({ slot, title, snap, accent, onSelect }) => (
            <div
              key={slot}
              className={`bg-[#0D1320] border ${accent} rounded-xl overflow-hidden flex flex-col`}
            >
              <div className="px-3 py-2 bg-[#111827] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-[11px] font-mono-telemetry font-bold text-cyan-300 shrink-0">
                    {title}:
                  </span>
                  <select
                    aria-label={`Select ${title}`}
                    value={snap.id}
                    onChange={(e) => onSelect(e.target.value)}
                    className="bg-[#090D16] border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 min-w-0 flex-1 truncate outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {allOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.report.score}/100)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 font-mono-telemetry text-xs">
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

                  <button
                    type="button"
                    onClick={() => loadSnapshotIntoStudio(snap.id)}
                    title="Open this layout in Studio"
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {snap.id !== LIVE_SNAPSHOT_ID && snapshots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteSnapshot(snap.id)}
                      title="Delete saved snapshot"
                      className="p-1 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="h-[250px] sm:h-[270px] w-full">
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
                  <ErrorBoundary panelName={`3D Compare ${slot}`}>
                    <Viewport3D
                      missionOverride={snap.mission}
                      zonesOverride={snap.zones}
                      reportOverride={snap.report}
                      readonly
                    />
                  </ErrorBoundary>
                )}
              </div>

              <div className="px-3 py-1.5 bg-[#090D16] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-telemetry text-slate-400">
                <span>
                  {snap.mission.crewSize} Crew • {snap.mission.durationDays}d •{' '}
                  {snap.mission.gravity}
                </span>
                <span>
                  {snap.mission.hull.diameter}×{snap.mission.hull.length}m (
                  {snap.mission.hull.decks}D)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Delta Metrics Table */}
        <div className="bg-[#0D1320] border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-[#111827] border-b border-slate-800 text-xs font-bold text-slate-200">
            Engineering Trade-Study Delta Matrix (Candidate B vs Baseline A)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-[#090D16]/60">
                  <th className="py-2 px-3.5">Metric</th>
                  <th className="py-2 px-3.5 font-mono-telemetry">Baseline A</th>
                  <th className="py-2 px-3.5 font-mono-telemetry">Candidate B</th>
                  <th className="py-2 px-3.5 font-mono-telemetry">Delta (B − A)</th>
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
                      <td className="py-2 px-3.5 font-medium text-slate-200">{row.label}</td>
                      <td className="py-2 px-3.5 font-mono-telemetry text-slate-300">
                        {row.aVal}
                      </td>
                      <td className="py-2 px-3.5 font-mono-telemetry text-slate-100 font-semibold">
                        {row.bVal}
                      </td>
                      <td className={`py-2 px-3.5 font-mono-telemetry font-bold ${deltaColor}`}>
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
