import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  /** Number of particles to render. Tier A = 2000, Tier B = 600 */
  count?: number
}

// Custom shader for soft, glowing particles
const vertexShader = `
  uniform float time;
  attribute float size;
  attribute vec3 randomVector;
  
  varying vec3 vColor;
  
  void main() {
    // Add subtle wave motion using the random vector and time
    vec3 pos = position;
    pos.x += sin(time * 0.5 + randomVector.x * 10.0) * 0.2;
    pos.y += cos(time * 0.3 + randomVector.y * 10.0) * 0.2;
    pos.z += sin(time * 0.4 + randomVector.z * 10.0) * 0.2;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Scale particles based on distance
    gl_PointSize = size * (30.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Pass color logic to fragment (mixing white and brand green)
    float mixVal = sin(time * 0.5 + randomVector.x * 5.0) * 0.5 + 0.5;
    vec3 color1 = vec3(1.0, 1.0, 1.0);
    vec3 color2 = vec3(0.133, 0.773, 0.369); // #22c55e (brand-500)
    vColor = mix(color1, color2, mixVal);
  }
`

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Make particles circular with soft edges
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    if (ll > 0.5) discard;
    
    // Soft radial gradient
    float alpha = (0.5 - ll) * 2.0;
    
    gl_FragColor = vec4(vColor, alpha * 0.6);
  }
`

export function ParticleField({ count = 2000 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Generate particle positions, sizes, and random offsets
  const [positions, sizes, randoms] = useMemo(() => {
    const p = new Float32Array(count * 3)
    const s = new Float32Array(count)
    const r = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a wide volume around the origin
      p[i * 3] = (Math.random() - 0.5) * 20
      p[i * 3 + 1] = (Math.random() - 0.5) * 20
      p[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5 // Push slightly backward
      
      s[i] = Math.random() * 2.0 + 0.5
      
      r[i * 3] = Math.random()
      r[i * 3 + 1] = Math.random()
      r[i * 3 + 2] = Math.random()
    }
    
    return [p, s, r]
  }, [count])

  // Uniforms for the shader
  const uniforms = useMemo(() => ({
    time: { value: 0 },
  }), [])

  // Animate the uniform time
  useFrame((state) => {
    if (materialRef.current && materialRef.current.uniforms.time) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
    
    // Very slowly rotate the entire field
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-randomVector"
          count={randoms.length / 3}
          array={randoms}
          itemSize={3}
        />
      </bufferGeometry>
      
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
