import React, { useEffect } from 'react';
import { useChecklistStore } from '../../store/useChecklistStore';
import { CARAVAN_VEHICLES } from '../../config/caravansConfig';
import { ChevronRight, Calendar, Weight, Ruler, Users } from 'lucide-react';

export const GarageShowcase: React.FC = () => {
  const startInspection = useChecklistStore((state) => state.startInspection);
  const isGarage = useChecklistStore((state) => state.isGarage);

  const activeVehicle = CARAVAN_VEHICLES[0];

  // Enter key shortcut to start
  useEffect(() => {
    if (!isGarage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        startInspection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGarage, startInspection]);

  if (!isGarage) return null;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between overflow-hidden select-none">
      {/* ================= TOP BRAND LOGO ================= */}
      <header className="relative z-30 pt-safe px-6 pt-7 sm:pt-9 pb-2 w-full max-w-2xl mx-auto pointer-events-none">
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
      </header>

      {/* ================= BOTTOM CARAVAN INFO CARD (100% FULL WIDTH SCREEN GRADIENT) ================= */}
      <div className="absolute inset-x-0 bottom-0 z-30 w-full pointer-events-none flex flex-col justify-end">
        <div className="blue-gradient-bottom p-6 pt-24 pb-10 sm:pb-12 pb-safe pointer-events-auto transition-all w-full">
          <div className="max-w-lg mx-auto space-y-5">
            {/* Header: Brand & Model Name */}
            <div className="text-center">
              <span className="text-xs font-black tracking-widest px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 uppercase">
                {activeVehicle.brand}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white uppercase mt-2.5 drop-shadow-md">
                {activeVehicle.modelName}
              </h2>
            </div>

            {/* Spec HUD Grid */}
            <div className="grid grid-cols-4 gap-2">
              {/* Year */}
              <div className="bg-slate-900/60 border border-cyan-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>Rok</span>
                </div>
                <span className="text-sm font-black text-white">{activeVehicle.year}</span>
              </div>

              {/* Length */}
              <div className="bg-slate-900/60 border border-cyan-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                  <Ruler className="w-3 h-3 text-cyan-400" />
                  <span>Długość</span>
                </div>
                <span className="text-sm font-black text-white">{activeVehicle.length}</span>
              </div>

              {/* DMC */}
              <div className="bg-slate-900/60 border border-cyan-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                  <Weight className="w-3 h-3 text-cyan-400" />
                  <span>DMC</span>
                </div>
                <span className="text-sm font-black text-white">{activeVehicle.dmc}</span>
              </div>

              {/* Berths */}
              <div className="bg-slate-900/60 border border-cyan-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                  <Users className="w-3 h-3 text-cyan-400" />
                  <span>Miejsca</span>
                </div>
                <span className="text-sm font-black text-white">{activeVehicle.berths}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={startInspection}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white font-extrabold italic text-base tracking-wide shadow-lg shadow-cyan-500/35 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>ROZPOCZNIJ INSPEKCJĘ</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
