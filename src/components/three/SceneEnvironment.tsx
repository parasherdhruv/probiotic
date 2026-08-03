import { Environment, Float, Lightformer } from '@react-three/drei'

interface SceneEnvironmentProps {
  /** If false, uses simpler lighting setup (for lower tiers) */
  highQuality?: boolean
}

/**
 * SceneEnvironment — sets up the HDRI environment and light sources.
 * 
 * Uses Drei's Environment with custom Lightformers to create
 * high-contrast studio-like reflections on the glassy capsule model.
 */
export function SceneEnvironment({ highQuality = true }: SceneEnvironmentProps) {
  if (!highQuality) {
    // Simple fallback lighting for Tier B/C
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      </>
    )
  }

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      
      {/* 
        Environment maps custom soft shapes onto the model's reflections.
        This gives the "premium studio" look without expensive raytracing.
      */}
      <Environment resolution={256} frames={Infinity} background={false}>
        {/* Soft overhead light */}
        <Lightformer
          form="rect"
          intensity={4}
          position={[0, 5, 0]}
          rotation-x={-Math.PI / 2}
          scale={[10, 10, 1]}
        />
        {/* Key light strip */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer
            form="ring"
            color="#ffffff"
            intensity={2}
            scale={10}
            position={[-15, 4, -18]}
            target={[0, 0, 0]}
          />
        </Float>
        {/* Brand green rim light */}
        <Lightformer
          form="rect"
          color="#22c55e"
          intensity={3}
          scale={[5, 5, 1]}
          position={[10, 0, -10]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  )
}
