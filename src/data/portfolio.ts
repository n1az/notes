import type { Work, Think, PersonalInfo } from '../types'

// Sample Works Portfolio Data
export const portfolioWorks: Work[] = [
  {
    id: 'work-1',
    title: 'AI-Powered Analytics Dashboard',
    description: 'A comprehensive analytics platform built with React, TypeScript, and Three.js for data visualization. Features real-time data processing, interactive 3D charts, and machine learning insights.',
    excerpt: 'Real-time analytics platform with 3D data visualization and ML insights',
    technologies: ['React', 'TypeScript', 'Three.js', 'Python', 'TensorFlow', 'D3.js'],
    category: 'web',
    links: {
      live: 'https://analytics-demo.example.com',
      github: 'https://github.com/username/analytics-dashboard',
      case_study: 'https://medium.com/@username/building-3d-analytics'
    },
    thumbnail: '/images/analytics-thumb.jpg',
    images: ['/images/analytics-1.jpg', '/images/analytics-2.jpg'],
    featured: true,
    status: 'completed',
    year: 2024,
    client: 'TechCorp Inc.',
    duration: '3 months',
    createdAt: new Date('2024-08-01').toISOString(),
    updatedAt: new Date('2024-08-01').toISOString()
  },
  {
    id: 'work-2',
    title: 'RetroWave Music Player',
    description: 'A nostalgic music player app with retro-futuristic design, featuring audio visualization, playlist management, and social sharing capabilities.',
    excerpt: 'Retro-futuristic music player with audio visualization',
    technologies: ['React Native', 'Expo', 'Web Audio API', 'Firebase', 'Styled Components'],
    category: 'mobile',
    links: {
      live: 'https://retrowave-player.com',
      github: 'https://github.com/username/retrowave-player'
    },
    thumbnail: '/images/musicplayer-thumb.jpg',
    featured: true,
    status: 'completed',
    year: 2024,
    duration: '2 months',
    createdAt: new Date('2024-06-15').toISOString(),
    updatedAt: new Date('2024-06-15').toISOString()
  },
  {
    id: 'work-3',
    title: 'Quantum Computing Simulator',
    description: 'An educational web application that simulates quantum computing concepts with interactive visualizations and step-by-step tutorials.',
    excerpt: 'Educational quantum computing simulator with interactive visualizations',
    technologies: ['Vue.js', 'Python', 'Qiskit', 'WebGL', 'Docker'],
    category: 'web',
    links: {
      live: 'https://quantum-sim.example.com',
      github: 'https://github.com/username/quantum-simulator',
      demo: 'https://www.youtube.com/watch?v=demo'
    },
    thumbnail: '/images/quantum-thumb.jpg',
    featured: false,
    status: 'completed',
    year: 2023,
    duration: '4 months',
    createdAt: new Date('2023-12-01').toISOString(),
    updatedAt: new Date('2023-12-01').toISOString()
  },
  {
    id: 'work-4',
    title: 'Neural Network Visualizer',
    description: 'Interactive tool for visualizing neural network architectures and training processes in real-time, built for educational purposes.',
    excerpt: 'Real-time neural network architecture visualization tool',
    technologies: ['JavaScript', 'TensorFlow.js', 'Canvas API', 'Node.js'],
    category: 'ai',
    links: {
      live: 'https://nn-visualizer.com',
      github: 'https://github.com/username/nn-visualizer'
    },
    thumbnail: '/images/neural-thumb.jpg',
    featured: false,
    status: 'completed',
    year: 2023,
    duration: '2 months',
    createdAt: new Date('2023-09-15').toISOString(),
    updatedAt: new Date('2023-09-15').toISOString()
  },
  {
    id: 'work-5',
    title: 'Metaverse Gallery Platform',
    description: 'A virtual reality art gallery platform where artists can showcase their work in immersive 3D environments.',
    excerpt: 'VR art gallery platform for immersive digital exhibitions',
    technologies: ['A-Frame', 'WebXR', 'Three.js', 'Node.js', 'WebRTC'],
    category: 'other',
    links: {
      demo: 'https://metaverse-gallery-demo.com',
      github: 'https://github.com/username/metaverse-gallery'
    },
    thumbnail: '/images/metaverse-thumb.jpg',
    featured: true,
    status: 'in-progress',
    year: 2024,
    duration: '6 months',
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date('2024-09-15').toISOString()
  }
]

