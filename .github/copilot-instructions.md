# Copilot Instructions for Modern Retro Portfolio Website

## Project Overview
This is a **React + TypeScript + Vite** portfolio website featuring a modern retro aesthetic with **Three.js** particle systems and **Spline** 3D objects. The portfolio showcases "Works" (projects with links) and "Thinks" (blog posts/thoughts) with immersive 3D backgrounds and animations.

## Architecture & Core Patterns

### Portfolio State Management (App.tsx)
- Single-page application with smooth scroll navigation between sections
- Section-based state management: `'hero' | 'works' | 'thinks' | 'about'`
- Three.js scenes persist across sections for seamless transitions
- Works and Thinks data stored locally with external link support

### 3D Integration Architecture
- **@react-three/fiber**: React wrapper for Three.js core functionality
- **@react-three/drei**: Helper components for cameras, controls, and effects
- **@splinetool/react-spline**: Spline scene integration for complex 3D objects
- **Particle systems**: Custom Three.js particle effects for section backgrounds
- **Scene management**: Each portfolio section has dedicated Three.js context

### Component Structure
```
App.tsx (portfolio orchestrator)
├── HeroSection.tsx (3D landing with name/title animation)
├── WorksSection.tsx (project showcase with floating 3D elements)
├── ThinksSection.tsx (blog grid with particle background)
├── AboutSection.tsx (personal info with interactive 3D scene)
└── shared/
    ├── ThreeBackground.tsx (reusable 3D scene wrapper)
    ├── SplineObject.tsx (Spline integration component)
    └── ParticleSystem.tsx (custom particle effects)
```

## Design System Conventions

### Modern Retro Color Palette (tailwind.config.js)
- **Primary**: Electric blues, neon cyans, retro purples
- **Accent**: Sunset oranges, hot pinks, lime greens
- **Backgrounds**: Deep space navy, cosmic blacks, gradient overlays
- **Text**: High contrast whites, warm grays, accent highlights
- Glass morphism effects with rgba opacity for UI overlays

### Typography Hierarchy (public/fonts/)
- **Headlines**: `Metanoia` (bold, futuristic) for main titles
- **Display**: `Hangout` (quirky, retro) for section headers
- **Body**: `HelveticaWorld` (clean, readable) for descriptions
- **Accent**: `Bauhaus` (geometric) for project categories
- **Special**: `Giaza` variants for unique elements
- Font loading optimized with preload and display:swap

### 3D Visual Language
- **Geometric primitives**: Spheres, cubes, torus for abstract backgrounds
- **Particle effects**: Floating dots, lines, geometric shapes
- **Motion**: Subtle rotation, floating animations, mouse interaction
- **Lighting**: Ambient + point lights with retro color temperature
- **Materials**: Wireframes, gradients, metallic surfaces

## Development Workflow

### Key Commands
```bash
npm run dev        # Vite dev server with Three.js hot reload
npm run build      # TypeScript + Three.js optimization
npm run preview    # Production build with 3D assets
npm run lint       # ESLint + Three.js best practices
```

### Performance Considerations
- **3D Asset loading**: Lazy load Spline scenes, preload critical models
- **Particle optimization**: Instance meshes, LOD for complex scenes
- **Memory management**: Dispose geometries and materials on unmount
- **Mobile adaptation**: Reduced particle counts, simplified shaders

## Critical Dependencies

### 3D Libraries
- **@react-three/fiber**: React Three.js renderer
- **@react-three/drei**: Pre-built Three.js components (OrbitControls, etc.)
- **@splinetool/react-spline**: Spline 3D scene integration
- **three**: Core Three.js library
- **@react-spring/three**: 3D animations and transitions

### UI Enhancement
- **framer-motion**: Page transitions and scroll animations
- **react-intersection-observer**: Trigger 3D effects on scroll
- **lenis**: Smooth scroll for portfolio navigation

## Data Models & Content

### Work Interface
```typescript
interface Work {
  id: string
  title: string
  description: string
  technologies: string[]
  category: 'web' | 'mobile' | 'design' | 'other'
  links: {
    live?: string
    github?: string
    demo?: string
  }
  thumbnail: string
  featured: boolean
  createdAt: string
}
```

### Think Interface
```typescript
interface Think {
  id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  readTime: number
  published: boolean
  createdAt: string
  updatedAt: string
}
```

## Common Patterns & Conventions

### Three.js Scene Setup
```typescript
// Standard scene initialization
const sceneRef = useRef<THREE.Scene>()
const { scene, camera, gl } = useThree()

// Cleanup on unmount
useEffect(() => {
  return () => {
    scene.clear()
    gl.dispose()
  }
}, [])
```

### Particle System Pattern
```typescript
// Instanced geometry for performance
const particleCount = 1000
const positions = useMemo(() => {
  const pos = new Float32Array(particleCount * 3)
  // Generate positions
  return pos
}, [])
```

### Responsive 3D Behavior
- Desktop: Full particle systems, complex Spline objects
- Tablet: Reduced particle count, simplified animations  
- Mobile: Static backgrounds with subtle CSS animations fallback

## Key Files to Understand
- `src/App.tsx` - Portfolio section navigation and 3D context
- `src/components/shared/ThreeBackground.tsx` - Reusable 3D scene wrapper
- `tailwind.config.js` - Modern retro color system and glass effects
- `src/hooks/useThreeJS.ts` - Custom Three.js scene management
- `src/data/portfolio.ts` - Works and thinks data structure
- `public/fonts/` - Custom typography assets with retro aesthetic
