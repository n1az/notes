/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
        'display': ['Playfair Display', 'serif'],
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
        glass: {
          // Warm glassmorphism palette
          'warm-white': 'rgba(255, 252, 247, 0.25)',
          'warm-cream': 'rgba(248, 246, 240, 0.20)',
          'warm-beige': 'rgba(232, 226, 212, 0.15)',
          'warm-brown': 'rgba(139, 69, 19, 0.10)',
          'warm-gold': 'rgba(212, 175, 55, 0.08)',
          'warm-orange': 'rgba(205, 133, 63, 0.12)',
          // Border colors for glass elements
          'border-light': 'rgba(255, 255, 255, 0.20)',
          'border-warm': 'rgba(248, 246, 240, 0.30)',
          'border-accent': 'rgba(212, 175, 55, 0.25)',
          // Shadow colors
          'shadow-soft': 'rgba(139, 69, 19, 0.08)',
          'shadow-warm': 'rgba(101, 67, 33, 0.12)',
        }
      }
    },
  },
  plugins: [],
}
