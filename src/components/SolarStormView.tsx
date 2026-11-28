import React from 'react';
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
  thresholds: Array<{ logVal: number; label: string; color: string }>;
}

const LogSparkline: React.FC<LogSparklineProps> = ({
  title,
  unit,
  series,
  minLog,
  maxLog,
  color,
  thresholds,
}) => {
  const W = 440;
  const H = 132;
  const padL = 42;
  const padR = 14;
  const padT = 12;
  const padB = 18;

  const toY = (val: number) => {
    const lv = Math.log10(Math.max(Math.pow(10, minLog), val));
    const norm = Math.max(0, Math.min(1, (lv - minLog) / (maxLog - minLog)));
    return H - padB - norm * (H - padT - padB);
  };

  const pts = series.map((pt, idx) => {
    const x = padL + (idx / Math.max(1, series.length - 1)) * (W - padL - padR);
    const y = toY(pt.value);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const areaPath =
    pts.length > 1
      ? `M ${pts[0]} L ${pts.join(' L ')} L ${(W - padR).toFixed(1)},${H - padB} L ${padL},${H - padB} Z`
      : '';

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-slate-200">{title}</span>
        <span className="text-[10px] font-mono-telemetry text-slate-400">{unit}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32 overflow-visible">
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
                strokeOpacity="0.45"
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

        {series.length > 0 && (
          <circle
            cx={W - padR}
            cy={toY(series[series.length - 1].value)}
            r="4"
            fill={color}
            stroke="#090D16"
            strokeWidth="1.5"
          />
        )}

        <text x={padL} y={H - 3} fill="#64748b" fontSize="9" className="font-mono-telemetry">
          T-24h
        </text>
        <text
          x={W - padR}
          y={H - 3}
          textAnchor="end"
          fill="#64748b"
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
      ? 'border-emerald-500/50 bg-emerald-950/25 text-emerald-300'
      : stormStress.verdict === 'MARGINAL'
        ? 'border-amber-500/50 bg-amber-950/25 text-amber-300'
        : 'border-rose-500/50 bg-rose-950/25 text-rose-300';

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#090D16] p-4 space-y-4">
      {/* Header + Live / Preset Controls */}
      <div className="bg-[#0D1320] border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Flame className="w-4.5 h-4.5 text-amber-400" />
            <h2 className="text-sm font-bold text-slate-100">
              NOAA GOES Solar-Flare Storm-Shelter Stress Test
            </h2>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold border ${
                isLive
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
              }`}
            >
              <Radio className="w-3 h-3" />
              {isLive ? 'LIVE NOAA GOES' : 'SIMULATED PRESET'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Active Flux: <span className="text-slate-200 font-medium">{weather.label}</span> • 3D
            Lighting: <span className="font-mono-telemetry uppercase text-rose-300">{lightingMode}</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => fetchLiveWeather()}
            disabled={weatherLoading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-200 text-xs font-medium cursor-pointer disabled:opacity-50"
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
                  : 'bg-[#111827] text-slate-300 border-slate-700/80 hover:bg-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setActiveView('studio')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Inspect 3D Alert
          </button>
        </div>
      </div>

      {/* Live Flux & Shielding KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-[#0D1320] border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">
            GOES X-Ray (0.1–0.8 nm)
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-amber-300 mt-1">
            {weather.xrayClass}
          </div>
          <div className="text-[10px] font-mono-telemetry text-slate-400 mt-0.5">
            {weather.xrayFluxWm2.toExponential(2)} W/m² • {weather.noaaRScale}
          </div>
        </div>

        <div className="bg-[#0D1320] border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">
            Protons (≥10 MeV)
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-rose-300 mt-1">
            {weather.protonFluxPfu.toLocaleString()} pfu
          </div>
          <div className="text-[10px] font-mono-telemetry text-slate-400 mt-0.5">
            {weather.noaaSScale}
          </div>
        </div>

        <div className="bg-[#0D1320] border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">
            Shelter Transit vs Window
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-cyan-300 mt-1">
            {stormStress.allCrewReachable ? `${stormStress.worstTransitSec}s` : 'BLOCKED'}
          </div>
          <div className="text-[10px] font-mono-telemetry text-slate-400 mt-0.5">
            Warning Window: {weather.warningWindowSec}s
          </div>
        </div>

        <div className="bg-[#0D1320] border border-slate-800 rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Droplets className="w-3 h-3 text-sky-400" />
            TransHab Water-Wall
          </div>
          <div className="text-lg font-bold font-mono-telemetry text-sky-300 mt-1">
            +{stormStress.waterWallBonusGcm2} g/cm²
          </div>
          <div className="text-[10px] font-mono-telemetry text-emerald-300 mt-0.5">
            Saves {stormStress.doseReductionFromWaterWallMsv} mSv
          </div>
        </div>

        <div className="bg-[#0D1320] border border-slate-800 rounded-xl p-3 col-span-2 lg:col-span-1">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">
            Projected Crew Dose
          </div>
          <div
            className={`text-lg font-bold font-mono-telemetry mt-1 ${
              stormStress.shieldedDoseMsv <= stormStress.acuteLimitMsv
                ? 'text-emerald-300'
                : 'text-rose-400'
            }`}
          >
            {stormStress.shieldedDoseMsv} mSv
          </div>
          <div className="text-[10px] font-mono-telemetry text-slate-400 mt-0.5">
            Unshielded {stormStress.unshieldedDoseMsv} • Limit {stormStress.acuteLimitMsv} mSv
          </div>
        </div>
      </div>

      {/* Dual Log-Scale GOES Sparklines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <LogSparkline
          title="GOES Primary X-Ray Flux (24h)"
          unit="W/m² (log10)"
          series={weather.xraySeries}
          minLog={-8}
          maxLog={-2.5}
          color="#f59e0b"
          thresholds={[
            { logVal: -7, label: 'B', color: '#64748b' },
            { logVal: -6, label: 'C', color: '#38bdf8' },
            { logVal: -5, label: 'M', color: '#f59e0b' },
            { logVal: -4, label: 'X', color: '#f43f5e' },
          ]}
        />
        <LogSparkline
          title="GOES Integral Proton Flux ≥10 MeV (24h)"
          unit="pfu (log10)"
          series={weather.protonSeries}
          minLog={-1}
          maxLog={5}
          color="#f43f5e"
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
            <p className="text-xs opacity-90 mt-2 leading-relaxed">
              Evaluating <strong>{mission.name}</strong> ({mission.crewSize} crew) under{' '}
              <strong>{weather.label}</strong> particle flux.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono-telemetry">
            <div>
              <div className="opacity-70 text-[10px]">SHELTER VOL/CREW</div>
              <div className="font-bold">{stormStress.shelterVolumePerCrewM3} m³/crew</div>
            </div>
            <div>
              <div className="opacity-70 text-[10px]">TOTAL SHIELDING</div>
              <div className="font-bold">
                {stormStress.shieldingArealDensityGcm2} g/cm² (Base {stormStress.baseShieldingGcm2})
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#0D1320] border border-slate-800 rounded-xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>NASA-STD-3001 [V2 6095] Storm-Shelter Verification Checklist</span>
          </div>

          <div className="space-y-2">
            {stormStress.diagnostics.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#111827] border border-slate-800"
              >
                {d.severity === 'CRITICAL' ? (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : d.severity === 'WARNING' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-semibold text-slate-100">{d.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
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
