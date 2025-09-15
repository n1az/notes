// Portfolio Data Models

export interface Work {
  id: string
  title: string
  description: string
  excerpt: string // Short description for cards
  technologies: string[]
  category: 'web' | 'mobile' | 'design' | 'ai' | 'backend' | 'other'
  links: {
    live?: string
    github?: string
    demo?: string
    case_study?: string
  }
  thumbnail: string
  images?: string[] // Gallery images
  featured: boolean
  status: 'completed' | 'in-progress' | 'concept'
  year: number
  client?: string
  duration?: string
  createdAt: string
  updatedAt: string
}

export interface Think {
  id: string
  title: string
  content: string // HTML content
  excerpt: string // Short preview
  tags: string[]
  category: 'tech' | 'design' | 'life' | 'tutorial' | 'opinion'
  readTime: number // in minutes
  published: boolean
  featured: boolean
  thumbnail?: string
  author: {
    name: string
    avatar?: string
  }
  seo: {
    metaDescription?: string
    keywords?: string[]
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface PortfolioSection {
  id: string
  title: string
  subtitle?: string
  description?: string
  isVisible: boolean
  order: number
  threeConfig?: {
    background: '3d' | 'particles' | 'gradient' | 'spline'
    particleCount?: number
    splineScene?: string
    interactivity?: boolean
  }
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  location: string
  email: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  skills: {
    category: string
    items: string[]
  }[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  education?: {
    degree: string
    school: string
    year: string
  }[]
}

// UI State Management
export type ViewMode = 'portfolio' | 'work-detail' | 'think-detail' | 'about'

export type PortfolioView = 'hero' | 'works' | 'thinks' | 'about' | 'contact'

export interface ThreeSceneConfig {
  background: 'space' | 'gradient' | 'particles' | 'spline'
  particles?: {
    count: number
    speed: number
    color: string
    pattern: 'floating' | 'spiral' | 'wave' | 'constellation'
    interactive: boolean
  }
  spline?: {
    scene: string
    scale?: number
    position?: [number, number, number]
    autoRotate?: boolean
  }
  camera?: {
    position: [number, number, number]
    fov?: number
  }
  controls?: boolean
  fog?: boolean
}

export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
  stagger?: number
}

// Legacy Note interface for migration compatibility
export interface Note {
  id: string
  title: string
  content: string
  background: 'white' | 'grey-paper' | 'beige-dotted' | 'notebook'
  fontFamily: string
  fontSize: string
  textColor: string
  createdAt: string
  updatedAt: string
}

export interface NoteStyle {
  background: Note['background']
  fontFamily: string
  fontSize: string
  textColor: string
}

// Filter and search interfaces
export interface WorksFilter {
  categories: string[]
  technologies: string[]
  status: string[]
  featured?: boolean
}

export interface ThinksFilter {
  categories: string[]
  tags: string[]
  published?: boolean
  featured?: boolean
}

export interface SearchState {
  query: string
  filters: {
    works: WorksFilter
    thinks: ThinksFilter
  }
  sortBy: 'date' | 'title' | 'featured'
  sortOrder: 'asc' | 'desc'
}
