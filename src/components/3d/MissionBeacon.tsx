import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Mission } from '../../types';
import { useGameStore } from '../../store/useGameStore';

interface MissionBeaconProps {
  mission: Mission;
  completed: boolean;
  onSelect: (mission: Mission) => void;
}

export const MissionBeacon: React.FC<MissionBeaconProps> = ({
  mission,
  completed,
  onSelect,
}) => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  useFrame((state, delta) => {
    if (!crystalRef.current || reducedMotion) return;
    crystalRef.current.rotation.y += delta * 1.4;
    crystalRef.current.position.y =
      1.1 + Math.sin(state.clock.getElapsedTime() * 2.4 + mission.order) * 0.14;
  });

  const color = completed ? '#34d399' : '#facc15';

  return (
    <group
      position={mission.coordinates}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(mission);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Base Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.35, 0.52, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Crystal */}
      <mesh ref={crystalRef} position={[0, 1.1, 0]} scale={hovered ? 1.25 : 1}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={completed ? 0.45 : 0.75}
          flatShading
        />
      </mesh>

      <Html distanceFactor={11} position={[0, 1.75, 0]} center>
        <button
          type="button"
          onClick={() => onSelect(mission)}
          className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold shadow-md backdrop-blur-md transition ${
            completed
              ? 'border-emerald-400/50 bg-emerald-950/90 text-emerald-200'
              : 'border-amber-300/60 bg-amber-400 text-slate-950 hover:scale-105'
          }`}
        >
          {completed ? '✓ ' : '★ '}
          {mission.title}
        </button>
      </Html>
    </group>
  );
};
