import React, { useMemo, useState } from 'react';
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
import { HABITAT_PRESETS } from '../data/presets';
import { ZONE_TYPES_LIST } from '../data/zoneCatalog';
import { getRequiredNhvPerCrew } from '../engine/ruleEngine';
import { GravityRegime, HullType, ZoneType } from '../types/habitat';
import { useHabitatStore } from '../store/habitatStore';

interface LeftSidebarProps {
  isMobileDrawer?: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ isMobileDrawer = false }) => {
  const {
    activePresetId,
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

  const zoneCounts = useMemo(() => {
    const counts = new Map<ZoneType, number>();
    for (const z of zones) {
      counts.set(z.type, (counts.get(z.type) ?? 0) + 1);
    }
    return counts;
  }, [zones]);

  const activePreset = useMemo(
    () => HABITAT_PRESETS.find((p) => p.id === activePresetId),
    [activePresetId]
  );

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
      } shrink-0 bg-[var(--surface-panel)] border-r border-[var(--border-subtle)] flex flex-col h-full overflow-hidden select-none`}
    >
      {/* Mode Switcher */}
      <div className="p-2 border-b border-[var(--border-subtle)] flex items-center gap-1 bg-[var(--surface-canvas)]/70">
        <div className="grid grid-cols-2 gap-1 flex-1">
          <button
            type="button"
            onClick={() => setTab('zones')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              tab === 'zones'
                ? 'bg-[var(--surface-elevated)] text-cyan-200 border border-[var(--border-strong)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Zone Library</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('mission')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
              tab === 'mission'
                ? 'bg-[var(--surface-elevated)] text-cyan-200 border border-[var(--border-strong)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Mission &amp; Hull</span>
          </button>
        </div>

        {isMobileDrawer && (
          <button
            type="button"
            aria-label="Close Sidebar"
            onClick={() => setMobileDrawer('none')}
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Live Mass & Cost Hairline Strip (Zero nested boxes) */}
      <div className="grid grid-cols-3 divide-x divide-[var(--border-subtle)] border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]/40">
        <div className="px-2.5 py-2">
          <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
            <Rocket className="w-2.5 h-2.5 text-cyan-300" />
            <span>Gross Vol</span>
          </div>
          <div className="text-xs font-bold font-mono-telemetry text-[var(--text-primary)] mt-0.5">
            {report.grossVolumeM3} m³
          </div>
        </div>
        <div className="px-2.5 py-2">
          <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
            <Scale className="w-2.5 h-2.5 text-amber-300" />
            <span>Dry+Wet</span>
          </div>
          <div className="text-xs font-bold font-mono-telemetry text-[var(--text-primary)] mt-0.5">
            {(report.estimatedMassKg / 1000).toFixed(1)} t
          </div>
        </div>
        <div className="px-2.5 py-2">
          <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
            <DollarSign className="w-2.5 h-2.5 text-emerald-300" />
            <span>Launch</span>
          </div>
          <div className="text-xs font-bold font-mono-telemetry text-emerald-300 mt-0.5">
            ${report.estimatedLaunchCostM}M
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'zones' ? (
          <div>
            <div className="px-3 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
              <span>Drag or click + ({zones.length} active)</span>
              {zones.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllZones}
                  className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-rose-300 cursor-pointer"
                  title="Remove all modules from hull"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-[var(--border-subtle)]/70">
              {ZONE_TYPES_LIST.map((entry) => {
                const count = zoneCounts.get(entry.type) ?? 0;
                return (
                  <div
                    key={entry.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, entry.type)}
                    title={entry.description}
                    className="group px-3 py-2 hover:bg-[var(--surface-elevated)]/65 transition-colors cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-xs shrink-0"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                          {entry.label}
                        </span>
                        {count > 0 && (
                          <span className="shrink-0 px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-200 text-[10px] font-mono-telemetry font-semibold">
                            {count}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => addZone(entry.type)}
                        title={`Add ${entry.label}`}
                        aria-label={`Add ${entry.label}`}
                        className="shrink-0 w-7 h-7 rounded bg-[var(--surface-elevated)] group-hover:bg-cyan-500/20 text-[var(--text-primary)] group-hover:text-cyan-200 border border-[var(--border-subtle)] group-hover:border-cyan-500/50 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 flex-wrap text-[10px] font-mono-telemetry text-[var(--text-muted)]">
                      <span>
                        {entry.defaultWidth}×{entry.defaultHeight}m
                      </span>
                      <span>• {entry.illuminanceLux} lx</span>
                      {entry.noiseEmitDba >= 60 && (
                        <span className="inline-flex items-center gap-0.5 text-rose-200 bg-rose-500/20 px-1.5 py-0.2 rounded">
                          <Volume2 className="w-2.5 h-2.5" />
                          {entry.noiseEmitDba} dBA
                        </span>
                      )}
                      {entry.isContaminationSource && (
                        <span className="inline-flex items-center gap-0.5 text-amber-200 bg-amber-500/20 px-1.5 py-0.2 rounded">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          Bio-Sep
                        </span>
                      )}
                      {entry.isWaterMassShield && (
                        <span className="inline-flex items-center gap-0.5 text-sky-200 bg-sky-500/20 px-1.5 py-0.2 rounded">
                          <Droplets className="w-2.5 h-2.5" />
                          H₂O Shield
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-subtle)]">
            {activePreset && (
              <div className="px-3 py-2.5 bg-[var(--surface-canvas)]/45 space-y-1">
                <div className="text-[11px] font-semibold text-cyan-300">
                  {activePreset.heritageRef}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-snug text-pretty">
                  {activePreset.tagline}
                </p>
              </div>
            )}

            {/* Mission Parameters */}
            <div className="p-3 space-y-3">
              <div className="text-xs font-semibold text-[var(--text-primary)]">
                Mission Parameters
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--text-secondary)]">Crew Size</span>
                  <span className="font-mono-telemetry font-bold text-cyan-200">
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
                  className="cad-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--text-secondary)]">
                    Duration (Req ≥{getRequiredNhvPerCrew(mission.durationDays)} m³/c)
                  </span>
                  <span className="font-mono-telemetry font-bold text-cyan-200">
                    {mission.durationDays} d
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
                  className="cad-slider"
                />
              </div>

              <div>
                <div className="text-xs text-[var(--text-secondary)] mb-1.5">Gravity Regime</div>
                <div className="grid grid-cols-3 gap-1">
                  {gravities.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => updateMission({ gravity: g.id })}
                      className={`py-1.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                        mission.gravity === g.id
                          ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50'
                          : 'bg-[var(--surface-canvas)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pressure Hull Geometry */}
            <div className="p-3 space-y-3">
              <div className="text-xs font-semibold text-[var(--text-primary)]">
                Pressure Hull Geometry
              </div>

              <div className="space-y-1">
                {hullTypes.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => updateHull({ type: h.id })}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                      mission.hull.type === h.id
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50'
                        : 'bg-[var(--surface-canvas)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--text-secondary)]">Hull Diameter</span>
                  <span className="font-mono-telemetry font-bold text-[var(--text-primary)]">
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
                  className="cad-slider"
                />
              </div>

              {mission.hull.type !== 'surface_dome' && (
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--text-secondary)]">Hull Length</span>
                    <span className="font-mono-telemetry font-bold text-[var(--text-primary)]">
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
                    className="cad-slider"
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--text-secondary)]">Interior Decks</span>
                  <span className="font-mono-telemetry font-bold text-[var(--text-primary)]">
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
                          : 'bg-[var(--surface-canvas)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
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
