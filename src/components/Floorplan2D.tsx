import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Maximize2,
  RotateCw,
  Route,
  Trash2,
  Wind,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { EvaluationReport, MissionConfig, ZoneNode, ZoneType } from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';
import { getHullBounds, getHullCornerRadius, snapToGrid } from '../engine/hullMath';
import { useHabitatStore } from '../store/habitatStore';

interface Floorplan2DProps {
  missionOverride?: MissionConfig;
  zonesOverride?: ZoneNode[];
  reportOverride?: EvaluationReport;
  deckOverride?: number;
  readonly?: boolean;
  compact?: boolean;
}

type InteractionState =
  | null
  | {
      mode: 'pan';
      pointerId: number;
      startX: number;
      startY: number;
      origPanX: number;
      origPanY: number;
    }
  | {
      mode: 'move';
      pointerId: number;
      zoneId: string;
      startClientX: number;
      startClientY: number;
      offsetX: number;
      offsetY: number;
      recorded: boolean;
    }
  | {
      mode: 'resize';
      pointerId: number;
      zoneId: string;
      startMeterX: number;
      startMeterY: number;
      origW: number;
      origH: number;
      recorded: boolean;
    };

const PX_PER_M = 56;

export const Floorplan2D: React.FC<Floorplan2DProps> = ({
  missionOverride,
  zonesOverride,
  reportOverride,
  deckOverride,
  readonly = false,
  compact = false,
}) => {
  const uid = useId().replace(/:/g, '');
  const store = useHabitatStore();
  const mission = missionOverride ?? store.mission;
  const zones = zonesOverride ?? store.zones;
  const report = reportOverride ?? store.report;
  const activeDeck = deckOverride ?? store.activeDeck;

  const { hull } = mission;
  const { width: hullW, depth: hullD, wall } = getHullBounds(hull);
  const cornerR = getHullCornerRadius(hull);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [interaction, setInteraction] = useState<InteractionState>(null);

  const padM = 1.15;
  const vbWidth = (hullW + padM * 2) * PX_PER_M;
  const vbHeight = (hullD + padM * 2) * PX_PER_M;
  const toPx = (m: number) => (m + padM) * PX_PER_M;

  const deckZones = useMemo(
    () => zones.filter((z) => z.deck === activeDeck),
    [zones, activeDeck]
  );

  // Center pan on highlighted zone when clicking a violation in Inspector while zoomed
  useEffect(() => {
    if (readonly || store.focusPulseTick === 0 || store.highlightedZoneIds.length === 0) return;
    const target = zones.find((z) => z.id === store.highlightedZoneIds[0]);
    if (!target || target.deck !== activeDeck) return;
    if (zoom > 1.15) {
      const targetSvgX = (target.x + target.width / 2 + padM) * PX_PER_M;
      const targetSvgY = (target.y + target.height / 2 + padM) * PX_PER_M;
      setPan({
        x: vbWidth / 2 - targetSvgX,
        y: vbHeight / 2 - targetSvgY,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.focusPulseTick]);

  const getSvgScale = (currentZoom: number) => {
    const svg = svgRef.current;
    if (!svg) return 1;
    const rect = svg.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    const scaleX = vbWidth / currentZoom / w;
    const scaleY = vbHeight / currentZoom / h;
    return Math.max(scaleX, scaleY);
  };

  const clientToMeters = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    const scale = Math.max(vbWidth / zoom / w, vbHeight / zoom / h);
    const renderedW = w * scale;
    const renderedH = h * scale;
    const originX = (vbWidth - renderedW) / 2 - pan.x;
    const originY = (vbHeight - renderedH) / 2 - pan.y;

    const svgX = originX + (clientX - rect.left) * scale;
    const svgY = originY + (clientY - rect.top) * scale;
    return {
      x: svgX / PX_PER_M - padM,
      y: svgY / PX_PER_M - padM,
    };
  };

  // Global window pointer listeners during active drag/resize/pan for rock-solid touch & mouse release
  useEffect(() => {
    if (!interaction || readonly) return;

    const onWindowPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== interaction.pointerId) return;

      if (interaction.mode === 'pan') {
        const scale = getSvgScale(zoom);
        const dx = (e.clientX - interaction.startX) * scale;
        const dy = (e.clientY - interaction.startY) * scale;
        setPan({
          x: interaction.origPanX + dx,
          y: interaction.origPanY + dy,
        });
        return;
      }

      if (interaction.mode === 'move') {
        const slop = Math.hypot(
          e.clientX - interaction.startClientX,
          e.clientY - interaction.startClientY
        );
        if (!interaction.recorded && slop < 3) return;
        const pt = clientToMeters(e.clientX, e.clientY);
        const nx = snapToGrid(pt.x - interaction.offsetX);
        const ny = snapToGrid(pt.y - interaction.offsetY);
        useHabitatStore.getState().moveZone(interaction.zoneId, nx, ny, !interaction.recorded);
        if (!interaction.recorded) {
          setInteraction((prev) =>
            prev && prev.mode === 'move' ? { ...prev, recorded: true } : prev
          );
        }
        return;
      }

      if (interaction.mode === 'resize') {
        const pt = clientToMeters(e.clientX, e.clientY);
        const dw = pt.x - interaction.startMeterX;
        const dh = pt.y - interaction.startMeterY;
        useHabitatStore
          .getState()
          .resizeZone(
            interaction.zoneId,
            interaction.origW + dw,
            interaction.origH + dh,
            undefined,
            undefined,
            !interaction.recorded
          );
        if (!interaction.recorded) {
          setInteraction((prev) =>
            prev && prev.mode === 'resize' ? { ...prev, recorded: true } : prev
          );
        }
      }
    };

    const stopInteraction = (e?: PointerEvent) => {
      if (e && e.pointerId !== interaction.pointerId) return;
      setInteraction(null);
    };

    window.addEventListener('pointermove', onWindowPointerMove, { passive: true });
    window.addEventListener('pointerup', stopInteraction);
    window.addEventListener('pointercancel', stopInteraction);
    window.addEventListener('blur', () => setInteraction(null));

    return () => {
      window.removeEventListener('pointermove', onWindowPointerMove);
      window.removeEventListener('pointerup', stopInteraction);
      window.removeEventListener('pointercancel', stopInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interaction, readonly, zoom, pan.x, pan.y, vbWidth, vbHeight]);

  const handleWheel = (e: React.WheelEvent) => {
    if (readonly) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    setZoom((z) => Math.max(0.55, Math.min(2.8, Number((z * factor).toFixed(2)))));
  };

  const handleBackgroundPointerDown = (e: React.PointerEvent) => {
    if (readonly) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    store.selectZone(null);
    setInteraction({
      mode: 'pan',
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origPanX: pan.x,
      origPanY: pan.y,
    });
  };

  const handleZonePointerDown = (e: React.PointerEvent, z: ZoneNode) => {
    if (readonly) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.stopPropagation();
    store.selectZone(z.id);
    const pt = clientToMeters(e.clientX, e.clientY);
    setInteraction({
      mode: 'move',
      pointerId: e.pointerId,
      zoneId: z.id,
      startClientX: e.clientX,
      startClientY: e.clientY,
      offsetX: pt.x - z.x,
      offsetY: pt.y - z.y,
      recorded: false,
    });
  };

  const handleResizePointerDown = (e: React.PointerEvent, z: ZoneNode) => {
    if (readonly) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.stopPropagation();
    store.selectZone(z.id);
    const pt = clientToMeters(e.clientX, e.clientY);
    setInteraction({
      mode: 'resize',
      pointerId: e.pointerId,
      zoneId: z.id,
      startMeterX: pt.x,
      startMeterY: pt.y,
      origW: z.width,
      origH: z.height,
      recorded: false,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    if (readonly) return;
    e.preventDefault();
    const type = e.dataTransfer.getData('application/x-habitat-zone') as ZoneType;
    if (!type || !ZONE_CATALOG[type]) return;
    const cat = ZONE_CATALOG[type];
    const pt = clientToMeters(e.clientX, e.clientY);
    store.addZone(
      type,
      snapToGrid(pt.x - cat.defaultWidth / 2),
      snapToGrid(pt.y - cat.defaultHeight / 2)
    );
  };

  const selectedZone = !readonly
    ? deckZones.find((z) => z.id === store.selectedZoneId) ?? null
    : null;

  const zoneSeverityMap = useMemo(() => {
    const map = new Map<string, 'CRITICAL' | 'WARNING'>();
    for (const v of report.violations) {
      if (v.severity === 'PASS') continue;
      for (const id of v.affectedZoneIds) {
        const cur = map.get(id);
        if (!cur || v.severity === 'CRITICAL') {
          map.set(id, v.severity);
        }
      }
    }
    return map;
  }, [report.violations]);

  const deckAirlockPaths = report.egress.airlockPaths.filter(
    (p) => p.deck === activeDeck && p.reachable && p.points.length >= 2
  );
  const deckShelterPaths = report.egress.shelterPaths.filter(
    (p) => p.deck === activeDeck && p.reachable && p.points.length >= 2
  );
  const deckBottlenecks = report.egress.bottleneckPoints.filter((b) => b.deck === activeDeck);
  const deckAirflowLinks = (report.airflowLinks ?? []).filter(
    (a) => a.deck === activeDeck && a.points.length >= 2
  );
  const waterShieldSet = useMemo(
    () => new Set(report.waterWall?.contributingZoneIds ?? []),
    [report.waterWall]
  );
  const stagnantSet = useMemo(
    () => new Set(report.stagnantZoneIds ?? []),
    [report.stagnantZoneIds]
  );

  const viewBox = `${(vbWidth - vbWidth / zoom) / 2 - pan.x} ${(vbHeight - vbHeight / zoom) / 2 - pan.y} ${vbWidth / zoom} ${vbHeight / zoom}`;

  const getChevronPoints = (rot: 0 | 90 | 180 | 270) => {
    if (rot === 90) return '4,0 -3,-4 -3,4';
    if (rot === 180) return '0,4 -4,-3 4,-3';
    if (rot === 270) return '-4,0 3,-4 3,4';
    return '0,-4 -4,3 4,3';
  };

  return (
    <div className="relative w-full h-full bg-[#090D16] flex flex-col overflow-hidden select-none">
      {/* Top Floating Toolbar */}
      {!compact && (
        <div className="absolute top-2 left-2 right-2 z-10 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#111827]/95 border border-slate-700/80 text-[10px] font-mono-telemetry uppercase tracking-wider text-cyan-300">
              2D CAD • {hullW.toFixed(1)}×{hullD.toFixed(1)}m • 0.25m
            </span>

            {hull.decks > 1 && !readonly && (
              <div className="flex items-center bg-[#111827]/95 border border-slate-700/80 rounded p-0.5 gap-0.5">
                {Array.from({ length: hull.decks }).map((_, d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => store.setActiveDeck(d)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-telemetry cursor-pointer transition-colors ${
                      activeDeck === d
                        ? 'bg-cyan-500/25 text-cyan-200'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    D{d + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!readonly && (
            <div className="flex items-center gap-1 pointer-events-auto flex-wrap">
              <button
                type="button"
                onClick={store.toggleEgressOverlay}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  store.showEgressOverlay
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-[#111827]/90 text-slate-400 border-slate-700/80'
                }`}
              >
                <Route className="w-3 h-3" />
                Egress
              </button>

              <button
                type="button"
                onClick={store.toggleAirflowOverlay}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  store.showAirflowOverlay
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                    : 'bg-[#111827]/90 text-slate-400 border-slate-700/80'
                }`}
                title="Toggle ISS IMV Airflow & CO2 Pocket Overlay"
              >
                <Wind className="w-3 h-3" />
                Airflow
              </button>

              <button
                type="button"
                onClick={store.toggleHazardOverlay}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  store.showHazardOverlay
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                    : 'bg-[#111827]/90 text-slate-400 border-slate-700/80'
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                Hazards
              </button>

              <div className="flex items-center bg-[#111827]/95 border border-slate-700/80 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(2.8, Number((z * 1.15).toFixed(2))))}
                  className="p-1 text-slate-300 hover:bg-slate-800 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.55, Number((z * 0.85).toFixed(2))))}
                  className="p-1 text-slate-300 hover:bg-slate-800 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className="p-1 text-slate-300 hover:bg-slate-800 cursor-pointer"
                  title="Reset View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Selected Zone Quick Actions Bar */}
      {selectedZone && !readonly && !compact && (
        <div className="absolute bottom-2 left-2 right-2 sm:right-auto z-10 flex flex-wrap items-center gap-2 bg-[#111827]/95 border border-cyan-500/40 rounded-lg px-2.5 py-1.5 shadow-lg">
          <span
            className="w-2.5 h-2.5 rounded-xs shrink-0"
            style={{ backgroundColor: ZONE_CATALOG[selectedZone.type].color }}
          />
          <span className="text-xs font-semibold text-slate-100 truncate max-w-[150px]">
            {selectedZone.label}
          </span>
          <span className="text-[10px] font-mono-telemetry text-slate-400">
            ({selectedZone.x.toFixed(2)}, {selectedZone.y.toFixed(2)}) •{' '}
            {selectedZone.width.toFixed(2)}×{selectedZone.height.toFixed(2)}m •{' '}
            {selectedZone.rotation}°
          </span>
          <div className="h-3.5 w-px bg-slate-700 hidden sm:block" />
          <button
            type="button"
            onClick={() => store.rotateZone(selectedZone.id)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 cursor-pointer"
            title="Rotate 90° (R)"
          >
            <RotateCw className="w-3 h-3" />
            90°
          </button>
          <button
            type="button"
            onClick={() => store.deleteZone(selectedZone.id)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/25 text-[11px] text-rose-300 cursor-pointer"
            title="Delete Zone (Del)"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      )}

      {/* Interactive SVG CAD Canvas */}
      <svg
        ref={svgRef}
        viewBox={viewBox}
        onWheel={handleWheel}
        onPointerDown={handleBackgroundPointerDown}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ touchAction: readonly ? 'pan-y' : 'none' }}
        className={`w-full h-full ${readonly ? 'cursor-default' : 'cursor-crosshair'}`}
      >
        <defs>
          <pattern
            id={`grid-minor-${uid}`}
            width={PX_PER_M * 0.25}
            height={PX_PER_M * 0.25}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${PX_PER_M * 0.25} 0 L 0 0 0 ${PX_PER_M * 0.25}`}
              fill="none"
              stroke="#1e293b"
              strokeWidth="0.6"
              strokeOpacity="0.45"
            />
          </pattern>
          <pattern
            id={`grid-major-${uid}`}
            width={PX_PER_M}
            height={PX_PER_M}
            patternUnits="userSpaceOnUse"
          >
            <rect width={PX_PER_M} height={PX_PER_M} fill={`url(#grid-minor-${uid})`} />
            <path
              d={`M ${PX_PER_M} 0 L 0 0 0 ${PX_PER_M}`}
              fill="none"
              stroke="#334155"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
          </pattern>

          {deckZones.map((z) => (
            <clipPath key={`clip-${z.id}`} id={`clip-${uid}-${z.id}`}>
              <rect
                x={toPx(z.x) + 3}
                y={toPx(z.y) + 3}
                width={Math.max(4, z.width * PX_PER_M - 6)}
                height={Math.max(4, z.height * PX_PER_M - 6)}
                rx="3"
              />
            </clipPath>
          ))}
        </defs>

        {/* Background Grid */}
        <rect
          x={-vbWidth}
          y={-vbHeight}
          width={vbWidth * 3}
          height={vbHeight * 3}
          fill={`url(#grid-major-${uid})`}
        />

        {/* Pressure Hull Outer & Inner Envelope */}
        {hull.type === 'surface_dome' ? (
          <g>
            <circle
              cx={toPx(hullW / 2)}
              cy={toPx(hullD / 2)}
              r={(hullW / 2) * PX_PER_M}
              fill="#0f172a"
              fillOpacity="0.9"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeOpacity="0.65"
            />
            <circle
              cx={toPx(hullW / 2)}
              cy={toPx(hullD / 2)}
              r={(hullW / 2 - wall) * PX_PER_M}
              fill="#0b1220"
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          </g>
        ) : (
          <g>
            <rect
              x={toPx(0)}
              y={toPx(0)}
              width={hullW * PX_PER_M}
              height={hullD * PX_PER_M}
              rx={cornerR * PX_PER_M}
              ry={cornerR * PX_PER_M}
              fill="#0f172a"
              fillOpacity="0.9"
              stroke={hull.type === 'inflatable' ? '#a855f7' : '#38bdf8'}
              strokeWidth="3.5"
              strokeOpacity="0.7"
            />
            <rect
              x={toPx(wall)}
              y={toPx(wall)}
              width={(hullW - wall * 2) * PX_PER_M}
              height={(hullD - wall * 2) * PX_PER_M}
              rx={Math.max(0, cornerR - wall) * PX_PER_M}
              ry={Math.max(0, cornerR - wall) * PX_PER_M}
              fill="#0b1220"
              stroke="#475569"
              strokeWidth="1.25"
              strokeDasharray="6 4"
            />
          </g>
        )}

        {/* Dimension Rulers */}
        {!compact && (
          <g className="font-mono-telemetry" fill="#64748b" fontSize="10.5" pointerEvents="none">
            {Array.from({ length: Math.floor(hullW) + 1 }).map((_, m) => (
              <text key={`rx-${m}`} x={toPx(m)} y={toPx(-0.32)} textAnchor="middle">
                {m}m
              </text>
            ))}
            {Array.from({ length: Math.floor(hullD) + 1 }).map((_, m) => (
              <text key={`ry-${m}`} x={toPx(-0.42)} y={toPx(m) + 4} textAnchor="end">
                {m}m
              </text>
            ))}
          </g>
        )}

        {/* Empty Deck Prompt */}
        {deckZones.length === 0 && !readonly && (
          <text
            x={toPx(hullW / 2)}
            y={toPx(hullD / 2)}
            textAnchor="middle"
            fill="#64748b"
            fontSize="13"
            className="font-mono-telemetry"
            pointerEvents="none"
          >
            Deck {activeDeck + 1} Empty — Add modules from Zone Library or select a Preset
          </text>
        )}

        {/* Hazard Halos (Acoustic + Contamination + 0g Orientation Conflict) */}
        {(store.showHazardOverlay || readonly) && (
          <g pointerEvents="none">
            {report.acousticPairs
              .filter((p) => p.violates)
              .map((p) => {
                const src = deckZones.find((z) => z.id === p.sourceId);
                const tgt = deckZones.find((z) => z.id === p.targetId);
                if (!src || !tgt) return null;
                const sx = toPx(src.x + src.width / 2);
                const sy = toPx(src.y + src.height / 2);
                const tx = toPx(tgt.x + tgt.width / 2);
                const ty = toPx(tgt.y + tgt.height / 2);
                return (
                  <g key={`ac-${p.sourceId}-${p.targetId}`}>
                    <circle
                      cx={sx}
                      cy={sy}
                      r={2.2 * PX_PER_M}
                      fill="#f43f5e"
                      fillOpacity="0.07"
                      stroke="#f43f5e"
                      strokeWidth="1.1"
                      strokeDasharray="4 4"
                      strokeOpacity="0.4"
                    />
                    <line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      stroke="#fb7185"
                      strokeWidth="2"
                      strokeDasharray="5 3"
                    />
                    {!compact && (
                      <>
                        <rect
                          x={(sx + tx) / 2 - 28}
                          y={(sy + ty) / 2 - 21}
                          width="56"
                          height="16"
                          rx="4"
                          fill="#881337"
                          stroke="#fb7185"
                          strokeWidth="1"
                        />
                        <text
                          x={(sx + tx) / 2}
                          y={(sy + ty) / 2 - 10}
                          textAnchor="middle"
                          fill="#ffe4e6"
                          fontSize="9"
                          className="font-mono-telemetry font-bold"
                        >
                          {p.receivedDba} dBA
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

            {report.contaminationPairs
              .filter((p) => p.violates)
              .map((p) => {
                const hyg = deckZones.find((z) => z.id === p.hygieneId);
                const tgt = deckZones.find((z) => z.id === p.targetId);
                if (!hyg || !tgt) return null;
                const hx = toPx(hyg.x + hyg.width / 2);
                const hy = toPx(hyg.y + hyg.height / 2);
                const tx = toPx(tgt.x + tgt.width / 2);
                const ty = toPx(tgt.y + tgt.height / 2);
                return (
                  <g key={`ct-${p.hygieneId}-${p.targetId}`}>
                    <line
                      x1={hx}
                      y1={hy}
                      x2={tx}
                      y2={ty}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    {!compact && (
                      <>
                        <rect
                          x={(hx + tx) / 2 - 26}
                          y={(hy + ty) / 2 - 9}
                          width="52"
                          height="17"
                          rx="4"
                          fill="#78350f"
                          stroke="#fbbf24"
                          strokeWidth="1"
                        />
                        <text
                          x={(hx + tx) / 2}
                          y={(hy + ty) / 2 + 3}
                          textAnchor="middle"
                          fill="#fef3c7"
                          fontSize="9.5"
                          className="font-mono-telemetry font-bold"
                        >
                          {p.distanceM.toFixed(1)}m!
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

            {!compact &&
              (report.orientationConflicts ?? []).map((oc, idx) => {
                const za = deckZones.find((z) => z.id === oc.zoneAId);
                const zb = deckZones.find((z) => z.id === oc.zoneBId);
                if (!za || !zb) return null;
                const ax = toPx(za.x + za.width / 2);
                const ay = toPx(za.y + za.height / 2);
                const bx = toPx(zb.x + zb.width / 2);
                const by = toPx(zb.y + zb.height / 2);
                return (
                  <g key={`oc-${idx}`}>
                    <line
                      x1={ax}
                      y1={ay}
                      x2={bx}
                      y2={by}
                      stroke="#c084fc"
                      strokeWidth="1.75"
                      strokeDasharray="3 3"
                    />
                    <rect
                      x={(ax + bx) / 2 - 26}
                      y={(ay + by) / 2 + 7}
                      width="52"
                      height="15"
                      rx="3"
                      fill="#3b0764"
                      stroke="#c084fc"
                      strokeWidth="1"
                    />
                    <text
                      x={(ax + bx) / 2}
                      y={(ay + by) / 2 + 17.5}
                      textAnchor="middle"
                      fill="#f3e8ff"
                      fontSize="8.5"
                      className="font-mono-telemetry font-bold"
                    >
                      Δ{oc.deltaDeg}° 0g
                    </text>
                  </g>
                );
              })}
          </g>
        )}

        {/* Placed Habitat Zones */}
        {deckZones.map((z) => {
          const cat = ZONE_CATALOG[z.type];
          const isSelected = !readonly && store.selectedZoneId === z.id;
          const isHighlighted = !readonly && store.highlightedZoneIds.includes(z.id);
          const sev = zoneSeverityMap.get(z.id);
          const isWaterContributor = waterShieldSet.has(z.id);
          const isStagnant = stagnantSet.has(z.id);
          const area = (z.width * z.height).toFixed(1);
          const vol = (z.width * z.height * z.zHeight).toFixed(1);

          const xPx = toPx(z.x);
          const yPx = toPx(z.y);
          const wPx = z.width * PX_PER_M;
          const hPx = z.height * PX_PER_M;

          const strokeColor = isSelected
            ? '#22d3ee'
            : isHighlighted
              ? '#facc15'
              : sev === 'CRITICAL'
                ? '#f43f5e'
                : sev === 'WARNING'
                  ? '#f59e0b'
                  : cat.accentColor;

          const displayLabel =
            wPx < 84
              ? cat.shortLabel
              : wPx < 126
                ? z.label.length > 13
                  ? `${z.label.slice(0, 12)}…`
                  : z.label
                : z.label.length > 20
                  ? `${z.label.slice(0, 19)}…`
                  : z.label;

          return (
            <g
              key={z.id}
              data-zone-id={z.id}
              onPointerDown={(e) => handleZonePointerDown(e, z)}
              className={readonly ? '' : 'cursor-move'}
            >
              {/* Storm Shelter or Water-Wall Buffer Halo */}
              {(z.type === 'storm_shelter' || isWaterContributor) && (
                <rect
                  x={xPx - 3}
                  y={yPx - 3}
                  width={wPx + 6}
                  height={hPx + 6}
                  rx="6"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={z.type === 'storm_shelter' ? '2.4' : '1.5'}
                  strokeOpacity={z.type === 'storm_shelter' ? '0.5' : '0.35'}
                  strokeDasharray="4 3"
                />
              )}

              <rect
                x={xPx}
                y={yPx}
                width={wPx}
                height={hPx}
                rx="4"
                fill={cat.color}
                fillOpacity={isSelected ? 0.36 : 0.24}
                stroke={strokeColor}
                strokeWidth={isSelected || isHighlighted ? 2.8 : sev ? 2.2 : 1.5}
              />

              {/* Top accent bar */}
              <rect
                x={xPx + 1}
                y={yPx + 1}
                width={Math.max(0, wPx - 2)}
                height="4.5"
                rx="2"
                fill={cat.color}
                fillOpacity="0.88"
              />

              {/* Clipped Interior Label + Telemetry + Local-Vertical Chevron */}
              <g clipPath={`url(#clip-${uid}-${z.id})`} pointerEvents="none">
                {/* Orientation direction chevron (top-right inside module) */}
                {!compact && wPx >= 72 && hPx >= 56 && (
                  <g transform={`translate(${xPx + wPx - 12}, ${yPx + 14})`}>
                    <polygon
                      points={getChevronPoints(z.rotation)}
                      fill={mission.gravity === '0g' && z.rotation !== 0 ? '#f59e0b' : '#e2e8f0'}
                      fillOpacity="0.85"
                    />
                  </g>
                )}

                <text
                  x={xPx + wPx / 2}
                  y={hPx >= 64 ? yPx + hPx / 2 - 3 : yPx + hPx / 2 + 4}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize={wPx < 90 ? '9.5' : '11'}
                  fontWeight="700"
                >
                  {displayLabel}
                </text>

                {hPx >= 64 && wPx >= 76 && (
                  <text
                    x={xPx + wPx / 2}
                    y={yPx + hPx / 2 + 12}
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="9"
                    className="font-mono-telemetry"
                  >
                    {compact ? `${area}m²` : `${area}m² • ${vol}m³`}
                  </text>
                )}

                {/* CO2 Stagnation badge when Airflow overlay active */}
                {store.showAirflowOverlay && isStagnant && !compact && (
                  <g transform={`translate(${xPx + 6}, ${yPx + hPx - 18})`}>
                    <rect width="52" height="13" rx="3" fill="#7f1d1d" stroke="#f87171" strokeWidth="0.8" />
                    <text
                      x="26"
                      y="9.5"
                      textAnchor="middle"
                      fill="#fecaca"
                      fontSize="8"
                      className="font-mono-telemetry font-bold"
                    >
                      CO₂ RISK
                    </text>
                  </g>
                )}
              </g>

              {/* Touch-Friendly SE Resize Handle */}
              {!readonly && (
                <g
                  className="cursor-nwse-resize"
                  onPointerDown={(e) => handleResizePointerDown(e, z)}
                >
                  <rect
                    x={xPx + wPx - 16}
                    y={yPx + hPx - 16}
                    width="16"
                    height="16"
                    fill="transparent"
                  />
                  <rect
                    x={xPx + wPx - 10}
                    y={yPx + hPx - 10}
                    width="9"
                    height="9"
                    rx="2"
                    fill={isSelected ? '#22d3ee' : '#94a3b8'}
                    fillOpacity={isSelected ? 0.95 : 0.6}
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* ISS IMV Ventilation / CO2 Airflow Overlay */}
        {store.showAirflowOverlay && !readonly && (
          <g pointerEvents="none">
            {deckAirflowLinks.map((af) => (
              <polyline
                key={`af-${af.fromEclssId}-${af.toZoneId}`}
                points={af.points.map((pt) => `${toPx(pt.x)},${toPx(pt.y)}`).join(' ')}
                fill="none"
                stroke={af.stagnantRisk ? '#f43f5e' : '#22d3ee'}
                strokeWidth={af.stagnantRisk ? '2.4' : '1.9'}
                strokeOpacity="0.82"
                strokeDasharray="5 5"
                className="animate-egress-flow"
              />
            ))}
          </g>
        )}

        {/* A* Emergency Egress Paths Overlay */}
        {(store.showEgressOverlay || readonly) && (
          <g pointerEvents="none">
            {deckShelterPaths.map((p) => (
              <polyline
                key={`sh-${p.fromZoneId}`}
                points={p.points.map((pt) => `${toPx(pt.x)},${toPx(pt.y)}`).join(' ')}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.1"
                strokeOpacity="0.65"
                strokeDasharray="6 6"
                className="animate-egress-flow"
              />
            ))}

            {deckAirlockPaths.map((p) => (
              <polyline
                key={`al-${p.fromZoneId}`}
                points={p.points.map((pt) => `${toPx(pt.x)},${toPx(pt.y)}`).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.8"
                strokeOpacity="0.9"
                strokeDasharray="8 6"
                className="animate-egress-flow"
              />
            ))}

            {/* Bottleneck Pinch-Points */}
            {!compact &&
              deckBottlenecks.map((b, i) => (
                <g key={`bn-${i}`} transform={`translate(${toPx(b.x)}, ${toPx(b.y)})`}>
                  <polygon
                    points="0,-8 8,0 0,8 -8,0"
                    fill="#f59e0b"
                    stroke="#fef3c7"
                    strokeWidth="1.4"
                  />
                  <text y="3.5" textAnchor="middle" fill="#090D16" fontSize="9.5" fontWeight="800">
                    !
                  </text>
                </g>
              ))}
          </g>
        )}
      </svg>
    </div>
  );
};
