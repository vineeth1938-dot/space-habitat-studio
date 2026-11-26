import React, { useEffect, useState } from 'react';
import { TopBar } from './components/TopBar';
import { LeftSidebar } from './components/LeftSidebar';
import { Floorplan2D } from './components/Floorplan2D';
import { Viewport3D } from './components/Viewport3D';
import { EngineeringInspector } from './components/EngineeringInspector';
import { CompareView } from './components/CompareView';
import { SolarStormView } from './components/SolarStormView';
import { useHabitatStore } from './store/habitatStore';

type ViewportSplit = 'split' | '2d' | '3d';

export const App: React.FC = () => {
  const { activeView, fetchLiveWeather } = useHabitatStore();
  const [splitMode, setSplitMode] = useState<ViewportSplit>('split');

  // Initial live NOAA GOES fetch on mount (with clean offline fallback)
  useEffect(() => {
    void fetchLiveWeather();
  }, [fetchLiveWeather]);

  // Global keyboard shortcuts for CAD productivity
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
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) state.redo();
        else state.undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        state.redo();
      } else if (e.key.toLowerCase() === 'r' && state.selectedZoneId) {
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
    <div className="h-screen w-screen flex flex-col bg-[#090D16] text-slate-100 overflow-hidden">
      <TopBar />

      {activeView === 'studio' && (
        <div className="flex-1 flex min-h-0 overflow-hidden">
          <LeftSidebar />

          {/* Synchronized 2D + 3D Center Workspace */}
          <main className="flex-1 flex flex-col min-w-0 min-h-0 relative bg-[#090D16]">
            {/* Viewport Layout Switcher */}
            <div className="h-8 shrink-0 bg-[#0D1320]/90 border-b border-slate-800/80 px-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono-telemetry">
                SYNCHRONIZED VIEWPORT • DRAG / RESIZE / PRESS [R] TO ROTATE
              </span>
              <div className="flex items-center bg-[#090D16] border border-slate-800 rounded p-0.5 gap-0.5">
                {(
                  [
                    { id: 'split', label: 'Split 2D + 3D' },
                    { id: '2d', label: '2D Only' },
                    { id: '3d', label: '3D Only' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSplitMode(m.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                      splitMode === m.id
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {splitMode !== '3d' && (
                <div
                  className={`${
                    splitMode === 'split' ? 'h-[54%] border-b border-slate-800' : 'h-full'
                  } w-full min-h-0`}
                >
                  <Floorplan2D />
                </div>
              )}
              {splitMode !== '2d' && (
                <div
                  className={`${splitMode === 'split' ? 'h-[46%]' : 'h-full'} w-full min-h-0`}
                >
                  <Viewport3D />
                </div>
              )}
            </div>
          </main>

          <EngineeringInspector />
        </div>
      )}

      {activeView === 'compare' && <CompareView />}
      {activeView === 'weather' && <SolarStormView />}
    </div>
  );
};

export default App;
