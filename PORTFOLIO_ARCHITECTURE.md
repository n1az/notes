# Portfolio Component Architecture

## Main Application Structure

### App.tsx (Portfolio Orchestrator)
```typescript
interface AppState {
  currentView: PortfolioView
  selectedWork: Work | null
  selectedThink: Think | null
  isLoading: boolean
  scrollPosition: number
}

// Manages:
// - Section navigation with smooth scroll
// - Three.js scene transitions
// - Data loading and caching
// - Global theme and animation state
```

## Section Components

### 1. HeroSection.tsx
```typescript
interface HeroSectionProps {
  personalInfo: PersonalInfo
  isVisible: boolean
  onNavigate: (section: PortfolioView) => void
}

// Features:
// - Large Metanoia font name display
// - Animated subtitle with typewriter effect
// - Three.js particle constellation background
// - Floating geometric shapes
// - CTA buttons with glass morphism
// - Mouse-interactive particle system
```

#### HeroSection Structure:
- **ThreeBackground** with constellation particles
- **Typography**: Name (Metanoia), title (HelveticaWorld)
- **FloatingShapes**: Geometric primitives with animations
- **CTAButtons**: Glass morphism with hover effects
- **ScrollIndicator**: Animated down arrow

### 2. WorksSection.tsx
```typescript
interface WorksSectionProps {
  works: Work[]
  featuredWorks: Work[]
  filters: WorksFilter
  onSelectWork: (work: Work) => void
  onFilterChange: (filters: WorksFilter) => void
}

// Features:
// - Grid layout with 3D hover effects
// - Technology filter pills
// - Featured works carousel
// - Project cards with tilt effects
// - Three.js background with floating tech icons
```

#### WorksSection Structure:
- **SectionHeader**: "WORKS" (Metanoia) + filter controls
- **FeaturedCarousel**: Large cards for featured projects
- **WorksGrid**: Masonry layout with 3D cards
- **FilterBar**: Technology and category filters
- **ThreeBackground**: Floating geometric shapes representing technologies

#### WorkCard.tsx
```typescript
interface WorkCardProps {
  work: Work
  variant: 'featured' | 'grid' | 'list'
  onClick: () => void
  threeDEnabled?: boolean
}

// 3D Features:
// - Card tilts on mouse movement
// - Depth shadows and transforms
// - Particle trails on hover
// - Smooth reveal animations
```

### 3. ThinksSection.tsx
```typescript
interface ThinksSectionProps {
  thinks: Think[]
  featuredThinks: Think[]
  filters: ThinksFilter
  onSelectThink: (think: Think) => void
  onFilterChange: (filters: ThinksFilter) => void
}

// Features:
// - Blog-style grid layout
// - Tag filtering system
// - Read time estimates
// - Featured posts section
// - Subtle particle background
```

#### ThinksSection Structure:
- **SectionHeader**: "THINKS" (Metanoia) + search/filter
- **FeaturedPosts**: Highlighted blog posts
- **ThinksGrid**: Card layout with excerpts
- **TagCloud**: Interactive tag filtering
- **ThreeBackground**: Minimal floating particles

#### ThinkCard.tsx
```typescript
interface ThinkCardProps {
  think: Think
  variant: 'featured' | 'grid' | 'preview'
  onClick: () => void
}

// Features:
// - Hover animations
// - Tag display
// - Read time and date
// - Excerpt preview
// - Category color coding
```

### 4. AboutSection.tsx
```typescript
interface AboutSectionProps {
  personalInfo: PersonalInfo
  isVisible: boolean
}

// Features:
// - Personal photo/avatar (possibly Spline 3D)
// - Bio text with animated reveals
// - Skills visualization
// - Social links with hover effects
// - Contact form integration
// - Interactive 3D personal space
```

#### AboutSection Structure:
- **PersonalIntro**: Photo + bio with animations
- **SkillsVisualization**: Interactive skill categories
- **ExperienceTimeline**: Career progression
- **ContactForm**: Glass morphism form
- **SocialLinks**: Floating social media icons
- **ThreeBackground**: Personal 3D environment

## Detail View Components

### 5. WorkDetail.tsx
```typescript
interface WorkDetailProps {
  work: Work
  onBack: () => void
  relatedWorks: Work[]
}

// Features:
// - Full-screen project showcase
// - Image gallery with lightbox
// - Technical details and process
// - Live demo and GitHub links
// - Related projects suggestions
// - Minimal Three.js background
```

### 6. ThinkDetail.tsx
```typescript
interface ThinkDetailProps {
  think: Think
  onBack: () => void
  relatedThinks: Think[]
}

// Features:
// - Blog post reading experience
// - Table of contents
// - Social sharing
// - Related posts
// - Reading progress indicator
// - Clean typography focus
```

## Shared Three.js Components

