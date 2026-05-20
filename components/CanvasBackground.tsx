'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null)
  
  // Generate a sphere of particles
  const particles = useMemo(() => {
    const temp = new Float32Array(3000)
    for (let i = 0; i < 3000; i += 3) {
      const r = 5 * Math.cbrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      temp[i] = r * Math.sin(phi) * Math.cos(theta)
      temp[i+1] = r * Math.sin(phi) * Math.sin(theta)
      temp[i+2] = r * Math.cos(phi)
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05
      ref.current.rotation.x += delta * 0.02
    }
  })

  return (
    <group>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="var(--accent)"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  )
}

export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  )
}
