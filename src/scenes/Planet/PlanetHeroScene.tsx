import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/useGameStore';

/**
 * Lightweight low-poly 3D planet for the Landing Page hero.
 * Optimized for integrated GPUs: shared primitives, no expensive shadows/postprocessing.
 */
export const PlanetHeroScene: React.FC = () => {
  const planetRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);
  const graphicsQuality = useGameStore((s) => s.settings.graphicsQuality);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.16;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= delta * 0.08;
    }
    // Gentle camera breathing
    const t = state.clock.getElapsedTime();
    state.camera.position.y = 1.6 + Math.sin(t * 0.4) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 8, 5]} intensity={1.3} color="#fef9c3" />
      <directionalLight position={[-6, -4, -5]} intensity={0.45} color="#38bdf8" />

      {!reducedMotion && (
        <Sparkles
          count={graphicsQuality === 'low' ? 18 : 40}
          scale={11}
          size={2.2}
          speed={0.3}
          color="#a7f3d0"
        />
      )}

      {/* Central Low-Poly Living Planet */}
      <group ref={planetRef}>
        {/* Ocean Core */}
        <mesh>
          <icosahedronGeometry args={[1.85, 2]} />
          <meshStandardMaterial color="#0d9488" roughness={0.65} flatShading />
        </mesh>

        {/* Emerald Landmasses */}
        <mesh position={[0.6, 0.7, 1.35]} rotation={[0.4, 0.2, 0]}>
          <dodecahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial color="#10b981" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[-1.1, -0.3, 1.15]} rotation={[0.1, 0.8, 0.3]}>
          <dodecahedronGeometry args={[0.68, 0]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[0.9, -0.6, -1.25]}>
          <dodecahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[-0.8, 0.9, -1.1]}>
          <dodecahedronGeometry args={[0.62, 0]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.7} flatShading />
        </mesh>

        {/* Tiny Low-Poly Trees on Planet */}
        {[
          [0.85, 1.35, 1.25],
          [0.45, 1.4, 1.55],
          [-1.35, 0.1, 1.3],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]} scale={0.28}>
            <mesh position={[0, 0.35, 0]}>
              <coneGeometry args={[0.55, 1.2, 5]} />
              <meshStandardMaterial color="#34d399" flatShading />
            </mesh>
          </group>
        ))}

        {/* Subtle Atmospheric Ring */}
        <mesh rotation={[Math.PI * 0.42, 0.25, 0]}>
          <torusGeometry args={[2.55, 0.025, 6, 36]} />
          <meshBasicMaterial color="#5eead4" transparent opacity={0.45} />
        </mesh>

        {/* Orbiting Eco-Moon */}
        <mesh position={[2.6, 0.4, 0.6]}>
          <icosahedronGeometry args={[0.24, 1]} />
          <meshStandardMaterial color="#fde68a" roughness={0.7} flatShading />
        </mesh>
      </group>

      {/* Orbiting Floating Islands */}
      <Float speed={reducedMotion ? 0 : 1.6} rotationIntensity={0.2} floatIntensity={0.4}>
        <group position={[3.2, 0.9, -0.6]}>
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[0.65, 0.8, 6]} />
            <meshStandardMaterial color="#78350f" flatShading />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.7, 0.65, 0.18, 6]} />
            <meshStandardMaterial color="#10b981" flatShading />
          </mesh>
          <mesh position={[0.1, 0.58, 0]}>
            <coneGeometry args={[0.26, 0.6, 5]} />
            <meshStandardMaterial color="#34d399" flatShading />
          </mesh>
        </group>
      </Float>

      <Float speed={reducedMotion ? 0 : 1.3} rotationIntensity={0.15} floatIntensity={0.35}>
        <group position={[-3.3, -0.5, 0.4]}>
          <mesh position={[0, -0.18, 0]}>
            <coneGeometry args={[0.55, 0.7, 6]} />
            <meshStandardMaterial color="#0e7490" flatShading />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.6, 0.55, 0.15, 6]} />
            <meshStandardMaterial color="#38bdf8" flatShading />
          </mesh>
        </group>
      </Float>

      {/* Soft Low-Poly Clouds */}
      <group ref={cloudsRef}>
        {[
          [2.4, 2.0, 1.5],
          [-2.6, 1.7, -1.2],
          [0.2, -2.2, 2.2],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh>
              <icosahedronGeometry args={[0.28, 0]} />
              <meshStandardMaterial color="#f0fdf4" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0.24, -0.05, 0]}>
              <icosahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial color="#ecfeff" roughness={0.9} flatShading />
            </mesh>
          </group>
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI * 0.68}
        minPolarAngle={Math.PI * 0.32}
      />
    </>
  );
};
