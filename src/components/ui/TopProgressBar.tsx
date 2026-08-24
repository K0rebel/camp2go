import React from 'react';
import { useChecklistStore } from '../../store/useChecklistStore';
import { INSPECTION_STEPS } from '../../config/stepsConfig';

export const TopProgressBar: React.FC = () => {
  const currentStepIndex = useChecklistStore((state) => state.currentStepIndex);
  const isInspecting = useChecklistStore((state) => state.isInspecting);
  const isGarage = useChecklistStore((state) => state.isGarage);

  if (isGarage) return null;

  const totalSteps = INSPECTION_STEPS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <header className="relative z-30 pt-safe px-6 pt-7 sm:pt-9 pb-2 w-full max-w-2xl mx-auto pointer-events-none">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4 mb-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="/favicon.svg"
            alt="Camp2Go Logo"
            className="w-8 h-8 rounded-xl shadow-md shadow-cyan-500/20 object-contain"
          />
          <h1 className="text-base font-black tracking-wider text-white uppercase drop-shadow-sm">
            CAMP2GO
          </h1>
        </div>

        {/* Step Counter Indicator */}
        {isInspecting && (
          <div className="text-xs font-semibold text-cyan-300 drop-shadow-sm">
            Krok {currentStepIndex + 1} <span className="text-slate-400 font-normal">/ {totalSteps}</span>
          </div>
        )}
      </div>

      {/* Simplified, Sleek Progress Bar */}
      {isInspecting && (
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
};
