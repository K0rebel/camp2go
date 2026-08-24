import { create } from 'zustand';
import { ChecklistState } from '../types';
import { INSPECTION_STEPS } from '../config/stepsConfig';
import { audioManager } from '../utils/audioFeedback';

const STORAGE_KEY = 'camp2go_checklist_state_v2';

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      selectedVehicleId: 'hobby-490',
      isGarage: true,
      currentStepIndex: 0,
      completedSteps: [],
      isCompleted: false,
      isInspecting: false,
      soundEnabled: true,
      hapticsEnabled: true,
      turntableAngle: 0,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        selectedVehicleId: parsed.selectedVehicleId || 'hobby-490',
        isGarage: parsed.isGarage ?? true,
        currentStepIndex: parsed.currentStepIndex || 0,
        completedSteps: parsed.completedSteps || [],
        isCompleted: parsed.isCompleted || false,
        isInspecting: parsed.isInspecting ?? false,
        soundEnabled: parsed.soundEnabled ?? true,
        hapticsEnabled: parsed.hapticsEnabled ?? true,
        turntableAngle: 0,
      };
    }
  } catch {
    // fallback
  }

  return {
    selectedVehicleId: 'hobby-490',
    isGarage: true,
    currentStepIndex: 0,
    completedSteps: [],
    isCompleted: false,
    isInspecting: false,
    soundEnabled: true,
    hapticsEnabled: true,
    turntableAngle: 0,
  };
};

export const useChecklistStore = create<ChecklistState>((set, get) => {
  const initial = getInitialState();

  const persist = (state: Partial<ChecklistState>) => {
    try {
      const current = get();
      const toSave = {
        selectedVehicleId: state.selectedVehicleId ?? current.selectedVehicleId,
        isGarage: state.isGarage ?? current.isGarage,
        currentStepIndex: state.currentStepIndex ?? current.currentStepIndex,
        completedSteps: state.completedSteps ?? current.completedSteps,
        isCompleted: state.isCompleted ?? current.isCompleted,
        isInspecting: state.isInspecting ?? current.isInspecting,
        soundEnabled: state.soundEnabled ?? current.soundEnabled,
        hapticsEnabled: state.hapticsEnabled ?? current.hapticsEnabled,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  };

  return {
    ...initial,

    setTurntableAngle: (angle: number) => {
      set({ turntableAngle: angle });
    },

    openGarage: () => {
      if (get().soundEnabled) audioManager.playPrevSound();
      set({ isGarage: true, isInspecting: false, isCompleted: false });
      persist({ isGarage: true, isInspecting: false, isCompleted: false });
    },

    selectVehicle: (id: string) => {
      if (get().soundEnabled) audioManager.playStepSound();
      if (get().hapticsEnabled) audioManager.triggerHaptics(30);
      set({ selectedVehicleId: id });
      persist({ selectedVehicleId: id });
    },

    startInspection: () => {
      if (get().soundEnabled) audioManager.playSuccessSound();
      if (get().hapticsEnabled) audioManager.triggerHaptics([40, 30, 60]);
      set({
        isGarage: false,
        isInspecting: true,
        isCompleted: false,
        currentStepIndex: 0,
      });
      persist({
        isGarage: false,
        isInspecting: true,
        isCompleted: false,
        currentStepIndex: 0,
      });
    },

    nextStep: () => {
      const { currentStepIndex, completedSteps, soundEnabled, hapticsEnabled } = get();
      const currentStep = INSPECTION_STEPS[currentStepIndex];
      
      const newCompleted = Array.from(new Set([...completedSteps, currentStep.id]));
      
      if (currentStepIndex + 1 >= INSPECTION_STEPS.length) {
        if (soundEnabled) audioManager.playSuccessSound();
        if (hapticsEnabled) audioManager.triggerHaptics([60, 40, 120]);
        set({
          completedSteps: newCompleted,
          isCompleted: true,
        });
        persist({ completedSteps: newCompleted, isCompleted: true });
      } else {
        if (soundEnabled) audioManager.playStepSound();
        if (hapticsEnabled) audioManager.triggerHaptics(35);
        const nextIdx = currentStepIndex + 1;
        set({
          currentStepIndex: nextIdx,
          completedSteps: newCompleted,
        });
        persist({ currentStepIndex: nextIdx, completedSteps: newCompleted });
      }
    },

    prevStep: () => {
      const { currentStepIndex, soundEnabled, hapticsEnabled } = get();
      if (currentStepIndex > 0) {
        if (soundEnabled) audioManager.playPrevSound();
        if (hapticsEnabled) audioManager.triggerHaptics(25);
        const prevIdx = currentStepIndex - 1;
        set({ currentStepIndex: prevIdx, isCompleted: false });
        persist({ currentStepIndex: prevIdx, isCompleted: false });
      }
    },

    goToStep: (index: number) => {
      if (index >= 0 && index < INSPECTION_STEPS.length) {
        if (get().soundEnabled) audioManager.playStepSound();
        set({ currentStepIndex: index, isCompleted: false, isGarage: false, isInspecting: true });
        persist({ currentStepIndex: index, isCompleted: false, isGarage: false, isInspecting: true });
      }
    },

    toggleStepCompleted: (id: number) => {
      const { completedSteps, soundEnabled, hapticsEnabled } = get();
      const exists = completedSteps.includes(id);
      const updated = exists ? completedSteps.filter(s => s !== id) : [...completedSteps, id];
      
      if (soundEnabled) audioManager.playStepSound();
      if (hapticsEnabled) audioManager.triggerHaptics(25);
      
      const allDone = INSPECTION_STEPS.every(s => updated.includes(s.id));
      set({ completedSteps: updated, isCompleted: allDone });
      persist({ completedSteps: updated, isCompleted: allDone });
    },

    resetChecklist: () => {
      if (get().soundEnabled) audioManager.playPrevSound();
      if (get().hapticsEnabled) audioManager.triggerHaptics([40, 40]);
      set({
        currentStepIndex: 0,
        completedSteps: [],
        isCompleted: false,
        isInspecting: false,
        isGarage: true,
      });
      persist({
        currentStepIndex: 0,
        completedSteps: [],
        isCompleted: false,
        isInspecting: false,
        isGarage: true,
      });
    },

    toggleSound: () => {
      const newVal = !get().soundEnabled;
      set({ soundEnabled: newVal });
      persist({ soundEnabled: newVal });
    },

    toggleHaptics: () => {
      const newVal = !get().hapticsEnabled;
      if (newVal) audioManager.triggerHaptics(40);
      set({ hapticsEnabled: newVal });
      persist({ hapticsEnabled: newVal });
    }
  };
});
