import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AvatarConfig } from '../../types';
import { useGameStore } from '../../store/useGameStore';

interface Avatar3DProps {
  config: AvatarConfig;
  position?: [number, number, number];
  scale?: number;
  animate?: boolean;
}

/**
 * Lightweight procedural low-poly 3D avatar.
 * Reuses simple primitives so it runs effortlessly on integrated graphics.
 */
export const Avatar3D: React.FC<Avatar3DProps> = ({
  config,
  position = [0, 0, 0],
  scale = 1,
  animate = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  useFrame((state) => {
    if (!groupRef.current || !animate || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.06;
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.25;
  });

  const bodyScale: [number, number, number] =
    config.characterType === 'guardian'
      ? [1.1, 1.05, 1.05]
      : config.characterType === 'spirit'
        ? [0.9, 1.05, 0.9]
        : [1, 1, 1];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Torso */}
      <mesh position={[0, 0.65, 0]} scale={bodyScale}>
        <cylinderGeometry args={[0.32, 0.42, 0.85, 8]} />
        <meshStandardMaterial color={config.outfitColor} roughness={0.6} />
      </mesh>

      {/* Cape / Pack for Ranger & Spirit */}
      {(config.characterType === 'ranger' || config.characterType === 'spirit') && (
        <mesh position={[0, 0.68, -0.26]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.42, 0.65, 0.12]} />
          <meshStandardMaterial color="#0f766e" roughness={0.7} />
        </mesh>
      )}

      {/* Arms */}
      <mesh position={[-0.44, 0.7, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.1, 0.45, 4, 6]} />
        <meshStandardMaterial color={config.outfitColor} roughness={0.6} />
      </mesh>
      <mesh position={[0.44, 0.7, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.1, 0.45, 4, 6]} />
        <meshStandardMaterial color={config.outfitColor} roughness={0.6} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.16, 0.12, 0]}>
        <capsuleGeometry args={[0.11, 0.35, 4, 6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh position={[0.16, 0.12, 0]}>
        <capsuleGeometry args={[0.11, 0.35, 4, 6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.38, 0]}>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={config.skinTone} roughness={0.65} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.11, 1.4, 0.27]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.11, 1.4, 0.27]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* Hairstyle */}
      {config.hairstyle === 'short' && (
        <mesh position={[0, 1.56, -0.02]}>
          <sphereGeometry args={[0.31, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color={config.hairColor} roughness={0.75} />
        </mesh>
      )}
      {config.hairstyle === 'flowing' && (
        <group>
          <mesh position={[0, 1.54, -0.04]}>
            <sphereGeometry args={[0.33, 8, 6]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.75} />
          </mesh>
          <mesh position={[0, 1.25, -0.22]}>
            <boxGeometry args={[0.44, 0.5, 0.18]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.75} />
          </mesh>
        </group>
      )}
      {config.hairstyle === 'spiky' && (
        <group position={[0, 1.68, 0]}>
          <mesh position={[0, 0.08, 0]}>
            <coneGeometry args={[0.18, 0.3, 5]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.16, 0, 0]} rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.12, 0.24, 5]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.16, 0, 0]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.12, 0.24, 5]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.7} />
          </mesh>
        </group>
      )}
      {config.hairstyle === 'bun' && (
        <group>
          <mesh position={[0, 1.55, -0.02]}>
            <sphereGeometry args={[0.31, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.75} />
          </mesh>
          <mesh position={[0, 1.78, -0.08]}>
            <sphereGeometry args={[0.14, 7, 7]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.75} />
          </mesh>
        </group>
      )}

      {/* Accessory */}
      {config.accessory === 'leaf-crown' && (
        <mesh position={[0, 1.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.045, 6, 12]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.4} />
        </mesh>
      )}
      {config.accessory === 'visor' && (
        <mesh position={[0, 1.42, 0.26]}>
          <boxGeometry args={[0.42, 0.11, 0.12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
        </mesh>
      )}
      {config.accessory === 'halo' && (
        <mesh position={[0, 1.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.26, 0.03, 6, 16]} />
          <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.7} />
        </mesh>
      )}
      {config.accessory === 'explorer-hat' && (
        <group position={[0, 1.68, 0]}>
          <mesh>
            <cylinderGeometry args={[0.46, 0.46, 0.05, 10]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.24, 0.28, 0.25, 10]} />
            <meshStandardMaterial color="#b45309" roughness={0.7} />
          </mesh>
        </group>
      )}
    </group>
  );
};
