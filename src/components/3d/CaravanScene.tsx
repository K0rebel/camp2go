import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CaravanModel } from './CaravanModel';
import { CameraRig } from './CameraRig';
import { HotspotMarker } from './HotspotMarker';
import { useChecklistStore } from '../../store/useChecklistStore';
import { INSPECTION_STEPS } from '../../config/stepsConfig';

// Need for Speed Showroom Glowing Turntable Floor
const GaragePodium: React.FC = () => {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.15;
    }
    if (pulseRingRef.current) {
      const p = (t * 0.8) % 1.0;
      pulseRingRef.current.scale.set(1 + p * 0.3, 1 + p * 0.3, 1);
      (pulseRingRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.4;
    }
  });

  return (
    <group position={[0, 0.005, -0.2]}>
      {/* Dark Studio Base Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.4, 64]} />
        <meshBasicMaterial color="#020813" />
      </mesh>

      {/* Primary Cyan Rim Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.32, 4.38, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
      </mesh>

      {/* Rotating Cyber Decal Ring */}
      <mesh ref={outerRingRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.7, 3.75, 48]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.5} />
      </mesh>

      {/* Inner Glowing Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.24, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* Subtle Radial Pulse Ring */}
      <mesh ref={pulseRingRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.38, 4.45, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Neon Underglow Floor Spot */}
      <pointLight position={[0, 0.15, 0]} color="#00d2ff" intensity={1.8} distance={6} />
    </group>
  );
};

export const CaravanScene: React.FC = () => {
  const currentStepIndex = useChecklistStore((state) => state.currentStepIndex);
  const isInspecting = useChecklistStore((state) => state.isInspecting);
  const isCompleted = useChecklistStore((state) => state.isCompleted);
  const isGarage = useChecklistStore((state) => state.isGarage);
  const nextStep = useChecklistStore((state) => state.nextStep);

  const currentStep = INSPECTION_STEPS[currentStepIndex];

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [6.8, 3.2, 6.2], fov: 42, near: 0.1, far: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030b17']} />

        {/* Ambient & Studio Lighting */}
        <ambientLight intensity={0.85} />
        
        {/* Main Sun Key Light */}
        <directionalLight
          position={[6, 9, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-bias={-0.0001}
        />

        {/* Sky / Side Fill Light */}
        <directionalLight position={[-6, 5, -4]} intensity={0.7} color="#38bdf8" />

        {/* Ground Warm Bounce Light */}
        <directionalLight position={[0, -4, 0]} intensity={0.3} color="#94a3b8" />

        {/* Rear Rim Light for crisp contour separation */}
        <pointLight position={[0, 4, -5]} intensity={1.0} color="#00d2ff" />

        {/* Camera Controller: OrbitControls in Garage Mode, CameraRig in Inspection */}
        {isGarage ? (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={1.4}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 - 0.05}
            target={[0, 1.2, 0.0]}
          />
        ) : (
          <CameraRig />
        )}

        {/* Main 3D Caravan Model */}
        <Suspense fallback={null}>
          <CaravanModel />
          
          {/* Garage Showcase Podium on floor */}
          {isGarage && <GaragePodium />}

          {/* Ground Soft Contact Shadows */}
          <ContactShadows
            position={[0, 0.01, -0.2]}
            opacity={0.75}
            scale={10.5}
            blur={2.4}
            far={3.5}
            resolution={512}
            color="#000000"
          />

          {/* Active Step Hotspots (Only during inspection) */}
          {!isGarage && isInspecting && !isCompleted && currentStep?.hotspots.map((hotspot) => (
            <HotspotMarker
              key={hotspot.id}
              hotspot={hotspot}
              onClick={nextStep}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};
