import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Hotspot } from '../../types';
import { CheckCircle } from 'lucide-react';

interface HotspotMarkerProps {
  hotspot: Hotspot;
  onClick?: () => void;
}

const UNIFIED_COLOR = '#00d2ff';

export const HotspotMarker: React.FC<HotspotMarkerProps> = ({ hotspot, onClick }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Smooth pulse animation in 3D space
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      const scale = 1 + (Math.sin(t * 3.5) + 1) * 0.4;
      ringRef.current.scale.set(scale, scale, scale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8 - (scale - 1) * 0.8;
    }
    if (coreRef.current) {
      const coreScale = 1 + Math.sin(t * 4) * 0.15;
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
    }
  });

  return (
    <group position={hotspot.position}>
      {/* 3D Glowing Center Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={UNIFIED_COLOR} />
      </mesh>

      {/* 3D Pulsing Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.09, 24]} />
        <meshBasicMaterial color={UNIFIED_COLOR} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Clean, Compact HTML Label */}
      <Html
        center
        position={[0, 0.14, 0]}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <button
          onClick={onClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-lg border backdrop-blur-md transition-transform active:scale-95 hover:scale-105 whitespace-nowrap cursor-pointer bg-slate-900/90 text-cyan-300 border-cyan-400/60 shadow-cyan-500/20"
        >
          <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>{hotspot.title}</span>
        </button>
      </Html>
    </group>
  );
};
