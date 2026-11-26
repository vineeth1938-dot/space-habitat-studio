import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { ZONE_SPECS } from '../engine/constants';
import { compareSnapshots } from '../engine/scorer';
import { useCadStore } from '../store/useCadStore';
import { LayoutSnapshot } from '../types/habitat';

const MiniBlueprintPreview: React.FC<{ snap: LayoutSnapshot }> = ({ snap }) => {
  const { hull } = snap.mission;
  const pad = 0.8;
  const scale = 22;
  const w = (hull.widthM + pad * 2) * scale;
  const h = (hull.depthM + pad * 2) * scale;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-32 sm:h-36 border"
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
          fill="var(--bg-panel)"
          stroke="var(--border-strong)"
          strokeWidth="1.2"
        />
      )}
      {snap.modules
        .filter((m) => m.deck === 0)
        .map((m) => {
          const spec = ZONE_SPECS[m.type];
          if (!spec) return null;
          return (
            <g key={m.id} transform={`translate(${(m.x + pad) * scale}, ${(m.y + pad) * scale})`}>
              <rect
                width={m.w * scale}
                height={m.h * scale}
                fill={spec.tintHex}
                fillOpacity="0.25"
                stroke={spec.tintHex}
                strokeWidth="1"
              />
              <text
                x={(m.w * scale) / 2}
                y={(m.h * scale) / 2 + 3}
                textAnchor="middle"
                fill="var(--fg-primary)"
                fontSize="8"
                fontWeight="700"
                className="font-mono-cad"
              >
                {spec.code}
              </text>
            </g>
          );
        })}
    </svg>
  );
};

