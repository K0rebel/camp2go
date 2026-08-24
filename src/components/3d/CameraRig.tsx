import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { INSPECTION_STEPS } from '../../config/stepsConfig';
import { useChecklistStore } from '../../store/useChecklistStore';

const DEFAULT_INTRO_POS = new THREE.Vector3(6.5, 3.2, 5.8);
const DEFAULT_INTRO_TARGET = new THREE.Vector3(0, 1.3, 0);

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const currentStepIndex = useChecklistStore((state) => state.currentStepIndex);
  const isInspecting = useChecklistStore((state) => state.isInspecting);
  const isCompleted = useChecklistStore((state) => state.isCompleted);

  // Target vectors
  const desiredPos = useRef(new THREE.Vector3().copy(DEFAULT_INTRO_POS));
  const desiredTarget = useRef(new THREE.Vector3().copy(DEFAULT_INTRO_TARGET));
  const currentTarget = useRef(new THREE.Vector3().copy(DEFAULT_INTRO_TARGET));

  useFrame((state, delta) => {
    // Determine where camera should be
    if (!isInspecting || isCompleted) {
      // Gentle cinematic rotation when idle or finished
      const time = state.clock.getElapsedTime() * 0.25;
      const radius = 6.8;
      desiredPos.current.set(
        Math.sin(time) * radius,
        2.8 + Math.sin(time * 0.5) * 0.4,
        Math.cos(time) * radius
      );
      desiredTarget.current.copy(DEFAULT_INTRO_TARGET);
    } else {
      const step = INSPECTION_STEPS[currentStepIndex];
      if (step) {
        desiredPos.current.set(
          step.cameraPosition[0],
          step.cameraPosition[1],
          step.cameraPosition[2]
        );
        desiredTarget.current.set(
          step.cameraTarget[0],
          step.cameraTarget[1],
          step.cameraTarget[2]
        );
      }
    }

    // Smooth damp towards desired position and target (smooth interpolation at ~60fps)
    const smoothingSpeed = isInspecting ? 3.8 : 2.0;
    const factor = 1.0 - Math.exp(-smoothingSpeed * delta);

    camera.position.lerp(desiredPos.current, factor);
    currentTarget.current.lerp(desiredTarget.current, factor);

    camera.lookAt(currentTarget.current);
  });

  return null;
};
