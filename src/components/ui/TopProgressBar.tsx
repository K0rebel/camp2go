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
    <header className="relative z-30 pt-safe px-4 sm:px-6 pt-3 sm:pt-6 pb-2 w-full max-w-2xl mx-auto pointer-events-none">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/favicon.svg"
            alt="Camp2Go Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl shadow-md shadow-cyan-500/20 object-contain"
          />
          <h1 className="text-sm sm:text-base font-black tracking-wider text-white uppercase drop-shadow-sm">
            CAMP2GO
          </h1>
        </div>

        {/* Step Counter Indicator with pill badge */}
        {isInspecting && (
          <div className="text-[11px] sm:text-xs font-semibold text-cyan-300 drop-shadow-sm bg-slate-900/70 border border-cyan-400/25 px-2.5 py-1 rounded-full backdrop-blur-md">
            Krok <span className="font-bold text-white">{currentStepIndex + 1}</span> <span className="text-slate-400 font-normal">/ {totalSteps}</span>
          </div>
        )}
      </div>

      {/* Simplified, Sleek Progress Bar */}
      {isInspecting && (
        <div className="w-full h-1.5 bg-slate-900/80 border border-cyan-500/20 rounded-full overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
};
