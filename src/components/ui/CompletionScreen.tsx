import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useChecklistStore } from '../../store/useChecklistStore';
import { INSPECTION_STEPS } from '../../config/stepsConfig';
import { CheckCircle2, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export const CompletionScreen: React.FC = () => {
  const isCompleted = useChecklistStore((state) => state.isCompleted);
  const resetChecklist = useChecklistStore((state) => state.resetChecklist);
  const goToStep = useChecklistStore((state) => state.goToStep);

  useEffect(() => {
    if (isCompleted) {
      // Confetti burst
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#00d2ff', '#38bdf8', '#22c55e', '#ffffff'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#00d2ff', '#38bdf8', '#22c55e', '#ffffff'],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isCompleted]);

  if (!isCompleted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-xl p-4 pt-safe pb-safe flex flex-col items-center justify-start sm:justify-center">
      <div className="w-full max-w-md my-auto bg-gradient-to-b from-slate-900 to-[#002244] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badge */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 animate-bounce">
            <ShieldCheck className="w-9 h-9 text-slate-950 stroke-[2.2]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wszystkie punkty sprawdzone</span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Gotowy do drogi! 🚐💨
          </h2>
          <p className="text-slate-300 text-xs mt-1">
            Twoja przyczepa jest w 100% zabezpieczona i przygotowana do podróży.
          </p>
        </div>

        {/* Checklist Summary */}
        <div className="space-y-2 mb-6 max-h-56 overflow-y-auto pr-1">
          {INSPECTION_STEPS.map((step) => {
            return (
              <div
                key={step.id}
                onClick={() => goToStep(step.id - 1)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {step.id}. {step.title}
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400 font-medium shrink-0 ml-2">
                  Zobacz 3D
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={resetChecklist}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Rozpocznij nową inspekcję</span>
        </button>
      </div>
    </div>
  );
};
