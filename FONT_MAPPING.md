# Modern Retro Portfolio Font Mapping

## Available Font Assets (public/fonts/)

### Primary Fonts for Portfolio Sections

#### **Metanoia** (Futuristic Bold)
- **Usage**: Main hero title, primary headings
- **Files**: Metanoia.{eot,ttf,woff,woff2}
- **Character**: Bold, sci-fi, attention-grabbing
- **Sections**: Hero name/title, "WORKS", "THINKS"

#### **Hangout** (Quirky Display)
- **Usage**: Section headers, fun accents
- **Files**: quarantype-hangout.{ttf,woff,woff2}
- **Character**: Playful, retro, approachable
- **Sections**: Project categories, blog post titles

#### **HelveticaWorld** (Clean Body)
- **Usage**: Descriptions, body text, UI elements
- **Files**: HelveticaWorld-Regular.ttf
- **Character**: Professional, readable, modern
- **Sections**: Project descriptions, blog excerpts

#### **Bauhaus** (Geometric)
- **Usage**: Technical labels, categories
- **Files**: BauhausStd-Medium.ttf
- **Character**: Geometric, systematic, architectural
- **Sections**: Technology tags, navigation

#### **Giaza** (Stencil/Regular)
- **Usage**: Special emphasis, unique elements
- **Files**: Giaza.otf, Giaza Stencil.otf
- **Character**: Industrial, distinctive
- **Sections**: Call-to-action buttons, special highlights

#### **Liham** (Display)
- **Usage**: Decorative elements, quotes
- **Files**: Liham 2.0.otf
- **Character**: Artistic, expressive
- **Sections**: Testimonials, artistic elements

## Font Hierarchy for Portfolio

```typescript
// Tailwind font classes to define
fontFamily: {
  'hero': ['Metanoia', 'Arial Black', 'sans-serif'],     // Main titles
  'display': ['Hangout', 'Arial', 'sans-serif'],        // Section headers
  'body': ['HelveticaWorld', 'Helvetica', 'sans-serif'], // Content
  'label': ['Bauhaus', 'Arial', 'sans-serif'],          // Tags/labels
  'accent': ['Giaza', 'Impact', 'sans-serif'],          // Special emphasis
  'artistic': ['Liham', 'serif']                        // Decorative
}
```

## Usage Strategy

### Hero Section
- **Name**: Metanoia (large, bold)
- **Subtitle**: HelveticaWorld (medium weight)
- **CTA**: Giaza Stencil (distinctive)

### Works Section
- **Section Title**: Metanoia
- **Project Titles**: Hangout
- **Descriptions**: HelveticaWorld
- **Tech Tags**: Bauhaus

### Thinks Section
- **Section Title**: Metanoia
- **Post Titles**: Hangout
- **Excerpts**: HelveticaWorld
- **Read More**: Giaza

### About Section
- **Section Title**: Metanoia
- **Content**: HelveticaWorld
- **Quotes**: Liham

## Loading Strategy
- Preload Metanoia and HelveticaWorld (critical fonts)
- Lazy load decorative fonts (Giaza, Liham)
- Use font-display: swap for all fonts