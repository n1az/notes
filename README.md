# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# My Notes - Vintage Modern

A beautiful notes application built with React, TypeScript, Tailwind CSS, and Radix UI, featuring a vintage modern design inspired by classic stationery and notebooks.

## Features

✨ **Vintage Modern Design** - Inspired by classic paper textures and typography
📝 **Rich Text Editor** - Write and format your notes with ease
🎨 **Customizable Styles** - Choose from different backgrounds, fonts, and colors
💾 **Local Storage** - Your notes are saved locally in your browser
📱 **Responsive Design** - Works perfectly on desktop and mobile
🖼️ **Image Support** - Add images to your notes
📤 **Export Functionality** - Export your notes as HTML files

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Vite** for fast development and building
- **Lucide React** for beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd notes/main_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Dashboard View
- View all your notes in a beautiful grid layout
- Click "Create New Note" to start writing
- Click on any note card to read it

### Writing Notes
- Choose from different paper backgrounds (white, grey paper, beige dotted, notebook lines)
- Select your preferred font family (Inter, Merriweather, Fira Code)
- Adjust font size and text color
- Add images to your notes
- Rich text editing with formatting support

### Reading Notes
- Clean, focused reading experience
- Edit or delete notes
- Export individual notes as HTML files

## Customization

### Adding New Backgrounds

To add new background patterns, update the `backgroundOptions` in:
- `src/components/NoteEditor.tsx`
- `src/components/NoteReader.tsx`

Then add the corresponding CSS classes in `src/index.css`.

### Adding New Fonts

Update the `fontOptions` array in `src/components/NoteEditor.tsx` and ensure the fonts are imported in `src/index.css`.

## Storage

Notes are stored locally in your browser using localStorage. No data is sent to external servers, ensuring your privacy and note availability offline.

## Browser Support

This application works in all modern browsers that support:
- ES6+
- CSS Grid
- Flexbox
- localStorage

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by vintage stationery and modern minimalism
- Icons provided by [Lucide](https://lucide.dev/)
- UI components by [Radix UI](https://www.radix-ui.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
