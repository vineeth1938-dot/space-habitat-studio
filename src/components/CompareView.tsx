import React, { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Columns2,
  ExternalLink,
  Minus,
  Trash2,
  XCircle,
} from 'lucide-react';
import { LayoutSnapshot } from '../types/habitat';
import { LIVE_SNAPSHOT_ID, useHabitatStore } from '../store/habitatStore';
import { Floorplan2D } from './Floorplan2D';
import { Viewport3D } from './Viewport3D';
import { ErrorBoundary } from './ErrorBoundary';

interface MetricRow {
  label: string;
  aVal: string;
  bVal: string;
  delta: number;
  unit: string;
  higherIsBetter: boolean;
  specialDelta?: { text: string; tone: 'good' | 'bad' };
}

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
  const [deckA, setDeckA] = useState(0);
  const [deckB, setDeckB] = useState(0);

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

  const safeDeckA = Math.min(deckA, Math.max(0, leftSnap.mission.hull.decks - 1));
  const safeDeckB = Math.min(deckB, Math.max(0, rightSnap.mission.hull.decks - 1));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSnapshot(labelInput);
    setLabelInput('');
  };

  const acousticViolations = (snap: LayoutSnapshot) =>
    snap.report.acousticPairs.filter((p) => p.violates).length;
  const contamViolations = (snap: LayoutSnapshot) =>
    snap.report.contaminationPairs.filter((p) => p.violates).length;

  const leftReachable = leftSnap.report.egress.overallReachable;
  const rightReachable = rightSnap.report.egress.overallReachable;
  let egressSpecialDelta: MetricRow['specialDelta'] | undefined;
  if (!leftReachable && rightReachable) {
    egressSpecialDelta = { text: '✓ UNBLOCKED', tone: 'good' };
  } else if (leftReachable && !rightReachable) {
    egressSpecialDelta = { text: '✗ BLOCKED', tone: 'bad' };
  }

  const rows: MetricRow[] = [
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
      aVal: leftReachable
        ? `${leftSnap.report.egress.worstCaseDistanceM.toFixed(1)} m`
        : 'BLOCKED',
      bVal: rightReachable
        ? `${rightSnap.report.egress.worstCaseDistanceM.toFixed(1)} m`
        : 'BLOCKED',
      delta:
        leftReachable && rightReachable
          ? Number(
              (
                rightSnap.report.egress.worstCaseDistanceM -
                leftSnap.report.egress.worstCaseDistanceM
              ).toFixed(1)
            )
          : 0,
      unit: 'm',
      higherIsBetter: false,
      specialDelta: egressSpecialDelta,
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

  const slots = [
    {
      slot: 'A' as const,
      title: 'Baseline A',
      snap: leftSnap,
      deck: safeDeckA,
      setDeck: setDeckA,
      accent: 'border-[var(--border-subtle)]',
      onSelect: (id: string) => setComparePair(id, rightSnap.id),
    },
    {
      slot: 'B' as const,
      title: 'Candidate B',
      snap: rightSnap,
      deck: safeDeckB,
      setDeck: setDeckB,
      accent: 'border-cyan-500/45',
      onSelect: (id: string) => setComparePair(leftSnap.id, id),
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--surface-canvas)]">
      {/* Compare Toolbar */}
      <div className="px-3.5 py-2.5 bg-[var(--surface-panel)] border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Columns2 className="w-4 h-4 text-cyan-300 shrink-0" />
          <h2 className="text-xs font-bold text-[var(--text-primary)] text-balance">
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
              className="bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded px-2.5 py-1 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] w-40 sm:w-48 outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/45 text-cyan-200 text-xs font-medium cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Save Current</span>
            </button>
          </form>

          <div className="flex items-center bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setPreviewMode('2d')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                previewMode === '2d'
                  ? 'bg-[var(--surface-elevated)] text-cyan-200'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              2D CAD
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('3d')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                previewMode === '3d'
                  ? 'bg-[var(--surface-elevated)] text-cyan-200'
                  : 'text-[var(--text-secondary)]'
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
          {slots.map(({ slot, title, snap, deck, setDeck, accent, onSelect }) => (
            <div
              key={slot}
              className={`bg-[var(--surface-panel)] border ${accent} rounded-xl overflow-hidden flex flex-col`}
            >
              <div className="px-3 py-2 bg-[var(--surface-elevated)]/60 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-[11px] font-mono-telemetry font-bold text-cyan-300 shrink-0">
                    {title}
                  </span>
                  <select
                    aria-label={`Select ${title}`}
                    value={snap.id}
                    onChange={(e) => onSelect(e.target.value)}
                    className="bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded px-2 py-1 text-xs text-[var(--text-primary)] min-w-0 flex-1 truncate outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {allOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.report.score}/100)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 font-mono-telemetry text-xs">
                  {previewMode === '2d' && snap.mission.hull.decks > 1 && (
                    <div className="flex items-center bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded p-0.5 gap-0.5">
                      {Array.from({ length: snap.mission.hull.decks }).map((_, d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDeck(d)}
                          className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${
                            deck === d
                              ? 'bg-cyan-500/20 text-cyan-200 font-semibold'
                              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          D{d + 1}
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      snap.report.score >= 85
                        ? 'bg-emerald-500/15 text-emerald-200'
                        : snap.report.score >= 60
                          ? 'bg-amber-500/15 text-amber-200'
                          : 'bg-rose-500/15 text-rose-200'
                    }`}
                  >
                    {snap.report.score}/100
                  </span>

                  <button
                    type="button"
                    onClick={() => loadSnapshotIntoStudio(snap.id)}
                    title="Open this layout in Studio"
                    aria-label={`Open ${title} in Studio`}
                    className="p-1 rounded bg-[var(--surface-canvas)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-cyan-200 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {snap.id !== LIVE_SNAPSHOT_ID && snapshots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteSnapshot(snap.id)}
                      title="Delete saved snapshot"
                      aria-label={`Delete ${title}`}
                      className="p-1 rounded bg-[var(--surface-canvas)] hover:bg-rose-950 text-[var(--text-muted)] hover:text-rose-200 cursor-pointer"
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
                    deckOverride={deck}
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

              <div className="px-3 py-1.5 bg-[var(--surface-canvas)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono-telemetry text-[var(--text-muted)]">
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
        <div className="bg-[var(--surface-panel)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-[var(--surface-elevated)]/60 border-b border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)]">
            Engineering Trade-Study Delta Matrix (Candidate B vs Baseline A)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface-canvas)]/70">
                  <th className="py-2 px-3.5">Metric</th>
                  <th className="py-2 px-3.5 font-mono-telemetry">Baseline A</th>
                  <th className="py-2 px-3.5 font-mono-telemetry">Candidate B</th>
                  <th className="py-2 px-3.5 font-mono-telemetry">Delta (B − A)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]/75 text-xs">
                {rows.map((row) => {
                  const improved =
                    row.delta === 0
                      ? null
                      : row.higherIsBetter
                        ? row.delta > 0
                        : row.delta < 0;
                  const deltaColor = row.specialDelta
                    ? row.specialDelta.tone === 'good'
                      ? 'text-emerald-300'
                      : 'text-rose-300'
                    : improved === null
                      ? 'text-[var(--text-muted)]'
                      : improved
                        ? 'text-emerald-300'
                        : 'text-rose-300';

                  return (
                    <tr key={row.label} className="hover:bg-[var(--surface-elevated)]/40">
                      <td className="py-2 px-3.5 font-medium text-[var(--text-primary)]">
                        {row.label}
                      </td>
                      <td className="py-2 px-3.5 font-mono-telemetry text-[var(--text-secondary)]">
                        {row.aVal}
                      </td>
                      <td className="py-2 px-3.5 font-mono-telemetry text-[var(--text-primary)] font-semibold">
                        {row.bVal}
                      </td>
                      <td className={`py-2 px-3.5 font-mono-telemetry font-bold ${deltaColor}`}>
                        {row.specialDelta ? (
                          <span className="inline-flex items-center gap-1">
                            {row.specialDelta.tone === 'good' ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            <span>{row.specialDelta.text}</span>
                          </span>
                        ) : (
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
                        )}
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
