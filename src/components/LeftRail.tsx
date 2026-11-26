import React from 'react';
import { ArrowRight, Plus, Trash2, X } from 'lucide-react';
import { HULL_TEMPLATES, ZONE_SPEC_LIST } from '../engine/constants';
import { useCadStore } from '../store/useCadStore';
import { HullGeometryType, ZoneType } from '../types/habitat';

interface LeftRailProps {
  variant?: 'desktop' | 'drawer' | 'mobile';
}

export const LeftRail: React.FC<LeftRailProps> = ({ variant = 'desktop' }) => {
  const {
    mission,
    modules,
    evaluation,
    activeDeck,
    statusNotice,
    setCrewSize,
    setDurationDays,
    setHullType,
    setHullDimensions,
    setActiveDeck,
    addModule,
    clearAllModules,
    setMobilePanel,
    setTabletDrawerOpen,
    clearNotice,
  } = useCadStore();

  const hullTypes: Array<{ id: HullGeometryType; title: string }> = [
    { id: 'cylinder', title: 'Rigid Cylinder' },
    { id: 'inflatable', title: 'Inflatable Hab' },
    { id: 'dome', title: 'Lunar Dome' },
    { id: 'multideck', title: '2-Deck Starship' },
  ];
  const isMobile = variant === 'mobile';
  const isDrawer = variant === 'drawer';

  const handleDragStart = (e: React.DragEvent, type: ZoneType) => {
    e.dataTransfer.setData('application/x-sw4-zone', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const containerWidth = isMobile
    ? 'w-full h-full flex flex-col overflow-y-auto'
    : 'w-[280px] shrink-0 h-full border-r flex flex-col overflow-hidden';

  return (
    <aside
      className={containerWidth}
      style={{
        backgroundColor: 'var(--bg-panel)',
        borderColor: 'var(--border-hairline)',
        color: 'var(--fg-primary)',
      }}
    >
      {/* iPad Drawer Header */}
      {isDrawer && (
        <div
          className="h-12 px-3.5 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Mission &amp; Zone Palette
          </h2>
          <button
            type="button"
            onClick={() => setTabletDrawerOpen(false)}
            aria-label="Close Palette Drawer"
            className="w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Feedback Banner */}
      {isMobile && statusNotice && (
        <div
          className="px-3.5 py-2.5 border-b flex items-center justify-between gap-2 text-xs shrink-0"
          style={{
            borderColor: 'var(--border-strong)',
            backgroundColor: 'var(--bg-elevated)',
          }}
        >
          <span className="truncate font-medium">{statusNotice}</span>
          <button
            type="button"
            onClick={() => {
              clearNotice();
              setMobilePanel('canvas');
            }}
            className="px-3 h-9 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
            }}
          >
            <span>View Floorplan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mission & Hull Parameters */}
      <div
        className="p-3.5 border-b space-y-3 shrink-0"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Mission Setup
          </h2>
          <span className="font-mono-cad text-xs font-semibold" style={{ color: 'var(--accent-primary)' }}>
            {evaluation.volume.netHabitableVolumeM3} m³ NHV
          </span>
        </div>

        {/* Crew Size */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span style={{ color: 'var(--fg-secondary)' }}>Crew Size</span>
            <span className="font-mono-cad font-bold">{mission.crewSize} Astronauts</span>
          </div>
          <input
            data-testid="crew-slider"
            aria-label="Crew Size"
            type="range"
            min={1}
            max={12}
            step={1}
            value={mission.crewSize}
            onChange={(e) => setCrewSize(Number(e.target.value))}
            className="w-full cursor-pointer accent-sky-500"
          />
        </div>

        {/* Mission Duration */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
            <span style={{ color: 'var(--fg-secondary)' }}>Duration</span>
            <div className="flex items-center gap-1 font-mono-cad">
              {[7, 30, 180, 500].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDurationDays(d)}
                  className="px-2 min-h-[34px] md:min-h-[24px] rounded text-[11px] border cursor-pointer"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor:
                      mission.durationDays === d ? 'var(--accent-primary)' : 'transparent',
                    color: mission.durationDays === d ? '#ffffff' : 'var(--fg-muted)',
                  }}
                >
                  {d}d
                </button>
              ))}
              <span className="font-bold ml-1">{mission.durationDays}d</span>
            </div>
          </div>
          <input
            data-testid="duration-slider"
            aria-label="Mission Duration Days"
            type="range"
            min={3}
            max={1000}
            step={1}
            value={mission.durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            className="w-full cursor-pointer accent-sky-500"
          />
        </div>

        {/* Hull Geometry */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span style={{ color: 'var(--fg-secondary)' }}>Hull Shape</span>
            <span className="font-mono-cad text-xs">
              {mission.hull.widthM}×{mission.hull.depthM}m
              {mission.hull.decks > 1 ? ` · ${mission.hull.decks} Decks` : ''}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {hullTypes.map((ht) => {
              const active = mission.hull.type === ht.id;
              return (
                <button
                  type="button"
                  key={ht.id}
                  data-testid={`hull-${ht.id}`}
                  onClick={() => setHullType(ht.id)}
                  title={HULL_TEMPLATES[ht.id].label}
                  className="px-2.5 min-h-[42px] md:min-h-[30px] rounded-md text-left text-xs border truncate cursor-pointer font-medium transition-colors"
                  style={{
                    borderColor: active ? 'var(--border-strong)' : 'var(--border-hairline)',
                    backgroundColor: active ? 'var(--accent-primary)' : 'var(--bg-subtle)',
                    color: active ? '#ffffff' : 'var(--fg-secondary)',
                  }}
                >
                  {ht.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hull Dimension Steppers */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 font-mono-cad text-xs">
          <div className="flex items-center gap-1">
            <span style={{ color: 'var(--fg-muted)' }}>W:</span>
            <button
              type="button"
              aria-label="Decrease Hull Width"
              onClick={() =>
                setHullDimensions(mission.hull.widthM - 0.5, mission.hull.depthM)
              }
              className="w-9 h-9 md:w-6 md:h-6 rounded border flex items-center justify-center cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-subtle)' }}
            >
              -
            </button>
            <span className="w-9 text-center">{mission.hull.widthM.toFixed(1)}m</span>
            <button
              type="button"
              aria-label="Increase Hull Width"
              onClick={() =>
                setHullDimensions(mission.hull.widthM + 0.5, mission.hull.depthM)
              }
              className="w-9 h-9 md:w-6 md:h-6 rounded border flex items-center justify-center cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-subtle)' }}
            >
              +
            </button>
          </div>

          {mission.hull.type !== 'dome' && (
            <div className="flex items-center gap-1">
              <span style={{ color: 'var(--fg-muted)' }}>D:</span>
              <button
                type="button"
                aria-label="Decrease Hull Depth"
                onClick={() =>
                  setHullDimensions(mission.hull.widthM, mission.hull.depthM - 0.5)
                }
                className="w-9 h-9 md:w-6 md:h-6 rounded border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-subtle)' }}
              >
                -
              </button>
              <span className="w-9 text-center">{mission.hull.depthM.toFixed(1)}m</span>
              <button
                type="button"
                aria-label="Increase Hull Depth"
                onClick={() =>
                  setHullDimensions(mission.hull.widthM, mission.hull.depthM + 0.5)
                }
                className="w-9 h-9 md:w-6 md:h-6 rounded border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-subtle)' }}
              >
                +
              </button>
            </div>
          )}

          {mission.hull.decks > 1 && (
            <div
              className="flex rounded overflow-hidden border"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              {Array.from({ length: mission.hull.decks }).map((_, d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setActiveDeck(d)}
                  className="px-2.5 h-9 md:h-6 text-xs cursor-pointer font-bold"
                  style={{
                    backgroundColor: activeDeck === d ? 'var(--accent-primary)' : 'transparent',
                    color: activeDeck === d ? '#ffffff' : 'var(--fg-muted)',
                  }}
                >
                  D{d + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zone Module Palette */}
      <div className={isMobile ? 'flex-1 pb-4' : 'flex-1 flex flex-col min-h-0 overflow-hidden'}>
        <div
          className="px-3.5 py-2.5 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Habitat Modules
          </h2>
          {modules.length > 0 && (
            <button
              type="button"
              onClick={clearAllModules}
              className="flex items-center gap-1 text-[11px] px-2 py-1 rounded border cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)', color: 'var(--fg-muted)' }}
            >
              <Trash2 className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        <div
          className={`${isMobile ? '' : 'flex-1 overflow-y-auto'} divide-y`}
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          {ZONE_SPEC_LIST.map((spec) => (
            <div
              key={spec.type}
              draggable={!isMobile}
              onDragStart={(e) => handleDragStart(e, spec.type)}
              className="px-3.5 py-3 md:py-2.5 flex items-center justify-between gap-2.5 md:cursor-grab md:active:cursor-grabbing"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: spec.tintHex }}
                  />
                  <span className="text-sm md:text-xs font-semibold truncate">{spec.label}</span>
                </div>
                <div
                  className="text-xs md:text-[11px] mt-0.5 truncate"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {spec.defaultW}×{spec.defaultH}m · {spec.sourceDba} dBA
                </div>
              </div>

              <button
                type="button"
                data-testid={`add-zone-${spec.type}`}
                onClick={() => addModule(spec.type)}
                className="shrink-0 px-3.5 min-h-[42px] md:min-h-[30px] md:px-2.5 rounded-md border text-xs font-semibold flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--fg-primary)',
                }}
              >
                <Plus className="w-4 h-4 md:w-3.5 md:h-3.5" />
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
