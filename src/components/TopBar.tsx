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
      ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10'
      : report.score >= 60
        ? 'text-amber-300 border-amber-500/40 bg-amber-500/10'
        : 'text-rose-300 border-rose-500/40 bg-rose-500/10';

  const navTabs: Array<{ id: ActiveView; label: string; shortLabel: string; icon: React.ReactNode; badge?: string }> = [
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
    <header className="min-h-12 shrink-0 bg-[#0D1320] border-b border-slate-800/90 px-2.5 lg:px-3 py-1.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-1.5 xl:gap-2 select-none">
      {/* Brand + Historical Heritage Preset Switcher */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="text-xs font-bold tracking-wide text-slate-100 uppercase">
              Space Habitat Studio
            </div>
            <div className="text-[9px] font-mono-telemetry text-cyan-400/85 hidden xl:block">
              NASA-STD-3001 • HRP CAD
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-800 hidden md:block" />

        {/* Preset Selector */}
        <select
          aria-label="Habitat Preset"
          value={activePresetId}
          onChange={(e) => loadPreset(e.target.value)}
          className="bg-[#111827] hover:bg-slate-800/80 border border-slate-700/80 text-slate-100 text-xs rounded-md px-2 py-1 max-w-[170px] sm:max-w-[205px] xl:max-w-[255px] truncate outline-none focus:border-cyan-500 transition-colors cursor-pointer"
        >
          {HABITAT_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Center View Mode Tabs */}
      <nav
        aria-label="Workspace Views"
        className="flex items-center bg-[#090D16] p-0.5 rounded-lg border border-slate-800/80 gap-0.5"
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
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {tab.icon}
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.shortLabel}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-mono-telemetry px-1.5 py-0.2 rounded-full ${
                    tab.badge === 'FAIL'
                      ? 'bg-rose-500/20 text-rose-300'
                      : tab.badge === 'MARGINAL'
                        ? 'bg-amber-500/20 text-amber-300'
                        : tab.badge === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-700/80 text-slate-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Actions: Demo Tour, Undo/Redo, Snapshot, Audit Export, Readiness Score */}
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <button
          type="button"
          onClick={() => setJudgeTour(!judgeTourActive, 0)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
            judgeTourActive
              ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/60'
              : 'bg-[#111827] hover:bg-slate-800 text-cyan-300 border-slate-700/80'
          }`}
          title="Launch 4-Step Judge Demo Walkthrough"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Demo Tour</span>
        </button>

        <div className="flex items-center bg-[#111827] border border-slate-800 rounded-md overflow-hidden">
          <button
            type="button"
            onClick={undo}
            disabled={past.length === 0}
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
            className="p-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-slate-800" />
          <button
            type="button"
            onClick={redo}
            disabled={future.length === 0}
            title="Redo (Ctrl+Y)"
            aria-label="Redo"
            className="p-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSaveSnapshot}
          title="Save Layout Snapshot"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-[#111827] hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors cursor-pointer"
        >
          {savedToast ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 hidden xl:inline">Saved</span>
            </>
          ) : (
            <>
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xl:inline">Snapshot</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setAuditModalOpen(true)}
          title="Export NASA-STD-3001 Verification Report (JSON / Printable PDF)"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-[#111827] hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors cursor-pointer"
        >
          <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden xl:inline">Export Audit</span>
          <span className="hidden lg:inline xl:hidden">Audit</span>
        </button>

        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono-telemetry text-xs font-bold ${scoreColor}`}
        >
          <span className="text-[9px] font-normal opacity-80 hidden sm:inline">SCORE</span>
          <span>{report.score}/100</span>
        </div>
      </div>
    </header>
  );
};
