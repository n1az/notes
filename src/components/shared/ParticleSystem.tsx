import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleSystemProps {
  count: number
  speed: number
  color: string
  size: number
  pattern: 'floating' | 'spiral' | 'wave' | 'constellation'
  interactive?: boolean
}

export function ParticleSystem({
  count,
  speed,
  color,
  size,
  pattern,
  interactive = false
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  // Generate particle positions based on pattern
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      switch (pattern) {
        case 'constellation':
          // Create constellation-like clusters
          const clusterX = (Math.random() - 0.5) * 20
          const clusterY = (Math.random() - 0.5) * 20
          const clusterZ = (Math.random() - 0.5) * 20
          
          positions[i3] = clusterX + (Math.random() - 0.5) * 5
          positions[i3 + 1] = clusterY + (Math.random() - 0.5) * 5
          positions[i3 + 2] = clusterZ + (Math.random() - 0.5) * 5
          break

        case 'spiral':
          // Create spiral pattern
          const angle = (i / count) * Math.PI * 10
          const radius = (i / count) * 15
          positions[i3] = Math.cos(angle) * radius
          positions[i3 + 1] = (i / count - 0.5) * 20
          positions[i3 + 2] = Math.sin(angle) * radius
          break

        case 'wave':
          // Create wave-like distribution
          positions[i3] = (Math.random() - 0.5) * 40
          positions[i3 + 1] = Math.sin((i / count) * Math.PI * 4) * 5
          positions[i3 + 2] = (Math.random() - 0.5) * 20
          break

        case 'floating':
        default:
          // Random floating particles
          positions[i3] = (Math.random() - 0.5) * 30
          positions[i3 + 1] = (Math.random() - 0.5) * 30
          positions[i3 + 2] = (Math.random() - 0.5) * 30
          break
      }

      // Initialize velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return { positions, velocities }
  }, [count, pattern])

  // Mouse interaction setup
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]

      // Apply pattern-specific animations
      switch (pattern) {
        case 'constellation':
          // Gentle twinkling movement
          positions[i3] += Math.sin(time + i * 0.1) * 0.01 * speed
          positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.01 * speed
          positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.1) * 0.005 * speed
          break

        case 'spiral':
          // Continuous spiral rotation
          const angle = time * speed * 0.1 + (i / count) * Math.PI * 10
          const radius = (i / count) * 15
          positions[i3] = Math.cos(angle) * radius
          positions[i3 + 2] = Math.sin(angle) * radius
          break

        case 'wave':
          // Wave motion
          positions[i3 + 1] += Math.sin(time * speed + x * 0.1) * 0.02
          positions[i3] += velocities[i3] * speed
          positions[i3 + 2] += velocities[i3 + 2] * speed
          break

        case 'floating':
        default:
          // Floating motion with bounds
          positions[i3] += velocities[i3] * speed
          positions[i3 + 1] += velocities[i3 + 1] * speed
          positions[i3 + 2] += velocities[i3 + 2] * speed

          // Bounce off boundaries
          if (Math.abs(positions[i3]) > 15) velocities[i3] *= -1
          if (Math.abs(positions[i3 + 1]) > 15) velocities[i3 + 1] *= -1
          if (Math.abs(positions[i3 + 2]) > 15) velocities[i3 + 2] *= -1
          break
      }

      // Mouse interaction effect
      if (interactive) {
        const mouseEffect = 2
        const mouseX = mousePosition.current.x * 10
        const mouseY = mousePosition.current.y * 10
        
        const distanceX = mouseX - positions[i3]
        const distanceY = mouseY - positions[i3 + 1]
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        
        if (distance < 5) {
          const force = (5 - distance) / 5
          positions[i3] += distanceX * force * 0.01 * mouseEffect
          positions[i3 + 1] += distanceY * force * 0.01 * mouseEffect
        }
      }
    }

    // Mark positions as needing update
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  // Responsive particle size based on device
  const responsiveSize = useMemo(() => {
    if (typeof window === 'undefined') return size
    
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024
    
    if (isMobile) return size * 0.5
    if (isTablet) return size * 0.75
    return size
  }, [size])

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={responsiveSize}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

// Preset configurations for different sections
export const ParticlePresets = {
  hero: {
    count: 500,
    speed: 0.5,
    color: '#00D4FF',
    size: 0.02,
    pattern: 'constellation' as const,
    interactive: true
  },
  works: {
    count: 200,
    speed: 0.3,
    color: '#9D4EDD',
    size: 0.015,
    pattern: 'floating' as const,
    interactive: false
  },
  thinks: {
    count: 150,
    speed: 0.2,
    color: '#32FF32',
    size: 0.01,
    pattern: 'wave' as const,
    interactive: false
  },
  about: {
    count: 300,
    speed: 0.4,
    color: '#FF006E',
    size: 0.018,
    pattern: 'spiral' as const,
    interactive: true
  }
}

// Helper component for easy preset usage
export function ParticlePreset({ 
  preset
}: { 
  preset: keyof typeof ParticlePresets
}) {
  const config = ParticlePresets[preset]
  
  return (
    <ParticleSystem
      {...config}
    />
  )
}