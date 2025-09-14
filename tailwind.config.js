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
        }
      }
    },
  },
  plugins: [],
}
