import React, { useState } from 'react';
import {
  Camera,
  Check,
  Columns2,
  Compass,
  FileCheck2,
  Flame,
  Layers,
  PlayCircle,
  Redo2,
  RotateCcw,
  Undo2,
} from 'lucide-react';
import { HABITAT_PRESETS } from '../data/presets';
import { ActiveView, useHabitatStore } from '../store/habitatStore';

export const TopBar: React.FC = () => {
  const {
    activePresetId,
    activeView,
    report,
    past,
    future,
    snapshots,
    stormStress,
    judgeTourActive,
    loadPreset,
    setActiveView,
    setJudgeTour,
    setAuditModalOpen,
    undo,
    redo,
    saveSnapshot,
  } = useHabitatStore();

  const [savedToast, setSavedToast] = useState(false);

  const handleSaveSnapshot = () => {
    saveSnapshot();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 1800);
  };

  const scoreColor =
    report.score >= 85
      ? 'text-emerald-200 border-emerald-500/45 bg-emerald-500/12'
      : report.score >= 60
        ? 'text-amber-200 border-amber-500/45 bg-amber-500/12'
        : 'text-rose-200 border-rose-500/45 bg-rose-500/12';

  const navTabs: Array<{
    id: ActiveView;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'studio',
      label: 'Studio 2D/3D',
      shortLabel: 'Studio',
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'compare',
      label: 'Compare',
      shortLabel: 'Compare',
      icon: <Columns2 className="w-3.5 h-3.5" />,
      badge: `${snapshots.length}`,
    },
    {
      id: 'weather',
      label: 'Solar Storm',
      shortLabel: 'Storm',
      icon: <Flame className="w-3.5 h-3.5" />,
      badge: stormStress.verdict,
    },
  ];

  return (
    <header className="min-h-12 shrink-0 bg-[var(--surface-panel)] border-b border-[var(--border-subtle)] px-2.5 lg:px-3 py-1.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-1.5 xl:gap-2 select-none">
      {/* Brand + Historical Heritage Preset Switcher */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
            <Compass className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="text-xs font-bold tracking-wide text-[var(--text-primary)] uppercase">
              Space Habitat Studio
            </div>
            <div className="text-[10px] font-mono-telemetry text-cyan-300 hidden xl:block">
              NASA-STD-3001 • HRP CAD
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-[var(--border-subtle)] hidden md:block" />

        {/* Preset Selector + One-Click Reset Preset */}
        <div className="flex items-center gap-1 min-w-0">
          <select
            aria-label="Habitat Preset"
            value={activePresetId}
            onChange={(e) => loadPreset(e.target.value)}
            className="bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs rounded-md px-2 py-1 max-w-[155px] sm:max-w-[195px] xl:max-w-[245px] truncate outline-none cursor-pointer transition-colors"
          >
            {HABITAT_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => loadPreset(activePresetId)}
            title="Reset current preset to its original layout"
            aria-label="Reset Preset"
            className="p-1.5 rounded-md bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-cyan-200 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center View Mode Tabs */}
      <nav
        aria-label="Workspace Views"
        className="flex items-center bg-[var(--surface-canvas)] p-0.5 rounded-lg border border-[var(--border-subtle)] gap-0.5"
      >
        {navTabs.map((tab) => {
          const active = activeView === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-1.5 px-2 xl:px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                active
                  ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/40'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]/60 border border-transparent'
              }`}
            >
              {tab.icon}
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.shortLabel}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-mono-telemetry px-1.5 py-0.2 rounded-full ${
                    tab.badge === 'FAIL'
                      ? 'bg-rose-500/20 text-rose-200'
                      : tab.badge === 'MARGINAL'
                        ? 'bg-amber-500/20 text-amber-200'
                        : tab.badge === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <button
          type="button"
          onClick={() => setJudgeTour(!judgeTourActive, 0)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
            judgeTourActive
              ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/60'
              : 'bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-cyan-200 border-[var(--border-subtle)]'
          }`}
          title="Launch 4-Step Judge Demo Walkthrough"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Demo Tour</span>
        </button>

        <div className="flex items-center bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-md overflow-hidden">
          <button
            type="button"
            onClick={undo}
            disabled={past.length === 0}
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
            className="p-1.5 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-[var(--border-subtle)]" />
          <button
            type="button"
            onClick={redo}
            disabled={future.length === 0}
            title="Redo (Ctrl+Y)"
            aria-label="Redo"
            className="p-1.5 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSaveSnapshot}
          title="Save Layout Snapshot"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          {savedToast ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-emerald-200 hidden xl:inline">Saved</span>
            </>
          ) : (
            <>
              <Camera className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden xl:inline">Snapshot</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setAuditModalOpen(true)}
          title="Export NASA-STD-3001 Verification Report (JSON / Printable PDF)"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <FileCheck2 className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden xl:inline">Export Audit</span>
          <span className="hidden lg:inline xl:hidden">Audit</span>
        </button>

        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono-telemetry text-xs font-bold ${scoreColor}`}
        >
          <span className="text-[10px] font-normal opacity-85 hidden sm:inline">SCORE</span>
          <span>{report.score}/100</span>
        </div>
      </div>
    </header>
  );
};
