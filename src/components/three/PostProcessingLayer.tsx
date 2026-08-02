import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

/**
 * PostProcessingLayer (3D) — applies cinematic effects to the final render.
 * 
 * Includes:
 * - Bloom: makes the capsule rim lighting and particles glow
 * - ChromaticAberration: subtle color fringing on the edges for realism
 * - Vignette: darkens the corners to focus attention on the center
 * 
 * Only rendered on Tier A (high-end devices) because postprocessing is
 * very heavy on mobile GPUs.
 */
export function PostProcessingLayer() {
  return (
    <EffectComposer>
      <Bloom 
        luminanceThreshold={0.5} 
        mipmapBlur 
        intensity={1.2} 
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.002, 0.002)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.9}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
