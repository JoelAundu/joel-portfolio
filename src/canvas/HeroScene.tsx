import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 2500
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 2
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.04
      ref.current.rotation.y -= delta * 0.06
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.12
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.18
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.75, 0.28, 128, 20]} />
      <meshStandardMaterial
        color="#38bdf8"
        wireframe
        transparent
        opacity={0.35}
        emissive="#38bdf8"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function InnerGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
      ref.current.scale.set(s, s, s)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#0ea5e9"
        transparent
        opacity={0.08}
        emissive="#38bdf8"
        emissiveIntensity={1}
      />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#38bdf8" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#818cf8" />
      <Particles />
      <FloatingGeometry />
      <InnerGlow />
    </Canvas>
  )
}
