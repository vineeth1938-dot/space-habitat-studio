import React, { useEffect, useState } from 'react';
import { Box, ShieldAlert, Sparkles } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { LeftSidebar } from './components/LeftSidebar';
import { Floorplan2D } from './components/Floorplan2D';
import { Viewport3D } from './components/Viewport3D';
import { EngineeringInspector } from './components/EngineeringInspector';
import { CompareView } from './components/CompareView';
import { SolarStormView } from './components/SolarStormView';
import { JudgeTourBanner } from './components/JudgeTourBanner';
import { AuditReportModal } from './components/AuditReportModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useHabitatStore } from './store/habitatStore';

type ViewportSplit = 'split' | '2d' | '3d';

export const App: React.FC = () => {
  const {
    activeView,
    mobileDrawer,
    report,
    setMobileDrawer,
    runAutoOptimize,
    fetchLiveWeather,
  } = useHabitatStore();
  const [splitMode, setSplitMode] = useState<ViewportSplit>('split');

  useEffect(() => {
    void fetchLiveWeather();
  }, [fetchLiveWeather]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      const state = useHabitatStore.getState();
      if (e.key === 'Escape') {
        if (state.auditModalOpen) {
          state.setAuditModalOpen(false);
        } else if (state.mobileDrawer !== 'none') {
          state.setMobileDrawer('none');
        } else if (state.selectedZoneId || state.highlightedZoneIds.length > 0) {
          state.selectZone(null);
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) state.redo();
        else state.undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        state.redo();
      } else if (e.key.toLowerCase() === 'r' && state.selectedZoneId && state.activeView === 'studio') {
        e.preventDefault();
        state.rotateZone(state.selectedZoneId);
      } else if (
        (e.key === 'Delete' || e.key === 'Backspace') &&
        state.selectedZoneId &&
        state.activeView === 'studio'
      ) {
        e.preventDefault();
        state.deleteZone(state.selectedZoneId);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ErrorBoundary panelName="Space Habitat Studio">
      <div className="h-dvh w-screen flex flex-col bg-[var(--surface-canvas)] text-[var(--text-primary)] overflow-hidden">
        <TopBar />
        <JudgeTourBanner />

        {activeView === 'studio' && (
          <div className="flex-1 flex min-h-0 overflow-hidden relative">
            {/* Desktop Left Rail */}
            <div className="hidden lg:flex h-full">
              <ErrorBoundary panelName="Zone & Hull Configurator">
                <LeftSidebar />
              </ErrorBoundary>
            </div>

            {/* Mobile Slide-Over Drawers */}
            {mobileDrawer !== 'none' && (
              <div
                className="fixed inset-0 z-40 bg-black/70 lg:hidden flex"
                onClick={() => setMobileDrawer('none')}
              >
                <div
                  className={`h-full ${mobileDrawer === 'right' ? 'ml-auto' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {mobileDrawer === 'left' ? (
                    <LeftSidebar isMobileDrawer />
                  ) : (
                    <EngineeringInspector isMobileDrawer />
                  )}
                </div>
              </div>
            )}

            {/* Synchronized 2D + 3D Center Workspace */}
            <main className="flex-1 flex flex-col min-w-0 min-h-0 relative bg-[var(--surface-canvas)]">
              {/* Viewport Split Switcher */}
              <div className="min-h-8 py-1 shrink-0 bg-[var(--surface-panel)] border-b border-[var(--border-subtle)] px-2.5 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <button
                    type="button"
                    onClick={() => setMobileDrawer('left')}
                    className="lg:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-cyan-200 border border-[var(--border-strong)] text-[10px] font-medium cursor-pointer shrink-0"
                  >
                    <Box className="w-3 h-3" />
                    <span>Modules</span>
                  </button>
                  <button
                    type="button"
                    onClick={runAutoOptimize}
                    className="lg:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-400 text-slate-950 text-[10px] font-bold cursor-pointer shrink-0"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Optimize</span>
                  </button>
                  <span className="hidden lg:inline text-[var(--text-muted)] text-[11px] truncate">
                    Shortcuts: <span className="font-mono-telemetry text-[var(--text-secondary)]">R</span> rotate •{' '}
                    <span className="font-mono-telemetry text-[var(--text-secondary)]">Del</span> remove •{' '}
                    <span className="font-mono-telemetry text-[var(--text-secondary)]">Ctrl+Z</span> undo
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <div
                    role="group"
                    aria-label="Viewport Mode"
                    className="flex items-center bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded p-0.5 gap-0.5"
                  >
                    {(
                      [
                        { id: 'split', label: 'Split 2D+3D', shortLabel: 'Split' },
                        { id: '2d', label: '2D Only', shortLabel: '2D' },
                        { id: '3d', label: '3D Only', shortLabel: '3D' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        aria-pressed={splitMode === m.id}
                        onClick={() => setSplitMode(m.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                          splitMode === m.id
                            ? 'bg-cyan-500/20 text-cyan-200'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span className="hidden sm:inline">{m.label}</span>
                        <span className="sm:hidden">{m.shortLabel}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileDrawer('right')}
                    className="lg:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-amber-200 border border-[var(--border-strong)] text-[10px] font-mono-telemetry cursor-pointer"
                  >
                    <ShieldAlert className="w-3 h-3" />
                    <span>
                      {report.criticalCount}C/{report.warningCount}W
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-0">
                {splitMode !== '3d' && (
                  <div
                    className={`${
                      splitMode === 'split' ? 'h-[53%] border-b border-[var(--border-subtle)]' : 'h-full'
                    } w-full min-h-0`}
                  >
                    <ErrorBoundary panelName="2D Blueprint Viewport">
                      <Floorplan2D />
                    </ErrorBoundary>
                  </div>
                )}
                {splitMode !== '2d' && (
                  <div
                    className={`${splitMode === 'split' ? 'h-[47%]' : 'h-full'} w-full min-h-0`}
                  >
                    <ErrorBoundary panelName="3D WebGL Viewport">
                      <Viewport3D />
                    </ErrorBoundary>
                  </div>
                )}
              </div>
            </main>

            {/* Desktop Right Inspector Rail */}
            <div className="hidden lg:flex h-full">
              <ErrorBoundary panelName="Engineering Inspector">
                <EngineeringInspector />
              </ErrorBoundary>
            </div>
          </div>
        )}

        {activeView === 'compare' && (
          <ErrorBoundary panelName="Compare Mode">
            <CompareView />
          </ErrorBoundary>
        )}

        {activeView === 'weather' && (
          <ErrorBoundary panelName="Solar-Flare Stress Test">
            <SolarStormView />
          </ErrorBoundary>
        )}

        <AuditReportModal />
      </div>
    </ErrorBoundary>
  );
};

export default App;
