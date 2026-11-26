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
      label: 'Blueprint',
      icon: <Grid className="w-4 h-4" />,
    },
    {
      id: 'build',
      label: 'Build',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'audit',
      label: 'Audit',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: failCount > 0 ? `${failCount}` : `${evaluation.scores.overall}`,
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
            className="min-h-[54px] px-1 flex flex-col items-center justify-center gap-1 border-r relative cursor-pointer"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: active ? 'var(--bg-subtle)' : 'transparent',
              color: active ? 'var(--fg-primary)' : 'var(--fg-muted)',
            }}
          >
            <div className="relative flex items-center justify-center">
              {t.icon}
              {t.badge && (
                <span
                  className="ml-1 px-1 py-0.2 text-[9px] font-mono-cad font-bold border leading-none"
                  style={{
                    borderColor: t.badgeColor,
                    color: t.badgeColor,
                  }}
                >
                  {t.badge}
                </span>
              )}
            </div>
            <span className="font-mono-cad text-[10px] font-semibold uppercase tracking-wide">
              {t.label}
            </span>
          </button>
        );
      })}

      <button
        type="button"
        data-testid="mobile-tab-compare"
        onClick={() => setCompareOpen(true)}
        className="min-h-[54px] px-1 flex flex-col items-center justify-center gap-1 cursor-pointer"
        style={{ color: 'var(--fg-muted)' }}
      >
        <div className="flex items-center">
          <Columns2 className="w-4 h-4" />
          <span
            className="ml-1 px-1 py-0.2 text-[9px] font-mono-cad border leading-none"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            {snapshots.length}
          </span>
        </div>
        <span className="font-mono-cad text-[10px] font-semibold uppercase tracking-wide">
          Compare
        </span>
      </button>
    </nav>
  );
};
