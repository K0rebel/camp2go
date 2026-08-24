import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { INSPECTION_STEPS } from '../../config/stepsConfig';
import { useChecklistStore } from '../../store/useChecklistStore';

export const CameraController: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera, size } = useThree();
  const currentStepIndex = useChecklistStore((state) => state.currentStepIndex);
  const isGarage = useChecklistStore((state) => state.isGarage);
  const isInspecting = useChecklistStore((state) => state.isInspecting);
  const isCompleted = useChecklistStore((state) => state.isCompleted);

  const targetPos = useRef(new THREE.Vector3(7.2, 3.2, 6.5));
  const targetLook = useRef(new THREE.Vector3(0, 1.25, 0));
  const isTransitioning = useRef(true);

  // When step or mode changes, smoothly interpolate to new camera perspective
  useEffect(() => {
    const aspect = size.width / size.height;
    const isMobilePortrait = aspect < 0.75;

    if (isGarage || !isInspecting || isCompleted) {
      const radius = isMobilePortrait ? 9.2 : 7.2;
      targetPos.current.set(radius * 0.72, 3.2, radius * 0.72);
      targetLook.current.set(0, isMobilePortrait ? 1.35 : 1.2, 0);
    } else {
      const step = INSPECTION_STEPS[currentStepIndex];
      if (step) {
        const distMult = isMobilePortrait ? 1.25 : 1.0;
        const targetYShift = isMobilePortrait ? 0.25 : 0.0;

        const tx = step.cameraTarget[0];
        const ty = step.cameraTarget[1] + targetYShift;
        const tz = step.cameraTarget[2];

        const cdx = step.cameraPosition[0] - step.cameraTarget[0];
        const cdy = step.cameraPosition[1] - step.cameraTarget[1];
        const cdz = step.cameraPosition[2] - step.cameraTarget[2];

        targetPos.current.set(tx + cdx * distMult, ty + cdy * distMult, tz + cdz * distMult);
        targetLook.current.set(tx, ty, tz);
      }
    }
    isTransitioning.current = true;
  }, [currentStepIndex, isGarage, isInspecting, isCompleted, size.width, size.height]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (isTransitioning.current) {
      // If user starts touching / dragging / pinching, immediately hand over full manual control
      // @ts-ignore
      if (controls.state !== -1) {
        isTransitioning.current = false;
        return;
      }

      const factor = 1.0 - Math.exp(-4.2 * delta);
      camera.position.lerp(targetPos.current, factor);
      controls.target.lerp(targetLook.current, factor);
      controls.update();

      if (
        camera.position.distanceTo(targetPos.current) < 0.04 &&
        controls.target.distanceTo(targetLook.current) < 0.04
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      enableDamping={true}
      dampingFactor={0.06}
      minDistance={1.2}
      maxDistance={22}
      minPolarAngle={0.05}
      maxPolarAngle={Math.PI / 2 + 0.05}
      autoRotate={isGarage}
      autoRotateSpeed={0.9}
    />
  );
};
