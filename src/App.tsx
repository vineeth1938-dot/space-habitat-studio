import React, { useEffect } from 'react';
import { GRID_STEP_M } from './engine/constants';
import { TopBar } from './components/TopBar';
import { LeftRail } from './components/LeftRail';
import { BlueprintCanvas } from './components/BlueprintCanvas';
import { RightRail } from './components/RightRail';
import { CompareDrawer } from './components/CompareDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useCadStore } from './store/useCadStore';

export const App: React.FC = () => {
  const { theme, mobilePanel, tabletDrawerOpen, setTabletDrawerOpen } = useCadStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')
      ) {
        return;
      }

      const state = useCadStore.getState();
      if (state.compareOpen) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) state.redo();
        else state.undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        state.redo();
        return;
      }

      if (!state.selectedModuleId) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        state.nudgeSelected(-GRID_STEP_M, 0);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        state.nudgeSelected(GRID_STEP_M, 0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        state.nudgeSelected(0, -GRID_STEP_M);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        state.nudgeSelected(0, GRID_STEP_M);
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        state.rotateModule(state.selectedModuleId);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        state.deleteModule(state.selectedModuleId);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ErrorBoundary>
      <div
        className={`h-[100dvh] w-screen flex flex-col overflow-hidden ${
          theme === 'dark' ? 'theme-dark' : ''
        }`}
        style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--fg-primary)' }}
      >
        <TopBar />

        {/* Desktop & Tablet Workspace (>= 768px) */}
        <div className="hidden md:flex flex-1 min-h-0 overflow-hidden relative">
          {/* Persistent Left Rail on Large Laptops/Desktops (>= 1152px) */}
          <div className="hidden min-[1152px]:flex h-full shrink-0">
            <LeftRail variant="desktop" />
          </div>

          {/* Slide-Over Left Drawer on iPads / Tablets (768px - 1151px) */}
          {tabletDrawerOpen && (
            <div
              className="min-[1152px]:hidden fixed inset-0 z-40 flex"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setTabletDrawerOpen(false);
              }}
            >
              <div className="h-full shadow-xl">
                <LeftRail variant="drawer" />
              </div>
            </div>
          )}

          <BlueprintCanvas />
          <RightRail variant="desktop" />
        </div>

        {/* Phone Single-Pane Thumb-First Workspace (< 768px) */}
        <div className="flex md:hidden flex-1 min-h-0 overflow-hidden">
          {mobilePanel === 'canvas' && <BlueprintCanvas />}
          {mobilePanel === 'build' && <LeftRail variant="mobile" />}
          {mobilePanel === 'audit' && <RightRail variant="mobile" />}
        </div>

        <MobileBottomNav />
        <CompareDrawer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
