# Dependencies Planning for Modern Retro Portfolio

## Core Three.js Dependencies

### Essential 3D Libraries
```json
{
  "@react-three/fiber": "^8.15.12",
  "@react-three/drei": "^9.95.0", 
  "three": "^0.160.0"
}
```

**@react-three/fiber**: React renderer for Three.js
- Declarative Three.js in React components
- Automatic cleanup and memory management
- Hook-based scene manipulation

**@react-three/drei**: Helper components and utilities
- OrbitControls, PerspectiveCamera, Environment
- Text3D, Float, MeshDistortMaterial
- Performance components (Preload, BakeShadows)

**three**: Core Three.js library
- WebGL rendering engine
- Geometry, materials, and lighting
- Animation and math utilities

### Spline Integration
```json
{
  "@splinetool/react-spline": "^2.2.6",
  "@splinetool/runtime": "^0.9.522"
}
```

**@splinetool/react-spline**: React wrapper for Spline scenes
- Embed 3D scenes created in Spline
- Runtime interaction and event handling
- Progressive loading and error boundaries

## Animation & Motion Libraries

### React Spring for 3D
```json
{
  "@react-spring/three": "^9.7.3",
  "@react-spring/web": "^9.7.3"
}
```

**@react-spring/three**: Physics-based animations for Three.js
- Smooth spring animations for 3D objects
- Gesture-based interactions
- Performance-optimized tweening

### Framer Motion for UI
```json
{
  "framer-motion": "^10.18.0"
}
```

**framer-motion**: Page transitions and scroll animations
- Layout animations and page transitions
- Scroll-triggered animations
- Gesture handling and drag interactions

## Scroll & Navigation
```json
{
  "lenis": "^1.0.39",
  "react-intersection-observer": "^9.5.3"
}
```

**lenis**: Smooth scroll library
- Buttery smooth scrolling experience
- Scroll hijacking for section navigation
- Performance optimized

**react-intersection-observer**: Scroll-triggered effects
- Trigger Three.js animations on scroll
- Lazy loading for performance
- Section navigation detection

## Utility Libraries

### Styling & Utilities
```json
{
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0",
  "class-variance-authority": "^0.7.0"
}
```

**clsx**: Conditional className utility
**tailwind-merge**: Merge Tailwind classes intelligently
**class-variance-authority**: Component variant system

### Performance & Optimization
```json
{
  "react-use": "^17.4.2",
  "react-error-boundary": "^4.0.11",
  "react-helmet-async": "^2.0.4"
}
```

**react-use**: Collection of useful React hooks
**react-error-boundary**: Error boundaries for 3D components
**react-helmet-async**: SEO and meta tag management

## Development Dependencies

### Build & Development
```json
{
  "@types/three": "^0.160.0",
  "@vitejs/plugin-react": "^5.0.0",
  "vite": "^7.1.2",
  "typescript": "~5.8.3"
}
```

**@types/three**: TypeScript definitions for Three.js
**@vitejs/plugin-react**: Vite React plugin with Fast Refresh
**vite**: Build tool optimized for modern development
**typescript**: Type safety for large codebase

### Code Quality
```json
{
  "eslint": "^9.33.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "prettier": "^3.2.5",
  "@typescript-eslint/eslint-plugin": "^7.0.0"
}
```

**eslint**: Code linting with React and Three.js rules
**prettier**: Code formatting
**@typescript-eslint**: TypeScript-specific linting

## Asset Loading & Processing

### Image & Media
```json
{
  "react-image-gallery": "^1.3.0",
  "react-lazy-load-image-component": "^1.6.0"
}
```

**react-image-gallery**: Portfolio image galleries
**react-lazy-load-image-component**: Lazy loading for performance

### Font Loading
```json
{
  "webfontloader": "^1.6.28",
  "@types/webfontloader": "^1.6.37"
}
```

**webfontloader**: Efficient custom font loading
- Load fonts from /public/fonts/
- FOUT prevention strategies
- Loading state management

## Data Management

### State & Data
```json
{
  "zustand": "^4.4.7",
  "react-query": "^3.39.3"
}
```

**zustand**: Lightweight state management
- Portfolio navigation state
- 3D scene configurations
- User preferences

**react-query**: Data fetching and caching
- Portfolio content loading
- Image prefetching
- Background data sync

## Mobile & Touch Support
```json
{
  "react-device-detect": "^2.2.3",
  "react-spring-3d": "^9.7.3"
}
```

**react-device-detect**: Device capability detection
**react-spring-3d**: Touch-optimized 3D interactions

## Testing (Optional)
```json
{
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.1.5",
  "vitest": "^1.2.0"
}
```

**@testing-library/react**: Component testing
**vitest**: Fast unit testing
**@testing-library/jest-dom**: DOM testing utilities

## Package.json Scripts Update
```json
{
  "scripts": {
    "dev": "vite --host",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx}\"",
    "type-check": "tsc --noEmit",
    "analyze": "npm run build && npx vite-bundle-analyzer dist"
  }
}
```

## Installation Command
```bash
npm install @react-three/fiber @react-three/drei three @splinetool/react-spline @react-spring/three @react-spring/web framer-motion lenis react-intersection-observer clsx tailwind-merge class-variance-authority react-use react-error-boundary react-helmet-async webfontloader zustand react-device-detect

npm install -D @types/three @types/webfontloader prettier @typescript-eslint/eslint-plugin
```

## Performance Budget

### Bundle Size Targets
- Main bundle: < 500KB gzipped
- Three.js chunks: < 300KB gzipped  
- Spline assets: < 2MB total
- Fonts: < 500KB total

### Runtime Performance
- 60fps on desktop
- 30fps on mobile
- < 100ms interaction response
- < 3s initial page load

### Memory Management
- < 100MB Three.js memory usage
- Automatic geometry/material disposal
- Texture streaming for large assets
- Progressive loading strategies

## Alternative Lightweight Options

### Minimal Three.js Setup
If full Three.js is too heavy:
```json
{
  "react-three-fiber-lite": "^8.0.0",
  "three-mesh-ui": "^6.5.4"
}
```

### CSS-only Fallbacks
For unsupported devices:
```json
{
  "animate.css": "^4.1.1",
  "css-doodle": "^0.32.1"
}
```

## Migration Strategy

### Phase 1: Core Setup
1. Install essential dependencies
2. Set up Three.js context
3. Create basic particle system

### Phase 2: Component Development  
1. Build reusable 3D components
2. Implement section-specific scenes
3. Add Spline integration

### Phase 3: Optimization
1. Performance profiling
2. Bundle size optimization
3. Mobile adaptations

### Phase 4: Polish
1. Advanced animations
2. Interactive elements
3. SEO and accessibility