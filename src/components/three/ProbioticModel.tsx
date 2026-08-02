import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface ProbioticModelProps {
  /** If false, renders a simpler material (for lower tiers) */
  highQuality?: boolean
}

/**
 * ProbioticModel — renders the hero 3D capsule.
 * 
 * V1 Implementation: Procedural CapsuleGeometry placeholder.
 * Ready to be swapped with a real .glb file once the modeling team delivers it.
 */
export function ProbioticModel({ highQuality = true }: ProbioticModelProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Floating animation
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    // Gentle float (sine wave on Y axis)
    meshRef.current.position.y = Math.sin(t * 1.5) * 0.15
    // Slow continuous rotation
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.rotation.x = t * 0.1
  })

  // Material settings: Glassy exterior if highQuality, simpler physical if not
  return (
    <group dispose={null}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={2}>
        <capsuleGeometry args={[0.4, 1.2, 4, 32]} />
        {highQuality ? (
          <meshPhysicalMaterial
            color="#22c55e"         // Brand green
            transmission={0.9}      // Glass-like transparency
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        ) : (
          <meshStandardMaterial
            color="#22c55e"
            metalness={0.2}
            roughness={0.3}
          />
        )}
      </mesh>
    </group>
  )
}

// When the real model is ready, uncomment this to preload it:
// useGLTF.preload('/models/probiotic-capsule.glb')
