import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Mission } from '../../types';
import { Avatar3D } from '../../components/avatar/Avatar3D';
import { MissionBeacon } from '../../components/3d/MissionBeacon';
import { useGameStore } from '../../store/useGameStore';

interface ForestWorldSceneProps {
  missions: Mission[];
  completedMissionIds: string[];
  onSelectMission: (m: Mission) => void;
}

const TREE_SPOTS: [number, number, number][] = [
  [-5.5, 0, -4.5],
  [-3.8, 0, -5.2],
  [3.4, 0, -4.6],
  [5.4, 0, -3.5],
  [-5.2, 0, 2.2],
  [4.8, 0, 2.0],
  [-2.6, 0, -1.8],
  [2.5, 0, 4.6],
];

export const ForestWorldScene: React.FC<ForestWorldSceneProps> = ({
  missions,
  completedMissionIds,
  onSelectMission,
}) => {
  const avatar = useGameStore((s) => s.avatar);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);
  const graphicsQuality = useGameStore((s) => s.settings.graphicsQuality);

  const forestDone = missions.filter((m) => completedMissionIds.includes(m.id)).length;
  const restorationRatio = forestDone / Math.max(1, missions.length);
  const wasteCleared = completedMissionIds.includes('forest-3');
  const wildlifeActive = completedMissionIds.includes('forest-2');

  const riverRef = useRef<THREE.Mesh>(null);
  const deerRef = useRef<THREE.Group>(null);
  const birdsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (deerRef.current && wildlifeActive) {
      deerRef.current.position.x = Math.sin(t * 0.5) * 1.6;
      deerRef.current.rotation.y = Math.cos(t * 0.5) > 0 ? Math.PI / 2 : -Math.PI / 2;
    }
    if (birdsRef.current && wildlifeActive) {
      birdsRef.current.rotation.y = t * 0.45;
      birdsRef.current.position.y = 3.2 + Math.sin(t * 1.6) * 0.25;
    }
  });

  // Ground shifts from dry olive to rich emerald as missions complete
  const groundColor = restorationRatio >= 0.6 ? '#15803d' : restorationRatio >= 0.2 ? '#3f6212' : '#57534e';
  const treeScale = 0.55 + restorationRatio * 0.75;

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[8, 12, 6]} intensity={1.25} color="#fef3c7" />

      {!reducedMotion && restorationRatio >= 0.6 && (
        <Sparkles
          count={graphicsQuality === 'low' ? 15 : 35}
          scale={12}
          size={2.5}
          speed={0.35}
          color="#bef264"
        />
      )}

      {/* Forest Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[9.5, 24]} />
        <meshStandardMaterial color={groundColor} roughness={0.9} flatShading />
      </mesh>

      {/* Winding River */}
      <mesh ref={riverRef} rotation={[-Math.PI / 2, 0, 0.25]} position={[0, 0.02, 0.8]}>
        <planeGeometry args={[1.6, 15]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.25} />
      </mesh>

      {/* Background Low-Poly Mountains */}
      {[
        [-6.5, 1.5, -7.2, 2.2],
        [-2.5, 2.0, -8.0, 2.6],
        [3.2, 1.8, -7.8, 2.4],
        [6.8, 1.4, -6.8, 2.0],
      ].map(([x, y, z, r], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <coneGeometry args={[r, y * 2, 5]} />
          <meshStandardMaterial color="#334155" flatShading />
        </mesh>
      ))}

      {/* Stylized Trees that grow with restoration */}
      {TREE_SPOTS.map((pos, idx) => (
        <group key={idx} position={pos} scale={treeScale}>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.14, 0.2, 0.9, 6]} />
            <meshStandardMaterial color="#78350f" flatShading />
          </mesh>
          <mesh position={[0, 1.35, 0]}>
            <coneGeometry args={[0.75, 1.5, 6]} />
            <meshStandardMaterial
              color={restorationRatio > 0.4 ? '#22c55e' : '#65a30d'}
              flatShading
            />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <coneGeometry args={[0.55, 1.1, 6]} />
            <meshStandardMaterial color="#34d399" flatShading />
          </mesh>
        </group>
      ))}

      {/* Litter cubes that disappear once Forest Waste Sorting is completed */}
      {!wasteCleared && (
        <group>
          {[
            [-1.6, 0.15, 2.6],
            [-2.4, 0.15, 3.2],
            [1.4, 0.15, 2.2],
          ].map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]} rotation={[0.2, 0.5, 0]}>
              <boxGeometry args={[0.3, 0.22, 0.28]} />
              <meshStandardMaterial color="#ef4444" flatShading />
            </mesh>
          ))}
        </group>
      )}

      {/* Wildlife Deer appearing once Wildlife Protection is completed */}
      {wildlifeActive && (
        <group ref={deerRef} position={[0, 0.1, -1.5]}>
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[0.7, 0.35, 0.3]} />
            <meshStandardMaterial color="#d97706" flatShading />
          </mesh>
          <mesh position={[0.35, 0.72, 0]}>
            <boxGeometry args={[0.25, 0.25, 0.22]} />
            <meshStandardMaterial color="#b45309" flatShading />
          </mesh>
          <mesh position={[-0.22, 0.18, 0.1]}>
            <cylinderGeometry args={[0.05, 0.05, 0.35, 5]} />
            <meshStandardMaterial color="#92400e" />
          </mesh>
          <mesh position={[0.22, 0.18, -0.1]}>
            <cylinderGeometry args={[0.05, 0.05, 0.35, 5]} />
            <meshStandardMaterial color="#92400e" />
          </mesh>
        </group>
      )}

      {/* Riverbank Boulders */}
      {[
        [-1.1, 0.18, -1.6],
        [1.2, 0.22, 1.4],
        [-1.3, 0.15, 3.8],
      ].map((pos, idx) => (
        <mesh key={`rock-${idx}`} position={pos as [number, number, number]}>
          <dodecahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#64748b" flatShading />
        </mesh>
      ))}

      {/* Wildflowers sprouting as forest recovers */}
      {restorationRatio >= 0.4 &&
        [
          [-3.1, 0.08, 1.2, '#facc15'],
          [2.8, 0.08, -0.8, '#f472b6'],
          [-1.8, 0.08, -3.5, '#38bdf8'],
          [1.9, 0.08, 3.1, '#facc15'],
        ].map(([x, y, z, col], idx) => (
          <mesh key={`flower-${idx}`} position={[x as number, y as number, z as number]}>
            <octahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial color={col as string} flatShading />
          </mesh>
        ))}

      {/* Circling Low-Poly Birds */}
      {wildlifeActive && (
        <group ref={birdsRef} position={[0, 3.2, 0]}>
          {[0, 1, 2].map((b) => {
            const ang = (b / 3) * Math.PI * 2;
            return (
              <mesh
                key={b}
                position={[Math.cos(ang) * 2.5, 0, Math.sin(ang) * 2.5]}
                rotation={[0, -ang, 0]}
              >
                <coneGeometry args={[0.12, 0.35, 3]} />
                <meshStandardMaterial color="#fef08a" flatShading />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Player Avatar */}
      <Avatar3D config={avatar} position={[0, 0.02, 2.2]} scale={0.75} />

      {/* 5 Mission Beacons */}
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