### ThreeBackground.tsx
```typescript
interface ThreeBackgroundProps {
  config: ThreeSceneConfig
  section: PortfolioView
  isActive: boolean
  children?: React.ReactNode
}

// Manages:
// - Canvas setup and context
// - Scene configuration per section
// - Performance optimization
// - Mobile responsiveness
// - Scene transitions
```

### ParticleSystem.tsx
```typescript
interface ParticleSystemProps {
  count: number
  color: string
  pattern: 'floating' | 'spiral' | 'wave' | 'constellation'
  interactive: boolean
  section: PortfolioView
}

// Features:
// - Instanced geometry for performance
// - Mouse interaction
// - Scroll-based animations
// - Responsive particle counts
// - Color theming per section
```

### GeometricShape.tsx
```typescript
interface GeometricShapeProps {
  type: 'sphere' | 'cube' | 'torus' | 'octahedron'
  material: 'wireframe' | 'glass' | 'metallic' | 'neon'
  animation: 'rotate' | 'float' | 'pulse' | 'orbit'
  position: [number, number, number]
  color: string
  size: number
}

// Features:
// - Shader materials for retro effects
// - Animation loops
// - LOD optimization
// - Interactive hover states
```

### SplineObject.tsx
```typescript
interface SplineObjectProps {
  scene: string
  position?: [number, number, number]
  scale?: number
  autoRotate?: boolean
  interactive?: boolean
  onLoad?: () => void
  fallback?: React.ReactNode
}

// Features:
// - Progressive loading
// - Error boundaries
// - Mobile fallbacks
// - Cache management
```

## Navigation Components

### Navigation.tsx
```typescript
interface NavigationProps {
  currentSection: PortfolioView
  onNavigate: (section: PortfolioView) => void
  isScrolled: boolean
}

// Features:
// - Fixed header with glass morphism
// - Smooth scroll navigation
// - Active section highlighting
// - Mobile hamburger menu
// - Logo with Three.js hover effect
```

### ScrollProgress.tsx
```typescript
interface ScrollProgressProps {
  sections: PortfolioView[]
  currentSection: PortfolioView
  scrollProgress: number
}

// Features:
// - Section progress indicators
// - Smooth progress bar
// - Click-to-navigate
// - Three.js synchronized animations
```

## Layout Components

### Section.tsx
```typescript
interface SectionProps {
  id: PortfolioView
  className?: string
  threeConfig?: ThreeSceneConfig
  children: React.ReactNode
  onInView?: (isInView: boolean) => void
}

// Features:
// - Intersection observer integration
// - Three.js scene activation
// - Scroll-triggered animations
// - Responsive layout
```

### Container.tsx
```typescript
interface ContainerProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  children: React.ReactNode
}

// Responsive container with consistent padding
```

### Grid.tsx
```typescript
interface GridProps {
  columns: { mobile: number, tablet: number, desktop: number }
  gap: number
  className?: string
  children: React.ReactNode
}

// Responsive grid system for works and thinks
```

## Animation & Transition Components

### FadeInOnScroll.tsx
```typescript
interface FadeInOnScrollProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  threshold?: number
}

// Intersection Observer + Framer Motion animations
```

### TypewriterText.tsx
```typescript
interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

// Animated typewriter effect for hero section
```

### GlassCard.tsx
```typescript
interface GlassCardProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'accent'
  hover?: boolean
  className?: string
}

// Glass morphism card component
// Used for work cards, think cards, about cards
```

## Data Management

### hooks/usePortfolioData.ts
```typescript
export const usePortfolioData = () => {
  // Load and cache works, thinks, personal info
  // Handle filtering and searching
  // Manage loading states
}
```

### hooks/useThreeScene.ts
```typescript
export const useThreeScene = (config: ThreeSceneConfig) => {
  // Scene setup and cleanup
  // Performance monitoring
  // Device capability detection
}
```

### hooks/useScrollNavigation.ts
```typescript
export const useScrollNavigation = () => {
  // Smooth scroll between sections
  // Active section detection
  // URL hash management
}
```

## Mobile Adaptations

### Mobile Component Variants
- **HeroMobile**: Simplified hero without heavy 3D
- **WorksGridMobile**: Simplified card layout
- **NavigationMobile**: Hamburger menu
- **ThreeBackgroundMobile**: Reduced particle counts

### Responsive Strategies
- Progressive enhancement for 3D features
- CSS fallbacks for animations
- Touch-optimized interactions
- Performance budgets per device type

## State Management

### Portfolio Context
```typescript
interface PortfolioContextType {
  currentSection: PortfolioView
  selectedWork: Work | null
  selectedThink: Think | null
  filters: { works: WorksFilter, thinks: ThinksFilter }
  personalInfo: PersonalInfo
  isLoading: boolean
  actions: {
    navigateToSection: (section: PortfolioView) => void
    selectWork: (work: Work) => void
    selectThink: (think: Think) => void
    updateFilters: (type: 'works' | 'thinks', filters: any) => void
  }
}
```