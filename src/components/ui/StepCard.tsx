import React from 'react';
import { useChecklistStore } from '../../store/useChecklistStore';
import { INSPECTION_STEPS } from '../../config/stepsConfig';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';

export const StepCard: React.FC = () => {
  const currentStepIndex = useChecklistStore((state) => state.currentStepIndex);
  const isInspecting = useChecklistStore((state) => state.isInspecting);
  const isGarage = useChecklistStore((state) => state.isGarage);
  const isCompleted = useChecklistStore((state) => state.isCompleted);
  const nextStep = useChecklistStore((state) => state.nextStep);
  const prevStep = useChecklistStore((state) => state.prevStep);

  const currentStep = INSPECTION_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === INSPECTION_STEPS.length - 1;

  if (isGarage || !isInspecting || isCompleted) {
    return null;
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 w-full pointer-events-none flex flex-col justify-end">
      {/* Main Bottom Blue Gradient with Transparent Fade - full screen width */}
      <div className="blue-gradient-bottom p-6 pt-24 pb-10 sm:pb-12 pb-safe pointer-events-auto transition-all w-full">
        <div className="max-w-lg mx-auto">
          {/* Step Badge */}
          <div className="text-center mb-2">
            <span className="text-xs sm:text-sm font-black tracking-widest text-cyan-100 uppercase drop-shadow-md">
              - KROK {currentStep.id} -
            </span>
          </div>

          {/* Big Step Title */}
          <h2 className="text-xl sm:text-2xl font-black text-center text-white leading-snug mb-3 tracking-tight drop-shadow-lg">
            {currentStep.title}
          </h2>

          {/* Detailed Explanation / Description */}
          <p className="text-xs sm:text-sm text-cyan-50 text-center leading-relaxed mb-6 max-w-md mx-auto drop-shadow-sm">
            {currentStep.description}
          </p>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center gap-3.5 max-w-md mx-auto">
            {currentStepIndex > 0 && (
              <button
                onClick={prevStep}
                className="py-3.5 px-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-cyan-400/30 text-white active:scale-95 transition-all flex items-center justify-center gap-1.5 text-sm font-semibold backdrop-blur-sm"
                title="Poprzedni krok"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Wróć</span>
              </button>
            )}

            <button
              onClick={nextStep}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>{isLastStep ? 'Zakończ inspekcję' : 'Sprawdzone (Dalej)'}</span>
              <ChevronRight className="w-4 h-4 ml-0.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
