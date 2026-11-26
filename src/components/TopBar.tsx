import React, { useState } from 'react';
import {
  Camera,
  Check,
  Columns2,
  Compass,
  Flame,
  Layers,
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
    loadPreset,
    setActiveView,
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
      ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
      : report.score >= 60
        ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
        : 'text-rose-400 border-rose-500/40 bg-rose-500/10';

  const navTabs: Array<{ id: ActiveView; label: string; icon: React.ReactNode; badge?: string }> = [
    {
      id: 'studio',
      label: 'Studio 2D / 3D',
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'compare',
      label: 'Compare Mode',
      icon: <Columns2 className="w-3.5 h-3.5" />,
      badge: `${snapshots.length}`,
    },
    {
      id: 'weather',
      label: 'Solar-Flare Stress Test',
      icon: <Flame className="w-3.5 h-3.5" />,
      badge: stormStress.verdict,
    },
  ];

  return (
    <header className="h-13 shrink-0 bg-[#0D1320] border-b border-slate-800/90 px-4 flex items-center justify-between gap-3 select-none">
      {/* Brand + Preset Switcher */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center shadow-inner">
            <Compass className="w-4.5 h-4.5 text-cyan-400" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold tracking-wider text-slate-100 uppercase">
              Space Habitat Studio
            </div>
            <div className="text-[10px] font-mono-telemetry text-cyan-400/80 tracking-wide">
              NASA-STD-3001 • HRP ENGINE
            </div>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 mx-1 hidden md:block" />

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 hidden lg:inline">
            Preset:
          </span>
          <select
            aria-label="Habitat Preset"
            value={activePresetId}
            onChange={(e) => loadPreset(e.target.value)}
            className="bg-[#111827] hover:bg-slate-800/80 border border-slate-700/80 text-slate-100 text-xs rounded-md px-2.5 py-1.5 outline-none focus:border-cyan-500 transition-colors cursor-pointer"
          >
            {HABITAT_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center View Mode Tabs */}
      <nav className="flex items-center bg-[#090D16] p-1 rounded-lg border border-slate-800/80 gap-1">
        {navTabs.map((tab) => {
          const active = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                active
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-mono-telemetry px-1.5 py-0.2 rounded-full ${
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

      {/* Right Actions: Undo/Redo, Save Snapshot, Readiness Score */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[#111827] border border-slate-800 rounded-md overflow-hidden">
          <button
            onClick={undo}
            disabled={past.length === 0}
            title="Undo (Ctrl+Z)"
            className="p-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-slate-800" />
          <button
            onClick={redo}
            disabled={future.length === 0}
            title="Redo (Ctrl+Y)"
            className="p-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={handleSaveSnapshot}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#111827] hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors cursor-pointer"
        >
          {savedToast ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Saved</span>
            </>
          ) : (
            <>
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>Save Snapshot</span>
            </>
          )}
        </button>

        <div
          className={`flex items-center gap-2 px-2.5 py-1 rounded-md border font-mono-telemetry text-xs font-bold ${scoreColor}`}
        >
          <span className="text-[10px] font-normal opacity-80">READINESS</span>
          <span>{report.score}/100</span>
        </div>
      </div>
    </header>
  );
};
