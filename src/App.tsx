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

  // Initial live NOAA GOES fetch on mount (with clean offline fallback)
  useEffect(() => {
    void fetchLiveWeather();
  }, [fetchLiveWeather]);

  // Global CAD keyboard shortcuts: Undo, Redo, Rotate (R), Delete/Backspace, Escape
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
      <div className="h-dvh w-screen flex flex-col bg-[#090D16] text-slate-100 overflow-hidden">
        <TopBar />
        <JudgeTourBanner />

        {activeView === 'studio' && (
          <div className="flex-1 flex min-h-0 overflow-hidden relative">
            {/* Desktop Left Rail (>= 1024px) */}
            <div className="hidden lg:flex h-full">
              <ErrorBoundary panelName="Zone & Hull Configurator">
                <LeftSidebar />
              </ErrorBoundary>
            </div>

            {/* Mobile Slide-Over Drawers (< 1024px) */}
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
            <main className="flex-1 flex flex-col min-w-0 min-h-0 relative bg-[#090D16]">
              {/* Viewport Layout Switcher */}
              <div className="min-h-8 py-1 shrink-0 bg-[#0D1320]/90 border-b border-slate-800/80 px-2 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                <div className="flex items-center gap-1 min-w-0">
                  {/* Mobile Drawer Triggers */}
                  <button
                    type="button"
                    onClick={() => setMobileDrawer('left')}
                    className="lg:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[10px] font-medium cursor-pointer shrink-0"
                  >
                    <Box className="w-3 h-3" />
                    <span>Modules</span>
                  </button>
                  <button
                    type="button"
                    onClick={runAutoOptimize}
                    className="lg:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-600/25 text-cyan-200 border border-cyan-500/40 text-[10px] font-medium cursor-pointer shrink-0"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Optimize</span>
                  </button>
                  <span className="hidden lg:inline text-slate-400 font-mono-telemetry truncate">
                    SYNCHRONIZED CAD • DRAG / RESIZE / [R] ROTATE / [DEL] REMOVE / [ESC] CLEAR
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex items-center bg-[#090D16] border border-slate-800 rounded p-0.5 gap-0.5">
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
                        onClick={() => setSplitMode(m.id)}
                        className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                          splitMode === m.id
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : 'text-slate-400 hover:text-slate-200'
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
                    className="lg:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 text-[10px] font-mono-telemetry cursor-pointer"
                  >
                    <ShieldAlert className="w-3 h-3" />
                    {report.criticalCount}C/{report.warningCount}W
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-0">
                {splitMode !== '3d' && (
                  <div
                    className={`${
                      splitMode === 'split' ? 'h-[53%] border-b border-slate-800' : 'h-full'
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

            {/* Desktop Right Inspector Rail (>= 1024px) */}
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
