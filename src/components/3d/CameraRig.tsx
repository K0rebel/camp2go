import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { INSPECTION_STEPS } from '../../config/stepsConfig';
import { useChecklistStore } from '../../store/useChecklistStore';

const DEFAULT_INTRO_POS = new THREE.Vector3(7.2, 3.2, 6.5);
const DEFAULT_INTRO_TARGET = new THREE.Vector3(0, 1.3, 0);

export const CameraRig: React.FC = () => {
  const { camera, size } = useThree();
  const currentStepIndex = useChecklistStore((state) => state.currentStepIndex);
  const isInspecting = useChecklistStore((state) => state.isInspecting);
  const isCompleted = useChecklistStore((state) => state.isCompleted);

  // Target vectors
  const desiredPos = useRef(new THREE.Vector3().copy(DEFAULT_INTRO_POS));
  const desiredTarget = useRef(new THREE.Vector3().copy(DEFAULT_INTRO_TARGET));
  const currentTarget = useRef(new THREE.Vector3().copy(DEFAULT_INTRO_TARGET));

  useFrame((state, delta) => {
    const aspect = size.width / size.height;
    const isMobilePortrait = aspect < 0.75;

    // Determine where camera should be
    if (!isInspecting || isCompleted) {
      // Gentle cinematic rotation when idle or finished
      const time = state.clock.getElapsedTime() * 0.22;
      const radius = isMobilePortrait ? 8.2 : 7.2;
      desiredPos.current.set(
        Math.sin(time) * radius,
        3.0 + Math.sin(time * 0.5) * 0.4,
        Math.cos(time) * radius
      );
      desiredTarget.current.set(0, isMobilePortrait ? 1.4 : 1.25, 0);
    } else {
      const step = INSPECTION_STEPS[currentStepIndex];
      if (step) {
        // Distance scaling multiplier for mobile portrait screens
        const distMult = isMobilePortrait ? 1.22 : 1.0;
        const targetYShift = isMobilePortrait ? 0.25 : 0.0;

        const targetX = step.cameraTarget[0];
        const targetY = step.cameraTarget[1] + targetYShift;
        const targetZ = step.cameraTarget[2];

        const camDirX = step.cameraPosition[0] - step.cameraTarget[0];
        const camDirY = step.cameraPosition[1] - step.cameraTarget[1];
        const camDirZ = step.cameraPosition[2] - step.cameraTarget[2];

        desiredPos.current.set(
          targetX + camDirX * distMult,
          targetY + camDirY * distMult,
          targetZ + camDirZ * distMult
        );
        desiredTarget.current.set(targetX, targetY, targetZ);
      }
    }

    // Smooth damp towards desired position and target
    const smoothingSpeed = isInspecting ? 3.8 : 2.0;
    const factor = 1.0 - Math.exp(-smoothingSpeed * delta);

    camera.position.lerp(desiredPos.current, factor);
    currentTarget.current.lerp(desiredTarget.current, factor);

    camera.lookAt(currentTarget.current);
  });

  return null;
};
