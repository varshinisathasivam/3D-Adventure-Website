import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Mission } from '../../types';
import { Avatar3D } from '../../components/avatar/Avatar3D';
import { MissionBeacon } from '../../components/3d/MissionBeacon';
import { useGameStore } from '../../store/useGameStore';

interface OceanWorldSceneProps {
  missions: Mission[];
  completedMissionIds: string[];
  onSelectMission: (m: Mission) => void;
}

export const OceanWorldScene: React.FC<OceanWorldSceneProps> = ({
  missions,
  completedMissionIds,
  onSelectMission,
}) => {
  const avatar = useGameStore((s) => s.avatar);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);
  const graphicsQuality = useGameStore((s) => s.settings.graphicsQuality);

  const oceanDone = missions.filter((m) => completedMissionIds.includes(m.id)).length;
  const restorationRatio = oceanDone / Math.max(1, missions.length);
  const surfaceCleaned = completedMissionIds.includes('ocean-1');
  const coralRevived = completedMissionIds.includes('ocean-2');
  const seagrassRestored = completedMissionIds.includes('ocean-4');
  const sanctuaryActive = completedMissionIds.includes('ocean-5');

  const fishGroupRef = useRef<THREE.Group>(null);
  const turtleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (fishGroupRef.current) {
      fishGroupRef.current.rotation.y = t * 0.35;
    }
    if (turtleRef.current && sanctuaryActive) {
      turtleRef.current.position.x = Math.cos(t * 0.35) * 3.4;
      turtleRef.current.position.z = Math.sin(t * 0.35) * 3.4;
      turtleRef.current.rotation.y = -t * 0.35;
    }
  });

  const coralColor = coralRevived ? '#f472b6' : '#cbd5e1';
  const coralColor2 = coralRevived ? '#fb923c' : '#94a3b8';
  const seabedColor = restorationRatio >= 0.6 ? '#0891b2' : '#164e63';

  return (
    <>
      <ambientLight intensity={0.7} color="#bae6fd" />
      <directionalLight position={[4, 10, 4]} intensity={1.1} color="#7dd3fc" />

      {/* Limited underwater bubbles/particles */}
      {!reducedMotion && (
        <Sparkles
          count={graphicsQuality === 'low' ? 16 : 36}
          scale={12}
          size={2}
          speed={0.4}
          color="#bae6fd"
        />
      )}

      {/* Seabed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
        <circleGeometry args={[9.5, 24]} />
        <meshStandardMaterial color={seabedColor} roughness={0.9} flatShading />
      </mesh>

      {/* Low-Poly Seagrass / Kelp */}
      {[
        [-2.8, -0.5, 3.5],
        [-2.4, -0.45, 3.8],
        [2.6, -0.5, 3.1],
        [3.1, -0.45, 2.7],
      ].map((pos, idx) => (
        <mesh
          key={`kelp-${idx}`}
          position={pos as [number, number, number]}
          scale={[1, seagrassRestored ? 1.5 : 0.75, 1]}
        >
          <coneGeometry args={[0.14, 1.2, 4]} />
          <meshStandardMaterial color={seagrassRestored ? '#10b981' : '#0f766e'} flatShading />
        </mesh>
      ))}

      {/* Gliding Sea Turtle when Sanctuary of the Deep is completed */}
      {sanctuaryActive && (
        <group ref={turtleRef} position={[3.4, 1.1, 0]}>
          <mesh scale={[1.2, 0.45, 0.9]}>
            <dodecahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial color="#10b981" flatShading />
          </mesh>
          <mesh position={[0.42, 0.05, 0]}>
            <sphereGeometry args={[0.14, 6, 6]} />
            <meshStandardMaterial color="#34d399" flatShading />
          </mesh>
        </group>
      )}

      {/* Coral Reef Clusters */}
      {[
        [-3.2, -0.7, -1.8, coralColor],
        [2.8, -0.7, -1.5, coralColor2],
        [-1.8, -0.7, 2.5, coralColor2],
        [3.6, -0.7, 1.8, coralColor],
      ].map(([x, y, z, col], idx) => (
        <group key={idx} position={[x as number, y as number, z as number]}>
          <mesh position={[0, 0.25, 0]}>
            <dodecahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial color={col as string} flatShading />
          </mesh>
          <mesh position={[0.45, 0.12, 0.2]}>
            <coneGeometry args={[0.28, 0.7, 5]} />
            <meshStandardMaterial color={coralRevived ? '#2dd4bf' : '#94a3b8'} flatShading />
          </mesh>
        </group>
      ))}

      {/* Drifting Plastic Debris (disappears when Surface Plastic Sweep is done) */}
      {!surfaceCleaned && (
        <group>
          {[
            [-2.2, 1.4, -1.2],
            [1.6, 1.6, 1.2],
            [0.4, 1.5, -2.5],
          ].map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]} rotation={[0.4, 0.8, 0.2]}>
              <boxGeometry args={[0.4, 0.16, 0.28]} />
              <meshStandardMaterial color="#e2e8f0" flatShading />
            </mesh>
          ))}
        </group>
      )}

      {/* Schooling Low-Poly Fish */}
      <group ref={fishGroupRef} position={[0, 0.6, 0]}>
        {[0, 1, 2, 3, 4].slice(0, 2 + Math.round(restorationRatio * 3)).map((idx) => {
          const angle = (idx / 5) * Math.PI * 2;
          const r = 2.6 + (idx % 2) * 0.8;
          return (
            <group
              key={idx}
              position={[Math.cos(angle) * r, (idx % 3) * 0.35 - 0.3, Math.sin(angle) * r]}
              rotation={[0, -angle, 0]}
            >
              <mesh>
                <coneGeometry args={[0.16, 0.45, 5]} />
                <meshStandardMaterial color={idx % 2 === 0 ? '#facc15' : '#38bdf8'} flatShading />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Player Avatar */}
      <Avatar3D config={avatar} position={[0, -0.95, 2.0]} scale={0.72} />

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
        maxPolarAngle={Math.PI * 0.48}
      />
    </>
  );
};
