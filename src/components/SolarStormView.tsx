import React, { useRef, useState } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Flame,
  Layers,
  Radio,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { TelemetryPoint } from '../types/habitat';
import { useHabitatStore } from '../store/habitatStore';

interface LogSparklineProps {
  title: string;
  unit: string;
  series: TelemetryPoint[];
  minLog: number;
  maxLog: number;
  color: string;
  formatValue: (v: number) => string;
  thresholds: Array<{ logVal: number; label: string; color: string }>;
}

const LogSparkline: React.FC<LogSparklineProps> = ({
  title,
  unit,
  series,
  minLog,
  maxLog,
  color,
  formatValue,
  thresholds,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const W = 440;
  const H = 134;
  const padL = 42;
  const padR = 14;
  const padT = 12;
  const padB = 18;

  const toX = (idx: number) =>
    series.length <= 1
      ? (padL + (W - padR)) / 2
      : padL + (idx / (series.length - 1)) * (W - padL - padR);

  const toY = (val: number) => {
    const lv = Math.log10(Math.max(Math.pow(10, minLog), val));
    const norm = Math.max(0, Math.min(1, (lv - minLog) / (maxLog - minLog)));
    return H - padB - norm * (H - padT - padB);
  };

  const pts = series.map((pt, idx) => `${toX(idx).toFixed(1)},${toY(pt.value).toFixed(1)}`);

  const areaPath =
    pts.length > 1
      ? `M ${pts[0]} L ${pts.join(' L ')} L ${(W - padR).toFixed(1)},${H - padB} L ${padL},${H - padB} Z`
      : '';

  const handlePointerMove = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (!svg || series.length === 0) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width <= 0) return;
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const normX = Math.max(0, Math.min(1, (svgX - padL) / Math.max(1, W - padL - padR)));
    const idx = Math.round(normX * (series.length - 1));
    setHoverIdx(idx);
  };

  const inspectedPt = hoverIdx !== null && series[hoverIdx] ? series[hoverIdx] : null;
  const dotIdx = inspectedPt ? hoverIdx! : Math.max(0, series.length - 1);

  return (
    <div className="bg-[var(--surface-panel)] border border-[var(--border-subtle)] rounded-xl p-3">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-semibold text-[var(--text-primary)]">{title}</span>
        <span className="text-[11px] font-mono-telemetry text-[var(--text-secondary)]">
          {inspectedPt
            ? `${formatValue(inspectedPt.value)} @ ${new Date(inspectedPt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : unit}
        </span>
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIdx(null)}
        className="w-full h-32 overflow-visible cursor-crosshair"
      >
        {thresholds.map((t) => {
          const y = toY(Math.pow(10, t.logVal));
          return (
            <g key={t.label}>
              <line
                x1={padL}
                y1={y}
                x2={W - padR}
                y2={y}
                stroke={t.color}
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeOpacity="0.48"
              />
              <text
                x={padL - 6}
                y={y + 3}
                textAnchor="end"
                fill={t.color}
                fontSize="9"
                className="font-mono-telemetry"
              >
                {t.label}
              </text>
            </g>
          );
        })}

        {areaPath && <path d={areaPath} fill={color} fillOpacity="0.14" />}
        {pts.length > 1 && (
          <polyline
            points={pts.join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        )}

        {inspectedPt && (
          <line
            x1={toX(dotIdx)}
            y1={padT}
            x2={toX(dotIdx)}
            y2={H - padB}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        )}

        {series.length > 0 && (
          <circle
            cx={toX(dotIdx)}
            cy={toY(series[dotIdx].value)}
            r={inspectedPt ? '5' : '4'}
            fill={color}
            stroke="#080c14"
            strokeWidth="1.5"
          />
        )}

        <text x={padL} y={H - 3} fill="#94a3b8" fontSize="9" className="font-mono-telemetry">
          T-24h
        </text>
        <text
          x={W - padR}
          y={H - 3}
          textAnchor="end"
          fill="#94a3b8"
          fontSize="9"
          className="font-mono-telemetry"
        >
          NOW (UTC)
        </text>
      </svg>
    </div>
  );
};

export const SolarStormView: React.FC = () => {
  const {
    mission,
    weather,
    weatherLoading,
    stormStress,
    lightingMode,
    fetchLiveWeather,
    selectWeatherPreset,
    setActiveView,
  } = useHabitatStore();

  const isLive = weather.source === 'LIVE_NOAA_GOES';

  const verdictStyle =
    stormStress.verdict === 'PASS'
      ? 'border-emerald-500/45 bg-emerald-950/25 text-emerald-200'
      : stormStress.verdict === 'MARGINAL'
        ? 'border-amber-500/45 bg-amber-950/25 text-amber-200'
        : 'border-rose-500/45 bg-rose-950/25 text-rose-200';

  const dosePct = Math.min(100, (stormStress.shieldedDoseMsv / stormStress.acuteLimitMsv) * 100);
  const doseBarColor =
    stormStress.shieldedDoseMsv <= stormStress.acuteLimitMsv * 0.65
      ? 'bg-emerald-400'
      : stormStress.shieldedDoseMsv <= stormStress.acuteLimitMsv
        ? 'bg-amber-400'
        : 'bg-rose-400';

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[var(--surface-canvas)] p-4 space-y-4">
      {/* Header + Live / Preset Controls */}
      <div className="bg-[var(--surface-panel)] border border-[var(--border-subtle)] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Flame className="w-4.5 h-4.5 text-amber-400" />
            <h2 className="text-sm font-bold text-[var(--text-primary)] text-balance">
              NOAA GOES Solar-Flare Storm-Shelter Stress Test
            </h2>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold border ${
                isLive
                  ? 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40'
                  : 'bg-amber-500/15 text-amber-200 border-amber-500/40'
              }`}
            >
              <Radio className="w-3 h-3" />
              {isLive ? 'LIVE NOAA GOES' : 'SIMULATED PRESET'}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Active Flux: <span className="text-[var(--text-primary)] font-medium">{weather.label}</span> • 3D
            Lighting:{' '}
            <span className="font-mono-telemetry uppercase text-rose-300">{lightingMode}</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => fetchLiveWeather()}
            disabled={weatherLoading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-200 text-xs font-medium cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${weatherLoading ? 'animate-spin' : ''}`} />
            {weatherLoading ? 'Fetching…' : 'Fetch Live GOES'}
          </button>

          {(
            [
              { id: 'quiet_b', label: 'Quiet Sun (B)' },
              { id: 'moderate_m5', label: 'R3 / S2 Storm (M5)' },
              { id: 'extreme_x10', label: 'X10 Extreme SPE' },
            ] as const
          ).map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectWeatherPreset(preset.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                weather.presetId === preset.id
                  ? preset.id === 'extreme_x10'
                    ? 'bg-rose-500/20 text-rose-200 border-rose-500/50'
                    : preset.id === 'moderate_m5'
                      ? 'bg-amber-500/20 text-amber-200 border-amber-500/50'
                      : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50'
                  : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
              }`}
            >
              {preset.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setActiveView('studio')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-sky-300" />
            Inspect 3D Alert
          </button>
        </div>
      </div>

      {/* Unified Architectural Telemetry Strip (Replaces uniform small card boxes) */}
      <div className="bg-[var(--surface-panel)] border border-[var(--border-subtle)] rounded-xl grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-subtle)]">
        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            GOES X-Ray (0.1–0.8 nm)
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-amber-300 mt-1">
            {weather.xrayClass}
          </div>
          <div className="text-[11px] font-mono-telemetry text-[var(--text-secondary)] mt-0.5">
            {weather.xrayFluxWm2.toExponential(2)} W/m² • {weather.noaaRScale}
          </div>
        </div>

        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Protons (≥10 MeV)
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-rose-300 mt-1">
            {weather.protonFluxPfu.toLocaleString()} pfu
          </div>
          <div className="text-[11px] font-mono-telemetry text-[var(--text-secondary)] mt-0.5">
            {weather.noaaSScale}
          </div>
        </div>

        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Shelter Transit vs Window
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-cyan-300 mt-1">
            {stormStress.allCrewReachable ? `${stormStress.worstTransitSec}s` : 'BLOCKED'}
          </div>
          <div className="text-[11px] font-mono-telemetry text-[var(--text-secondary)] mt-0.5">
            Warning Window: {weather.warningWindowSec}s
          </div>
        </div>

        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
            <Droplets className="w-3 h-3 text-sky-300" />
            <span>TransHab Water-Wall</span>
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-sky-300 mt-1">
            +{stormStress.waterWallBonusGcm2} g/cm²
          </div>
          <div className="text-[11px] font-mono-telemetry text-emerald-300 mt-0.5">
            Saves {stormStress.doseReductionFromWaterWallMsv} mSv
          </div>
        </div>

        <div className="p-3 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            <span>Projected Crew Dose</span>
            <span className="font-mono-telemetry">{Math.round(dosePct)}%</span>
          </div>
          <div
            className={`text-lg font-bold font-mono-telemetry mt-1 ${
              stormStress.shieldedDoseMsv <= stormStress.acuteLimitMsv
                ? 'text-emerald-300'
                : 'text-rose-300'
            }`}
          >
            {stormStress.shieldedDoseMsv} mSv
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--surface-canvas)] overflow-hidden mt-1.5 border border-[var(--border-subtle)]">
            <div style={{ width: `${dosePct}%` }} className={`h-full ${doseBarColor}`} />
          </div>
          <div className="text-[10px] font-mono-telemetry text-[var(--text-secondary)] mt-1">
            Unshielded {stormStress.unshieldedDoseMsv} • Limit {stormStress.acuteLimitMsv} mSv
          </div>
        </div>
      </div>

      {/* Interactive Dual Log-Scale GOES Sparklines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <LogSparkline
          title="GOES Primary X-Ray Flux (24h)"
          unit="Hover to inspect W/m² (log10)"
          series={weather.xraySeries}
          minLog={-8}
          maxLog={-2.5}
          color="#f59e0b"
          formatValue={(v) => `${v.toExponential(2)} W/m²`}
          thresholds={[
            { logVal: -7, label: 'B', color: '#94a3b8' },
            { logVal: -6, label: 'C', color: '#38bdf8' },
            { logVal: -5, label: 'M', color: '#f59e0b' },
            { logVal: -4, label: 'X', color: '#f43f5e' },
          ]}
        />
        <LogSparkline
          title="GOES Integral Proton Flux ≥10 MeV (24h)"
          unit="Hover to inspect pfu (log10)"
          series={weather.protonSeries}
          minLog={-1}
          maxLog={5}
          color="#f43f5e"
          formatValue={(v) => `${v.toFixed(1)} pfu`}
          thresholds={[
            { logVal: 1, label: 'S1', color: '#38bdf8' },
            { logVal: 2, label: 'S2', color: '#f59e0b' },
            { logVal: 3, label: 'S3', color: '#fb923c' },
            { logVal: 4, label: 'S4', color: '#f43f5e' },
          ]}
        />
      </div>

      {/* Storm Shelter Survivability Verdict Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        <div className={`rounded-xl border p-4 flex flex-col justify-between ${verdictStyle}`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-telemetry uppercase tracking-wider">
              {stormStress.verdict === 'PASS' ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
              <span>Crew Survivability Verdict</span>
            </div>
            <div className="text-3xl font-black font-mono-telemetry mt-2">
              {stormStress.verdict}
            </div>
            <p className="text-xs opacity-90 mt-2 leading-relaxed text-pretty">
              Evaluating <strong>{mission.name}</strong> ({mission.crewSize} crew) under{' '}
              <strong>{weather.label}</strong> particle flux.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-[11px] font-mono-telemetry">
            <div>
              <div className="opacity-80 text-[10px]">SHELTER VOL/CREW</div>
              <div className="font-bold">{stormStress.shelterVolumePerCrewM3} m³/crew</div>
            </div>
            <div>
              <div className="opacity-80 text-[10px]">TOTAL SHIELDING</div>
              <div className="font-bold">
                {stormStress.shieldingArealDensityGcm2} g/cm² (Base {stormStress.baseShieldingGcm2})
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[var(--surface-panel)] border border-[var(--border-subtle)] rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-[var(--surface-elevated)]/60 border-b border-[var(--border-subtle)] flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
            <Activity className="w-4 h-4 text-cyan-300" />
            <span>NASA-STD-3001 [V2 6095] Storm-Shelter Verification Checklist</span>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]/75">
            {stormStress.diagnostics.map((d, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3">
                {d.severity === 'CRITICAL' ? (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : d.severity === 'WARNING' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-semibold text-[var(--text-primary)]">{d.title}</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed text-pretty">
                    {d.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
