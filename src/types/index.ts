export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description?: string;
  type?: 'warning' | 'info' | 'action' | 'success';
}

export interface InspectionStep {
  id: number;
  title: string;
  shortLabel: string;
  description: string;
  hint: string;
  warning?: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  hotspots: Hotspot[];
  badgeColor?: string;
}

export interface CaravanVehicle {
  id: string;
  brand: string;
  modelName: string;
  year: number;
  dmc: string; // e.g. "1350 kg"
  length: string; // e.g. "4.90 m"
  berths: string; // e.g. "4-osobowa"
  axle: string; // e.g. "1-osiowa"
  tagline: string;
  badge: string;
  isAvailable: boolean;
  modelPath: string;
}

export interface ChecklistState {
  selectedVehicleId: string;
  isGarage: boolean;
  currentStepIndex: number;
  completedSteps: number[]; // step ids
  isCompleted: boolean;
  isInspecting: boolean;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  turntableAngle: number;
  setTurntableAngle: (angle: number) => void;
  openGarage: () => void;
  selectVehicle: (id: string) => void;
  startInspection: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  toggleStepCompleted: (id: number) => void;
  resetChecklist: () => void;
  toggleSound: () => void;
  toggleHaptics: () => void;
}