// Sample Thinks Blog Data
export const portfolioThinks: Think[] = [
  {
    id: 'think-1',
    title: "The Future of Web Development: Three.js and Beyond",
    content: `
      <p>The web development landscape is rapidly evolving, and 3D graphics are becoming increasingly important in creating engaging user experiences. Three.js has emerged as the go-to library for bringing 3D content to the web.</p>
      
      <h2>Why Three.js Matters</h2>
      <p>Three.js democratizes 3D graphics on the web, making it accessible to developers without deep graphics programming knowledge. With WebGL support becoming universal, we're seeing a new era of web applications that blur the line between web and native experiences.</p>
      
      <h2>Performance Considerations</h2>
      <p>When implementing 3D graphics in web applications, performance is crucial. Here are key strategies:</p>
      <ul>
        <li>Use instanced geometry for repeated objects</li>
        <li>Implement Level of Detail (LOD) systems</li>
        <li>Optimize textures and materials</li>
        <li>Consider device capabilities and provide fallbacks</li>
      </ul>
      
      <h2>The Road Ahead</h2>
      <p>As WebXR adoption grows and browser capabilities expand, we'll see even more immersive web experiences. The future of web development is three-dimensional.</p>
    `,
    excerpt: "Exploring how Three.js is revolutionizing web development and creating new possibilities for immersive user experiences.",
    tags: ['Web Development', 'Three.js', 'WebGL', 'Future Tech'],
    category: 'tech',
    readTime: 8,
    published: true,
    featured: true,
    thumbnail: '/images/threejs-future-thumb.jpg',
    author: {
      name: 'Your Name',
      avatar: '/images/avatar.jpg'
    },
    seo: {
      metaDescription: 'Discover how Three.js is shaping the future of web development with immersive 3D experiences.',
      keywords: ['Three.js', 'WebGL', 'Web Development', '3D Graphics', 'Frontend']
    },
    createdAt: new Date('2024-09-10').toISOString(),
    updatedAt: new Date('2024-09-10').toISOString(),
    publishedAt: new Date('2024-09-10').toISOString()
  },
  {
    id: 'think-2',
    title: "Building Performant React Applications at Scale",
    content: `
      <p>As React applications grow in complexity, maintaining performance becomes a critical challenge. This post explores advanced optimization techniques and architectural patterns for large-scale React applications.</p>
      
      <h2>Component Optimization Strategies</h2>
      <p>The foundation of performant React apps lies in optimized components:</p>
      <ul>
        <li>Use React.memo for expensive pure components</li>
        <li>Implement useMemo and useCallback judiciously</li>
        <li>Optimize re-renders with proper dependency arrays</li>
        <li>Leverage Suspense for code splitting</li>
      </ul>
      
      <h2>State Management Patterns</h2>
      <p>Choosing the right state management solution significantly impacts performance. Consider using Zustand for lightweight state management or Redux Toolkit for complex applications.</p>
      
      <h2>Bundle Optimization</h2>
      <p>Modern bundlers like Vite offer significant performance improvements over traditional webpack setups, especially for development workflows.</p>
    `,
    excerpt: "Advanced techniques for building and maintaining high-performance React applications in production environments.",
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
    category: 'tech',
    readTime: 12,
    published: true,
    featured: true,
    author: {
      name: 'Your Name',
      avatar: '/images/avatar.jpg'
    },
    seo: {
      metaDescription: 'Learn advanced React optimization techniques for building performant applications at scale.',
      keywords: ['React', 'Performance', 'Optimization', 'Scale', 'JavaScript']
    },
    createdAt: new Date('2024-08-25').toISOString(),
    updatedAt: new Date('2024-08-25').toISOString(),
    publishedAt: new Date('2024-08-25').toISOString()
  },
  {
    id: 'think-3',
    title: "The Art of Modern UI Design: Glassmorphism and Beyond",
    content: `
      <p>Design trends come and go, but some leave a lasting impact on how we think about user interfaces. Glassmorphism represents a evolution in UI design that emphasizes depth, transparency, and visual hierarchy.</p>
      
      <h2>Understanding Glassmorphism</h2>
      <p>Glassmorphism creates interfaces that appear to be made of frosted glass, using blur effects, transparency, and subtle shadows to create depth and visual interest.</p>
      
      <h2>Implementation Techniques</h2>
      <p>CSS backdrop-filter is the key to achieving glassmorphism effects:</p>
      <pre><code>
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}
      </code></pre>
      
      <h2>Accessibility Considerations</h2>
      <p>While visually appealing, glassmorphism effects must be implemented with accessibility in mind, ensuring sufficient contrast and readability.</p>
    `,
    excerpt: "Exploring modern UI design trends including glassmorphism and their practical implementation in web interfaces.",
    tags: ['UI Design', 'CSS', 'Glassmorphism', 'Design Trends'],
    category: 'design',
    readTime: 6,
    published: true,
    featured: false,
    author: {
      name: 'Your Name',
      avatar: '/images/avatar.jpg'
    },
    seo: {
      metaDescription: 'Learn about modern UI design trends and how to implement glassmorphism effects in your web projects.',
      keywords: ['UI Design', 'Glassmorphism', 'CSS', 'Web Design', 'Modern UI']
    },
    createdAt: new Date('2024-07-15').toISOString(),
    updatedAt: new Date('2024-07-15').toISOString(),
    publishedAt: new Date('2024-07-15').toISOString()
  },
  {
    id: 'think-4',
    title: "My Journey into Quantum Computing",
    content: `
      <p>Two years ago, I stumbled upon a quantum computing paper and became fascinated by the potential of quantum algorithms to solve problems that are intractable for classical computers.</p>
      
      <h2>The Learning Curve</h2>
      <p>Learning quantum computing as a web developer was challenging. The mathematical foundations are different from traditional programming, requiring understanding of linear algebra and quantum mechanics principles.</p>
      
      <h2>Practical Applications</h2>
      <p>Despite being in early stages, quantum computing has practical applications emerging in:</p>
      <ul>
        <li>Cryptography and security</li>
        <li>Optimization problems</li>
        <li>Machine learning algorithms</li>
        <li>Drug discovery and molecular simulation</li>
      </ul>
      
      <h2>Building Quantum Simulators</h2>
      <p>Creating web-based quantum simulators has been an excellent way to learn and teach quantum concepts. JavaScript can effectively simulate small quantum systems for educational purposes.</p>
    `,
    excerpt: "A personal reflection on learning quantum computing as a web developer and building educational tools to make quantum concepts accessible.",
    tags: ['Quantum Computing', 'Learning', 'Education', 'Personal Journey'],
    category: 'life',
    readTime: 10,
    published: true,
    featured: false,
    author: {
      name: 'Your Name',
      avatar: '/images/avatar.jpg'
    },
    seo: {
      metaDescription: 'A personal journey into quantum computing and building educational tools for complex quantum concepts.',
      keywords: ['Quantum Computing', 'Learning', 'Education', 'Personal Story', 'Science']
    },
    createdAt: new Date('2024-06-01').toISOString(),
    updatedAt: new Date('2024-06-01').toISOString(),
    publishedAt: new Date('2024-06-01').toISOString()
  }
]

