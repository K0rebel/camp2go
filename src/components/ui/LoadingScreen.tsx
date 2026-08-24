import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const LoadingScreen: React.FC = () => {
  const { active, progress } = useProgress();
  const [isDone, setIsDone] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // Smooth fade-out after 100% loaded
  useEffect(() => {
    if (!active && progress >= 100) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 350);

      const unmountTimer = setTimeout(() => {
        setIsRendered(false);
      }, 950);

      return () => {
        clearTimeout(timer);
        clearTimeout(unmountTimer);
      };
    }
  }, [active, progress]);

  if (!isRendered) return null;

  const displayPercent = Math.min(100, Math.round(progress));

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030b17] px-6 transition-all duration-600 ease-out ${
        isDone ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute w-64 h-64 rounded-full bg-cyan-500/15 blur-[90px] pointer-events-none -translate-y-4" />

      {/* Main Minimal Container */}
      <div className="relative z-10 flex flex-col items-center max-w-xs w-full text-center">
        {/* Rounded Logo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-2xl shadow-xl shadow-cyan-500/30 overflow-hidden flex items-center justify-center animate-pulse duration-1000">
          <img
            src="/favicon.svg"
            alt="Camp2Go Logo"
            className="w-full h-full object-contain drop-shadow-md rounded-2xl"
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase drop-shadow-md mb-6">
          CAMP2GO
        </h1>

        {/* Minimal Progress Bar */}
        <div className="w-48 bg-slate-900/80 border border-cyan-500/25 rounded-full p-[2px] shadow-inner mb-2">
          <div
            className="h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${displayPercent}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="text-xs font-mono font-bold text-cyan-400/90 tracking-wider">
          {displayPercent}%
        </div>
      </div>
    </div>
  );
};
