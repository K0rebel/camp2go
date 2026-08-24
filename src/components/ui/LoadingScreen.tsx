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
      }, 400);

      const unmountTimer = setTimeout(() => {
        setIsRendered(false);
      }, 1000);

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030b17] px-6 transition-all duration-700 ease-out ${
        isDone ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting effects */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none -translate-y-8 animate-pulse" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none translate-y-16" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Brand Logo */}
        <div className="relative mb-6">
          <div className="w-20 h-20 p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-2xl shadow-cyan-500/40 flex items-center justify-center animate-bounce duration-1000">
            <img
              src="/favicon.svg"
              alt="Camp2Go Logo"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          {/* Subtle Outer Neon Ring */}
          <div className="absolute -inset-2 border border-cyan-400/30 animate-ping opacity-25 pointer-events-none" />
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase drop-shadow-lg mb-1">
          CAMP2GO
        </h1>
        <p className="text-xs sm:text-sm font-medium text-cyan-200/80 mb-8 tracking-wide">
          Asystent Przyczepy Kempingowej 3D
        </p>

        {/* Modern Progress Bar */}
        <div className="w-full bg-slate-900/80 border border-cyan-500/30 rounded-full p-1 shadow-inner mb-3">
          <div
            className="h-2.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 rounded-full transition-all duration-300 ease-out shadow-sm shadow-cyan-400/50"
            style={{ width: `${displayPercent}%` }}
          />
        </div>

        {/* Status Text & Percentage */}
        <div className="flex items-center justify-between w-full px-1 text-xs font-semibold text-slate-400">
          <span className="animate-pulse">
            {displayPercent < 100 ? 'Wczytywanie modelu 3D...' : 'Gotowe!'}
          </span>
          <span className="text-cyan-400 font-mono font-bold text-sm">
            {displayPercent}%
          </span>
        </div>

        {/* Tip at the bottom */}
        <div className="mt-12 text-[11px] text-slate-500 max-w-xs font-normal">
          Wskazówka: Po wczytaniu możesz zapisać aplikację na ekranie głównym telefonu.
        </div>
      </div>
    </div>
  );
};
