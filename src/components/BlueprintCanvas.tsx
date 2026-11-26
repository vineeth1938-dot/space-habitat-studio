import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
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
      startClientX: number;
      startClientY: number;
      panX: number;
      panY: number;
      moved: boolean;
    }
  | {
      kind: 'move';
      pointerId: number;
      id: string;
      startClientX: number;
      startClientY: number;
      offX: number;
      offY: number;
      recorded: boolean;
    }
  | {
      kind: 'resize';
      pointerId: number;
      id: string;
      startClientX: number;
      startClientY: number;
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
  const dragRef = useRef<DragInteraction | null>(null);
  const activePointersRef = useRef<Map<number, { x: number; y: number; ts: number }>>(new Map());
  const pinchPrevDistRef = useRef<number | null>(null);

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

  const pointerToMeters = (clientX: number, clientY: number, curZoom = zoom, curPan = pan) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const curVbW = vbW / curZoom;
    const curVbH = vbH / curZoom;
    const scale = Math.max(curVbW / Math.max(1, rect.width), curVbH / Math.max(1, rect.height));
    const renderedW = rect.width * scale;
    const renderedH = rect.height * scale;
    const vbMinX = (vbW - curVbW) / 2 - curPan.x;
    const vbMinY = (vbH - curVbH) / 2 - curPan.y;
    const originX = vbMinX - (renderedW - curVbW) / 2;
    const originY = vbMinY - (renderedH - curVbH) / 2;

    const sx = originX + (clientX - rect.left) * scale;
    const sy = originY + (clientY - rect.top) * scale;
    return {
      x: sx / PX_PER_M - PAD_M,
      y: sy / PX_PER_M - PAD_M,
    };
  };

  // Global window pointerup / pointercancel / blur listener guarantees ZERO stuck touches!
  useEffect(() => {
    const onGlobalPointerUp = (e: PointerEvent) => {
      activePointersRef.current.delete(e.pointerId);
      if (activePointersRef.current.size < 2) {
        pinchPrevDistRef.current = null;
      }
      if (dragRef.current && dragRef.current.pointerId === e.pointerId) {
        // If user tapped background without dragging, deselect active module
        if (dragRef.current.kind === 'pan' && !dragRef.current.moved) {
          useCadStore.getState().selectModule(null);
        }
        dragRef.current = null;
      }
    };

    const resetAll = () => {
      activePointersRef.current.clear();
      pinchPrevDistRef.current = null;
      dragRef.current = null;
    };

    window.addEventListener('pointerup', onGlobalPointerUp);
    window.addEventListener('pointercancel', resetAll);
    window.addEventListener('blur', resetAll);
    return () => {
      window.removeEventListener('pointerup', onGlobalPointerUp);
      window.removeEventListener('pointercancel', resetAll);
      window.removeEventListener('blur', resetAll);
    };
  }, []);

  const purgeStalePointers = () => {
    const now = Date.now();
    for (const [pid, data] of activePointersRef.current.entries()) {
      if (now - data.ts > 4000) {
        activePointersRef.current.delete(pid);
      }
    }
  };

  const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    purgeStalePointers();
    activePointersRef.current.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY,
      ts: Date.now(),
    });

    if (activePointersRef.current.size >= 2) {
      const pts = Array.from(activePointersRef.current.values());
      pinchPrevDistRef.current = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      dragRef.current = null;
      return;
    }

    dragRef.current = {
      kind: 'pan',
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      panX: pan.x,
      panY: pan.y,
      moved: false,
    };
  };

  const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
        ts: Date.now(),
      });
    }

    // Two-finger pinch-to-zoom
    if (activePointersRef.current.size >= 2) {
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      if (pinchPrevDistRef.current && pinchPrevDistRef.current > 12 && dist > 12) {
        const ratio = dist / pinchPrevDistRef.current;
        setZoom((z) => Math.max(0.55, Math.min(2.5, Number((z * ratio).toFixed(2)))));
      }
      pinchPrevDistRef.current = dist;
      return;
    }

    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;

    const pixelMoved = Math.hypot(
      e.clientX - drag.startClientX,
      e.clientY - drag.startClientY
    );
    // 4px touch slop guard prevents micro-jitter on finger tap from misfiring drags
    if (pixelMoved < 4 && (drag.kind === 'pan' ? !drag.moved : !drag.recorded)) {
      return;
    }

    if (drag.kind === 'pan') {
      drag.moved = true;
      setPan({
        x: drag.panX + (e.clientX - drag.startClientX) / zoom,
        y: drag.panY + (e.clientY - drag.startClientY) / zoom,
      });
      return;
    }

    const pt = pointerToMeters(e.clientX, e.clientY);
    if (drag.kind === 'move') {
      store.moveModule(
        drag.id,
        snapGrid(pt.x - drag.offX),
        snapGrid(pt.y - drag.offY),
        !drag.recorded
      );
      drag.recorded = true;
    } else if (drag.kind === 'resize') {
      store.resizeModule(
        drag.id,
        drag.origW + (pt.x - drag.startX),
        drag.origH + (pt.y - drag.startY),
        !drag.recorded
      );
      drag.recorded = true;
    }
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

  const failCount = evaluation.issues.filter((i) => i.severity === 'FAIL').length;

  const curVbW = vbW / zoom;
  const curVbH = vbH / zoom;
  const viewBox = `${(vbW - curVbW) / 2 - pan.x} ${(vbH - curVbH) / 2 - pan.y} ${curVbW} ${curVbH}`;

  return (
    <main
      className="flex-1 h-full flex flex-col min-w-0 min-h-0 overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--fg-primary)' }}
    >
      {/* Top Viewport & Layer Bar */}
      <div
        className="min-h-[44px] md:h-10 shrink-0 px-2.5 md:px-3 border-b flex items-center justify-between gap-2 text-xs overflow-x-auto no-scrollbar"
        style={{
          backgroundColor: 'var(--bg-panel)',
          borderColor: 'var(--border-hairline)',
          touchAction: 'pan-x',
        }}
      >
        {/* View Mode + Layer Toggles */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className="flex rounded-md overflow-hidden border"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <button
              type="button"
              data-testid="view-2d-btn"
              onClick={() => store.setViewMode('2d')}
              className="flex items-center gap-1 px-2.5 h-8 md:h-7 text-[11px] font-semibold border-r cursor-pointer"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: viewMode === '2d' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === '2d' ? '#ffffff' : 'var(--fg-secondary)',
              }}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>2D</span>
              <span className="hidden sm:inline">Floorplan</span>
            </button>
            <button
              type="button"
              data-testid="view-iso-btn"
              onClick={() => store.setViewMode('iso')}
              className="flex items-center gap-1 px-2.5 h-8 md:h-7 text-[11px] font-semibold cursor-pointer"
              style={{
                backgroundColor: viewMode === 'iso' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'iso' ? '#ffffff' : 'var(--fg-secondary)',
              }}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D</span>
              <span className="hidden sm:inline">Wireframe</span>
            </button>
          </div>

          {(
            [
              { key: 'acoustics', label: 'Noise Map' },
              { key: 'egress', label: 'Escape Paths' },
              { key: 'radiation', label: 'Water Shield' },
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
                className="px-2.5 h-8 md:h-7 rounded-md border text-[11px] font-medium cursor-pointer shrink-0 transition-colors"
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
            <div
              className="flex rounded-md overflow-hidden border"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              {Array.from({ length: hull.decks }).map((_, d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => store.setActiveDeck(d)}
                  className="px-2.5 h-8 md:h-7 font-mono-cad text-[11px] font-bold cursor-pointer"
                  style={{
                    backgroundColor: activeDeck === d ? 'var(--accent-primary)' : 'transparent',
                    color: activeDeck === d ? '#ffffff' : 'var(--fg-muted)',
                  }}
                >
                  Deck {d + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        {viewMode === '2d' && (
          <div className="flex items-center gap-1 shrink-0 font-mono-cad">
            <div
              className="flex rounded-md overflow-hidden border"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <button
                type="button"
                aria-label="Zoom Out"
                onClick={() => setZoom((z) => Math.max(0.55, Number((z - 0.15).toFixed(2))))}
                className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="px-2 h-8 md:h-7 border-r text-[11px] cursor-pointer flex items-center gap-1"
                style={{ borderColor: 'var(--border-hairline)' }}
                title="Reset Zoom"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{Math.round(zoom * 100)}%</span>
              </button>
              <button
                type="button"
                aria-label="Zoom In"
                onClick={() => setZoom((z) => Math.min(2.5, Number((z + 0.15).toFixed(2))))}
                className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Module Touch & Precision Control Bar */}
      {selectedModule && (
        <div
          className="px-2.5 py-1.5 border-b flex items-center justify-between gap-2 text-xs overflow-x-auto no-scrollbar shrink-0"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-hairline)',
            touchAction: 'pan-x',
          }}
        >
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: ZONE_SPECS[selectedModule.type].tintHex }}
            />
            <span className="font-bold truncate max-w-[130px] sm:max-w-[200px]">
              {selectedModule.label}
            </span>
            <span className="font-mono-cad text-[11px]" style={{ color: 'var(--fg-muted)' }}>
              {selectedModule.w.toFixed(1)}×{selectedModule.h.toFixed(1)}m
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 font-mono-cad">
            {/* Touch Precision Nudge Arrows */}
            <div
              className="flex rounded-md overflow-hidden border"
              style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-panel)' }}
            >
              <button
                type="button"
                aria-label="Move Left"
                onClick={() => store.nudgeSelected(-0.5, 0)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Move Up"
                onClick={() => store.nudgeSelected(0, -0.5)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Move Down"
                onClick={() => store.nudgeSelected(0, 0.5)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Move Right"
                onClick={() => store.nudgeSelected(0.5, 0)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Size Steppers */}
            <div
              className="flex rounded-md overflow-hidden border text-[11px]"
              style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-panel)' }}
            >
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w - 0.5, selectedModule.h, true)
                }
                className="px-2 h-9 md:h-7 border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                W-
              </button>
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w + 0.5, selectedModule.h, true)
                }
                className="px-2 h-9 md:h-7 border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                W+
              </button>
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w, selectedModule.h - 0.5, true)
                }
                className="px-2 h-9 md:h-7 border-r cursor-pointer"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                H-
              </button>
              <button
                type="button"
                onClick={() =>
                  store.resizeModule(selectedModule.id, selectedModule.w, selectedModule.h + 0.5, true)
                }
                className="px-2 h-9 md:h-7 cursor-pointer"
              >
                H+
              </button>
            </div>

            <button
              type="button"
              data-testid="rotate-selected-btn"
              onClick={() => store.rotateModule(selectedModule.id)}
              title="Rotate 90° [R]"
              className="flex items-center gap-1 px-2.5 h-9 md:h-7 rounded-md border text-[11px] font-semibold cursor-pointer"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-panel)',
              }}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>90°</span>
            </button>

            <button
              type="button"
              data-testid="delete-selected-btn"
              onClick={() => store.deleteModule(selectedModule.id)}
              aria-label="Delete Selected Module"
              className="w-9 h-9 md:w-7 md:h-7 rounded-md border flex items-center justify-center text-rose-500 cursor-pointer"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-panel)',
              }}
            >
              <Trash2 className="w-4 h-4 md:w-3.5 md:h-3.5" />
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
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'none' }}
            onWheel={(e) => {
              e.preventDefault();
              setZoom((z) =>
                Math.max(0.55, Math.min(2.5, Number((z * (e.deltaY < 0 ? 1.08 : 0.92)).toFixed(2))))
              );
            }}
            onPointerDown={handleSvgPointerDown}
            onPointerMove={handleSvgPointerMove}
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

            {/* Grid Backdrop */}
            <rect
              x={-vbW}
              y={-vbH}
              width={vbW * 3}
              height={vbH * 3}
              fill="url(#sw4-grid-major)"
            />

            {/* Pressure Hull */}
            {hull.type === 'dome' ? (
              <g>
                <circle
                  cx={toPxX(hull.widthM / 2)}
                  cy={toPxY(hull.depthM / 2)}
                  r={(Math.min(hull.widthM, hull.depthM) / 2) * PX_PER_M}
                  fill="var(--bg-panel)"
                  fillOpacity="0.72"
                  stroke="var(--border-strong)"
                  strokeWidth="2.2"
                />
                <circle
                  cx={toPxX(hull.widthM / 2)}
                  cy={toPxY(hull.depthM / 2)}
                  r={(Math.min(hull.widthM, hull.depthM) / 2) * PX_PER_M + 6}
                  fill="none"
                  stroke="var(--fg-muted)"
                  strokeWidth="0.9"
                  strokeDasharray="6 4"
                />
              </g>
            ) : (
              <g>
                <rect
                  x={toPxX(0) - 6}
                  y={toPxY(0) - 6}
                  width={hull.widthM * PX_PER_M + 12}
                  height={hull.depthM * PX_PER_M + 12}
                  rx="8"
                  fill="none"
                  stroke="var(--fg-muted)"
                  strokeWidth="0.9"
                  strokeDasharray="6 4"
                />
                <rect
                  x={toPxX(0)}
                  y={toPxY(0)}
                  width={hull.widthM * PX_PER_M}
                  height={hull.depthM * PX_PER_M}
                  rx="4"
                  fill="var(--bg-panel)"
                  fillOpacity="0.72"
                  stroke="var(--border-strong)"
                  strokeWidth="2.2"
                />
              </g>
            )}

            {/* Meter Rulers */}
            <g className="font-mono-cad" fill="var(--fg-muted)" fontSize="9.5">
              {Array.from({ length: Math.floor(hull.widthM) + 1 }).map((_, m) => (
                <text key={`x-${m}`} x={toPxX(m)} y={toPxY(0) - 11} textAnchor="middle">
                  {m}m
                </text>
              ))}
              {Array.from({ length: Math.floor(hull.depthM) + 1 }).map((_, m) => (
                <text key={`y-${m}`} x={toPxX(0) - 11} y={toPxY(m) + 3} textAnchor="end">
                  {m}m
                </text>
              ))}
            </g>

            {/* Acoustic Noise Map */}
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

            {/* Radiation Shielding Halo */}
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
                          rx="6"
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
                          WATER SHIELD: {evaluation.adjacency.shieldedSleepPerimeterPct}%
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
                    purgeStalePointers();
                    activePointersRef.current.set(e.pointerId, {
                      x: e.clientX,
                      y: e.clientY,
                      ts: Date.now(),
                    });
                    store.selectModule(mod.id);

                    if (activePointersRef.current.size >= 2) {
                      const pts = Array.from(activePointersRef.current.values());
                      pinchPrevDistRef.current = Math.hypot(
                        pts[1].x - pts[0].x,
                        pts[1].y - pts[0].y
                      );
                      dragRef.current = null;
                      return;
                    }

                    const pt = pointerToMeters(e.clientX, e.clientY);
                    dragRef.current = {
                      kind: 'move',
                      pointerId: e.pointerId,
                      id: mod.id,
                      startClientX: e.clientX,
                      startClientY: e.clientY,
                      offX: pt.x - mod.x,
                      offY: pt.y - mod.y,
                      recorded: false,
                    };
                  }}
                >
                  <rect
                    x={0}
                    y={0}
                    width={pw}
                    height={ph}
                    rx="4"
                    fill={spec.tintHex}
                    fillOpacity={isSel ? 0.28 : 0.16}
                    stroke={borderCol}
                    strokeWidth={isSel || isHi ? 2.5 : isColliding || isFail ? 2.0 : 1.3}
                  />

                  {mod.type === 'storage' && overlays.radiation && (
                    <rect
                      x={0}
                      y={0}
                      width={pw}
                      height={ph}
                      rx="4"
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
                      rx="4"
                      fill="url(#sw4-collision-hatch)"
                      pointerEvents="none"
                    />
                  )}

                  {/* Code Pill */}
                  <rect
                    x={0}
                    y={0}
                    width={Math.min(pw, 36)}
                    height={15}
                    rx="3"
                    fill={borderCol}
                  />
                  <text
                    x={5}
                    y={11}
                    fill="#ffffff"
                    fontSize="8.5"
                    fontWeight="700"
                    className="font-mono-cad"
                    pointerEvents="none"
                  >
                    {spec.code}
                  </text>

                  {/* Friendly Module Name + Dimensions */}
                  <text
                    x={pw / 2}
                    y={ph / 2 - 1}
                    textAnchor="middle"
                    fill="var(--fg-primary)"
                    fontSize={pw < 85 ? '9.5' : '11'}
                    fontWeight="700"
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
                    y={ph / 2 + 13}
                    textAnchor="middle"
                    fill="var(--fg-secondary)"
                    fontSize="9"
                    className="font-mono-cad"
                    pointerEvents="none"
                  >
                    {mod.w.toFixed(1)}×{mod.h.toFixed(1)}m
                  </text>

                  {/* SE Corner Resize Handle + Generous 30x30 Touch Pad */}
                  <g
                    className="cursor-nwse-resize"
                    onPointerDown={(e) => {
                      if (e.pointerType === 'mouse' && e.button !== 0) return;
                      e.stopPropagation();
                      purgeStalePointers();
                      activePointersRef.current.set(e.pointerId, {
                        x: e.clientX,
                        y: e.clientY,
                        ts: Date.now(),
                      });
                      store.selectModule(mod.id);
                      const pt = pointerToMeters(e.clientX, e.clientY);
                      dragRef.current = {
                        kind: 'resize',
                        pointerId: e.pointerId,
                        id: mod.id,
                        startClientX: e.clientX,
                        startClientY: e.clientY,
                        startX: pt.x,
                        startY: pt.y,
                        origW: mod.w,
                        origH: mod.h,
                        recorded: false,
                      };
                    }}
                  >
                    <rect x={pw - 30} y={ph - 30} width={30} height={30} fill="transparent" />
                    <rect
                      x={pw - 12}
                      y={ph - 12}
                      width={12}
                      height={12}
                      rx="2"
                      fill={isSel ? 'var(--border-strong)' : spec.tintHex}
                      fillOpacity={isSel ? 0.95 : 0.75}
                    />
                  </g>
                </g>
              );
            })}

            {/* Escape Paths Overlay */}
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
                        strokeWidth={route.valid ? '2.2' : '2.4'}
                        strokeDasharray={route.valid ? '6 4' : '3 3'}
                        strokeOpacity="0.92"
                      />
                      {!route.valid && endPt && (
                        <g transform={`translate(${toPxX(endPt.x)}, ${toPxY(endPt.y)})`}>
                          <circle r="7.5" fill="#ef4444" />
                          <text
                            y="3"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9.5"
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

        {/* Friendly Guided Prompt Banner when Hazards Exist */}
        {failCount > 0 && modules.length > 0 && !selectedModule && viewMode === '2d' && (
          <div className="hidden sm:flex absolute top-3 left-1/2 -translate-x-1/2 z-10 items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs shadow-sm" style={{ backgroundColor: 'var(--bg-panel)', borderColor: 'rgba(239, 68, 68, 0.45)' }}>
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>
              <strong>{failCount} safety hazard{failCount > 1 ? 's' : ''}</strong> detected — drag modules to clear corridors or run Auto-Optimize.
            </span>
            <button
              type="button"
              onClick={store.runAutoOptimize}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff' }}
            >
              Auto-Optimize
            </button>
          </div>
        )}

        {/* Empty Hull State CTA */}
        {modules.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="pointer-events-auto max-w-xs w-full p-5 rounded-xl border text-center space-y-3"
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderColor: 'var(--border-strong)',
              }}
            >
              <div className="text-sm font-bold">Empty Habitat Floorplan</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                Add crew modules from the Zone Palette or load a mission preset to begin NASA / ISRO / SpaceX safety checks.
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => store.addModule('sleep')}
                  className="px-3.5 min-h-[42px] rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  style={{ borderColor: 'var(--border-hairline)' }}
                >
                  <Plus className="w-4 h-4" />
                  Add Sleep
                </button>
                <button
                  type="button"
                  onClick={() => store.loadPreset('nasa-lunar-4crew')}
                  className="px-3.5 min-h-[42px] rounded-lg text-xs font-bold cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                  }}
                >
                  Load NASA Hab
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Floating Action Pill (+ Add Zone & Auto-Optimize) */}
        {modules.length > 0 && (
          <div className="md:hidden absolute bottom-10 right-3 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => store.setMobilePanel('build')}
              className="px-3.5 h-11 rounded-full border text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--fg-primary)',
              }}
            >
              <Plus className="w-4 h-4" />
              Add Zone
            </button>
            <button
              type="button"
              onClick={store.runAutoOptimize}
              className="px-4 h-11 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
              }}
            >
              <Sparkles className="w-4 h-4" />
              Auto-Optimize
            </button>
          </div>
        )}

        {/* Bottom Telemetry Status Strip */}
        <div
          className="absolute bottom-2 left-2.5 right-2.5 pointer-events-none flex items-center justify-between gap-2 font-mono-cad text-[10px]"
          style={{ color: 'var(--fg-muted)' }}
        >
          <span
            className="px-2.5 py-0.5 rounded border truncate"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            Deck {activeDeck + 1}/{hull.decks} · Floor {evaluation.volume.occupiedFloorAreaM2}/
            {evaluation.volume.totalHullFloorAreaM2}m² ({evaluation.volume.volumetricEfficiencyPct}%)
          </span>
          <span
            className="hidden sm:inline-block px-2.5 py-0.5 rounded border shrink-0"
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            Tap module to inspect · Drag to move · Pinch/Scroll to zoom
          </span>
        </div>
      </div>
    </main>
  );
};
