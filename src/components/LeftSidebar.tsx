import React, { useState } from 'react';
import {
  AlertTriangle,
  Box,
  DollarSign,
  Droplets,
  Plus,
  Rocket,
  Scale,
  Sliders,
  Trash2,
  Volume2,
  X,
} from 'lucide-react';
import { ZONE_TYPES_LIST } from '../data/zoneCatalog';
import { GravityRegime, HullType, ZoneType } from '../types/habitat';
import { useHabitatStore } from '../store/habitatStore';

interface LeftSidebarProps {
  isMobileDrawer?: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ isMobileDrawer = false }) => {
  const {
    mission,
    zones,
    report,
    updateMission,
    updateHull,
    addZone,
    clearAllZones,
    setMobileDrawer,
  } = useHabitatStore();
  const [tab, setTab] = useState<'zones' | 'mission'>('zones');

  const gravities: Array<{ id: GravityRegime; label: string }> = [
    { id: '0g', label: '0g Micro' },
    { id: '1/6g', label: '1/6g Lunar' },
    { id: '3/8g', label: '3/8g Mars' },
  ];

  const hullTypes: Array<{ id: HullType; label: string }> = [
    { id: 'rigid_cylinder', label: 'Rigid Cylinder (ISS/Gateway)' },
    { id: 'inflatable', label: 'Inflatable Hab (TransHab)' },
    { id: 'surface_dome', label: 'Surface Dome (Lunar/Mars)' },
  ];

  const handleDragStart = (e: React.DragEvent, type: ZoneType) => {
    e.dataTransfer.setData('application/x-habitat-zone', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside
      className={`${
        isMobileDrawer ? 'w-80 max-w-[88vw]' : 'w-64 xl:w-72'
      } shrink-0 bg-[#0D1320] border-r border-slate-800/90 flex flex-col h-full overflow-hidden select-none`}
    >
      {/* Section Tabs */}
      <div className="p-2 border-b border-slate-800/80 flex items-center gap-1 bg-[#090D16]/60">
        <div className="grid grid-cols-2 gap-1 flex-1">
          <button
            type="button"
            onClick={() => setTab('zones')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              tab === 'zones'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            Zone Library
          </button>
          <button
            type="button"
            onClick={() => setTab('mission')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              tab === 'mission'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Mission &amp; Hull
          </button>
        </div>

        {isMobileDrawer && (
          <button
            type="button"
            aria-label="Close Sidebar"
            onClick={() => setMobileDrawer('none')}
            className="p-1.5 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Live Mass & Cost Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1.5 p-2 border-b border-slate-800/80 bg-[#111827]/70">
        <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/70">
          <div className="text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Rocket className="w-2.5 h-2.5 text-cyan-400" />
            Gross
          </div>
          <div className="text-xs font-bold font-mono-telemetry text-slate-100 mt-0.5">
            {report.grossVolumeM3} m³
          </div>
        </div>
        <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/70">
          <div className="text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Scale className="w-2.5 h-2.5 text-amber-400" />
            Mass
          </div>
          <div className="text-xs font-bold font-mono-telemetry text-slate-100 mt-0.5">
            {(report.estimatedMassKg / 1000).toFixed(1)} t
          </div>
        </div>
        <div className="bg-[#090D16] rounded p-1.5 border border-slate-800/70">
          <div className="text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <DollarSign className="w-2.5 h-2.5 text-emerald-400" />
            Launch
          </div>
          <div className="text-xs font-bold font-mono-telemetry text-emerald-300 mt-0.5">
            ${report.estimatedLaunchCostM}M
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
        {tab === 'zones' ? (
          <>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Drag or tap + to add ({zones.length} placed)</span>
              {zones.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllZones}
                  className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-300 cursor-pointer"
                  title="Remove all modules from hull"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-1.5">
              {ZONE_TYPES_LIST.map((entry) => (
                <div
                  key={entry.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, entry.type)}
                  className="group bg-[#111827] hover:bg-slate-800/90 border border-slate-800 hover:border-slate-600 rounded-lg p-2 transition-colors cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-xs font-semibold text-slate-100 truncate">
                        {entry.label}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addZone(entry.type)}
                      title={`Add ${entry.label}`}
                      aria-label={`Add ${entry.label}`}
                      className="shrink-0 w-6 h-6 rounded bg-slate-800 group-hover:bg-cyan-500/20 text-slate-200 group-hover:text-cyan-300 border border-slate-700 group-hover:border-cyan-500/40 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                    {entry.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap text-[10px] font-mono-telemetry text-slate-400">
                    <span>
                      {entry.defaultWidth}×{entry.defaultHeight}m
                    </span>
                    <span>• {entry.illuminanceLux} lx</span>
                    {entry.noiseEmitDba >= 60 && (
                      <span className="inline-flex items-center gap-0.5 text-rose-300 bg-rose-500/15 px-1.5 py-0.2 rounded">
                        <Volume2 className="w-2.5 h-2.5" />
                        {entry.noiseEmitDba} dBA
                      </span>
                    )}
                    {entry.isContaminationSource && (
                      <span className="inline-flex items-center gap-0.5 text-amber-300 bg-amber-500/15 px-1.5 py-0.2 rounded">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        Bio-Sep
                      </span>
                    )}
                    {entry.isWaterMassShield && (
                      <span className="inline-flex items-center gap-0.5 text-sky-300 bg-sky-500/15 px-1.5 py-0.2 rounded">
                        <Droplets className="w-2.5 h-2.5" />
                        H₂O Shield
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {/* Mission Profile */}
            <div className="bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-3">
              <div className="text-xs font-semibold text-cyan-300">Mission Parameters</div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Crew Size</span>
                  <span className="font-mono-telemetry font-bold text-cyan-300">
                    {mission.crewSize} crew
                  </span>
                </div>
                <input
                  aria-label="Crew Size"
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={mission.crewSize}
                  onChange={(e) => updateMission({ crewSize: Number(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Mission Duration</span>
                  <span className="font-mono-telemetry font-bold text-cyan-300">
                    {mission.durationDays} days
                  </span>
                </div>
                <input
                  aria-label="Mission Duration"
                  type="range"
                  min={30}
                  max={1000}
                  step={10}
                  value={mission.durationDays}
                  onChange={(e) => updateMission({ durationDays: Number(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="text-xs text-slate-300 mb-1.5">Gravity Regime</div>
                <div className="grid grid-cols-3 gap-1">
                  {gravities.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => updateMission({ gravity: g.id })}
                      className={`py-1.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                        mission.gravity === g.id
                          ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50'
                          : 'bg-[#090D16] text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hull Geometry */}
            <div className="bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-3">
              <div className="text-xs font-semibold text-cyan-300">Pressure Hull Geometry</div>

              <div className="space-y-1">
                {hullTypes.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => updateHull({ type: h.id })}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                      mission.hull.type === h.id
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50'
                        : 'bg-[#090D16] text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Hull Diameter</span>
                  <span className="font-mono-telemetry font-bold text-slate-100">
                    {mission.hull.diameter.toFixed(1)} m
                  </span>
                </div>
                <input
                  aria-label="Hull Diameter"
                  type="range"
                  min={4.2}
                  max={10.0}
                  step={0.2}
                  value={mission.hull.diameter}
                  onChange={(e) => updateHull({ diameter: Number(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {mission.hull.type !== 'surface_dome' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Hull Length</span>
                    <span className="font-mono-telemetry font-bold text-slate-100">
                      {mission.hull.length.toFixed(1)} m
                    </span>
                  </div>
                  <input
                    aria-label="Hull Length"
                    type="range"
                    min={8.0}
                    max={20.0}
                    step={0.5}
                    value={mission.hull.length}
                    onChange={(e) => updateHull({ length: Number(e.target.value) })}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">Interior Decks</span>
                  <span className="font-mono-telemetry font-bold text-slate-100">
                    {mission.hull.decks} deck{mission.hull.decks > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => updateHull({ decks: d })}
                      className={`py-1 rounded text-xs font-mono-telemetry border transition-colors cursor-pointer ${
                        mission.hull.decks === d
                          ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50'
                          : 'bg-[#090D16] text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {d}D
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
