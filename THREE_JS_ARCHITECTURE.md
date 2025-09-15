# Three.js Integration Architecture Plan

## Core Three.js Setup

### Dependencies Required
```json
{
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0", 
  "@splinetool/react-spline": "^2.2.6",
  "three": "^0.157.0",
  "@react-spring/three": "^9.7.0",
  "framer-motion": "^10.16.0",
  "react-intersection-observer": "^9.5.0",
  "lenis": "^1.0.0"
}
```

## Component Architecture

### 1. ThreeBackground.tsx (Reusable Scene Wrapper)
```typescript
interface ThreeBackgroundProps {
  children: React.ReactNode
  camera?: CameraConfig
  controls?: boolean
  fog?: boolean
  background?: 'space' | 'gradient' | 'particles'
}

// Manages canvas, scene, camera, and basic lighting
// Provides consistent Three.js context across sections
```

### 2. ParticleSystem.tsx (Custom Particle Effects)
```typescript
interface ParticleSystemProps {
  count: number
  speed: number
  color: string
  size: number
  pattern: 'floating' | 'spiral' | 'wave' | 'constellation'
  interactive?: boolean
}

// Uses instanced geometry for performance
// Mouse interaction for particle movement
// Responsive particle count based on device
```

### 3. SplineObject.tsx (Spline Integration)
```typescript
interface SplineObjectProps {
  scene: string // URL to Spline scene
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  autoRotate?: boolean
  onLoad?: () => void
}

// Lazy loading for performance
// Error boundaries for failed loads
// Mobile fallbacks
```

### 4. GeometricShape.tsx (Custom 3D Primitives)
```typescript
interface GeometricShapeProps {
  type: 'sphere' | 'cube' | 'torus' | 'octahedron'
  material: 'wireframe' | 'glass' | 'metallic' | 'neon'
  animation: 'rotate' | 'float' | 'pulse' | 'orbit'
  color: string
  size: number
}

// Performance-optimized geometries
// Shader materials for retro effects
// Animation loops with Three.js
```

## Section-Specific Implementations

### Hero Section (3D Typography + Floating Objects)
```typescript
// Components:
// - Floating geometric shapes (cubes, spheres)
// - Particle constellation around name
// - Subtle camera movement on mouse
// - Spline object as focal point

const HeroThreeScene = () => (
  <ThreeBackground camera={{ position: [0, 0, 10] }} fog>
    <ParticleSystem 
      count={500} 
      pattern="constellation" 
      color="#00D4FF" 
      interactive 
    />
    <GeometricShape 
      type="torus" 
      material="wireframe" 
      animation="rotate" 
      color="#9D4EDD" 
    />
    <SplineObject 
      scene="/spline/hero-object.spline" 
      autoRotate 
      scale={1.2} 
    />
  </ThreeBackground>
)
```

### Works Section (Project Showcase with 3D Cards)
```typescript
// Components:
// - 3D project cards that tilt on hover
// - Background particle field
// - Geometric shapes representing technologies
// - Smooth transitions between projects

const WorksThreeScene = () => (
  <ThreeBackground background="particles">
    <ParticleSystem 
      count={200} 
      pattern="floating" 
      color="#FF6B35" 
      speed={0.5} 
    />
    {projects.map(project => (
      <ProjectCard3D 
        key={project.id}
        position={getProjectPosition(project)}
        data={project}
      />
    ))}
  </ThreeBackground>
)
```

### Thinks Section (Blog Grid with Particle Background)
```typescript
// Components:
// - Subtle particle flow
// - Geometric accents for categories
// - Smooth parallax on scroll
// - Minimal 3D to keep focus on content

const ThinksThreeScene = () => (
  <ThreeBackground controls={false}>
    <ParticleSystem 
      count={100} 
      pattern="wave" 
      color="#32FF32" 
      speed={0.2} 
    />
    <GeometricShape 
      type="octahedron" 
      material="glass" 
      animation="float" 
      color="#00FFFF" 
      size={0.5} 
    />
  </ThreeBackground>
)
```

### About Section (Interactive Personal Space)
```typescript
// Components:
// - Interactive Spline character/avatar
// - Responsive environment
// - Easter eggs on interaction
// - Personal geometric signature

const AboutThreeScene = () => (
  <ThreeBackground camera={{ position: [0, 2, 8] }}>
    <SplineObject 
      scene="/spline/avatar.spline" 
      position={[0, 0, 0]}
      interactive
    />
    <ParticleSystem 
      count={300} 
      pattern="spiral" 
      color="#FF006E" 
      interactive 
    />
  </ThreeBackground>
)
```

## Performance Optimization Strategy

### 1. Level of Detail (LOD)
- Desktop: Full particle counts, complex geometries
- Tablet: 50% particles, simplified shaders  
- Mobile: 25% particles, CSS fallbacks

### 2. Memory Management
```typescript
// Cleanup pattern for Three.js components
useEffect(() => {
  return () => {
    scene.clear()
    renderer.dispose()
    geometries.forEach(geo => geo.dispose())
    materials.forEach(mat => mat.dispose())
  }
}, [])
```

### 3. Lazy Loading
- Spline scenes loaded on intersection
- Heavy geometries created on demand
- Texture streaming for large assets

### 4. Frame Rate Optimization
- requestAnimationFrame management
- Frustum culling for off-screen objects
- Instanced rendering for repeated elements

## Custom Hooks for Three.js

### useThreeScene.ts
```typescript
interface SceneConfig {
  background: BackgroundType
  particles: ParticleConfig
  lighting: LightingConfig
  camera: CameraConfig
}

export const useThreeScene = (config: SceneConfig) => {
  // Scene setup, cleanup, and configuration
  // Performance monitoring
  // Device adaptation
}
```

### useParticleAnimation.ts
```typescript
export const useParticleAnimation = (
  particleRef: RefObject<Points>,
  config: AnimationConfig
) => {
  // Animation loop management
  // Mouse interaction handling
  // Performance throttling
}
```

### useSplineLoader.ts
```typescript
export const useSplineLoader = (sceneUrl: string) => {
  // Progressive loading with fallbacks
  // Error handling and retries
  // Cache management
}
```

## Responsive 3D Design

### Breakpoint Strategy
```typescript
const getSceneConfig = (breakpoint: string) => {
  switch (breakpoint) {
    case 'mobile':
      return { particles: 50, quality: 'low' }
    case 'tablet':
      return { particles: 200, quality: 'medium' }
    case 'desktop':
      return { particles: 500, quality: 'high' }
  }
}
```

### Fallback System
- CSS animations for unsupported devices
- WebGL capability detection
- Progressive enhancement approach
- Graceful degradation to 2D layouts

## Integration with Portfolio Content

### Scroll-Triggered Animations
```typescript
// Use Intersection Observer for performance
const { ref, inView } = useInView({
  threshold: 0.3,
  triggerOnce: true
})

// Animate Three.js scene based on scroll position
useEffect(() => {
  if (inView) {
    // Trigger 3D animations
    animateParticles()
    showGeometricShapes()
  }
}, [inView])
```

### Content-Scene Synchronization
- 3D elements respond to content changes
- Smooth transitions between sections
- Contextual particle themes for different content types
- Interactive elements that reveal portfolio details