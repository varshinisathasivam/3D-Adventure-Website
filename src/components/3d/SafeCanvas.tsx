import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from 'lucide-react';
import { isWebGLAvailable } from '../../utils/webgl';
import { useGameStore } from '../../store/useGameStore';

interface SafeCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

/**
 * Performance-optimized R3F Canvas wrapper tailored for integrated graphics (Intel UHD 620)
 * with automatic 2D graceful fallback when WebGL is unavailable.
 */
export const SafeCanvas: React.FC<SafeCanvasProps> = ({
  children,
  cameraPosition = [0, 2, 7],
  fov = 45,
  className = 'h-full w-full',
  fallbackTitle = '2D Sanctuary View Active',
  fallbackDescription = 'WebGL 3D acceleration is unavailable in this browser context. All interactive missions and progress features remain fully playable.',
}) => {
  const graphicsQuality = useGameStore((s) => s.settings.graphicsQuality);
  const reducedMotion = useGameStore((s) => s.settings.reducedMotion);
  const webglOk = useMemo(() => isWebGLAvailable(), []);

  if (!webglOk) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950 via-[#072b22] to-teal-950 p-8 text-center ${className}`}
        role="region"
        aria-label={fallbackTitle}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
          <Sparkles className="h-8 w-8" />
        </div>
        <h3 className="font-display text-xl font-bold text-emerald-100">{fallbackTitle}</h3>
        <p className="mt-2 max-w-md text-sm text-emerald-200/80">{fallbackDescription}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        dpr={graphicsQuality === 'low' ? [1, 1] : [1, 1.5]}
        shadows={false}
        camera={{ position: cameraPosition, fov, near: 0.1, far: 120 }}
        gl={{
          antialias: graphicsQuality === 'medium',
          powerPreference: graphicsQuality === 'low' ? 'low-power' : 'default',
          alpha: true,
        }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        {children}
      </Canvas>
    </div>
  );
};
