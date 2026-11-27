import React from 'react';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { Mission } from '../../types';
import { Avatar3D } from '../../components/avatar/Avatar3D';
import { MissionBeacon } from '../../components/3d/MissionBeacon';
import { useGameStore } from '../../store/useGameStore';

interface DesertWorldSceneProps {
  missions: Mission[];
  completedMissionIds: string[];
  onSelectMission: (m: Mission) => void;
}

export const DesertWorldScene: React.FC<DesertWorldSceneProps> = ({
  missions,
  completedMissionIds,
  onSelectMission,
}) => {
  const avatar = useGameStore((s) => s.avatar);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);
  const graphicsQuality = useGameStore((s) => s.settings.graphicsQuality);

  const doneCount = missions.filter((m) => completedMissionIds.includes(m.id)).length;
  const restorationRatio = doneCount / Math.max(1, missions.length);
  const oasisSize = 0.8 + restorationRatio * 1.4;
  const dewBuilt = completedMissionIds.includes('desert-1');
  const solarShadeBuilt = completedMissionIds.includes('desert-4');

  return (
    <>
      <ambientLight intensity={0.85} color="#fef3c7" />
      <directionalLight position={[8, 10, 5]} intensity={1.35} color="#fde68a" />

      {!reducedMotion && restorationRatio >= 0.4 && (
        <Sparkles
          count={graphicsQuality === 'low' ? 12 : 25}
          scale={11}
          size={2}
          speed={0.25}
          color="#fde047"
        />
      )}

      {/* Sand Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[9.5, 24]} />
        <meshStandardMaterial color="#d97706" roughness={0.95} flatShading />
      </mesh>

      {/* Low-Poly Sand Dunes */}
      {[
        [-4.8, 0.4, -4.5, 2.4],
        [4.5, 0.5, -4.0, 2.6],
        [-5.2, 0.35, 3.2, 2.0],
        [4.8, 0.4, 3.8, 2.2],
      ].map(([x, y, z, r], idx) => (
        <mesh key={idx} position={[x, y, z]} scale={[1.4, 0.55, 1.1]}>
          <dodecahedronGeometry args={[r, 0]} />
          <meshStandardMaterial color="#f59e0b" flatShading />
        </mesh>
      ))}

      {/* Central Oasis Spring (grows with restoration) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[oasisSize + 0.4, 20]} />
        <meshStandardMaterial color={restorationRatio >= 0.4 ? '#4d7c0f' : '#b45309'} roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[oasisSize, 20]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.2} />
      </mesh>

      {/* Dew Collector Net (desert-1) */}
      {dewBuilt && (
        <group position={[-3.2, 0, -1.8]}>
          <mesh position={[-0.4, 0.65, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 6]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0.4, 0.65, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 6]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[0.8, 0.7, 0.04]} />
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.55} />
          </mesh>
        </group>
      )}

      {/* Agrivoltaic Solar Shade Canopy (desert-4) */}
      {solarShadeBuilt && (
        <group position={[2.6, 0, 2.2]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 6]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, 1.25, 0]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[1.3, 0.06, 0.9]} />
            <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {/* Oasis Palms emerging with restoration */}
      {restorationRatio >= 0.2 &&
        [
          [-1.5, 0, -1.2],
          [1.6, 0, -1.0],
          [1.4, 0, 1.5],
        ]
          .slice(0, Math.ceil(restorationRatio * 3))
          .map((pos, idx) => (
            <group key={idx} position={pos as [number, number, number]}>
              <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.1, 0.15, 1.4, 6]} />
                <meshStandardMaterial color="#92400e" flatShading />
              </mesh>
              <mesh position={[0, 1.5, 0]}>
                <coneGeometry args={[0.75, 0.55, 6]} />
                <meshStandardMaterial color="#22c55e" flatShading />
              </mesh>
            </group>
          ))}

      <Avatar3D config={avatar} position={[0, 0.02, 2.6]} scale={0.75} />

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
