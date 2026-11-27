import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { WORLDS_DATA } from '../../data/worlds/worldsData';
import { WorldId } from '../../types';
import { useGameStore } from '../../store/useGameStore';

interface PlanetExplorerSceneProps {
  selectedWorld: WorldId;
  onSelectWorld: (id: WorldId) => void;
  playerLevel: number;
}

export const PlanetExplorerScene: React.FC<PlanetExplorerSceneProps> = ({
  selectedWorld,
  onSelectWorld,
  playerLevel,
}) => {
  const planetRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<WorldId | null>(null);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);

  useFrame((state, delta) => {
    if (!planetRef.current || reducedMotion) return;
    planetRef.current.rotation.y += delta * 0.08;
    const selectedInfo = WORLDS_DATA.find((w) => w.id === selectedWorld);
    if (selectedInfo) {
      const targetY = 1.2 + selectedInfo.planetPosition[1] * 0.4;
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2);
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 8, 6]} intensity={1.3} color="#fef9c3" />
      <directionalLight position={[-5, -4, -5]} intensity={0.45} color="#38bdf8" />

      <group ref={planetRef}>
        {/* Planet Base */}
        <mesh>
          <icosahedronGeometry args={[1.65, 2]} />
          <meshStandardMaterial color="#0d9488" roughness={0.65} flatShading />
        </mesh>

        {/* Four Clickable World Zones */}
        {WORLDS_DATA.map((world) => {
          const isSelected = selectedWorld === world.id;
          const isHovered = hovered === world.id;
          const isUnlocked = playerLevel >= world.unlockLevel;
          const scale = isSelected ? 1.25 : isHovered ? 1.15 : 1;

          return (
            <group
              key={world.id}
              position={world.planetPosition}
              scale={scale}
              onClick={(e) => {
                e.stopPropagation();
                onSelectWorld(world.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(world.id);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHovered(null);
                document.body.style.cursor = 'auto';
              }}
            >
              {/* Floating Island Pad */}
              <mesh>
                <dodecahedronGeometry args={[0.38, 0]} />
                <meshStandardMaterial
                  color={isUnlocked ? world.themeColor : '#475569'}
                  emissive={isSelected ? world.themeColor : '#000000'}
                  emissiveIntensity={isSelected ? 0.5 : 0}
                  flatShading
                />
              </mesh>

              {/* Glowing Ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.25, 0]}>
                <torusGeometry args={[0.45, 0.035, 6, 16]} />
                <meshStandardMaterial
                  color={isSelected ? '#facc15' : world.accentColor}
                  emissive={isSelected ? '#facc15' : world.accentColor}
                  emissiveIntensity={isSelected ? 0.8 : 0.35}
                />
              </mesh>

              <Html distanceFactor={8} position={[0, 0.65, 0]} center>
                <button
                  type="button"
                  onClick={() => onSelectWorld(world.id)}
                  className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold shadow-lg backdrop-blur-md transition ${
                    isSelected
                      ? 'border-amber-300 bg-amber-400 text-slate-950'
                      : isUnlocked
                        ? 'border-emerald-300/40 bg-emerald-950/85 text-emerald-100 hover:bg-emerald-900'
                        : 'border-slate-400/30 bg-slate-900/85 text-slate-300'
                  }`}
                >
                  {world.name} {!isUnlocked && `• Lv.${world.unlockLevel}`}
                </button>
              </Html>
            </group>
          );
        })}
      </group>

      <OrbitControls
        enablePan={false}
        minDistance={4.2}
        maxDistance={8.5}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.25}
      />
    </>
  );
};
