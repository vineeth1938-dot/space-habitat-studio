import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Maximize2,
  Plus,
  RotateCw,
  Sparkles,
  Trash2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { GRID_STEP_M, ZONE_SPECS } from '../engine/constants';
import { clampModuleToHull, snapGrid } from '../engine/geometry';
import { useCadStore } from '../store/useCadStore';
import { ZoneType } from '../types/habitat';
import { WireframeIsoView } from './WireframeIsoView';

const PX_PER_M = 52;
const PAD_M = 1.0;

function acousticColor(dba: number): string {
  if (dba >= 62) return 'rgba(239, 68, 68, 0.34)';
  if (dba >= 55) return 'rgba(245, 158, 11, 0.28)';
  if (dba >= 48) return 'rgba(234, 179, 8, 0.20)';
  return 'rgba(16, 185, 129, 0.10)';
}

type DragInteraction =
  | {
      kind: 'pan';
      pointerId: number;
      startX: number;
      startY: number;
      panX: number;
      panY: number;
    }
  | {
      kind: 'move';
      pointerId: number;
      id: string;
      offX: number;
      offY: number;
      recorded: boolean;
    }
  | {
      kind: 'resize';
      pointerId: number;
      id: string;
      startX: number;
      startY: number;
      origW: number;
      origH: number;
      recorded: boolean;
    };

