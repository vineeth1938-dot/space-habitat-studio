import React from 'react';
import { Columns2, Grid, Layers, ShieldAlert } from 'lucide-react';
import { MobilePanel, useCadStore } from '../store/useCadStore';

export const MobileBottomNav: React.FC = () => {
  const {
    mobilePanel,
    evaluation,
    snapshots,
    setMobilePanel,
    setCompareOpen,
  } = useCadStore();

  const failCount = evaluation.issues.filter((i) => i.severity === 'FAIL').length;

  const tabs: Array<{
    id: MobilePanel;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
  }> = [
    {
      id: 'canvas',
      label: 'Floorplan',
      icon: <Grid className="w-4 h-4" />,
    },
    {
      id: 'build',
      label: 'Modules',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'audit',
      label: 'Safety',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: failCount > 0 ? `${failCount}` : 'OK',
      badgeColor: failCount > 0 ? '#ef4444' : '#10b981',
    },
  ];

  return (
    <nav
      aria-label="Mobile Workspace Navigation"
      className="md:hidden shrink-0 border-t safe-bottom safe-x grid grid-cols-4"
      style={{
        backgroundColor: 'var(--bg-panel)',
        borderColor: 'var(--border-hairline)',
        color: 'var(--fg-primary)',
      }}
    >
      {tabs.map((t) => {
        const active = mobilePanel === t.id;
        return (
          <button
            type="button"
            key={t.id}
            data-testid={`mobile-tab-${t.id}`}
            onClick={() => setMobilePanel(t.id)}
            className="min-h-[56px] px-1 flex flex-col items-center justify-center gap-1 border-r relative cursor-pointer"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: active ? 'var(--bg-subtle)' : 'transparent',
              color: active ? 'var(--accent-primary)' : 'var(--fg-muted)',
            }}
          >
            <div className="relative flex items-center justify-center">
              {t.icon}
              {t.badge && (
                <span
                  className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono-cad font-bold leading-none"
                  style={{
                    backgroundColor:
                      t.badgeColor === '#ef4444'
                        ? 'rgba(239, 68, 68, 0.16)'
                        : 'rgba(16, 185, 129, 0.16)',
                    color: t.badgeColor,
                  }}
                >
                  {t.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold tracking-tight">
              {t.label}
            </span>
          </button>
        );
      })}

      <button
        type="button"
        data-testid="mobile-tab-compare"
        onClick={() => setCompareOpen(true)}
        className="min-h-[56px] px-1 flex flex-col items-center justify-center gap-1 cursor-pointer"
        style={{ color: 'var(--fg-muted)' }}
      >
        <div className="flex items-center">
          <Columns2 className="w-4 h-4" />
          <span
            className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono-cad leading-none"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
          >
            {snapshots.length}
          </span>
        </div>
        <span className="text-[11px] font-semibold tracking-tight">
          Compare
        </span>
      </button>
    </nav>
  );
};
