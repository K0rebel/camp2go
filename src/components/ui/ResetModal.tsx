import React from 'react';
import { useChecklistStore } from '../../store/useChecklistStore';
import { AlertTriangle, X } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onClose }) => {
  const resetChecklist = useChecklistStore((state) => state.resetChecklist);

  if (!isOpen) return null;

  const handleConfirm = () => {
    resetChecklist();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Zresetować inspekcję?
            </h3>
            <p className="text-xs text-slate-400">
              Wszystkie odznaczone punkty zostaną wyzerowane.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-colors"
          >
            Tak, zresetuj
          </button>
        </div>
      </div>
    </div>
  );
};
