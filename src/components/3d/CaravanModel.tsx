import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const CaravanModel: React.FC = () => {
  const gltf = useGLTF('/models/caravan.glb');

  // Materials for auxiliary equipment and modeled parts
  const materials = useMemo(() => {
    return {
      chassisGalvanized: new THREE.MeshStandardMaterial({
        color: '#94a3b8',
        roughness: 0.35,
        metalness: 0.85,
      }),
      darkChassisSteel: new THREE.MeshStandardMaterial({
        color: '#334155',
        roughness: 0.45,
        metalness: 0.75,
      }),
      rubberTireBlack: new THREE.MeshStandardMaterial({
        color: '#1e293b',
        roughness: 0.85,
        metalness: 0.05,
      }),
      silverHubcap: new THREE.MeshStandardMaterial({
        color: '#e2e8f0',
        roughness: 0.25,
        metalness: 0.9,
      }),
      moverRollerRed: new THREE.MeshStandardMaterial({
        color: '#dc2626',
        roughness: 0.4,
        metalness: 0.5,
      }),
      motorHousingBlack: new THREE.MeshStandardMaterial({
        color: '#0f172a',
        roughness: 0.4,
        metalness: 0.6,
      }),
      gasBottleGrey: new THREE.MeshStandardMaterial({
        color: '#64748b',
        roughness: 0.45,
        metalness: 0.5,
      }),
      brassValve: new THREE.MeshStandardMaterial({
        color: '#eab308',
        roughness: 0.3,
        metalness: 0.85,
      }),
      redLever: new THREE.MeshStandardMaterial({
        color: '#ef4444',
        roughness: 0.3,
        metalness: 0.2,
      }),
      // Entrance Door materials
      doorFrameDark: new THREE.MeshStandardMaterial({
        color: '#1e293b',
        roughness: 0.4,
        metalness: 0.25,
      }),
      doorPanelHobbyWhite: new THREE.MeshStandardMaterial({
        color: '#f8fafc',
        roughness: 0.25,
        metalness: 0.05,
      }),
      doorHandleBlack: new THREE.MeshStandardMaterial({
        color: '#090d16',
        roughness: 0.3,
        metalness: 0.7,
      }),
      // Roof Skylights (Heki) materials
      hekiFrameWhite: new THREE.MeshStandardMaterial({
        color: '#f8fafc',
        roughness: 0.3,
        metalness: 0.1,
      }),
      hekiAcrylicGlass: new THREE.MeshPhysicalMaterial({
        color: '#1e293b',
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.55,
        transparent: true,
        opacity: 0.88,
        ior: 1.49,
      }),
      hekiAluHandle: new THREE.MeshStandardMaterial({
        color: '#cbd5e1',
        roughness: 0.2,
        metalness: 0.9,
      }),
    };
  }, []);

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
              mat.map.generateMipmaps = true;
              mat.map.minFilter = THREE.LinearMipmapLinearFilter;
              mat.map.magFilter = THREE.LinearFilter;
              mat.needsUpdate = true;
            }
          }
        }
      });
    }
  }, [gltf]);

  return (
    <group position={[0, 0, 0]}>
      {/* ================= 1. PRIMARY MESHY CARAVAN BODY ================= */}
      <group position={[0, 1.53, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <primitive object={gltf.scene} scale={[3.6, 3.6, 3.6]} />
      </group>

      {/* ================= 3. ENTRANCE DOOR (DRZWI WEJŚCIOWE) ON RIGHT WALL (+X = 1.418, Z = 0.25) ================= */}
      <group position={[1.418, 1.35, 0.25]}>
        {/* Dark Outer Door Frame Trim */}
        <mesh material={materials.doorFrameDark}>
          <boxGeometry args={[0.015, 1.62, 0.65]} />
        </mesh>
        {/* Main White Door Panel Leaf */}
        <mesh position={[0.005, 0, 0]} material={materials.doorPanelHobbyWhite}>
          <boxGeometry args={[0.016, 1.58, 0.61]} />
        </mesh>
        {/* Stable-Door Split Horizontal Groove (Hobby divider) */}
        <mesh position={[0.008, -0.15, 0]} material={materials.doorFrameDark}>
          <boxGeometry args={[0.015, 0.02, 0.61]} />
        </mesh>
        {/* Upper Door Window (Tinted Acrylic Window with Frame) */}
        <group position={[0.008, 0.38, 0]}>
          <mesh material={materials.doorFrameDark}>
            <boxGeometry args={[0.016, 0.52, 0.42]} />
          </mesh>
          <mesh position={[0.003, 0, 0]} material={materials.hekiAcrylicGlass}>
            <boxGeometry args={[0.016, 0.48, 0.38]} />
          </mesh>
        </group>
        {/* Exterior Door Handle & Key Cylinder */}
        <group position={[0.018, -0.12, -0.23]}>
          <mesh material={materials.doorHandleBlack}>
            <boxGeometry args={[0.025, 0.14, 0.05]} />
          </mesh>
          {/* Keyhole Cylinder */}
          <mesh position={[0.014, 0.03, 0]} rotation={[0, 0, 1.57]} material={materials.silverHubcap}>
            <cylinderGeometry args={[0.007, 0.007, 0.006, 8]} />
          </mesh>
        </group>
        {/* Heavy Duty Door Hinges */}
        <mesh position={[0.015, 0.55, 0.30]} material={materials.doorHandleBlack}>
          <boxGeometry args={[0.02, 0.06, 0.02]} />
        </mesh>
        <mesh position={[0.015, -0.55, 0.30]} material={materials.doorHandleBlack}>
          <boxGeometry args={[0.02, 0.06, 0.02]} />
        </mesh>
        {/* Chrome Entry Grab Handle Next to Door */}
        <group position={[0.018, 0.05, -0.38]}>
          <mesh material={materials.hekiAluHandle}>
            <cylinderGeometry args={[0.012, 0.012, 0.35, 12]} />
          </mesh>
        </group>
        {/* Stowed Under-Chassis Step (Schodek Wejściowy) */}
        <group position={[-0.05, -0.92, 0]}>
          <mesh material={materials.darkChassisSteel}>
            <boxGeometry args={[0.18, 0.04, 0.52]} />
          </mesh>
          <mesh position={[0, -0.015, 0]} material={materials.chassisGalvanized}>
            <boxGeometry args={[0.16, 0.015, 0.48]} />
          </mesh>
        </group>
      </group>

      {/* ================= 4. JOCKEY WHEEL & FRONT A-FRAME COUPLING (KOŁO JEZDNE/MANEWROWE) ================= */}
      {/* Front is at negative Z (-3.42 max). A-Frame hitch at -2.85 */}
      <group position={[0.08, 0.42, -2.85]}>
        {/* Vertical Galvanized Steel Shaft Tube */}
        <mesh position={[0, 0.12, 0]} material={materials.chassisGalvanized}>
          <cylinderGeometry args={[0.022, 0.022, 0.58, 16]} />
        </mesh>
        {/* Top Rotating T-Crank Handle (Korbka koła podporowego) */}
        <group position={[0, 0.42, 0]}>
          <mesh material={materials.chassisGalvanized}>
            <boxGeometry args={[0.02, 0.03, 0.02]} />
          </mesh>
          <mesh position={[0, 0.02, 0.06]} rotation={[1.57, 0, 0]} material={materials.chassisGalvanized}>
            <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
          </mesh>
          {/* Black Grip Handle Knob */}
          <mesh position={[0, 0.06, 0.12]} material={materials.doorHandleBlack}>
            <cylinderGeometry args={[0.014, 0.014, 0.08, 12]} />
          </mesh>
        </group>
        {/* A-Frame Clamp Lock Bracket & Tightening Lever */}
        <mesh position={[-0.03, 0.15, 0]} material={materials.darkChassisSteel}>
          <boxGeometry args={[0.06, 0.08, 0.06]} />
        </mesh>
        <mesh position={[-0.06, 0.17, 0]} rotation={[0, 0, 0.5]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.012, 0.08, 0.02]} />
        </mesh>
        {/* Lower Steel Fork Bracket */}
        <mesh position={[0, -0.15, 0]} material={materials.darkChassisSteel}>
          <boxGeometry args={[0.05, 0.10, 0.09]} />
        </mesh>
        {/* Solid Rubber Jockey Wheel Tire (in raised transport position) */}
        <group position={[0, -0.22, 0]} rotation={[0, 0, 1.57]}>
          <mesh material={materials.rubberTireBlack}>
            <cylinderGeometry args={[0.10, 0.10, 0.05, 24]} />
          </mesh>
          <mesh material={materials.silverHubcap}>
            <cylinderGeometry args={[0.06, 0.06, 0.054, 16]} />
          </mesh>
        </group>
        {/* Handbrake Lever on Hitch (Hamulec ręczny) */}
        <group position={[-0.08, 0.16, -0.25]} rotation={[0.35, 0, 0]}>
          <mesh material={materials.chassisGalvanized}>
            <boxGeometry args={[0.02, 0.22, 0.025]} />
          </mesh>
          <mesh position={[0, 0.12, 0]} material={materials.redLever}>
            <boxGeometry args={[0.024, 0.04, 0.03]} />
          </mesh>
        </group>
        {/* Red Breakaway Safety Cable (Linka zrywkowa) */}
        <mesh position={[-0.08, 0.05, -0.35]} rotation={[-0.4, 0.2, 0]} material={materials.redLever}>
          <cylinderGeometry args={[0.004, 0.004, 0.25, 6]} />
        </mesh>
      </group>

      {/* ================= 5. MOVERS (Z = -0.25, Y = 0.35, X = ±1.35) ================= */}
      {/* Right Mover Unit */}
      <group position={[1.35, 0.35, -0.25]}>
        <mesh position={[-0.10, 0, 0]} material={materials.darkChassisSteel}>
          <boxGeometry args={[0.16, 0.08, 0.10]} />
        </mesh>
        <mesh position={[-0.04, 0, 0]} rotation={[0, 0, 1.57]} material={materials.motorHousingBlack}>
          <cylinderGeometry args={[0.042, 0.042, 0.14, 16]} />
        </mesh>
        <mesh position={[0.05, 0, -0.02]} rotation={[0, 0, 1.57]} material={materials.moverRollerRed}>
          <cylinderGeometry args={[0.038, 0.038, 0.15, 20]} />
        </mesh>
        <mesh position={[0.14, 0, 0]} rotation={[0, 0, 1.57]} material={materials.chassisGalvanized}>
          <cylinderGeometry args={[0.015, 0.015, 0.04, 6]} />
        </mesh>
      </group>

      {/* Left Mover Unit */}
      <group position={[-1.35, 0.35, -0.25]}>
        <mesh position={[0.10, 0, 0]} material={materials.darkChassisSteel}>
          <boxGeometry args={[0.16, 0.08, 0.10]} />
        </mesh>
        <mesh position={[0.04, 0, 0]} rotation={[0, 0, 1.57]} material={materials.motorHousingBlack}>
          <cylinderGeometry args={[0.042, 0.042, 0.14, 16]} />
        </mesh>
        <mesh position={[-0.05, 0, -0.02]} rotation={[0, 0, 1.57]} material={materials.moverRollerRed}>
          <cylinderGeometry args={[0.038, 0.038, 0.15, 20]} />
        </mesh>
        <mesh position={[-0.14, 0, 0]} rotation={[0, 0, 1.57]} material={materials.chassisGalvanized}>
          <cylinderGeometry args={[0.015, 0.015, 0.04, 6]} />
        </mesh>
      </group>

      {/* Cross-Axle Connecting Bar */}
      <mesh position={[0, 0.35, -0.25]} rotation={[0, 0, 1.57]} material={materials.darkChassisSteel}>
        <cylinderGeometry args={[0.018, 0.018, 2.50, 12]} />
      </mesh>

      {/* ================= 6. 4 CORNER STEADY STABILIZER LEGS ================= */}
      {/* Front Right Corner Steady (Front is -Z) */}
      <group position={[1.28, 0.48, -1.48]}>
        <mesh position={[0, -0.04, -0.16]} rotation={[0.08, 0, 0]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.07, 0.04, 0.36]} />
        </mesh>
        <mesh position={[0, -0.065, 0.02]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.15, 0.018, 0.15]} />
        </mesh>
        <mesh position={[0.05, -0.04, 0.05]} rotation={[0, 0, 1.57]} material={materials.silverHubcap}>
          <cylinderGeometry args={[0.015, 0.015, 0.05, 6]} />
        </mesh>
      </group>

      {/* Front Left Corner Steady */}
      <group position={[-1.28, 0.48, -1.48]}>
        <mesh position={[0, -0.04, -0.16]} rotation={[0.08, 0, 0]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.07, 0.04, 0.36]} />
        </mesh>
        <mesh position={[0, -0.065, 0.02]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.15, 0.018, 0.15]} />
        </mesh>
        <mesh position={[-0.05, -0.04, 0.05]} rotation={[0, 0, 1.57]} material={materials.silverHubcap}>
          <cylinderGeometry args={[0.015, 0.015, 0.05, 6]} />
        </mesh>
      </group>

      {/* Rear Right Corner Steady (Rear is +Z) */}
      <group position={[1.22, 0.40, 2.99]}>
        <mesh position={[0, -0.04, 0.16]} rotation={[-0.08, 0, 0]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.07, 0.04, 0.36]} />
        </mesh>
        <mesh position={[0, -0.065, -0.02]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.15, 0.018, 0.15]} />
        </mesh>
        <mesh position={[0.05, -0.04, -0.05]} rotation={[0, 0, 1.57]} material={materials.silverHubcap}>
          <cylinderGeometry args={[0.015, 0.015, 0.05, 6]} />
        </mesh>
      </group>

      {/* Rear Left Corner Steady */}
      <group position={[-1.22, 0.40, 2.99]}>
        <mesh position={[0, -0.04, 0.16]} rotation={[-0.08, 0, 0]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.07, 0.04, 0.36]} />
        </mesh>
        <mesh position={[0, -0.065, -0.02]} material={materials.chassisGalvanized}>
          <boxGeometry args={[0.15, 0.018, 0.15]} />
        </mesh>
        <mesh position={[-0.05, -0.04, -0.05]} rotation={[0, 0, 1.57]} material={materials.silverHubcap}>
          <cylinderGeometry args={[0.015, 0.015, 0.05, 6]} />
        </mesh>
      </group>

      {/* ================= 7. GAS BOTTLES & HEBEL IN FRONT LOCKER (Z = -2.10) ================= */}
      {/* Right Gas Cylinder (11kg) */}
      <group position={[0.30, 0.95, -2.10]}>
        <mesh material={materials.gasBottleGrey}>
          <cylinderGeometry args={[0.13, 0.13, 0.40, 18]} />
        </mesh>
        <mesh position={[0, 0.23, 0]} material={materials.brassValve}>
          <cylinderGeometry args={[0.025, 0.025, 0.05, 12]} />
        </mesh>
      </group>

      {/* Left Gas Cylinder */}
      <group position={[-0.30, 0.95, -2.10]}>
        <mesh material={materials.gasBottleGrey}>
          <cylinderGeometry args={[0.13, 0.13, 0.40, 18]} />
        </mesh>
        <mesh position={[0, 0.23, 0]} material={materials.brassValve}>
          <cylinderGeometry args={[0.025, 0.025, 0.05, 12]} />
        </mesh>
      </group>

      {/* 12V Battery Master Switch (Hebel) */}
      <group position={[-0.55, 1.00, -2.15]}>
        <mesh material={materials.chassisGalvanized}>
          <boxGeometry args={[0.05, 0.07, 0.05]} />
        </mesh>
        <mesh position={[0, 0.04, 0]} rotation={[0.4, 0, 0]} material={materials.redLever}>
          <boxGeometry args={[0.02, 0.07, 0.02]} />
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload('/models/caravan.glb');
