/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Modern Retro Typography Hierarchy
        'hero': ['Hangout', 'Anton', 'Bebas Neue', 'Impact', 'sans-serif'], // Main name - now Hangout
        'display': ['Metanoia', 'Archivo Black', 'Arial Black', 'sans-serif'], // Section headers - now Metanoia 
        'body': ['HelveticaWorld', 'Oswald', 'Arial Narrow', 'sans-serif'],
        'label': ['ITC Bauhaus', 'Kanit', 'Arial', 'sans-serif'],
        'accent': ['Giaza', 'Roboto Condensed', 'Arial Narrow', 'sans-serif'],
        'artistic': ['LIHAM', 'Orbitron', 'monospace', 'sans-serif'],
        // Legacy font mappings for compatibility
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
        'cursive': ['Dancing Script', 'cursive'],
        'retro': ['Fredoka One', 'sans-serif'],
        'vintage': ['Righteous', 'sans-serif'],
        'spooky': ['Creepster', 'cursive'],
        'horror': ['Nosifer', 'cursive'],
        'old': ['Griffy', 'cursive'],
        'western': ['Rye', 'cursive'],
        // Custom Canva-inspired fonts mapped to actual uploaded fonts
        'hangout': ['Hangout', 'Anton', 'Bebas Neue', 'Impact', 'sans-serif'],
        'liham': ['LIHAM', 'Orbitron', 'monospace', 'sans-serif'],
        'bauhaus': ['ITC Bauhaus', 'Kanit', 'Arial', 'sans-serif'],
        'helvetica-world': ['Helvetica World', 'Oswald', 'Arial Narrow', 'sans-serif'],
        'giaza': ['Giaza', 'Roboto Condensed', 'Arial Narrow', 'sans-serif'],
        'metanoia': ['Metanoia', 'Archivo Black', 'Arial Black', 'sans-serif'],
      },
      colors: {
        // Neo-Brutalist Color Palette
        brutal: {
          // Primary
          'black': '#000000',
          'white': '#FFFFFF',
          
          // Bold Accent Colors (flat, no gradients)
          'yellow': '#FFFF00',
          'pink': '#FF006E',
          'cyan': '#00F0FF',
          'lime': '#CCFF00',
          'blue': '#0066FF',
          'orange': '#FF6600',
          'purple': '#9933FF',
          'red': '#FF0000',
          'green': '#00FF00',
          
          // Beige/Cream backgrounds for neo-brutalism
          'beige': '#F5F1E8',
          'beige-dark': '#E8E3D6',
          'cream': '#F0EAD6',
          'sand': '#EDE4D3',
          
          // Grays for subtle backgrounds
          'gray-50': '#F9F9F9',
          'gray-100': '#F0F0F0',
          'gray-200': '#E0E0E0',
          'gray-900': '#1A1A1A',
        },
        
        // Keep retro colors for 3D backgrounds (particles, etc.)
        retro: {
          // Electric Blues & Cyans
          'electric-blue': '#00D4FF',
          'neon-cyan': '#00FFFF',
          'deep-blue': '#0099CC',
          'space-blue': '#1E3A8A',
          
          // Retro Purples & Magentas
          'neon-purple': '#9D4EDD',
          'hot-pink': '#FF006E',
          'deep-purple': '#5A189A',
          'violet': '#7209B7',
          
          // Sunset Oranges & Yellows
          'sunset-orange': '#FF6B35',
          'neon-yellow': '#FFFF00',
          'warm-orange': '#FF8500',
          'golden': '#FFD700',
          
          // Lime & Greens
          'lime-green': '#32FF32',
          'neon-green': '#39FF14',
          'mint': '#00FF7F',
          'emerald': '#50C878',
          
          // Dark Backgrounds
          'space-navy': '#0A0E27',
          'cosmic-black': '#1A1A2E',
          'deep-space': '#16213E',
          'dark-purple': '#0F0C29',
        },
        
        // Legacy vintage colors for compatibility
        vintage: {
          cream: '#F8F6F0',
          beige: '#E8E2D4',
          brown: '#8B4513',
          darkbrown: '#654321',
          gold: '#D4AF37',
          orange: '#CD853F',
          rust: '#B7410E',
          olive: '#6B8E23',
          sage: '#9CAF88',
          light: '#eedcb2ff',
          // Deep grey colors for the new design
          'deep-grey': '#2D2D2D',
          'medium-grey': '#4A4A4A',
          'light-grey': '#6B6B6B',
          'grey-border': '#8B8B8B',
        },
      },
      
      // Neo-Brutalist specific utilities
      boxShadow: {
        'brutal': '8px 8px 0px 0px #000000',
        'brutal-lg': '12px 12px 0px 0px #000000',
        'brutal-xl': '16px 16px 0px 0px #000000',
        'brutal-yellow': '8px 8px 0px 0px #FFFF00',
        'brutal-pink': '8px 8px 0px 0px #FF006E',
        'brutal-cyan': '8px 8px 0px 0px #00F0FF',
        'brutal-lime': '8px 8px 0px 0px #CCFF00',
      },
      
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
      },
      
      // Modern Retro Animations (keep for 3D elements)
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotate-slow 10s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 2s ease-in-out infinite alternate',
        'celestial-float': 'celestial-float 6s ease-in-out infinite',
        'parallax-hover': 'parallax-hover 0.3s ease-out',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'star-twinkle': {
          '0%': { opacity: 0.3, transform: 'scale(1)' },
          '100%': { opacity: 1, transform: 'scale(1.2)' },
        },
        'celestial-float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-15px) translateX(10px)' },
          '66%': { transform: 'translateY(-5px) translateX(-10px)' },
        },
        'parallax-hover': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(var(--parallax-x), var(--parallax-y), 0)' },
        },
      },
      
      // Gradient backgrounds for retro aesthetic
      backgroundImage: {
        'retro-gradient': 'linear-gradient(135deg, #0A0E27 0%, #1A1A2E 50%, #16213E 100%)',
        'neon-gradient': 'linear-gradient(45deg, #00D4FF 0%, #9D4EDD 50%, #FF006E 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF8500 100%)',
      },
    },
  },
  plugins: [],
}
