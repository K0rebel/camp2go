import React, { useEffect } from 'react';
import { CaravanScene } from './components/3d/CaravanScene';
import { GarageShowcase } from './components/ui/GarageShowcase';
import { TopProgressBar } from './components/ui/TopProgressBar';
import { StepCard } from './components/ui/StepCard';
import { CompletionScreen } from './components/ui/CompletionScreen';
import { useChecklistStore } from './store/useChecklistStore';

export const App: React.FC = () => {
  const nextStep = useChecklistStore((state) => state.nextStep);
  const prevStep = useChecklistStore((state) => state.prevStep);
  const isInspecting = useChecklistStore((state) => state.isInspecting);
  const isGarage = useChecklistStore((state) => state.isGarage);
  const isCompleted = useChecklistStore((state) => state.isCompleted);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGarage || !isInspecting || isCompleted) return;

      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGarage, isInspecting, isCompleted, nextStep, prevStep]);

  return (
    <main className="relative w-full h-full min-h-screen bg-[#030b17] overflow-hidden flex flex-col justify-between select-none">
      {/* 3D Scene Viewport */}
      <CaravanScene />

      {/* Need For Speed Garage & Vehicle Selector */}
      <GarageShowcase />

      {/* Top Header & Minimal Progress Bar (during inspection) */}
      <TopProgressBar />

      {/* Bottom Step Guide Card & Actions (during inspection) */}
      <StepCard />

      {/* Full-screen completion modal */}
      <CompletionScreen />
    </main>
  );
};

export default App;
