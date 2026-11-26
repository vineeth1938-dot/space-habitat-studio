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

  const hullTypes: HullGeometryType[] = ['cylinder', 'inflatable', 'dome', 'multideck'];
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
      {/* Optional Drawer Header for iPad */}
      {isDrawer && (
        <div
          className="h-11 px-3 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h2 className="font-mono-cad text-xs font-bold uppercase tracking-wider">
            Mission &amp; Zone Palette
          </h2>
          <button
            type="button"
            onClick={() => setTabletDrawerOpen(false)}
            aria-label="Close Palette Drawer"
            className="w-8 h-8 border flex items-center justify-center cursor-pointer"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Feedback Banner when Adding Zones */}
      {isMobile && statusNotice && (
        <div
          className="px-3 py-2.5 border-b flex items-center justify-between gap-2 text-xs shrink-0"
          style={{
            borderColor: 'var(--border-strong)',
            backgroundColor: 'var(--bg-subtle)',
          }}
        >
          <span className="font-mono-cad truncate">{statusNotice}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                clearNotice();
                setMobilePanel('canvas');
              }}
              className="px-2.5 py-1.5 border font-mono-cad text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-bg)',
                color: 'var(--accent-fg)',
                borderColor: 'var(--border-strong)',
              }}
            >
              <span>BLUEPRINT</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Mission & Hull Parameters */}
      <div
        className="p-3 border-b space-y-3 shrink-0"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Mission Parameters
          </h2>
          <span className="font-mono-cad text-[11px]" style={{ color: 'var(--fg-secondary)' }}>
            NHV {evaluation.volume.netHabitableVolumeM3}m³
          </span>
        </div>

        {/* Crew Size: 1 - 12 */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span style={{ color: 'var(--fg-secondary)' }}>Crew Complement</span>
            <span className="font-mono-cad font-bold">{mission.crewSize} CREW</span>
          </div>
          <input
            data-testid="crew-slider"
            aria-label="Crew Complement"
            type="range"
            min={1}
            max={12}
            step={1}
            value={mission.crewSize}
            onChange={(e) => setCrewSize(Number(e.target.value))}
            className="w-full cursor-pointer accent-current"
          />
        </div>

        {/* Mission Duration: 3 - 1000 days */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
            <span style={{ color: 'var(--fg-secondary)' }}>Duration</span>
            <div className="flex items-center gap-1 font-mono-cad">
              {[7, 30, 180, 500].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDurationDays(d)}
                  className="px-2 min-h-[32px] md:min-h-[22px] text-[11px] md:text-[10px] border cursor-pointer"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor:
                      mission.durationDays === d ? 'var(--accent-bg)' : 'transparent',
                    color: mission.durationDays === d ? 'var(--accent-fg)' : 'var(--fg-muted)',
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
            className="w-full cursor-pointer accent-current"
          />
        </div>

        {/* Hull Geometry Selector */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span style={{ color: 'var(--fg-secondary)' }}>Hull Geometry</span>
            <span className="font-mono-cad text-[11px]">
              {mission.hull.widthM}×{mission.hull.depthM}m
              {mission.hull.decks > 1 ? ` ×${mission.hull.decks}D` : ''}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {hullTypes.map((ht) => {
              const active = mission.hull.type === ht;
              return (
                <button
                  type="button"
                  key={ht}
                  data-testid={`hull-${ht}`}
                  onClick={() => setHullType(ht)}
                  className="px-2.5 min-h-[40px] md:min-h-[28px] text-left font-mono-cad text-[11px] md:text-[10px] border truncate cursor-pointer"
                  style={{
                    borderColor: active ? 'var(--border-strong)' : 'var(--border-hairline)',
                    backgroundColor: active ? 'var(--accent-bg)' : 'var(--bg-subtle)',
                    color: active ? 'var(--accent-fg)' : 'var(--fg-secondary)',
                  }}
                >
                  {HULL_TEMPLATES[ht].label.split(' ')[0].toUpperCase()}
                  {ht === 'multideck' ? ' STACK' : ht === 'inflatable' ? ' HAB' : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hull Dimension Steppers + Multi-Deck Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 font-mono-cad text-xs md:text-[11px]">
          <div className="flex items-center gap-1">
            <span style={{ color: 'var(--fg-muted)' }}>W:</span>
            <button
              type="button"
              aria-label="Decrease Hull Width"
              onClick={() =>
                setHullDimensions(mission.hull.widthM - 0.5, mission.hull.depthM)
              }
              className="w-8 h-8 md:w-6 md:h-6 border flex items-center justify-center cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              -
            </button>
            <span className="w-8 text-center">{mission.hull.widthM.toFixed(1)}</span>
            <button
              type="button"
              aria-label="Increase Hull Width"
              onClick={() =>
                setHullDimensions(mission.hull.widthM + 0.5, mission.hull.depthM)
              }
              className="w-8 h-8 md:w-6 md:h-6 border flex items-center justify-center cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)' }}
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
                className="w-8 h-8 md:w-6 md:h-6 border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                -
              </button>
              <span className="w-8 text-center">{mission.hull.depthM.toFixed(1)}</span>
              <button
                type="button"
                aria-label="Increase Hull Depth"
                onClick={() =>
                  setHullDimensions(mission.hull.widthM, mission.hull.depthM + 0.5)
                }
                className="w-8 h-8 md:w-6 md:h-6 border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                +
              </button>
            </div>
          )}

          {mission.hull.decks > 1 && (
            <div className="flex border" style={{ borderColor: 'var(--border-hairline)' }}>
              {Array.from({ length: mission.hull.decks }).map((_, d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setActiveDeck(d)}
                  className="px-2.5 h-8 md:h-6 text-[11px] md:text-[10px] cursor-pointer"
                  style={{
                    backgroundColor: activeDeck === d ? 'var(--accent-bg)' : 'transparent',
                    color: activeDeck === d ? 'var(--accent-fg)' : 'var(--fg-muted)',
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
      <div className={isMobile ? 'flex-1' : 'flex-1 flex flex-col min-h-0 overflow-hidden'}>
        <div
          className="px-3 py-2 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider">
            Zone Palette (0.5m)
          </h2>
          {modules.length > 0 && (
            <button
              type="button"
              onClick={clearAllModules}
              title="Clear all placed modules"
              className="flex items-center gap-1 font-mono-cad text-[10px] px-1.5 py-0.5 border cursor-pointer"
              style={{ borderColor: 'var(--border-hairline)', color: 'var(--fg-muted)' }}
            >
              <Trash2 className="w-3 h-3" />
              CLEAR
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
              className="px-3 py-2.5 md:py-2 flex items-center justify-between gap-2 md:cursor-grab md:active:cursor-grabbing"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 shrink-0 border"
                    style={{
                      backgroundColor: spec.tintHex,
                      borderColor: 'var(--border-strong)',
                    }}
                  />
                  <span
                    className="font-mono-cad text-[10px] px-1 border shrink-0"
                    style={{
                      borderColor: 'var(--border-hairline)',
                      color: 'var(--fg-muted)',
                    }}
                  >
                    {spec.code}
                  </span>
                  <span className="text-sm md:text-xs font-semibold truncate">{spec.label}</span>
                </div>
                <div
                  className="font-mono-cad text-[11px] md:text-[10px] mt-0.5 truncate"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {spec.defaultW}×{spec.defaultH}m · {spec.sourceDba} dBA
                </div>
              </div>

              <button
                type="button"
                data-testid={`add-zone-${spec.type}`}
                onClick={() => addModule(spec.type)}
                title={`Place ${spec.label} on Deck ${activeDeck + 1}`}
                className="shrink-0 px-3 min-h-[40px] md:min-h-[28px] md:px-2 border font-mono-cad text-xs md:text-[10px] font-semibold flex items-center gap-1 cursor-pointer active:opacity-80"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--fg-primary)',
                }}
              >
                <Plus className="w-3.5 h-3.5 md:w-3 md:h-3" />
                ADD
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
