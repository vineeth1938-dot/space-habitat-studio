import React from 'react';
import { Compass, Flame, Moon, Redo2, SlidersHorizontal, Sun, Undo2 } from 'lucide-react';
import { AGENCY_STANDARDS_META } from '../engine/constants';
import { HABITAT_PRESETS } from '../engine/presets';
import { useCadStore } from '../store/useCadStore';
import { AgencyStandard } from '../types/habitat';

export const TopBar: React.FC = () => {
  const {
    theme,
    activePresetId,
    mission,
    evaluation,
    past,
    future,
    tabletDrawerOpen,
    toggleTheme,
    loadPreset,
    setStandard,
    toggleSolarFlare,
    undo,
    redo,
    setMobilePanel,
    setTabletDrawerOpen,
  } = useCadStore();

  const standards: AgencyStandard[] = ['NASA', 'ISRO', 'SPACEX', 'UNIFIED'];
  const failCount = evaluation.issues.filter((i) => i.severity === 'FAIL').length;
  const scoreColor =
    failCount === 0 && evaluation.scores.overall >= 82
      ? '#10b981'
      : failCount === 0 || evaluation.scores.overall >= 60
        ? '#f59e0b'
        : '#ef4444';

  return (
    <header
      className="shrink-0 border-b safe-top safe-x"
      style={{
        backgroundColor: 'var(--bg-panel)',
        borderColor: 'var(--border-hairline)',
        color: 'var(--fg-primary)',
      }}
    >
      {/* Primary Row */}
      <div className="min-h-[50px] md:h-12 px-3 flex items-center justify-between gap-2">
        {/* Left: iPad Drawer Trigger + Brand + Desktop Preset Loader */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            data-testid="tablet-drawer-btn"
            onClick={() => setTabletDrawerOpen(!tabletDrawerOpen)}
            aria-label="Toggle Mission and Zone Palette"
            className="hidden md:flex min-[1152px]:hidden items-center gap-1.5 px-3 h-9 rounded-md border text-xs font-semibold cursor-pointer shrink-0"
            style={{
              borderColor: tabletDrawerOpen ? 'var(--border-strong)' : 'var(--border-hairline)',
              backgroundColor: tabletDrawerOpen ? 'var(--accent-primary)' : 'var(--bg-subtle)',
              color: tabletDrawerOpen ? '#ffffff' : 'var(--fg-primary)',
            }}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Mission &amp; Zones</span>
          </button>

          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <Compass
              className="w-4 h-4 shrink-0"
              style={{ color: 'var(--accent-primary)' }}
            />
            <h1 className="text-xs sm:text-sm font-bold tracking-tight truncate">
              HABITAT // SW-4
            </h1>
          </div>

          {/* Tablet & Desktop Preset Selector */}
          <div className="hidden md:flex items-center gap-2 min-w-0">
            <div
              className="h-5 w-px shrink-0"
              style={{ backgroundColor: 'var(--border-hairline)' }}
            />
            <select
              aria-label="Mission Preset"
              data-testid="preset-select"
              value={activePresetId}
              onChange={(e) => loadPreset(e.target.value)}
              className="text-xs px-2.5 h-8 rounded-md border outline-none cursor-pointer max-w-[210px] xl:max-w-[250px] truncate font-medium"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--fg-primary)',
              }}
            >
              {HABITAT_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Agency Standard Segmented Bar (Tablet & Desktop) */}
        <div
          className="hidden md:flex rounded-md overflow-hidden border shrink-0"
          style={{ borderColor: 'var(--border-hairline)' }}
          role="group"
          aria-label="Agency Standard Selector"
        >
          {standards.map((std) => {
            const active = mission.standard === std;
            return (
              <button
                type="button"
                key={std}
                data-testid={`std-${std}`}
                onClick={() => setStandard(std)}
                title={AGENCY_STANDARDS_META[std].summary}
                className="px-2.5 xl:px-3 h-8 text-xs font-semibold border-r last:border-r-0 cursor-pointer transition-colors"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: active ? 'var(--accent-primary)' : 'transparent',
                  color: active ? '#ffffff' : 'var(--fg-secondary)',
                }}
              >
                <span className="hidden xl:inline">{AGENCY_STANDARDS_META[std].label}</span>
                <span className="xl:hidden">{AGENCY_STANDARDS_META[std].short}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Mobile Score Pill + Solar Flare + Undo/Redo + Theme */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobilePanel('audit')}
            className="md:hidden px-2.5 h-10 rounded-md border font-mono-cad text-xs font-bold flex items-center gap-1 cursor-pointer"
            style={{
              borderColor: scoreColor,
              color: scoreColor,
              backgroundColor: 'var(--bg-elevated)',
            }}
            aria-label={`Readiness score ${evaluation.scores.overall} out of 100`}
          >
            <span>{evaluation.scores.overall}</span>
            <span className="text-[10px] opacity-85">/100</span>
          </button>

          <button
            type="button"
            data-testid="solar-flare-btn"
            onClick={toggleSolarFlare}
            title="Simulate X-Class Solar Particle Event (SPE) Storm-Shelter Check"
            aria-pressed={mission.solarFlareSim}
            className="flex items-center justify-center gap-1.5 px-2.5 h-10 md:h-8 min-w-[40px] rounded-md border text-xs font-semibold cursor-pointer transition-colors"
            style={{
              borderColor: mission.solarFlareSim ? '#ef4444' : 'var(--border-hairline)',
              backgroundColor: mission.solarFlareSim ? 'rgba(239, 68, 68, 0.14)' : 'var(--bg-subtle)',
              color: mission.solarFlareSim ? '#ef4444' : 'var(--fg-secondary)',
            }}
          >
            <Flame className="w-4 h-4 md:w-3.5 md:h-3.5 shrink-0" />
            <span className="hidden lg:inline">
              {mission.solarFlareSim ? 'SOLAR FLARE: ACTIVE' : 'Solar Flare Test'}
            </span>
          </button>

          <div
            className="flex rounded-md overflow-hidden border"
            style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-subtle)' }}
          >
            <button
              type="button"
              data-testid="undo-btn"
              onClick={undo}
              disabled={past.length === 0}
              aria-label="Undo"
              title="Undo (Ctrl+Z)"
              className="w-10 h-10 md:w-8 md:h-8 flex items-center justify-center border-r disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              style={{ borderColor: 'var(--border-hairline)', color: 'var(--fg-primary)' }}
            >
              <Undo2 className="w-4 h-4 md:w-3.5 md:h-3.5" />
            </button>
            <button
              type="button"
              data-testid="redo-btn"
              onClick={redo}
              disabled={future.length === 0}
              aria-label="Redo"
              title="Redo (Ctrl+Y)"
              className="w-10 h-10 md:w-8 md:h-8 flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              style={{ color: 'var(--fg-primary)' }}
            >
              <Redo2 className="w-4 h-4 md:w-3.5 md:h-3.5" />
            </button>
          </div>

          <button
            type="button"
            data-testid="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Light and Dark Theme"
            className="flex items-center justify-center gap-1 px-2.5 h-10 md:h-8 min-w-[40px] rounded-md border text-xs font-medium cursor-pointer"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--fg-primary)',
            }}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 md:w-3.5 md:h-3.5" />
            ) : (
              <Moon className="w-4 h-4 md:w-3.5 md:h-3.5" />
            )}
            <span className="hidden xl:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* Phone Compact Second Row (< 768px): 16px Touch-Safe Selectors */}
      <div className="md:hidden px-3 pb-2.5 grid grid-cols-2 gap-2">
        <select
          aria-label="Mission Preset"
          value={activePresetId}
          onChange={(e) => loadPreset(e.target.value)}
          className="w-full h-11 px-2.5 rounded-md border text-base outline-none truncate font-medium"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-hairline)',
            color: 'var(--fg-primary)',
          }}
        >
          {HABITAT_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          aria-label="Agency Engineering Standard"
          value={mission.standard}
          onChange={(e) => setStandard(e.target.value as AgencyStandard)}
          className="w-full h-11 px-2.5 rounded-md border text-base outline-none truncate font-medium"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-hairline)',
            color: 'var(--fg-primary)',
          }}
        >
          {standards.map((std) => (
            <option key={std} value={std}>
              {AGENCY_STANDARDS_META[std].label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
