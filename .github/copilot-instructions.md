# Copilot Instructions for Neo-Brutalist 3D Portfolio Website

## Project Overview
This is a **React + TypeScript + Vite** portfolio website featuring a **neo-brutalist design aesthetic** enhanced with **Three.js** particle systems and **Spline** 3D objects. The portfolio showcases "Works" (projects with links) and "Thinks" (blog posts/thoughts) with immersive 3D backgrounds, bold typography, and parallax effects.

**Design Philosophy**: Neo-brutalism meets 3D - raw, bold UI elements with thick borders and flat colors layered over dynamic particle systems and 3D animations.

## Architecture & Core Patterns

### Portfolio State Management (App.tsx)
- Single-page application with smooth scroll navigation between sections
- Section-based state management: `'hero' | 'works' | 'thinks' | 'about'`
- Three.js scenes persist across sections for seamless transitions
- Works and Thinks data stored locally with external link support
- Parallax text effects on scroll and hover for depth

### 3D Integration Architecture (MUST REMAIN INTACT)
- **@react-three/fiber**: React wrapper for Three.js core functionality
- **@react-three/drei**: Helper components for cameras, controls, and effects
- **@splinetool/react-spline**: Spline scene integration for complex 3D objects
- **Particle systems**: Custom Three.js particle effects for section backgrounds
- **Scene management**: Each portfolio section has dedicated Three.js context
- **Critical**: All 3D particles, animations, and effects must be preserved

### Component Structure
```
App.tsx (portfolio orchestrator)
├── HeroSection.tsx (3D landing with parallax name/title)
├── WorksSection.tsx (neo-brutalist cards with floating 3D elements)
├── ThinksSection.tsx (bold blog cards with particle background)
├── AboutSection.tsx (personal info with interactive 3D scene)
└── shared/
    ├── ThreeBackground.tsx (reusable 3D scene wrapper - KEEP INTACT)
    ├── SplineObject.tsx (Spline integration - KEEP INTACT)
    ├── ParticleSystem.tsx (custom particle effects - KEEP INTACT)
    ├── ParallaxText.tsx (parallax text effects on scroll/hover)
    └── NeoBrutalistCard.tsx (reusable neo-brutalist card component)
```

## Design System Conventions

### Neo-Brutalist Color Palette (tailwind.config.js)
- **Primary**: Pure black (#000000), pure white (#FFFFFF)
- **Accent Colors**: Bold, flat colors with high saturation
  - Electric Yellow (#FFFF00)
  - Hot Pink (#FF006E)
  - Cyber Cyan (#00F0FF)
  - Lime Green (#CCFF00)
  - Royal Blue (#0066FF)
- **Borders**: Extra thick (4-8px), always black
- **Shadows**: Hard drop shadows (8-16px offset), no blur, black
- **Backgrounds**: White or flat accent colors, NO gradients on UI elements
- **3D Backgrounds**: Particle systems and 3D elements remain with original styling

### Neo-Brutalist Typography (public/fonts/)
- **Headlines**: Bold, extra-bold, or black weight fonts
  - Primary: `Metanoia` (ultra-bold) for hero titles
  - Large text with uppercase transformation
- **Display**: Thick, geometric sans-serif
  - `Bauhaus` for section headers and labels
- **Body**: Bold but readable
  - `HelveticaWorld` (medium/bold) for descriptions
- **Accent**: Condensed or extended widths for emphasis
  - `Hangout` for special callouts
- **Text Effects**: Parallax on hover (translate Y), scroll-based parallax shifts
- Font sizes: Oversized (48-96px headlines, 18-24px body)

### Neo-Brutalist UI Components
- **Cards**: 
  - White/flat color backgrounds
  - 6-8px solid black borders
  - Hard 12-16px black drop shadows (no blur)
  - Sharp corners (border-radius: 0) or minimal rounding (4px max)
  - Hover: Shadow shifts position, border thickens
- **Buttons**:
  - Bold text (uppercase, large size)
  - Thick black borders (4-6px)
  - Flat accent color fills
  - Hard shadows
  - Hover: Shadow shifts, background color change (flat swap)
  - Active: Shadow disappears, translate down/right
- **Inputs/Forms**:
  - Thick borders (3-4px black)
  - White backgrounds
  - Large, bold labels
  - Hard focus states (border color change to accent)
- **Layout**:
  - Asymmetric, bold compositions
  - Overlapping elements with z-index play
  - Large spacing between sections
  - Grid-based layouts with visible structure

### 3D Visual Language (MUST PRESERVE)
- **Geometric primitives**: Spheres, cubes, torus for abstract backgrounds
- **Particle effects**: Floating dots, lines, geometric shapes
- **Motion**: Subtle rotation, floating animations, mouse interaction
- **Lighting**: Ambient + point lights
- **Materials**: Wireframes, gradients, metallic surfaces
- **Critical**: All existing 3D animations, particles, and effects UNCHANGED

### Parallax Effects
- **Text Parallax on Scroll**:
  - Different layers move at different speeds
  - Headlines: Slower movement (0.5x scroll speed)
  - Body text: Normal speed (1x)
  - Accent elements: Faster (1.5x)
- **Text Parallax on Hover**:
  - Mouse movement creates subtle Y/X translation
  - Range: -10px to +10px based on cursor position
  - Smooth easing with transform transitions
- **Implementation**: Use `transform: translate3d()` for GPU acceleration
- **Library**: Consider `framer-motion` for parallax scroll animations

## Development Workflow

### Key Commands
```bash
npm run dev        # Vite dev server with Three.js hot reload
npm run build      # TypeScript + Three.js optimization
npm run preview    # Production build with 3D assets
npm run lint       # ESLint + Three.js best practices
```

### Performance Considerations
### 3D Asset loading**: Lazy load Spline scenes, preload critical models
- **Particle optimization**: Instance meshes, LOD for complex scenes
- **Memory management**: Dispose geometries and materials on unmount
- **Mobile adaptation**: Reduced particle counts, simplified shaders
- **Neo-brutalist rendering**: CSS transforms over JS animations where possible
- **Parallax performance**: Use `will-change`, throttle scroll listeners

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

### Responsive Neo-Brutalist UI
- Desktop: Full shadows, thick borders, large spacing
- Tablet: Medium shadows, standard borders
- Mobile: Minimal shadows, touch-friendly button sizes (min 44px)

## Key Files to Understand
- `src/App.tsx` - Portfolio section navigation and 3D context
- `src/components/shared/ThreeBackground.tsx` - Reusable 3D scene wrapper
- `tailwind.config.js` - Neo-brutalist color system and utilities
- `src/hooks/useThreeJS.ts` - Custom Three.js scene management
- `src/data/portfolio.ts` - Works and thinks data structure
- `public/fonts/` - Custom typography assets with bold aesthetic
