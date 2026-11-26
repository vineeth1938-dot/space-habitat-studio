import React, { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Maximize2,
  RotateCw,
  Route,
  Trash2,
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

const PX_PER_M = 56;

export const Floorplan2D: React.FC<Floorplan2DProps> = ({
  missionOverride,
  zonesOverride,
  reportOverride,
  deckOverride,
  readonly = false,
  compact = false,
}) => {
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
  const [interaction, setInteraction] = useState<
    | null
    | { mode: 'pan'; startX: number; startY: number; origPanX: number; origPanY: number }
    | { mode: 'move'; zoneId: string; offsetX: number; offsetY: number; moved: boolean }
    | {
        mode: 'resize';
        zoneId: string;
        startX: number;
        startY: number;
        origW: number;
        origH: number;
      }
  >(null);

  const deckZones = useMemo(
    () => zones.filter((z) => z.deck === activeDeck),
    [zones, activeDeck]
  );

  const padM = 1.25;
  const vbWidth = (hullW + padM * 2) * PX_PER_M;
  const vbHeight = (hullD + padM * 2) * PX_PER_M;

  // Convert client pointer coordinates to habitat meters
  const clientToMeters = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const scaleX = vbWidth / zoom / rect.width;
    const scaleY = vbHeight / zoom / rect.height;
    const scale = Math.max(scaleX, scaleY);
    const renderedW = rect.width * scale;
    const renderedH = rect.height * scale;
    const originX = (vbWidth - renderedW) / 2 - pan.x;
    const originY = (vbHeight - renderedH) / 2 - pan.y;

    const svgX = originX + (clientX - rect.left) * scale;
    const svgY = originY + (clientY - rect.top) * scale;
    return {
      x: svgX / PX_PER_M - padM,
      y: svgY / PX_PER_M - padM,
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (readonly) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    setZoom((z) => Math.max(0.55, Math.min(2.8, Number((z * factor).toFixed(2)))));
  };

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    if (readonly) return;
    if (e.button !== 0) return;
    store.selectZone(null);
    setInteraction({
      mode: 'pan',
      startX: e.clientX,
      startY: e.clientY,
      origPanX: pan.x,
      origPanY: pan.y,
    });
  };

  const handleZoneMouseDown = (e: React.MouseEvent, z: ZoneNode) => {
    if (readonly) return;
    e.stopPropagation();
    store.selectZone(z.id);
    const pt = clientToMeters(e.clientX, e.clientY);
    setInteraction({
      mode: 'move',
      zoneId: z.id,
      offsetX: pt.x - z.x,
      offsetY: pt.y - z.y,
      moved: false,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, z: ZoneNode) => {
    if (readonly) return;
    e.stopPropagation();
    const pt = clientToMeters(e.clientX, e.clientY);
    setInteraction({
      mode: 'resize',
      zoneId: z.id,
      startX: pt.x,
      startY: pt.y,
      origW: z.width,
      origH: z.height,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interaction || readonly) return;
    if (interaction.mode === 'pan') {
      const dx = (e.clientX - interaction.startX) / zoom;
      const dy = (e.clientY - interaction.startY) / zoom;
      setPan({ x: interaction.origPanX + dx, y: interaction.origPanY + dy });
      return;
    }

    const pt = clientToMeters(e.clientX, e.clientY);
    if (interaction.mode === 'move') {
      const nx = snapToGrid(pt.x - interaction.offsetX);
      const ny = snapToGrid(pt.y - interaction.offsetY);
      const clampedX = Math.max(-0.5, Math.min(hullW, nx));
      const clampedY = Math.max(-0.5, Math.min(hullD, ny));
      store.moveZone(interaction.zoneId, clampedX, clampedY, !interaction.moved);
      if (!interaction.moved) {
        setInteraction({ ...interaction, moved: true });
      }
    } else if (interaction.mode === 'resize') {
      const dw = pt.x - interaction.startX;
      const dh = pt.y - interaction.startY;
      store.resizeZone(
        interaction.zoneId,
        interaction.origW + dw,
        interaction.origH + dh,
        undefined,
        undefined,
        false
      );
    }
  };

  const handleMouseUp = () => {
    setInteraction(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (readonly) return;
    e.preventDefault();
    const type = e.dataTransfer.getData('application/x-habitat-zone') as ZoneType;
    if (!type || !ZONE_CATALOG[type]) return;
    const cat = ZONE_CATALOG[type];
    const pt = clientToMeters(e.clientX, e.clientY);
    store.addZone(type, snapToGrid(pt.x - cat.defaultWidth / 2), snapToGrid(pt.y - cat.defaultHeight / 2));
  };

  const selectedZone = !readonly
    ? deckZones.find((z) => z.id === store.selectedZoneId) ?? null
    : null;

  // Build violation lookup per zone for red/amber border rings
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

  const viewBox = `${(vbWidth - vbWidth / zoom) / 2 - pan.x} ${(vbHeight - vbHeight / zoom) / 2 - pan.y} ${vbWidth / zoom} ${vbHeight / zoom}`;

  const toPx = (m: number) => (m + padM) * PX_PER_M;

  return (
    <div className="relative w-full h-full bg-[#090D16] flex flex-col overflow-hidden select-none">
      {/* Top Floating Toolbar */}
      {!compact && (
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="px-2 py-1 rounded bg-[#111827]/95 border border-slate-700/80 text-[10px] font-mono-telemetry uppercase tracking-wider text-cyan-300 shadow">
              2D CAD • {hullW.toFixed(1)}m × {hullD.toFixed(1)}m • 0.25m SNAP
            </span>

            {hull.decks > 1 && !readonly && (
              <div className="flex items-center bg-[#111827]/95 border border-slate-700/80 rounded p-0.5 gap-0.5 shadow">
                {Array.from({ length: hull.decks }).map((_, d) => (
                  <button
                    key={d}
                    onClick={() => store.setActiveDeck(d)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-telemetry cursor-pointer transition-colors ${
                      activeDeck === d
                        ? 'bg-cyan-500/25 text-cyan-200'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Deck {d + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!readonly && (
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                onClick={store.toggleEgressOverlay}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  store.showEgressOverlay
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-[#111827]/90 text-slate-400 border-slate-700/80'
                }`}
              >
                <Route className="w-3 h-3" />
                A* Egress
              </button>
              <button
                onClick={store.toggleHazardOverlay}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
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
                  onClick={() => setZoom((z) => Math.min(2.8, Number((z * 1.15).toFixed(2))))}
                  className="p-1 text-slate-300 hover:bg-slate-800 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(0.55, Number((z * 0.85).toFixed(2))))}
                  className="p-1 text-slate-300 hover:bg-slate-800 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className="p-1 text-slate-300 hover:bg-slate-800 cursor-pointer"
                  title="Fit Hull"
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
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-2 bg-[#111827]/95 border border-cyan-500/40 rounded-lg px-3 py-1.5 shadow-lg">
          <span
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: ZONE_CATALOG[selectedZone.type].color }}
          />
          <span className="text-xs font-semibold text-slate-100">{selectedZone.label}</span>
          <span className="text-[10px] font-mono-telemetry text-slate-400">
            ({selectedZone.x.toFixed(2)}, {selectedZone.y.toFixed(2)}) • {selectedZone.width.toFixed(2)}×
            {selectedZone.height.toFixed(2)}m • {(selectedZone.width * selectedZone.height * selectedZone.zHeight).toFixed(1)} m³
          </span>
          <div className="h-3.5 w-px bg-slate-700" />
          <button
            onClick={() => store.rotateZone(selectedZone.id)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 cursor-pointer"
            title="Rotate 90°"
          >
            <RotateCw className="w-3 h-3" />
            90°
          </button>
          <button
            onClick={() => store.deleteZone(selectedZone.id)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/25 text-[11px] text-rose-300 cursor-pointer"
            title="Delete Zone"
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
        onMouseDown={handleBackgroundMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full h-full cursor-crosshair"
      >
        <defs>
          <pattern
            id={`grid-minor-${compact ? 'c' : 'm'}`}
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
            id={`grid-major-${compact ? 'c' : 'm'}`}
            width={PX_PER_M}
            height={PX_PER_M}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={PX_PER_M}
              height={PX_PER_M}
              fill={`url(#grid-minor-${compact ? 'c' : 'm'})`}
            />
            <path
              d={`M ${PX_PER_M} 0 L 0 0 0 ${PX_PER_M}`}
              fill="none"
              stroke="#334155"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect
          x={-vbWidth}
          y={-vbHeight}
          width={vbWidth * 3}
          height={vbHeight * 3}
          fill={`url(#grid-major-${compact ? 'c' : 'm'})`}
        />

        {/* Pressure Hull Outer & Inner Envelope */}
        {hull.type === 'surface_dome' ? (
          <g>
            <circle
              cx={toPx(hullW / 2)}
              cy={toPx(hullD / 2)}
              r={(hullW / 2) * PX_PER_M}
              fill="#0f172a"
              fillOpacity="0.88"
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
        <g className="font-mono-telemetry" fill="#64748b" fontSize="11">
          {Array.from({ length: Math.floor(hullW) + 1 }).map((_, m) => (
            <text
              key={`rx-${m}`}
              x={toPx(m)}
              y={toPx(-0.35)}
              textAnchor="middle"
            >
              {m}m
            </text>
          ))}
          {Array.from({ length: Math.floor(hullD) + 1 }).map((_, m) => (
            <text
              key={`ry-${m}`}
              x={toPx(-0.45)}
              y={toPx(m) + 4}
              textAnchor="end"
            >
              {m}m
            </text>
          ))}
        </g>

        {/* Hazard Halos (Acoustic + Contamination) */}
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
                      r={2.4 * PX_PER_M}
                      fill="#f43f5e"
                      fillOpacity="0.08"
                      stroke="#f43f5e"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      strokeOpacity="0.45"
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
                    <rect
                      x={(sx + tx) / 2 - 28}
                      y={(sy + ty) / 2 - 10}
                      width="56"
                      height="18"
                      rx="4"
                      fill="#881337"
                      stroke="#fb7185"
                      strokeWidth="1"
                    />
                    <text
                      x={(sx + tx) / 2}
                      y={(sy + ty) / 2 + 3}
                      textAnchor="middle"
                      fill="#ffe4e6"
                      fontSize="10"
                      className="font-mono-telemetry font-bold"
                    >
                      {p.receivedDba} dBA
                    </text>
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
                    <circle
                      cx={hx}
                      cy={hy}
                      r={3.0 * PX_PER_M}
                      fill="#f59e0b"
                      fillOpacity="0.07"
                      stroke="#f59e0b"
                      strokeWidth="1.2"
                      strokeDasharray="6 4"
                      strokeOpacity="0.45"
                    />
                    <line
                      x1={hx}
                      y1={hy}
                      x2={tx}
                      y2={ty}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    <rect
                      x={(hx + tx) / 2 - 26}
                      y={(hy + ty) / 2 - 10}
                      width="52"
                      height="18"
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
                      fontSize="10"
                      className="font-mono-telemetry font-bold"
                    >
                      {p.distanceM.toFixed(1)}m!
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

          return (
            <g
              key={z.id}
              onMouseDown={(e) => handleZoneMouseDown(e, z)}
              className={readonly ? '' : 'cursor-move'}
            >
              {/* Storm Shelter water-wall glow */}
              {z.type === 'storm_shelter' && (
                <rect
                  x={xPx - 4}
                  y={yPx - 4}
                  width={wPx + 8}
                  height={hPx + 8}
                  rx="7"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeOpacity="0.45"
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
                fillOpacity={isSelected ? 0.34 : 0.22}
                stroke={strokeColor}
                strokeWidth={isSelected || isHighlighted ? 2.6 : sev ? 2.2 : 1.5}
              />

              {/* Top accent bar */}
              <rect
                x={xPx + 1}
                y={yPx + 1}
                width={Math.max(0, wPx - 2)}
                height="5"
                rx="2"
                fill={cat.color}
                fillOpacity="0.85"
              />

              {/* Zone Label & Dimensions */}
              <text
                x={xPx + wPx / 2}
                y={yPx + hPx / 2 - 4}
                textAnchor="middle"
                fill="#f8fafc"
                fontSize={wPx < 95 ? '10' : '11.5'}
                fontWeight="700"
                pointerEvents="none"
              >
                {wPx < 95 ? cat.shortLabel : z.label.length > 20 ? `${z.label.slice(0, 18)}…` : z.label}
              </text>
              <text
                x={xPx + wPx / 2}
                y={yPx + hPx / 2 + 12}
                textAnchor="middle"
                fill="#cbd5e1"
                fontSize="9.5"
                className="font-mono-telemetry"
                pointerEvents="none"
              >
                {area}m² • {vol}m³
              </text>

              {/* Resize Handle (SE corner) */}
              {!readonly && (
                <rect
                  x={xPx + wPx - 10}
                  y={yPx + hPx - 10}
                  width="10"
                  height="10"
                  rx="2"
                  fill={isSelected ? '#22d3ee' : '#94a3b8'}
                  fillOpacity={isSelected ? 0.95 : 0.55}
                  className="cursor-nwse-resize"
                  onMouseDown={(e) => handleResizeMouseDown(e, z)}
                />
              )}
            </g>
          );
        })}

        {/* A* Emergency Egress Paths Overlay */}
        {(store.showEgressOverlay || readonly) && (
          <g pointerEvents="none">
            {deckShelterPaths.map((p) => (
              <polyline
                key={`sh-${p.fromZoneId}`}
                points={p.points.map((pt) => `${toPx(pt.x)},${toPx(pt.y)}`).join(' ')}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
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
                strokeWidth="3"
                strokeOpacity="0.9"
                strokeDasharray="8 6"
                className="animate-egress-flow"
              />
            ))}

            {/* Bottleneck Pinch-Points */}
            {deckBottlenecks.map((b, i) => (
              <g key={`bn-${i}`} transform={`translate(${toPx(b.x)}, ${toPx(b.y)})`}>
                <polygon
                  points="0,-9 9,0 0,9 -9,0"
                  fill="#f59e0b"
                  stroke="#fef3c7"
                  strokeWidth="1.5"
                />
                <text
                  y="3.5"
                  textAnchor="middle"
                  fill="#090D16"
                  fontSize="10"
                  fontWeight="800"
                >
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
