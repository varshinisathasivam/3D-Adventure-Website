import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Mission } from '../../types';
import { Avatar3D } from '../../components/avatar/Avatar3D';
import { MissionBeacon } from '../../components/3d/MissionBeacon';
import { useGameStore } from '../../store/useGameStore';

interface FutureCitySceneProps {
  missions: Mission[];
  completedMissionIds: string[];
  onSelectMission: (m: Mission) => void;
}

export const FutureCityScene: React.FC<FutureCitySceneProps> = ({
  missions,
  completedMissionIds,
  onSelectMission,
}) => {
  const avatar = useGameStore((s) => s.avatar);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  const doneCount = missions.filter((m) => completedMissionIds.includes(m.id)).length;
  const restorationRatio = doneCount / Math.max(1, missions.length);
  const solarActive = completedMissionIds.includes('city-1');
  const transitActive = completedMissionIds.includes('city-2');
  const greenActive = completedMissionIds.includes('city-3');

  const turbineRef = useRef<THREE.Group>(null);
  const tramRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (turbineRef.current) {
      turbineRef.current.rotation.z += delta * (1.2 + restorationRatio * 1.8);
    }
    if (tramRef.current && transitActive) {
      tramRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.7) * 5.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 12, 6]} intensity={1.2} color="#e0f2fe" />

      {/* City Plaza Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[9.5, 24]} />
        <meshStandardMaterial color={greenActive ? '#115e59' : '#1e293b'} flatShading />
      </mesh>

      {/* Clean Transit Cross Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[1.4, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.02, 0]}>
        <planeGeometry args={[1.4, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Stylized Eco-Buildings */}
      {[
        [-3.5, 1.5, -3.5, 1.2, 3.0],
        [3.6, 1.9, -3.4, 1.3, 3.8],
        [-3.6, 1.3, 3.4, 1.1, 2.6],
        [3.6, 1.6, 3.4, 1.2, 3.2],
      ].map(([x, y, z, w, h], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh>
            <boxGeometry args={[w, h, w]} />
            <meshStandardMaterial
              color={restorationRatio >= 0.6 ? '#0ea5e9' : '#475569'}
              roughness={0.5}
              flatShading
            />
          </mesh>
          {/* Rooftop Solar Canopy */}
          {solarActive && (
            <mesh position={[0, h / 2 + 0.1, 0]}>
              <boxGeometry args={[w * 0.9, 0.12, w * 0.9]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.4} />
            </mesh>
          )}
          {/* Vertical Garden Strip */}
          {greenActive && (
            <mesh position={[0, 0, w / 2 + 0.05]}>
              <boxGeometry args={[w * 0.45, h * 0.8, 0.08]} />
              <meshStandardMaterial color="#22c55e" flatShading />
            </mesh>
          )}
        </group>
      ))}

      {/* Wind Turbine */}
      <group position={[0, 0, -2.5]}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 3.0, 6]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <group ref={turbineRef} position={[0, 2.95, 0.15]}>
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((rot, i) => (
            <mesh key={i} rotation={[0, 0, rot]} position={[0, 0, 0]}>
              <boxGeometry args={[0.1, 1.1, 0.04]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Electric Tram on Boulevard (city-2) */}
      {transitActive && (
        <mesh ref={tramRef} position={[0, 0.24, 0]}>
          <boxGeometry args={[0.45, 0.35, 1.3]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.4} flatShading />
        </mesh>
      )}

      {/* Pocket Park Trees (city-3) */}
      {greenActive &&
        [
          [-1.6, 0, -1.6],
          [1.6, 0, -1.6],
          [-1.6, 0, 1.6],
          [1.6, 0, 1.6],
        ].map((pos, idx) => (
          <group key={`park-tree-${idx}`} position={pos as [number, number, number]}>
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.06, 0.08, 0.5, 5]} />
              <meshStandardMaterial color="#78350f" />
            </mesh>
            <mesh position={[0, 0.7, 0]}>
              <coneGeometry args={[0.35, 0.65, 6]} />
              <meshStandardMaterial color="#22c55e" flatShading />
            </mesh>
          </group>
        ))}

      <Avatar3D config={avatar} position={[0, 0.02, 2.4]} scale={0.75} />

      {missions.map((m) => (
        <MissionBeacon
          key={m.id}
          mission={m}
          completed={completedMissionIds.includes(m.id)}
          onSelect={onSelectMission}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={15}
        maxPolarAngle={Math.PI * 0.46}
      />
    </>
  );
};
