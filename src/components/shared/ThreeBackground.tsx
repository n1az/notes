import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeSceneConfig, PortfolioView } from '../../types'

interface ThreeBackgroundProps {
  config: ThreeSceneConfig
  section: PortfolioView
  isActive: boolean
  children?: React.ReactNode
  className?: string
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="absolute inset-0 bg-retro-space-navy animate-pulse">
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-retro-electric-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
)

// Scene setup and management
function SceneManager({ config, isActive }: { config: ThreeSceneConfig; isActive: boolean }) {
  const { scene, camera, gl } = useThree()
  const sceneRef = useRef(scene)

  // Cleanup on unmount or scene change
  useEffect(() => {
    return () => {
      // Clean up geometries, materials, and textures
      scene.traverse((object) => {
        if (object.type === 'Mesh') {
          const mesh = object as THREE.Mesh
          if (mesh.geometry) {
            mesh.geometry.dispose()
          }
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(material => material.dispose())
            } else {
              mesh.material.dispose()
            }
          }
        }
      })
      
      // Dispose renderer
      gl.dispose()
    }
  }, [scene, gl])

  // Performance optimization based on active state
  useEffect(() => {
    if (gl && gl.domElement) {
      // Reduce quality when not active
      const pixelRatio = isActive ? 
        Math.min(window.devicePixelRatio, 2) : 
        Math.min(window.devicePixelRatio, 1)
      
      gl.setPixelRatio(pixelRatio)
    }
  }, [isActive, gl])

  return null
}

// Lighting setup for modern retro aesthetic
function RetroLighting() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} color="#1E3A8A" />
      
      {/* Primary directional light with retro blue tint */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#00D4FF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Secondary fill light with purple accent */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.5}
        color="#9D4EDD"
      />
      
      {/* Rim light for edge highlighting */}
      <directionalLight
        position={[0, -10, 10]}
        intensity={0.3}
        color="#FF6B35"
      />
    </>
  )
}

// Camera configuration based on section
function CameraController({ config }: { config: ThreeSceneConfig }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  
  useFrame((state) => {
    if (cameraRef.current) {
      // Subtle camera movement for dynamic feel
      const time = state.clock.getElapsedTime()
      cameraRef.current.position.x += Math.sin(time * 0.1) * 0.001
      cameraRef.current.position.y += Math.cos(time * 0.15) * 0.001
    }
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={config.camera?.position || [0, 0, 10]}
      fov={config.camera?.fov || 75}
      near={0.1}
      far={1000}
    />
  )
}

// Fog setup for depth and atmosphere
function RetroFog({ enabled }: { enabled: boolean }) {
  const { scene } = useThree()
  
  useEffect(() => {
    if (enabled) {
      scene.fog = new THREE.Fog('#0A0E27', 10, 50)
    } else {
      scene.fog = null
    }
    
    return () => {
      scene.fog = null
    }
  }, [enabled, scene])
  
  return null
}

export function ThreeBackground({ 
  config, 
  section, 
  isActive, 
  children, 
  className = "" 
}: ThreeBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
      >
        {/* Scene management and cleanup */}
        <SceneManager config={config} isActive={isActive} />
        
        {/* Camera setup */}
        <CameraController config={config} />
        
        {/* Lighting */}
        <RetroLighting />
        
        {/* Fog for atmosphere */}
        <RetroFog enabled={config.fog || false} />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
        
        {/* Controls (if enabled) */}
        {config.controls && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
        
        {/* Scene content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
      
      {/* Loading overlay */}
      <Suspense fallback={<LoadingFallback />}>
        <></>
      </Suspense>
    </div>
  )
}