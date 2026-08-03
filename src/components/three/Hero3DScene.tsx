import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useDeviceTier } from '~/hooks/useDeviceTier'
import { ProbioticModel } from './ProbioticModel'
import { ParticleField } from './ParticleField'
import { SceneEnvironment } from './SceneEnvironment'
import { PostProcessingLayer } from './PostProcessingLayer'
import { HeroCamera } from './HeroCamera'

/**
 * Hero3DScene — the main R3F Canvas container for the hero section.
 * 
 * Implements strict tier-gating logic:
 * - Tier A: Full quality, particles=2000, postprocessing enabled
 * - Tier B: Lower quality materials, particles=600, no postprocessing
 * - Tier C: Returns null (parent renders static fallback image instead)
 */
export function Hero3DScene() {
  const tier = useDeviceTier()

  // SSR or Tier C (reduced motion / no webgl) -> render nothing here
  if (!tier || tier === 'C') {
    return null
  }

  const isTierA = tier === 'A'

  return (
    <div className="absolute inset-0 z-0 bg-neutral-950">
      <Canvas
        shadows={isTierA}
        dpr={[1, 2]} // Max pixel ratio of 2 to save GPU
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false, // We use a solid background color for performance
        }}
        camera={{ fov: 45, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          <SceneEnvironment highQuality={isTierA} />
          
          <group position={[0, -0.5, 0]}>
            <ProbioticModel highQuality={isTierA} />
            <ParticleField count={isTierA ? 2000 : 600} />
          </group>

          <HeroCamera />
          
          {isTierA && <PostProcessingLayer />}
        </Suspense>
      </Canvas>
    </div>
  )
}
