# My Notes Blog

A modern, elegant blog writing website designed for daily, weekly, or monthly reflections. This is a client-side application that can be deployed directly to GitHub Pages.

## Features

### ✨ Modern & Elegant Design
- Beautiful gradient header with clean typography
- Responsive design that works on all devices
- Smooth animations and transitions

### 📝 Rich Text Editing
- Full contenteditable editor with formatting support
- Keyboard shortcuts (Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline)
- Auto-save functionality (saves drafts every 30 seconds)

### 🎨 Customization Options
- **Background Themes**: Choose from Clean White, Grey Paper, Beige Dotted, or Notebook Lines
- **Font Options**: Inter (Modern), Merriweather (Serif), Fira Code (Mono), Georgia, or Arial
- **Font Size**: Adjustable from 14px to 24px
- **Text Color**: Full color picker for text customization

### 🖼️ Image Support
- Upload and insert images directly into posts
- Image alignment options: Left, Right, or Center
- Adjustable image width with live preview
- Drag & drop friendly interface

### 💾 Storage & Export
- Save posts locally using browser storage
- Load previously saved posts
- Export posts as standalone HTML files
- Auto-restore unsaved drafts

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. Enter a title for your post in the title field
3. Start writing in the editor area
4. Use the toolbar to customize appearance

### Writing Posts
- Click in the editor area and start typing
- Use keyboard shortcuts for quick formatting:
  - `Ctrl + B`: Bold text
  - `Ctrl + I`: Italic text  
  - `Ctrl + U`: Underline text
  - `Ctrl + S`: Save post
  - `Ctrl + Shift + ?`: Show help

### Adding Images
1. Click the "Add Image" button
2. Select an image file from your computer
3. Choose alignment (Left, Right, or Center)
4. Adjust the width using the slider
5. Click "Insert Image"

### Customizing Appearance
- **Background**: Select from the dropdown to change the editor background theme
- **Font**: Choose your preferred font family
- **Size**: Adjust text size for better readability
- **Color**: Pick any color for your text

### Saving & Loading
- Click "Save Post" to store your writing locally
- Click "Load Post" to browse and open saved posts
- Click "New Post" to start fresh
- Click "Export HTML" to download your post as an HTML file

## GitHub Pages Deployment

To deploy this blog to GitHub Pages:

1. Push all files to your GitHub repository
2. Go to your repository Settings
3. Navigate to Pages section
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your blog will be available at `https://yourusername.github.io/repositoryname`

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript (no frameworks required)
- **Storage**: Uses browser's localStorage for saving posts
- **Compatibility**: Works in all modern browsers
- **Dependencies**: Font Awesome icons and Google Fonts (loaded via CDN)

## File Structure

```
/
├── index.html          # Main application file
├── styles.css          # All styling and themes
├── script.js           # Application logic and functionality
├── README.md           # This documentation
└── .gitignore          # Git ignore rules
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

Feel free to fork this repository and submit pull requests for improvements or new features!

## License

MIT License - See LICENSE file for details.
