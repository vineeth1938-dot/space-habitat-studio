import React from 'react';
import { ArrowRight, CheckCircle2, FileCheck2, Sparkles, X } from 'lucide-react';
import { useHabitatStore } from '../store/habitatStore';

const TOUR_STEPS: Array<{
  step: 0 | 1 | 2 | 3;
  shortTitle: string;
  summary: string;
}> = [
  {
    step: 0,
    shortTitle: '1. Inspect Faulty Baseline',
    summary:
      'Review intentional hazards: Exercise noise on Sleep, Hygiene-Galley bio-risk, 90° 0g rack conflict & choked A* corridor.',
  },
  {
    step: 1,
    shortTitle: '2. Run Auto-Optimize',
    summary:
      'Simulated Annealing (<250ms) clears central egress, aligns 0g racks, isolates noise/hygiene & couples Water-Wall shielding.',
  },
  {
    step: 2,
    shortTitle: '3. Trigger X10 Solar Flare',
    summary:
      'Stress-test crew shelter transit time & HDPE/water-wall mSv attenuation under an extreme S4 / X10 proton storm.',
  },
  {
    step: 3,
    shortTitle: '4. Compare & Export Audit',
    summary:
      'Verify side-by-side trade-study deltas (Before vs Live Optimized) and export the printable NASA-STD-3001 report.',
  },
];

export const JudgeTourBanner: React.FC = () => {
  const {
    judgeTourActive,
    judgeTourStep,
    setJudgeTour,
    runJudgeTourStep,
    setAuditModalOpen,
  } = useHabitatStore();

  if (!judgeTourActive) return null;

  const current = TOUR_STEPS[judgeTourStep];
  const isLast = judgeTourStep === 3;

  return (
    <div className="shrink-0 bg-gradient-to-r from-[#0c192c] via-[#102039] to-[#0c192c] border-b border-cyan-500/40 px-3 py-2 flex flex-wrap items-center justify-between gap-2.5 text-xs select-none">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-semibold text-[11px]">
          <Sparkles className="w-3 h-3 text-cyan-300" />
          Judge Demo Walkthrough
        </span>

        <div className="flex items-center gap-1 flex-wrap">
          {TOUR_STEPS.map((item) => {
            const active = item.step === judgeTourStep;
            const done = item.step < judgeTourStep;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => runJudgeTourStep(item.step)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                  active
                    ? 'bg-cyan-500/25 text-white border-cyan-400/70'
                    : done
                      ? 'bg-emerald-500/15 text-emerald-200 border-emerald-500/35'
                      : 'bg-[#090D16]/70 text-slate-300 border-slate-700/80 hover:text-white'
                }`}
              >
                {done && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-[11px] text-slate-300 hidden 2xl:inline max-w-md truncate">
          {current.summary}
        </span>

        {!isLast ? (
          <button
            type="button"
            onClick={() => runJudgeTourStep((judgeTourStep + 1) as 0 | 1 | 2 | 3)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-[11px] cursor-pointer transition-colors"
          >
            Next Step
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setAuditModalOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-[11px] cursor-pointer transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            Export Audit Report
          </button>
        )}

        <button
          type="button"
          aria-label="Exit Judge Demo Walkthrough"
          onClick={() => setJudgeTour(false)}
          className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
