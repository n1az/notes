import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

interface GeometricShapeProps {
  type: 'sphere' | 'cube' | 'torus' | 'octahedron'
  material: 'wireframe' | 'glass' | 'metallic' | 'neon'
  animation: 'rotate' | 'float' | 'pulse' | 'orbit'
  position: [number, number, number]
  color: string
  size: number
  opacity?: number
}

export function GeometricShape({
  type,
  material,
  animation,
  position,
  color,
  size,
  opacity = 0.8
}: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef({ angle: Math.random() * Math.PI * 2 })

  // Create material based on type
  const materialProps = useMemo(() => {
    const baseColor = new THREE.Color(color)
    
    switch (material) {
      case 'wireframe':
        return {
          wireframe: true,
          color: baseColor,
          transparent: true,
          opacity: opacity * 0.7
        }
      
      case 'glass':
        return {
          color: baseColor,
          transparent: true,
          opacity: opacity * 0.3,
          roughness: 0,
          metalness: 0,
          envMapIntensity: 1
        }
      
      case 'metallic':
        return {
          color: baseColor,
          transparent: true,
          opacity: opacity,
          roughness: 0.2,
          metalness: 0.8,
          envMapIntensity: 1
        }
      
      case 'neon':
      default:
        return {
          color: baseColor,
          transparent: true,
          opacity: opacity,
          emissive: baseColor,
          emissiveIntensity: 0.2
        }
    }
  }, [material, color, opacity])

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()
    const mesh = meshRef.current

    switch (animation) {
      case 'rotate':
        mesh.rotation.x = time * 0.5
        mesh.rotation.y = time * 0.3
        mesh.rotation.z = time * 0.2
        break

      case 'float':
        mesh.position.y = position[1] + Math.sin(time + position[0]) * 0.5
        mesh.rotation.y = time * 0.2
        break

      case 'pulse':
        const scale = 1 + Math.sin(time * 2) * 0.1
        mesh.scale.set(scale, scale, scale)
        mesh.rotation.y = time * 0.1
        break

      case 'orbit':
        orbitRef.current.angle += 0.01
        const radius = 2
        mesh.position.x = position[0] + Math.cos(orbitRef.current.angle) * radius
        mesh.position.z = position[2] + Math.sin(orbitRef.current.angle) * radius
        mesh.rotation.y = time * 0.3
        break
    }
  })

  const shapeProps = {
    ref: meshRef,
    position,
    args: [size, size, size] as [number, number, number]
  }

  const renderShape = () => {
    switch (type) {
      case 'sphere':
        return (
          <Sphere {...shapeProps} args={[size, 32, 32]}>
            <meshStandardMaterial {...materialProps} />
          </Sphere>
        )
      
      case 'cube':
        return (
          <Box {...shapeProps}>
            <meshStandardMaterial {...materialProps} />
          </Box>
        )
      
      case 'torus':
        return (
          <Torus {...shapeProps} args={[size, size * 0.4, 16, 32]}>
            <meshStandardMaterial {...materialProps} />
          </Torus>
        )
      
      case 'octahedron':
      default:
        return (
          <Octahedron {...shapeProps} args={[size]}>
            <meshStandardMaterial {...materialProps} />
          </Octahedron>
        )
    }
  }

  return renderShape()
}

// Preset configurations for different contexts
export const ShapePresets = {
  heroFloat: {
    type: 'torus' as const,
    material: 'wireframe' as const,
    animation: 'float' as const,
    color: '#00D4FF',
    size: 1,
    opacity: 0.6
  },
  heroOrbit: {
    type: 'octahedron' as const,
    material: 'neon' as const,
    animation: 'orbit' as const,
    color: '#9D4EDD',
    size: 0.5,
    opacity: 0.8
  },
  worksTech: {
    type: 'cube' as const,
    material: 'glass' as const,
    animation: 'rotate' as const,
    color: '#FF6B35',
    size: 0.3,
    opacity: 0.4
  },
  aboutPersonal: {
    type: 'sphere' as const,
    material: 'metallic' as const,
    animation: 'pulse' as const,
    color: '#32FF32',
    size: 0.8,
    opacity: 0.7
  }
}

// Helper component for floating shapes collection
export function FloatingShapes({ count = 5 }: { count?: number }) {
  const shapes = useMemo(() => {
    const shapeTypes: Array<keyof typeof ShapePresets> = ['heroFloat', 'heroOrbit']
    
    return Array.from({ length: count }, (_, i) => {
      const presetKey = shapeTypes[i % shapeTypes.length]
      const preset = ShapePresets[presetKey]
      
      return {
        id: i,
        ...preset,
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10
        ] as [number, number, number]
      }
    })
  }, [count])

  return (
    <>
      {shapes.map((shape) => (
        <GeometricShape
          key={shape.id}
          {...shape}
        />
      ))}
    </>
  )
}