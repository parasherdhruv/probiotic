import { Object3DNode, MaterialNode, BufferGeometryNode, BufferAttributeNode } from '@react-three/fiber'
import * as THREE from 'three'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: Object3DNode<THREE.Group, typeof THREE.Group>
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      meshPhysicalMaterial: MaterialNode<THREE.MeshPhysicalMaterial, typeof THREE.MeshPhysicalMaterial>
      meshStandardMaterial: MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      capsuleGeometry: BufferGeometryNode<THREE.CapsuleGeometry, typeof THREE.CapsuleGeometry>
      points: Object3DNode<THREE.Points, typeof THREE.Points>
      bufferGeometry: BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>
      bufferAttribute: BufferAttributeNode<THREE.BufferAttribute, typeof THREE.BufferAttribute>
      shaderMaterial: MaterialNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial>
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
    }
  }
}