export const CompareDrawer: React.FC = () => {
  const {
    compareOpen,
    snapshots,
    comparePair,
    setCompareOpen,
    saveSnapshot,
    deleteSnapshot,
    setComparePair,
  } = useCadStore();

  const [snapName, setSnapName] = useState('');

  useEffect(() => {
    if (!compareOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCompareOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [compareOpen, setCompareOpen]);

  if (!compareOpen) return null;

  const snapA = snapshots.find((s) => s.id === comparePair[0]) ?? snapshots[0];
  const snapB =
    snapshots.find((s) => s.id === comparePair[1]) ?? snapshots[snapshots.length - 1];

  const diffs = snapA && snapB ? compareSnapshots(snapA, snapB) : [];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSnapshot(snapName);
    setSnapName('');
  };

  return (
    <div
      data-testid="compare-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Snapshot Comparison"
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setCompareOpen(false);
      }}
    >
      <div
        className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] sm:border flex flex-col overflow-hidden safe-top safe-bottom"
        style={{
          backgroundColor: 'var(--bg-panel)',
          borderColor: 'var(--border-strong)',
          color: 'var(--fg-primary)',
        }}
      >
        {/* Header */}
        <div
          className="h-12 px-3 sm:px-4 border-b flex items-center justify-between gap-2 shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h2 className="font-mono-cad text-xs font-bold uppercase tracking-wider truncate">
            SIDE-BY-SIDE METRIC DELTA MATRIX
          </h2>
          <button
            type="button"
            data-testid="close-compare-btn"
            aria-label="Close Compare Drawer"
            onClick={() => setCompareOpen(false)}
            className="w-9 h-9 sm:w-8 sm:h-8 border flex items-center justify-center cursor-pointer shrink-0"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Save Active Snapshot Bar (16px text-base on mobile to prevent iOS auto-zoom) */}
        <form
          onSubmit={handleSave}
          className="p-3 sm:px-4 sm:py-2.5 border-b flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0"
          style={{
            borderColor: 'var(--border-hairline)',
            backgroundColor: 'var(--bg-subtle)',
          }}
        >
          <input
            data-testid="snapshot-name-input"
            type="text"
            maxLength={80}
            value={snapName}
            onChange={(e) => setSnapName(e.target.value)}
            placeholder="Snapshot label (e.g., Optimized NASA 4-Crew)..."
            className="flex-1 min-h-[42px] sm:min-h-[34px] px-3 border font-mono-cad text-base sm:text-xs outline-none"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--fg-primary)',
            }}
          />
          <button
            data-testid="save-snapshot-submit"
            type="submit"
            className="min-h-[42px] sm:min-h-[34px] px-3.5 border font-mono-cad text-xs font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            style={{
              backgroundColor: 'var(--accent-bg)',
              color: 'var(--accent-fg)',
              borderColor: 'var(--border-strong)',
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            SAVE CURRENT LAYOUT
          </button>
        </form>

        {/* Scrollable Comparison Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {snapA && snapB && (
            <>
              {/* Dual Selectors & Mini Blueprint Previews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: 'BASELINE A', snap: snapA, isLeft: true },
                  { label: 'CANDIDATE B', snap: snapB, isLeft: false },
                ].map(({ label, snap, isLeft }) => (
                  <div
                    key={label}
                    className="border p-3 space-y-2 min-w-0"
                    style={{ borderColor: 'var(--border-hairline)' }}
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <span
                        className="font-mono-cad text-[10px] font-bold shrink-0"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        {label}
                      </span>
                      <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end">
                        <select
                          aria-label={label}
                          value={snap.id}
                          onChange={(e) =>
                            isLeft
                              ? setComparePair(e.target.value, snapB.id)
                              : setComparePair(snapA.id, e.target.value)
                          }
                          className="font-mono-cad text-base sm:text-xs px-2 min-h-[38px] sm:min-h-[28px] border outline-none max-w-full truncate"
                          style={{
                            backgroundColor: 'var(--bg-subtle)',
                            borderColor: 'var(--border-hairline)',
                            color: 'var(--fg-primary)',
                          }}
                        >
                          {snapshots.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} ({s.scores.overall} pts)
                            </option>
                          ))}
                        </select>
                        {snapshots.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteSnapshot(snap.id)}
                            aria-label={`Delete ${snap.name}`}
                            title="Delete Snapshot"
                            className="w-9 h-9 sm:w-7 sm:h-7 border flex items-center justify-center text-rose-500 cursor-pointer shrink-0"
                            style={{ borderColor: 'var(--border-hairline)' }}
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <MiniBlueprintPreview snap={snap} />

                    <div
                      className="flex items-center justify-between font-mono-cad text-[10px] gap-2"
                      style={{ color: 'var(--fg-secondary)' }}
                    >
                      <span className="truncate">
                        {snap.mission.standard} · {snap.mission.crewSize} CREW ·{' '}
                        {snap.mission.durationDays}d
                      </span>
                      <span className="font-bold shrink-0">SCORE: {snap.scores.overall}/100</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Stacked Delta List (< 640px) */}
              <div
                className="sm:hidden border divide-y font-mono-cad text-xs"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
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
                      className="p-2.5 flex items-center justify-between gap-2"
                      style={{ borderColor: 'var(--border-hairline)' }}
                    >
                      <div className="min-w-0">
                        <div className="font-sans font-semibold text-xs truncate">{d.label}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: 'var(--fg-secondary)' }}>
                          {d.displayA} → <strong style={{ color: 'var(--fg-primary)' }}>{d.displayB}</strong>
                        </div>
                      </div>
                      <span className="font-bold shrink-0" style={{ color: deltaColor }}>
                        {d.displayDelta}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Tablet & Desktop Full Delta Matrix (>= 640px) */}
              <div className="hidden sm:block border" style={{ borderColor: 'var(--border-hairline)' }}>
                <table className="w-full text-left border-collapse font-mono-cad text-xs">
                  <thead>
                    <tr
                      className="border-b text-[10px] uppercase"
                      style={{
                        borderColor: 'var(--border-hairline)',
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--fg-muted)',
                      }}
                    >
                      <th className="py-2 px-3">ENGINEERING METRIC</th>
                      <th className="py-2 px-3">BASELINE A</th>
                      <th className="py-2 px-3">CANDIDATE B</th>
                      <th className="py-2 px-3">DELTA (B − A)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
                    {diffs.map((d) => {
                      const deltaColor =
                        d.improved === null
                          ? 'var(--fg-muted)'
                          : d.improved
                            ? '#10b981'
                            : '#ef4444';
                      return (
                        <tr key={d.key}>
                          <td className="py-2 px-3 font-sans font-medium">{d.label}</td>
                          <td className="py-2 px-3" style={{ color: 'var(--fg-secondary)' }}>
                            {d.displayA}
                          </td>
                          <td className="py-2 px-3 font-semibold">{d.displayB}</td>
                          <td className="py-2 px-3 font-bold" style={{ color: deltaColor }}>
                            {d.displayDelta}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
