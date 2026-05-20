'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

function ParticleSwarm({ color, opacity }: { color: string; opacity: number }) {
  const ref = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const pointCount = 520
    const temp = new Float32Array(pointCount * 3)
    for (let i = 0; i < temp.length; i += 3) {
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
          color={color}
          size={0.032}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={opacity}
        />
      </Points>
    </group>
  )
}

export default function CanvasBackground() {
  const { resolvedTheme, theme } = useTheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const timer = setTimeout(() => setReady(true), 500)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (!ready) return null

  const activeTheme = theme === 'light' || resolvedTheme === 'light' ? 'light' : 'dark'
  const color = activeTheme === 'light' ? '#0369a1' : '#38bdf8'
  const opacity = activeTheme === 'light' ? 0.22 : 0.3

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
      <Canvas
        camera={{ position: [0, 0, 8] }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'low-power' }}
      >
        <ParticleSwarm color={color} opacity={opacity} />
      </Canvas>
    </div>
  )
}
