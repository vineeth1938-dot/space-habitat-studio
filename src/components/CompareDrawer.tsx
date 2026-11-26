import React, { useEffect, useMemo, useState } from 'react';
import { Check, Play, Plus, Trash2, X } from 'lucide-react';
import { ZONE_SPECS } from '../engine/constants';
import { compareSnapshots } from '../engine/scorer';
import {
  buildSnapshotFromEval,
  LIVE_SNAPSHOT_ID,
  useCadStore,
} from '../store/useCadStore';
import { LayoutSnapshot } from '../types/habitat';

const MiniBlueprintPreview: React.FC<{ snap: LayoutSnapshot }> = ({ snap }) => {
  const [deck, setDeck] = useState(0);
  const { hull } = snap.mission;
  const safeDeck = Math.min(deck, Math.max(0, hull.decks - 1));
  const pad = 0.6;
  const scale = 22;
  const w = (hull.widthM + pad * 2) * scale;
  const h = (hull.depthM + pad * 2) * scale;

  const deckMods = snap.modules.filter((m) => m.deck === safeDeck);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-24 sm:h-36 rounded border"
        style={{
          borderColor: 'var(--border-hairline)',
          backgroundColor: 'var(--bg-canvas)',
        }}
      >
        {hull.type === 'dome' ? (
          <circle
            cx={(hull.widthM / 2 + pad) * scale}
            cy={(hull.depthM / 2 + pad) * scale}
            r={(Math.min(hull.widthM, hull.depthM) / 2) * scale}
            fill="var(--bg-panel)"
            stroke="var(--border-strong)"
            strokeWidth="1.2"
          />
        ) : (
          <rect
            x={pad * scale}
            y={pad * scale}
            width={hull.widthM * scale}
            height={hull.depthM * scale}
            rx="3"
            fill="var(--bg-panel)"
            stroke="var(--border-strong)"
            strokeWidth="1.2"
          />
        )}
        {deckMods.map((m) => {
          const spec = ZONE_SPECS[m.type];
          if (!spec) return null;
          const mw = m.w * scale;
          const mh = m.h * scale;
          return (
            <g
              key={m.id}
              transform={`translate(${(m.x + pad) * scale}, ${(m.y + pad) * scale})`}
            >
              <rect
                width={mw}
                height={mh}
                rx="2"
                fill={spec.tintHex}
                fillOpacity="0.28"
                stroke={spec.tintHex}
                strokeWidth="1.1"
              />
              {mw >= 24 && mh >= 16 && (
                <text
                  x={mw / 2}
                  y={mh / 2 + 3}
                  textAnchor="middle"
                  fill="var(--fg-primary)"
                  fontSize="8"
                  fontWeight="700"
                  className="font-mono-cad"
                >
                  {spec.code}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hull.decks > 1 && (
        <div className="absolute top-1.5 right-1.5 flex rounded overflow-hidden border" style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-panel)' }}>
          {Array.from({ length: hull.decks }).map((_, d) => (
            <button
              type="button"
              key={d}
              onClick={() => setDeck(d)}
              className="px-1.5 py-0.5 font-mono-cad text-[9px] font-bold cursor-pointer"
              style={{
                backgroundColor: safeDeck === d ? 'var(--accent-primary)' : 'transparent',
                color: safeDeck === d ? '#ffffff' : 'var(--fg-muted)',
              }}
            >
              D{d + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const CompareDrawer: React.FC = () => {
  const {
    compareOpen,
    mission,
    modules,
    evaluation,
    snapshots,
    comparePair,
    setCompareOpen,
    saveSnapshot,
    deleteSnapshot,
    setComparePair,
    loadSnapshotIntoEditor,
  } = useCadStore();

  const [snapName, setSnapName] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!compareOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCompareOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [compareOpen, setCompareOpen]);

  // Build synthetic Live Workspace snapshot so users can compare saved baselines vs live design immediately
  const liveSnapshot = useMemo(
    () =>
      buildSnapshotFromEval(
        LIVE_SNAPSHOT_ID,
        'Current Live Workspace',
        mission,
        modules,
        evaluation
      ),
    [mission, modules, evaluation]
  );

  if (!compareOpen) return null;

  const allOptions: LayoutSnapshot[] = [liveSnapshot, ...snapshots];

  const resolveOption = (id: string, fallback: LayoutSnapshot): LayoutSnapshot =>
    allOptions.find((x) => x.id === id) ?? fallback;

  const snapA = resolveOption(comparePair[0], snapshots[0] ?? liveSnapshot);
  const snapB = resolveOption(comparePair[1], liveSnapshot);
  const sameSelected = snapA.id === snapB.id;

  const diffs = compareSnapshots(snapA, snapB);
  const scoreDelta = snapB.scores.overall - snapA.scores.overall;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSnapshot(snapName);
    setSnapName('');
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  return (
    <div
      data-testid="compare-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Compare Habitat Designs"
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-5"
      style={{ backgroundColor: 'rgba(2, 6, 23, 0.78)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setCompareOpen(false);
      }}
    >
      <div
        className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] sm:rounded-xl sm:border flex flex-col overflow-hidden safe-top safe-bottom"
        style={{
          backgroundColor: 'var(--bg-panel)',
          borderColor: 'var(--border-hairline)',
          color: 'var(--fg-primary)',
        }}
      >
        {/* Header */}
        <div
          className="h-12 px-3.5 sm:px-5 border-b flex items-center justify-between gap-2 shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <div className="min-w-0">
            <h2 className="text-sm font-bold tracking-tight truncate">
              Compare Habitat Layouts
            </h2>
          </div>
          <button
            type="button"
            data-testid="close-compare-btn"
            aria-label="Close Compare View"
            onClick={() => setCompareOpen(false)}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-md border flex items-center justify-center cursor-pointer shrink-0"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-subtle)',
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Save Checkpoint Bar */}
        <form
          onSubmit={handleSave}
          className="px-3.5 py-2.5 sm:px-5 border-b flex items-center gap-2 shrink-0"
          style={{
            borderColor: 'var(--border-hairline)',
            backgroundColor: 'var(--bg-elevated)',
          }}
        >
          <input
            data-testid="snapshot-name-input"
            type="text"
            maxLength={80}
            value={snapName}
            onChange={(e) => setSnapName(e.target.value)}
            placeholder="Checkpoint name (optional)"
            aria-label="Checkpoint name"
            className="flex-1 min-w-0 h-10 sm:h-9 px-3 rounded-md border text-base sm:text-xs outline-none"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--fg-primary)',
            }}
          />
          <button
            data-testid="save-snapshot-submit"
            type="submit"
            className="h-10 sm:h-9 px-3.5 rounded-md text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
            style={{
              backgroundColor: justSaved ? '#10b981' : 'var(--accent-primary)',
              color: '#ffffff',
            }}
          >
            {justSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Save Checkpoint</span>
              </>
            )}
          </button>
        </form>

        {/* Scrollable Comparison Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
          {/* Side-by-Side Visual Cards on BOTH Phone and Desktop */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            {[
              { roleLabel: 'Baseline A', snap: snapA, isLeft: true },
              { roleLabel: 'Design B', snap: snapB, isLeft: false },
            ].map(({ roleLabel, snap, isLeft }) => {
              const isLive = snap.id === LIVE_SNAPSHOT_ID;
              const scoreCol =
                snap.scores.overall >= 82
                  ? '#10b981'
                  : snap.scores.overall >= 58
                    ? '#f59e0b'
                    : '#ef4444';

              return (
                <div
                  key={roleLabel}
                  className="rounded-lg border p-2.5 sm:p-3.5 space-y-2 min-w-0 flex flex-col justify-between"
                  style={{
                    borderColor: isLeft ? 'var(--border-hairline)' : 'var(--border-strong)',
                    backgroundColor: 'var(--bg-elevated)',
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider truncate"
                        style={{ color: isLeft ? 'var(--fg-muted)' : 'var(--accent-primary)' }}
                      >
                        {roleLabel}
                      </span>
                      <span
                        className="font-mono-cad text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded"
                        style={{
                          color: scoreCol,
                          backgroundColor: 'var(--bg-panel)',
                        }}
                      >
                        {snap.scores.overall}/100
                      </span>
                    </div>

                    <select
                      aria-label={roleLabel}
                      value={snap.id}
                      onChange={(e) =>
                        isLeft
                          ? setComparePair(e.target.value, snapB.id)
                          : setComparePair(snapA.id, e.target.value)
                      }
                      className="w-full h-10 sm:h-8 px-2 rounded border text-base sm:text-xs outline-none truncate"
                      style={{
                        backgroundColor: 'var(--bg-panel)',
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--fg-primary)',
                      }}
                    >
                      <option value={LIVE_SNAPSHOT_ID}>
                        ★ Live Workspace ({liveSnapshot.scores.overall} pts)
                      </option>
                      {snapshots.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.scores.overall} pts)
                        </option>
                      ))}
                    </select>

                    <MiniBlueprintPreview snap={snap} />
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-1 text-[11px]">
                    <span
                      className="font-mono-cad truncate text-[10px]"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {snap.mission.standard} · {snap.mission.crewSize}C · {snap.mission.durationDays}d
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      {!isLive && (
                        <button
                          type="button"
                          onClick={() => loadSnapshotIntoEditor(snap.id)}
                          title="Load this checkpoint into the studio editor"
                          className="px-2 h-7 rounded border text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                          style={{
                            borderColor: 'var(--border-hairline)',
                            backgroundColor: 'var(--bg-panel)',
                            color: 'var(--fg-primary)',
                          }}
                        >
                          <Play className="w-2.5 h-2.5" />
                          <span>Load</span>
                        </button>
                      )}
                      {!isLive && snapshots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteSnapshot(snap.id)}
                          aria-label={`Delete ${snap.name}`}
                          title="Delete Checkpoint"
                          className="w-7 h-7 rounded border flex items-center justify-center text-rose-500 cursor-pointer"
                          style={{
                            borderColor: 'var(--border-hairline)',
                            backgroundColor: 'var(--bg-panel)',
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Helpful Banner if Both Dropdowns Point to Same Snapshot */}
          {sameSelected ? (
            <div
              className="rounded-lg border p-3 text-xs flex items-center justify-between gap-2"
              style={{
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.10)',
                color: 'var(--fg-primary)',
              }}
            >
              <span>
                Baseline A and Design B are set to the same checkpoint. Select a different checkpoint in either dropdown to see engineering deltas.
              </span>
              {snapshots[0] && (
                <button
                  type="button"
                  onClick={() => setComparePair(snapshots[0].id, LIVE_SNAPSHOT_ID)}
                  className="px-2.5 py-1.5 rounded text-xs font-bold shrink-0 cursor-pointer"
                  style={{ backgroundColor: '#f59e0b', color: '#09090b' }}
                >
                  Compare vs Live
                </button>
              )}
            </div>
          ) : (
            <div
              className="rounded-lg border px-3.5 py-2.5 flex items-center justify-between text-xs"
              style={{
                borderColor: scoreDelta >= 0 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)',
                backgroundColor:
                  scoreDelta >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              }}
            >
              <span className="font-medium">
                Design B vs Baseline A Summary
              </span>
              <span
                className="font-mono-cad font-bold"
                style={{ color: scoreDelta >= 0 ? '#10b981' : '#ef4444' }}
              >
                {scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} Readiness Pts
              </span>
            </div>
          )}

          {/* Clean Engineering Delta Matrix (Works cleanly on Mobile & Desktop) */}
          <div
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <div
              className="px-3.5 py-2 border-b text-xs font-bold uppercase tracking-wider"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--fg-secondary)',
              }}
            >
              SIDE-BY-SIDE METRIC DELTA MATRIX
            </div>

            <div className="divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
              {diffs.map((d) => {
                const deltaColor =
                  d.improved === null
                    ? 'var(--fg-muted)'
                    : d.improved
                      ? '#10b981'
                      : '#ef4444';
                return (
                  <div
                    key={d.key}
                    className="px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs"
                    style={{ borderColor: 'var(--border-hairline)' }}
                  >
                    <span className="font-medium truncate">{d.label}</span>
                    <div className="flex items-center gap-3 sm:gap-6 shrink-0 font-mono-cad">
                      <span className="text-[11px] sm:text-xs" style={{ color: 'var(--fg-muted)' }}>
                        {d.displayA} → <strong style={{ color: 'var(--fg-primary)' }}>{d.displayB}</strong>
                      </span>
                      <span
                        className="min-w-[68px] text-right font-bold px-1.5 py-0.5 rounded"
                        style={{
                          color: deltaColor,
                          backgroundColor:
                            d.improved === null
                              ? 'transparent'
                              : d.improved
                                ? 'rgba(16, 185, 129, 0.12)'
                                : 'rgba(239, 68, 68, 0.12)',
                        }}
                      >
                        {d.displayDelta}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