export const BlueprintCanvas: React.FC = () => {
  const store = useCadStore();
  const {
    mission,
    modules,
    evaluation,
    activeDeck,
    selectedModuleId,
    highlightedModuleIds,
    viewMode,
    overlays,
    animateZones,
  } = store;

  const { hull } = mission;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState<DragInteraction | null>(null);

  // Active pointer map for 2-finger pinch-to-zoom & interrupted-gesture cleanup
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchPrevDistRef = useRef<number | null>(null);

  useEffect(() => {
    const resetGesture = () => {
      activePointersRef.current.clear();
      pinchPrevDistRef.current = null;
      setDragState(null);
    };
    window.addEventListener('blur', resetGesture);
    return () => window.removeEventListener('blur', resetGesture);
  }, []);

  const deckModules = useMemo(
    () => modules.filter((m) => m.deck === activeDeck),
    [modules, activeDeck]
  );

  const selectedModule = useMemo(
    () => deckModules.find((m) => m.id === selectedModuleId) ?? null,
    [deckModules, selectedModuleId]
  );

  const vbW = (hull.widthM + PAD_M * 2) * PX_PER_M;
  const vbH = (hull.depthM + PAD_M * 2) * PX_PER_M;

  const toPxX = (m: number) => (m + PAD_M) * PX_PER_M;
  const toPxY = (m: number) => (m + PAD_M) * PX_PER_M;

  const pointerToMeters = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const curVbW = vbW / zoom;
    const curVbH = vbH / zoom;
    const scale = Math.max(curVbW / Math.max(1, rect.width), curVbH / Math.max(1, rect.height));
    const renderedW = rect.width * scale;
    const renderedH = rect.height * scale;
    const vbMinX = (vbW - curVbW) / 2 - pan.x;
    const vbMinY = (vbH - curVbH) / 2 - pan.y;
    const originX = vbMinX - (renderedW - curVbW) / 2;
    const originY = vbMinY - (renderedH - curVbH) / 2;

    const sx = originX + (clientX - rect.left) * scale;
    const sy = originY + (clientY - rect.top) * scale;
    return {
      x: sx / PX_PER_M - PAD_M,
      y: sy / PX_PER_M - PAD_M,
    };
  };

  const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture?.(e.pointerId);

    if (activePointersRef.current.size === 2) {
      const pts = Array.from(activePointersRef.current.values());
      pinchPrevDistRef.current = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      setDragState(null);
      return;
    }

    if (activePointersRef.current.size === 1) {
      store.selectModule(null);
      setDragState({
        kind: 'pan',
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        panX: pan.x,
        panY: pan.y,
      });
    }
  };

  const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // Two-finger pinch-to-zoom on touch screens
    if (activePointersRef.current.size >= 2) {
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      if (pinchPrevDistRef.current && pinchPrevDistRef.current > 12 && dist > 12) {
        const ratio = dist / pinchPrevDistRef.current;
        setZoom((z) => Math.max(0.55, Math.min(2.6, Number((z * ratio).toFixed(2)))));
      }
      pinchPrevDistRef.current = dist;
      return;
    }

    if (!dragState || e.pointerId !== dragState.pointerId) return;

    if (dragState.kind === 'pan') {
      setPan({
        x: dragState.panX + (e.clientX - dragState.startX) / zoom,
        y: dragState.panY + (e.clientY - dragState.startY) / zoom,
      });
      return;
    }

    const pt = pointerToMeters(e.clientX, e.clientY);
    if (dragState.kind === 'move') {
      store.moveModule(
        dragState.id,
        snapGrid(pt.x - dragState.offX),
        snapGrid(pt.y - dragState.offY),
        !dragState.recorded
      );
      if (!dragState.recorded) {
        setDragState({ ...dragState, recorded: true });
      }
    } else if (dragState.kind === 'resize') {
      store.resizeModule(
        dragState.id,
        dragState.origW + (pt.x - dragState.startX),
        dragState.origH + (pt.y - dragState.startY),
        !dragState.recorded
      );
      if (!dragState.recorded) {
        setDragState({ ...dragState, recorded: true });
      }
    }
  };

  const endPointerGesture = (pointerId: number) => {
    activePointersRef.current.delete(pointerId);
    if (activePointersRef.current.size < 2) {
      pinchPrevDistRef.current = null;
    }
    setDragState((cur) => (cur && cur.pointerId === pointerId ? null : cur));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const zoneType = e.dataTransfer.getData('application/x-sw4-zone') as ZoneType;
    if (!zoneType || !ZONE_SPECS[zoneType]) return;
    const spec = ZONE_SPECS[zoneType];
    const pt = pointerToMeters(e.clientX, e.clientY);
    const clamped = clampModuleToHull(
      {
        id: 'drop',
        type: zoneType,
        label: spec.label,
        deck: activeDeck,
        x: snapGrid(pt.x - spec.defaultW / 2),
        y: snapGrid(pt.y - spec.defaultH / 2),
        w: spec.defaultW,
        h: spec.defaultH,
        rotation: 0,
      },
      hull
    );
    store.addModule(zoneType, clamped.x, clamped.y);
  };

  const overlapSet = useMemo(() => {
    const s = new Set<string>();
    for (const [a, b] of evaluation.adjacency.overlappingPairs) {
      s.add(a);
      s.add(b);
    }
    for (const oob of evaluation.adjacency.outOfBoundsIds) {
      s.add(oob);
    }
    return s;
  }, [evaluation.adjacency]);

  const failModuleSet = useMemo(() => {
    const s = new Set<string>();
    for (const iss of evaluation.issues) {
      if (iss.severity === 'FAIL') {
        iss.moduleIds.forEach((id) => s.add(id));
      }
    }
    return s;
  }, [evaluation.issues]);

  const deckAcousticCells = useMemo(
    () => evaluation.acoustics.cells.filter((c) => c.deck === activeDeck),
    [evaluation.acoustics.cells, activeDeck]
  );

  const deckRoutes = useMemo(
    () => evaluation.egress.routes.filter((r) => r.deck === activeDeck),
    [evaluation.egress.routes, activeDeck]
  );

  const curVbW = vbW / zoom;
  const curVbH = vbH / zoom;
  const viewBox = `${(vbW - curVbW) / 2 - pan.x} ${(vbH - curVbH) / 2 - pan.y} ${curVbW} ${curVbH}`;

  return (
    <main
      className="flex-1 h-full flex flex-col min-w-0 min-h-0 overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--fg-primary)' }}
    >
      {/* Top CAD Control Strip (Horizontally Scrollable on Narrow Phones) */}
      <div
        className="min-h-[40px] md:h-9 shrink-0 px-2.5 md:px-3 border-b flex items-center justify-between gap-2 font-mono-cad text-[11px] overflow-x-auto no-scrollbar"
        style={{
          backgroundColor: 'var(--bg-panel)',
          borderColor: 'var(--border-hairline)',
          touchAction: 'pan-x',
        }}
      >
        {/* View Mode + Overlay Toggles */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex border" style={{ borderColor: 'var(--border-hairline)' }}>
            <button
              type="button"
              data-testid="view-2d-btn"
              onClick={() => store.setViewMode('2d')}
              className="flex items-center gap-1 px-2.5 h-7 md:h-6 text-[10px] font-semibold border-r cursor-pointer"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: viewMode === '2d' ? 'var(--accent-bg)' : 'transparent',
                color: viewMode === '2d' ? 'var(--accent-fg)' : 'var(--fg-secondary)',
              }}
            >
              <Grid className="w-3 h-3" />
              <span>2D</span>
              <span className="hidden sm:inline">BLUEPRINT</span>
            </button>
            <button
              type="button"
              data-testid="view-iso-btn"
              onClick={() => store.setViewMode('iso')}
              className="flex items-center gap-1 px-2.5 h-7 md:h-6 text-[10px] font-semibold cursor-pointer"
              style={{
                backgroundColor: viewMode === 'iso' ? 'var(--accent-bg)' : 'transparent',
                color: viewMode === 'iso' ? 'var(--accent-fg)' : 'var(--fg-secondary)',
              }}
            >
              <Box className="w-3 h-3" />
              <span>2.5D</span>
              <span className="hidden sm:inline">WIREFRAME</span>
            </button>
          </div>

          <span style={{ color: 'var(--border-hairline)' }}>|</span>

          {(
            [
              { key: 'acoustics', label: 'ACOUSTICS' },
              { key: 'egress', label: 'EGRESS A*' },
              { key: 'radiation', label: 'SPE SHIELD' },
            ] as const
          ).map((ov) => {
            const on = overlays[ov.key];
            return (
              <button
                type="button"
                key={ov.key}
                data-testid={`overlay-${ov.key}`}
                onClick={() => store.toggleOverlay(ov.key)}
                aria-pressed={on}
                className="px-2 h-7 md:h-6 border text-[10px] font-semibold cursor-pointer shrink-0"
                style={{
                  borderColor: on ? 'var(--border-strong)' : 'var(--border-hairline)',
                  backgroundColor: on ? 'var(--bg-subtle)' : 'transparent',
                  color: on ? 'var(--fg-primary)' : 'var(--fg-muted)',
                }}
              >
                {on ? '● ' : '○ '}
                {ov.label}
              </button>
            );
          })}

          {hull.decks > 1 && (
            <>
              <span style={{ color: 'var(--border-hairline)' }}>|</span>
              <div className="flex border" style={{ borderColor: 'var(--border-hairline)' }}>
                {Array.from({ length: hull.decks }).map((_, d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => store.setActiveDeck(d)}
                    className="px-2 h-7 md:h-6 text-[10px] font-bold cursor-pointer"
                    style={{
                      backgroundColor: activeDeck === d ? 'var(--accent-bg)' : 'transparent',
                      color: activeDeck === d ? 'var(--accent-fg)' : 'var(--fg-muted)',
                    }}
                  >
                    D{d + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Zoom Controls */}
        {viewMode === '2d' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex border" style={{ borderColor: 'var(--border-hairline)' }}>
              <button
                type="button"
                aria-label="Zoom Out"
                onClick={() => setZoom((z) => Math.max(0.55, Number((z - 0.15).toFixed(2))))}
                className="w-7 h-7 md:w-6 md:h-6 flex items-center justify-center border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5 md:w-3 md:h-3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="px-2 h-7 md:h-6 border-r text-[10px] cursor-pointer flex items-center gap-1"
                style={{ borderColor: 'var(--border-hairline)' }}
                title="Fit View"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{Math.round(zoom * 100)}%</span>
              </button>
              <button
                type="button"
                aria-label="Zoom In"
                onClick={() => setZoom((z) => Math.min(2.6, Number((z + 0.15).toFixed(2))))}
                className="w-7 h-7 md:w-6 md:h-6 flex items-center justify-center cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5 md:w-3 md:h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Module Touch & Desktop Action Strip */}
      {selectedModule && (
        <div
          className="px-2.5 py-1.5 border-b flex items-center justify-between gap-2 font-mono-cad text-[11px] overflow-x-auto no-scrollbar shrink-0"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-hairline)',
            touchAction: 'pan-x',
          }}
        >
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="w-2.5 h-2.5 border shrink-0"
              style={{
                backgroundColor: ZONE_SPECS[selectedModule.type].tintHex,
                borderColor: 'var(--border-strong)',
              }}
            />
            <span className="font-bold truncate max-w-[140px] sm:max-w-[200px]">
              {selectedModule.label}
            </span>
            <span style={{ color: 'var(--fg-muted)' }}>
              {selectedModule.w.toFixed(1)}×{selectedModule.h.toFixed(1)}m
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Touch-friendly W/H size steppers */}
            <div className="flex items-center border" style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-panel)' }}>
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w - 0.5, selectedModule.h, true)
                }
                className="px-2 h-8 md:h-6 border-r text-[10px] cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
                title="Decrease Width"
              >
                W-
              </button>
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w + 0.5, selectedModule.h, true)
                }
                className="px-2 h-8 md:h-6 border-r text-[10px] cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
                title="Increase Width"
              >
                W+
              </button>
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w, selectedModule.h - 0.5, true)
                }
                className="px-2 h-8 md:h-6 border-r text-[10px] cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
                title="Decrease Depth"
              >
                H-
              </button>
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w, selectedModule.h + 0.5, true)
                }
                className="px-2 h-8 md:h-6 text-[10px] cursor-pointer"
                title="Increase Depth"
              >
                H+
              </button>
            </div>

            <button
              type="button"
              data-testid="rotate-selected-btn"
              onClick={() => store.rotateModule(selectedModule.id)}
              title="Rotate 90° [R]"
              className="flex items-center gap-1 px-2.5 h-8 md:h-6 border text-[10px] font-semibold cursor-pointer"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-panel)',
              }}
            >
              <RotateCw className="w-3 h-3" />
              <span>90°</span>
            </button>

            <button
              type="button"
              data-testid="delete-selected-btn"
              onClick={() => store.deleteModule(selectedModule.id)}
              title="Delete Module [Del]"
              aria-label="Delete Selected Module"
              className="flex items-center gap-1 px-2.5 h-8 md:h-6 border text-[10px] font-semibold text-rose-500 cursor-pointer"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-panel)',
              }}
            >
              <Trash2 className="w-3.5 h-3.5 md:w-3 md:h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport Body */}
      <div className="flex-1 min-h-0 relative">
        {viewMode === 'iso' ? (
          <WireframeIsoView />
        ) : (
          <svg
            ref={svgRef}
            data-testid="blueprint-svg"
            viewBox={viewBox}
            className="w-full h-full cursor-crosshair"
            style={{ touchAction: 'none' }}
            onWheel={(e) => {
              e.preventDefault();
              setZoom((z) =>
                Math.max(0.55, Math.min(2.6, Number((z * (e.deltaY < 0 ? 1.08 : 0.92)).toFixed(2))))
              );
            }}
            onPointerDown={handleSvgPointerDown}
            onPointerMove={handleSvgPointerMove}
            onPointerUp={(e) => endPointerGesture(e.pointerId)}
            onPointerCancel={(e) => endPointerGesture(e.pointerId)}
            onLostPointerCapture={(e) => endPointerGesture(e.pointerId)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <defs>
              <pattern
                id="sw4-grid-minor"
                width={PX_PER_M * GRID_STEP_M}
                height={PX_PER_M * GRID_STEP_M}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={`M ${PX_PER_M * GRID_STEP_M} 0 L 0 0 0 ${PX_PER_M * GRID_STEP_M}`}
                  fill="none"
                  stroke="var(--grid-minor)"
                  strokeWidth="0.7"
                />
              </pattern>
              <pattern
                id="sw4-grid-major"
                width={PX_PER_M}
                height={PX_PER_M}
                patternUnits="userSpaceOnUse"
              >
                <rect width={PX_PER_M} height={PX_PER_M} fill="url(#sw4-grid-minor)" />
                <path
                  d={`M ${PX_PER_M} 0 L 0 0 0 ${PX_PER_M}`}
                  fill="none"
                  stroke="var(--grid-major)"
                  strokeWidth="1"
                />
              </pattern>
              <pattern
                id="sw4-water-hatch"
                width="8"
                height="8"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="8"
                  stroke="#0ea5e9"
                  strokeWidth="1.5"
                  strokeOpacity="0.35"
                />
              </pattern>
              <pattern
                id="sw4-collision-hatch"
                width="8"
                height="8"
                patternTransform="rotate(-45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="8"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeOpacity="0.45"
                />
              </pattern>
            </defs>

            {/* Infinite Grid Backdrop */}
            <rect
              x={-vbW}
              y={-vbH}
              width={vbW * 3}
              height={vbH * 3}
              fill="url(#sw4-grid-major)"
            />

            {/* Pressure Hull Structural Envelope */}
            {hull.type === 'dome' ? (
              <g>
                <circle
                  cx={toPxX(hull.widthM / 2)}
                  cy={toPxY(hull.depthM / 2)}
                  r={(Math.min(hull.widthM, hull.depthM) / 2) * PX_PER_M}
                  fill="var(--bg-panel)"
                  fillOpacity="0.55"
                  stroke="var(--border-strong)"
                  strokeWidth="2"
                />
                <circle
                  cx={toPxX(hull.widthM / 2)}
                  cy={toPxY(hull.depthM / 2)}
                  r={(Math.min(hull.widthM, hull.depthM) / 2) * PX_PER_M + 5}
                  fill="none"
                  stroke="var(--fg-muted)"
                  strokeWidth="0.8"
                  strokeDasharray="6 4"
                />
              </g>
            ) : (
              <g>
                <rect
                  x={toPxX(0) - 5}
                  y={toPxY(0) - 5}
                  width={hull.widthM * PX_PER_M + 10}
                  height={hull.depthM * PX_PER_M + 10}
                  fill="none"
                  stroke="var(--fg-muted)"
                  strokeWidth="0.8"
                  strokeDasharray="6 4"
                />
                <rect
                  x={toPxX(0)}
                  y={toPxY(0)}
                  width={hull.widthM * PX_PER_M}
                  height={hull.depthM * PX_PER_M}
                  fill="var(--bg-panel)"
                  fillOpacity="0.55"
                  stroke="var(--border-strong)"
                  strokeWidth="2"
                />
              </g>
            )}

            {/* Swiss Blueprint Coordinate Rulers */}
            <g className="font-mono-cad" fill="var(--fg-muted)" fontSize="9.5">
              {Array.from({ length: Math.floor(hull.widthM) + 1 }).map((_, m) => (
                <text key={`x-${m}`} x={toPxX(m)} y={toPxY(0) - 10} textAnchor="middle">
                  {m}m
                </text>
              ))}
              {Array.from({ length: Math.floor(hull.depthM) + 1 }).map((_, m) => (
                <text key={`y-${m}`} x={toPxX(0) - 10} y={toPxY(m) + 3} textAnchor="end">
                  {m}m
                </text>
              ))}
            </g>

            {/* OVERLAY 1: Acoustic Heatmap */}
            {overlays.acoustics && (
              <g pointerEvents="none">
                {deckAcousticCells.map((cell, idx) => (
                  <rect
                    key={idx}
                    x={toPxX(cell.x - GRID_STEP_M / 2)}
                    y={toPxY(cell.y - GRID_STEP_M / 2)}
                    width={GRID_STEP_M * PX_PER_M}
                    height={GRID_STEP_M * PX_PER_M}
                    fill={acousticColor(cell.dba)}
                  />
                ))}
              </g>
            )}

            {/* OVERLAY 2: Radiation Shielding Buffer Perimeter */}
            {overlays.radiation && (
              <g pointerEvents="none">
                {deckModules
                  .filter((m) => m.type === 'sleep')
                  .map((slp) => {
                    const shieldOk =
                      evaluation.adjacency.shieldedSleepPerimeterPct >=
                      evaluation.adjacency.requiredShieldPct;
                    return (
                      <g key={`rad-${slp.id}`}>
                        <rect
                          x={toPxX(slp.x) - 8}
                          y={toPxY(slp.y) - 8}
                          width={slp.w * PX_PER_M + 16}
                          height={slp.h * PX_PER_M + 16}
                          fill="none"
                          stroke={shieldOk ? '#0ea5e9' : '#ef4444'}
                          strokeWidth={mission.solarFlareSim ? '2.2' : '1.4'}
                          strokeDasharray="5 3"
                        />
                        <text
                          x={toPxX(slp.x + slp.w / 2)}
                          y={toPxY(slp.y) - 11}
                          textAnchor="middle"
                          fill={shieldOk ? '#0ea5e9' : '#ef4444'}
                          fontSize="9"
                          fontWeight="700"
                          className="font-mono-cad"
                        >
                          SPE SHIELD: {evaluation.adjacency.shieldedSleepPerimeterPct}%
                        </text>
                      </g>
                    );
                  })}
              </g>
            )}

            {/* Placed Zone Modules */}
            {deckModules.map((mod) => {
              const spec = ZONE_SPECS[mod.type];
              const isSel = selectedModuleId === mod.id;
              const isHi = highlightedModuleIds.includes(mod.id);
              const isColliding = overlapSet.has(mod.id);
              const isFail = failModuleSet.has(mod.id);

              const px = toPxX(mod.x);
              const py = toPxY(mod.y);
              const pw = mod.w * PX_PER_M;
              const ph = mod.h * PX_PER_M;

              const borderCol =
                isColliding || isFail
                  ? '#ef4444'
                  : isSel || isHi
                    ? 'var(--border-strong)'
                    : spec.tintHex;

              return (
                <g
                  key={mod.id}
                  data-testid={`module-${mod.id}`}
                  transform={`translate(${px}, ${py})`}
                  className={`cursor-move ${animateZones ? 'zone-transition' : ''}`}
                  onPointerDown={(e) => {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    e.stopPropagation();
                    activePointersRef.current.set(e.clientX ? e.pointerId : 0, {
                      x: e.clientX,
                      y: e.clientY,
                    });
                    svgRef.current?.setPointerCapture?.(e.pointerId);
                    store.selectModule(mod.id);
                    const pt = pointerToMeters(e.clientX, e.clientY);
                    setDragState({
                      kind: 'move',
                      pointerId: e.pointerId,
                      id: mod.id,
                      offX: pt.x - mod.x,
                      offY: pt.y - mod.y,
                      recorded: false,
                    });
                  }}
                >
                  <rect
                    x={0}
                    y={0}
                    width={pw}
                    height={ph}
                    fill={spec.tintHex}
                    fillOpacity={isSel ? 0.24 : 0.14}
                    stroke={borderCol}
                    strokeWidth={isSel || isHi ? 2.2 : isColliding || isFail ? 1.8 : 1.1}
                  />

                  {mod.type === 'storage' && overlays.radiation && (
                    <rect
                      x={0}
                      y={0}
                      width={pw}
                      height={ph}
                      fill="url(#sw4-water-hatch)"
                      pointerEvents="none"
                    />
                  )}

                  {isColliding && (
                    <rect
                      x={0}
                      y={0}
                      width={pw}
                      height={ph}
                      fill="url(#sw4-collision-hatch)"
                      pointerEvents="none"
                    />
                  )}

                  {/* Technical Code Tag */}
                  <rect x={0} y={0} width={Math.min(pw, 34)} height={14} fill={borderCol} />
                  <text
                    x={4}
                    y={10.5}
                    fill="#ffffff"
                    fontSize="8.5"
                    fontWeight="700"
                    className="font-mono-cad"
                    pointerEvents="none"
                  >
                    {spec.code}
                  </text>

                  {/* Center Label + Metric */}
                  <text
                    x={pw / 2}
                    y={ph / 2 - 2}
                    textAnchor="middle"
                    fill="var(--fg-primary)"
                    fontSize={pw < 85 ? '9.5' : '11'}
                    fontWeight="600"
                    pointerEvents="none"
                  >
                    {pw < 85
                      ? spec.code
                      : mod.label.length > 18
                        ? `${mod.label.slice(0, 16)}…`
                        : mod.label}
                  </text>
                  <text
                    x={pw / 2}
                    y={ph / 2 + 12}
                    textAnchor="middle"
                    fill="var(--fg-secondary)"
                    fontSize="9"
                    className="font-mono-cad"
                    pointerEvents="none"
                  >
                    {mod.w.toFixed(1)}×{mod.h.toFixed(1)}m ({(mod.w * mod.h).toFixed(1)}m²)
                  </text>

                  {/* SE Corner Resize Handle + Generous Touch Hit Pad */}
                  <g
                    className="cursor-nwse-resize"
                    onPointerDown={(e) => {
                      if (e.pointerType === 'mouse' && e.button !== 0) return;
                      e.stopPropagation();
                      svgRef.current?.setPointerCapture?.(e.pointerId);
                      store.selectModule(mod.id);
                      const pt = pointerToMeters(e.clientX, e.clientY);
                      setDragState({
                        kind: 'resize',
                        pointerId: e.pointerId,
                        id: mod.id,
                        startX: pt.x,
                        startY: pt.y,
                        origW: mod.w,
                        origH: mod.h,
                        recorded: false,
                      });
                    }}
                  >
                    <rect
                      x={pw - 26}
                      y={ph - 26}
                      width={26}
                      height={26}
                      fill="transparent"
                    />
                    <rect
                      x={pw - 11}
                      y={ph - 11}
                      width={11}
                      height={11}
                      fill={isSel ? 'var(--border-strong)' : spec.tintHex}
                      fillOpacity={isSel ? 0.95 : 0.7}
                    />
                  </g>
                </g>
              );
            })}

            {/* OVERLAY 3: Emergency Egress A* Paths */}
            {overlays.egress && (
              <g pointerEvents="none">
                {deckRoutes.map((route) => {
                  const pts = route.points
                    .map((p) => `${toPxX(p.x).toFixed(1)},${toPxY(p.y).toFixed(1)}`)
                    .join(' ');
                  const endPt = route.points[0];
                  return (
                    <g key={`eg-${route.fromModuleId}`}>
                      <polyline
                        points={pts}
                        fill="none"
                        stroke={route.valid ? '#10b981' : '#ef4444'}
                        strokeWidth={route.valid ? '2.0' : '2.2'}
                        strokeDasharray={route.valid ? '5 3' : '3 3'}
                        strokeOpacity="0.9"
                      />
                      {!route.valid && endPt && (
                        <g transform={`translate(${toPxX(endPt.x)}, ${toPxY(endPt.y)})`}>
                          <circle r="7" fill="#ef4444" />
                          <text
                            y="3"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="800"
                            className="font-mono-cad"
                          >
                            ×
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        )}

        {/* Empty Hull State CTA */}
        {modules.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="pointer-events-auto max-w-xs w-full p-4 border text-center space-y-3"
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderColor: 'var(--border-strong)',
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wider">
                Empty Habitat Floorplan
              </div>
              <p className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                Place functional bays from the Zone Palette or load a mission preset to run multi-agency checks.
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => store.addModule('sleep')}
                  className="px-3 min-h-[38px] border font-mono-cad text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  style={{ borderColor: 'var(--border-hairline)' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  SLEEP BAY
                </button>
                <button
                  type="button"
                  onClick={() => store.loadPreset('nasa-lunar-4crew')}
                  className="px-3 min-h-[38px] border font-mono-cad text-[11px] font-bold cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent-bg)',
                    color: 'var(--accent-fg)',
                    borderColor: 'var(--border-strong)',
                  }}
                >
                  NASA PRESET
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Floating Quick Action Bar (Auto-Optimize + Add Zone shortcut on phones) */}
        {modules.length > 0 && (
          <div className="md:hidden absolute bottom-10 right-2.5 z-10 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => store.setMobilePanel('build')}
              className="px-3 min-h-[40px] border font-mono-cad text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderColor: 'var(--border-strong)',
                color: 'var(--fg-primary)',
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              ZONE
            </button>
            <button
              type="button"
              onClick={store.runAutoOptimize}
              className="px-3 min-h-[40px] border font-mono-cad text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-bg)',
                color: 'var(--accent-fg)',
                borderColor: 'var(--border-strong)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              OPTIMIZE
            </button>
          </div>
        )}

        {/* Bottom Telemetry Status Strip */}
        <div
          className="absolute bottom-2 left-2.5 right-2.5 pointer-events-none flex items-center justify-between gap-2 font-mono-cad text-[10px]"
          style={{ color: 'var(--fg-muted)' }}
        >
          <span
            className="px-2 py-0.5 border truncate"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            DECK 0{activeDeck + 1}/{hull.decks} · {evaluation.volume.occupiedFloorAreaM2}/
            {evaluation.volume.totalHullFloorAreaM2}m² ({evaluation.volume.volumetricEfficiencyPct}%)
          </span>
          <span
            className="hidden sm:inline-block px-2 py-0.5 border shrink-0"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            {evaluation.computeMs}ms · PINCH / SCROLL ZOOM · DRAG / [R] ROTATE
          </span>
        </div>
      </div>
    </main>
  );
};
