import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ZONE_SPECS } from '../engine/constants';
import { useCadStore } from '../store/useCadStore';
import { HabitatEvaluation, MissionConfig, ZoneModule } from '../types/habitat';

interface WireframeIsoViewProps {
  missionOverride?: MissionConfig;
  modulesOverride?: ZoneModule[];
  evalOverride?: HabitatEvaluation;
}

export const WireframeIsoView: React.FC<WireframeIsoViewProps> = ({
  missionOverride,
  modulesOverride,
  evalOverride,
}) => {
  const store = useCadStore();
  const mission = missionOverride ?? store.mission;
  const modules = modulesOverride ?? store.modules;
  const evaluation = evalOverride ?? store.evaluation;

  const [azimuthDeg, setAzimuthDeg] = useState(42);
  const [pitchDeg, setPitchDeg] = useState(32);
  const [isoZoom, setIsoZoom] = useState(1);
  const [deckGapM, setDeckGapM] = useState(3.8);

  const orbitRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    az: number;
    pt: number;
  } | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchDistRef = useRef<number | null>(null);

  useEffect(() => {
    const clearAll = () => {
      orbitRef.current = null;
      pointersRef.current.clear();
      pinchDistRef.current = null;
    };
    window.addEventListener('blur', clearAll);
    return () => window.removeEventListener('blur', clearAll);
  }, []);

  const { hull } = mission;
  const scale = 34 * isoZoom;

  const radAz = (azimuthDeg * Math.PI) / 180;
  const radPt = (pitchDeg * Math.PI) / 180;
  const cosA = Math.cos(radAz);
  const sinA = Math.sin(radAz);
  const sinP = Math.sin(radPt);
  const cosP = Math.cos(radPt);

  const cx = hull.widthM / 2;
  const cy = hull.depthM / 2;
  const cz = ((hull.decks - 1) * deckGapM + hull.deckHeightM) / 2;

  const project = (x: number, y: number, z: number) => {
    const dx = x - cx;
    const dy = y - cy;
    const dz = z - cz;
    const rx = dx * cosA - dy * sinA;
    const ry = dx * sinA + dy * cosA;
    const sx = rx * scale;
    const sy = (ry * sinP - dz * cosP) * scale;
    return { x: sx, y: sy, depthKey: ry * cosP + dz * sinP };
  };

  const sortedModules = useMemo(() => {
    return [...modules].sort((a, b) => {
      const pa = project(a.x + a.w / 2, a.y + a.h / 2, a.deck * deckGapM + hull.deckHeightM / 2);
      const pb = project(b.x + b.w / 2, b.y + b.h / 2, b.deck * deckGapM + hull.deckHeightM / 2);
      return pa.depthKey - pb.depthKey;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules, azimuthDeg, pitchDeg, deckGapM, hull, isoZoom]);

  const overlapIds = new Set<string>();
  for (const [a, b] of evaluation.adjacency.overlappingPairs) {
    overlapIds.add(a);
    overlapIds.add(b);
  }

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture?.(e.pointerId);

    if (pointersRef.current.size === 1) {
      orbitRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        az: azimuthDeg,
        pt: pitchDeg,
      };
    } else if (pointersRef.current.size === 2) {
      orbitRef.current = null;
      const pts = Array.from(pointersRef.current.values());
      pinchDistRef.current = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchDistRef.current) {
      const pts = Array.from(pointersRef.current.values());
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      if (dist > 10 && pinchDistRef.current > 10) {
        const ratio = dist / pinchDistRef.current;
        pinchDistRef.current = dist;
        setIsoZoom((z) => Math.max(0.55, Math.min(2.2, Number((z * ratio).toFixed(2)))));
      }
      return;
    }

    const orb = orbitRef.current;
    if (orb && orb.pointerId === e.pointerId) {
      const nextAz = (orb.az + (e.clientX - orb.startX) * 0.45 + 360) % 360;
      const nextPt = Math.max(15, Math.min(68, orb.pt + (e.clientY - orb.startY) * 0.25));
      setAzimuthDeg(Math.round(nextAz));
      setPitchDeg(Math.round(nextPt));
    }
  };

  const endPointer = (pointerId: number) => {
    pointersRef.current.delete(pointerId);
    if (orbitRef.current?.pointerId === pointerId) {
      orbitRef.current = null;
    }
    if (pointersRef.current.size < 2) {
      pinchDistRef.current = null;
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{ backgroundColor: 'var(--bg-canvas)' }}
    >
      {/* Floating Axonometric Angle Controls */}
      <div
        className="absolute top-2 left-2 right-2 sm:right-auto z-10 flex items-center gap-1.5 px-2 py-1 border font-mono-cad text-[10px] overflow-x-auto no-scrollbar"
        style={{
          backgroundColor: 'var(--bg-panel)',
          borderColor: 'var(--border-hairline)',
          color: 'var(--fg-secondary)',
          touchAction: 'pan-x',
        }}
      >
        <span className="shrink-0">AXONOMETRIC WIREFRAME</span>
        <span style={{ color: 'var(--fg-muted)' }}>|</span>
        {[42, 132, 222, 312].map((ang) => (
          <button
            type="button"
            key={ang}
            onClick={() => setAzimuthDeg(ang)}
            className="px-2 min-h-[30px] md:min-h-[22px] border cursor-pointer shrink-0"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: Math.abs(azimuthDeg - ang) < 5 ? 'var(--accent-bg)' : 'transparent',
              color: Math.abs(azimuthDeg - ang) < 5 ? 'var(--accent-fg)' : 'var(--fg-muted)',
            }}
          >
            {ang}°
          </button>
        ))}
        {hull.decks > 1 && (
          <>
            <span style={{ color: 'var(--border-hairline)' }}>|</span>
            <button
              type="button"
              onClick={() => setDeckGapM((g) => (g > 4 ? 3.2 : 5.4))}
              className="px-2 min-h-[30px] md:min-h-[22px] border cursor-pointer shrink-0"
              style={{ borderColor: 'var(--border-hairline)', color: 'var(--fg-primary)' }}
            >
              {deckGapM > 4 ? 'COMPACT DECKS' : 'EXPLODE DECKS'}
            </button>
          </>
        )}
      </div>

      <svg
        viewBox="-420 -270 840 540"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onWheel={(e) => {
          e.preventDefault();
          setIsoZoom((z) =>
            Math.max(0.55, Math.min(2.2, Number((z * (e.deltaY < 0 ? 1.08 : 0.92)).toFixed(2))))
          );
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => endPointer(e.pointerId)}
        onPointerCancel={(e) => endPointer(e.pointerId)}
        onLostPointerCapture={(e) => endPointer(e.pointerId)}
      >
        {/* Deck Structural Wireframe Envelopes & 1.0m Grid Lines */}
        {Array.from({ length: hull.decks }).map((_, d) => {
          const z0 = d * deckGapM;
          const z1 = z0 + hull.deckHeightM;

          if (hull.type === 'dome') {
            const segs = 40;
            const r = Math.min(hull.widthM, hull.depthM) / 2;
            const basePts: string[] = [];
            const topPts: string[] = [];
            for (let i = 0; i <= segs; i++) {
              const th = (i / segs) * Math.PI * 2;
              const px = cx + Math.cos(th) * r;
              const py = cy + Math.sin(th) * r;
              const pb = project(px, py, z0);
              const pt = project(px, py, z0 + hull.deckHeightM * 0.85);
              basePts.push(`${pb.x.toFixed(1)},${pb.y.toFixed(1)}`);
              topPts.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);
            }
            return (
              <g key={`deck-dome-${d}`}>
                <polyline
                  points={basePts.join(' ')}
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="1.2"
                />
                <polyline
                  points={topPts.join(' ')}
                  fill="none"
                  stroke="var(--fg-muted)"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                />
              </g>
            );
          }

          const c00 = project(0, 0, z0);
          const c10 = project(hull.widthM, 0, z0);
          const c11 = project(hull.widthM, hull.depthM, z0);
          const c01 = project(0, hull.depthM, z0);

          const t00 = project(0, 0, z1);
          const t10 = project(hull.widthM, 0, z1);
          const t11 = project(hull.widthM, hull.depthM, z1);
          const t01 = project(0, hull.depthM, z1);

          return (
            <g key={`deck-wire-${d}`}>
              {Array.from({ length: Math.floor(hull.widthM) + 1 }).map((__, gx) => {
                const pA = project(gx, 0, z0);
                const pB = project(gx, hull.depthM, z0);
                return (
                  <line
                    key={`gx-${gx}`}
                    x1={pA.x}
                    y1={pA.y}
                    x2={pB.x}
                    y2={pB.y}
                    stroke="var(--grid-major)"
                    strokeWidth="0.6"
                  />
                );
              })}
              {Array.from({ length: Math.floor(hull.depthM) + 1 }).map((__, gy) => {
                const pA = project(0, gy, z0);
                const pB = project(hull.widthM, gy, z0);
                return (
                  <line
                    key={`gy-${gy}`}
                    x1={pA.x}
                    y1={pA.y}
                    x2={pB.x}
                    y2={pB.y}
                    stroke="var(--grid-major)"
                    strokeWidth="0.6"
                  />
                );
              })}

              <polygon
                points={`${c00.x},${c00.y} ${c10.x},${c10.y} ${c11.x},${c11.y} ${c01.x},${c01.y}`}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="1.2"
              />
              <polygon
                points={`${t00.x},${t00.y} ${t10.x},${t10.y} ${t11.x},${t11.y} ${t01.x},${t01.y}`}
                fill="none"
                stroke="var(--fg-muted)"
                strokeWidth="0.7"
                strokeDasharray="4 4"
              />
              {[
                [c00, t00],
                [c10, t10],
                [c11, t11],
                [c01, t01],
              ].map(([b, t], idx) => (
                <line
                  key={idx}
                  x1={b.x}
                  y1={b.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="var(--fg-muted)"
                  strokeWidth="0.7"
                  strokeDasharray="3 3"
                />
              ))}

              <text
                x={c01.x - 10}
                y={c01.y + 12}
                textAnchor="end"
                fill="var(--fg-muted)"
                fontSize="10"
                className="font-mono-cad"
              >
                DECK 0{d + 1} ({hull.deckHeightM}mZ)
              </text>
            </g>
          );
        })}

        {/* 3D Projected A* Egress Paths */}
        {store.overlays.egress &&
          evaluation.egress.routes.map((route) => {
            const z = route.deck * deckGapM + 0.08;
            const pts = route.points
              .map((pt) => {
                const p = project(pt.x, pt.y, z);
                return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
              })
              .join(' ');
            return (
              <polyline
                key={`iso-eg-${route.fromModuleId}`}
                points={pts}
                fill="none"
                stroke={route.valid ? '#10b981' : '#ef4444'}
                strokeWidth={route.valid ? '1.8' : '1.6'}
                strokeDasharray={route.valid ? 'none' : '4 3'}
              />
            );
          })}

        {/* Extruded 3D Wireframe Module Prisms */}
        {sortedModules.map((m) => {
          const spec = ZONE_SPECS[m.type];
          const z0 = m.deck * deckGapM;
          const z1 = z0 + hull.deckHeightM * 0.86;
          const isSelected = store.selectedModuleId === m.id;
          const isHighlighted = store.highlightedModuleIds.includes(m.id);
          const hasCollision =
            overlapIds.has(m.id) || evaluation.adjacency.outOfBoundsIds.includes(m.id);

          const b0 = project(m.x, m.y, z0);
          const b1 = project(m.x + m.w, m.y, z0);
          const b2 = project(m.x + m.w, m.y + m.h, z0);
          const b3 = project(m.x, m.y + m.h, z0);

          const t0 = project(m.x, m.y, z1);
          const t1 = project(m.x + m.w, m.y, z1);
          const t2 = project(m.x + m.w, m.y + m.h, z1);
          const t3 = project(m.x, m.y + m.h, z1);

          const centerTop = project(m.x + m.w / 2, m.y + m.h / 2, z1);
          const strokeCol = hasCollision
            ? '#ef4444'
            : isSelected || isHighlighted
              ? 'var(--border-strong)'
              : spec.tintHex;

          return (
            <g
              key={m.id}
              onClick={(e) => {
                e.stopPropagation();
                store.selectModule(m.id);
              }}
              className="cursor-pointer"
            >
              <polygon
                points={`${b0.x},${b0.y} ${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y}`}
                fill={spec.tintHex}
                fillOpacity="0.14"
                stroke={strokeCol}
                strokeWidth="0.9"
              />
              {[
                [b0, t0],
                [b1, t1],
                [b2, t2],
                [b3, t3],
              ].map(([b, t], i) => (
                <line
                  key={i}
                  x1={b.x}
                  y1={b.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={strokeCol}
                  strokeWidth={isSelected ? '1.6' : '1.0'}
                />
              ))}
              <polygon
                points={`${t0.x},${t0.y} ${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y}`}
                fill={spec.tintHex}
                fillOpacity={isSelected ? '0.32' : '0.18'}
                stroke={strokeCol}
                strokeWidth={isSelected || isHighlighted ? '2.0' : '1.2'}
              />
              <text
                x={centerTop.x}
                y={centerTop.y + 3}
                textAnchor="middle"
                fill="var(--fg-primary)"
                fontSize="9.5"
                fontWeight="700"
                className="font-mono-cad"
              >
                {spec.code}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