// Personal Information
export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  title: 'Creative Developer & Digital Artist',
  bio: 'I craft immersive digital experiences at the intersection of technology and art, specializing in Three.js, React, and modern web technologies.',
  location: 'San Francisco, CA',
  email: 'hello@yourname.com',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    website: 'https://yourname.com'
  },
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Three.js', 'Next.js', 'Vue.js', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs']
    },
    {
      category: '3D & Graphics',
      items: ['Three.js', 'WebGL', 'Blender', 'Spline', 'WebXR', 'Canvas API']
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Adobe Creative Suite']
    }
  ],
  experience: [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      duration: '2022 - Present',
      description: 'Lead frontend development for next-generation web applications using React, Three.js, and modern web technologies.'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      duration: '2020 - 2022',
      description: 'Built scalable web applications from concept to deployment, focusing on user experience and performance optimization.'
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Agency',
      duration: '2018 - 2020',
      description: 'Developed interactive websites and digital experiences for diverse clients across various industries.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      year: '2018'
    }
  ]
}

// Featured works and thinks for quick access
export const featuredWorks = portfolioWorks.filter(work => work.featured)
export const featuredThinks = portfolioThinks.filter(think => think.featured)

// Utility functions for data access
export const getWorkById = (id: string): Work | undefined => {
  return portfolioWorks.find(work => work.id === id)
}

export const getThinkById = (id: string): Think | undefined => {
  return portfolioThinks.find(think => think.id === id)
}

export const getWorksByCategory = (category: Work['category']): Work[] => {
  return portfolioWorks.filter(work => work.category === category)
}

export const getThinksByCategory = (category: Think['category']): Think[] => {
  return portfolioThinks.filter(think => think.category === category)
}

export const getWorksByTechnology = (technology: string): Work[] => {
  return portfolioWorks.filter(work => 
    work.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  )
}

export const getThinksByTag = (tag: string): Think[] => {
  return portfolioThinks.filter(think => 
    think.tags.some(t => 
      t.toLowerCase().includes(tag.toLowerCase())
    )
  )
}