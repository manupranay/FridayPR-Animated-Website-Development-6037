# FridayPR Website

A modern, responsive React website for FridayPR - a creative web agency specializing in web design, SEO, and PR distribution services.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fridaypr-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
fridaypr-website/
├── public/
│   └── vite.svg
├── src/
│   ├── common/
│   │   └── SafeIcon.jsx          # Icon component wrapper
│   ├── components/
│   │   ├── FeaturedImage.jsx     # Image component with fallbacks
│   │   ├── Footer.jsx            # Site footer
│   │   ├── Header.jsx            # Navigation header
│   │   ├── LoadingSpinner.jsx    # Loading indicator
│   │   ├── ParallaxSection.jsx   # Parallax scroll effects
│   │   ├── ProjectCard.jsx       # Portfolio project cards
│   │   └── ScrollToTop.jsx       # Auto-scroll to top on route change
│   ├── hooks/
│   │   ├── useApi.js             # Generic API fetching hook
│   │   ├── useApiWithImages.js   # API hook with image processing
│   │   └── usePortfolioWithImages.js # Portfolio-specific API hook
│   ├── pages/
│   │   ├── services/
│   │   │   ├── BrandingPage.jsx
│   │   │   ├── PRDistributionPage.jsx
│   │   │   ├── SEOPage.jsx
│   │   │   └── WebDesignPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── BlogPostPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   └── ServicesPage.jsx
│   ├── App.css                   # Custom CSS styles
│   ├── App.jsx                   # Main app component with routing
│   ├── index.css                 # Global styles and Tailwind imports
│   └── main.jsx                  # React app entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Customization Guide

### Colors

The project uses a custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  // Primary Brand Colors
  'electric-teal': '#00D4CC',     // Main brand color
  'bright-orange': '#FF6B35',     // Accent color
  'deep-purple': '#6C63FF',       // Secondary accent
  'pure-white': '#FFFFFF',        // Clean backgrounds
  'charcoal': '#2D3748',          // Text and dark elements
  'light-gray': '#F7FAFC',        // Subtle backgrounds
  'medium-gray': '#E2E8F0',       // Borders and dividers
  'success-green': '#10B981',     // Success states
  'warning-red': '#EF4444',       // Error states
  'neon-pink': '#FF10F0',         // Special accents
}
```

#### Changing Colors

1. **Update Tailwind Config** (`tailwind.config.js`):
   ```javascript
   'electric-teal': '#YOUR_NEW_COLOR',
   ```

2. **Update CSS Gradients** (`tailwind.config.js`):
   ```javascript
   backgroundImage: {
     'gradient-primary': 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)',
   }
   ```

3. **Update Custom CSS** (`src/App.css`):
   ```css
   .text-gradient {
     background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
   }
   ```

#### Quick Color Replacement

To change the main brand color throughout the site:

1. Find and replace `electric-teal` with your new color name
2. Update the color value in `tailwind.config.js`
3. Rebuild the project

### Typography

#### Font Configuration

Fonts are configured in `tailwind.config.js`:

```javascript
fontFamily: {
  'sans': ['Inter', 'system-ui', 'sans-serif'],
  'display': ['Poppins', 'sans-serif'],
}
```

#### Changing Fonts

1. **Add Google Fonts** to `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```

2. **Update Tailwind Config**:
   ```javascript
   fontFamily: {
     'sans': ['YourFont', 'system-ui', 'sans-serif'],
     'display': ['YourDisplayFont', 'sans-serif'],
   }
   ```

3. **Usage in Components**:
   ```jsx
   <h1 className="font-display">Display Font</h1>
   <p className="font-sans">Body Font</p>
   ```

### Animations

The project includes custom animations defined in `tailwind.config.js`:

```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
  'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
  'wave': 'wave 2s ease-in-out infinite',
}
```

#### Adding New Animations

1. **Define Keyframes**:
   ```javascript
   keyframes: {
     'your-animation': {
       '0%': { transform: 'translateY(0px)' },
       '50%': { transform: 'translateY(-10px)' },
       '100%': { transform: 'translateY(0px)' },
     }
   }
   ```

2. **Add Animation**:
   ```javascript
   animation: {
     'your-animation': 'your-animation 2s ease-in-out infinite',
   }
   ```

3. **Use in Components**:
   ```jsx
   <div className="animate-your-animation">Animated Element</div>
   ```

## 📄 Content Management

### Adding New Pages

1. **Create Page Component** in `src/pages/`:
   ```jsx
   // src/pages/NewPage.jsx
   import React from 'react';
   import { motion } from 'framer-motion';

   const NewPage = () => {
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="pt-24"
       >
         {/* Page content */}
       </motion.div>
     );
   };

   export default NewPage;
   ```

2. **Add Route** in `src/App.jsx`:
   ```jsx
   import NewPage from './pages/NewPage';

   // Add to Routes
   <Route path="/new-page" element={<NewPage />} />
   ```

3. **Add Navigation** in `src/components/Header.jsx`:
   ```jsx
   const navItems = [
     // existing items...
     { name: 'New Page', path: '/new-page' },
   ];
   ```

### Updating Existing Content

#### Homepage Content

Edit `src/pages/HomePage.jsx`:

- **Hero Section**: Update main heading and description
- **Services**: Modify `mainServices` array
- **Tools**: Update `tools` array
- **Stats**: Change numbers in stats sections

#### Service Pages

Located in `src/pages/services/`:

- **Process Steps**: Update process arrays
- **Benefits**: Modify benefits arrays
- **Pricing**: Update pricing information
- **Features**: Change feature lists

#### Contact Information

Update in `src/components/Footer.jsx` and `src/pages/ContactPage.jsx`:

```jsx
// Contact details
const contactInfo = {
  email: 'your@email.com',
  phone: '+1 (555) 123-4567',
  address: 'Your Address',
};
```

### API Configuration

The site fetches content from WordPress API. Update endpoints in hooks:

```javascript
// src/hooks/useApi.js
const API_BASE = 'https://your-api.com/wp-json/wp/v2';
```

## 🔧 Component Customization

### Header Component

**Location**: `src/components/Header.jsx`

**Key Features**:
- Responsive navigation
- Scroll-based visibility
- Active page highlighting
- Mobile menu

**Customization**:
```jsx
// Add new navigation items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Your New Page', path: '/new-page' },
];

// Change logo
<div className="text-2xl font-display font-bold text-charcoal">
  Your<span className="text-electric-teal">Brand</span>
</div>
```

### Footer Component

**Location**: `src/components/Footer.jsx`

**Customization**:
```jsx
// Update social media links
const socialLinks = [
  { icon: FiLinkedin, url: 'https://linkedin.com/yourpage' },
  { icon: FiTwitter, url: 'https://twitter.com/yourhandle' },
];

// Update contact information
const contactInfo = {
  address: 'Your City, State',
  email: 'hello@yourdomain.com',
  phone: '+1 (555) 123-4567',
};
```

### ProjectCard Component

**Location**: `src/components/ProjectCard.jsx`

**Features**:
- Expandable project details
- Image galleries
- Client information
- Technology stacks

## 🎭 Styling Guide

### Responsive Design

The site uses Tailwind's responsive prefixes:

```jsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

### Component Patterns

#### Card Component Pattern

```jsx
<motion.div
  whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,212,204,0.15)" }}
  className="bg-pure-white rounded-3xl p-8 shadow-lg card-hover"
>
  {/* Card content */}
</motion.div>
```

#### Button Pattern

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-electric-teal text-pure-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
>
  Button Text
</motion.button>
```

#### Section Pattern

```jsx
<section className="py-20 bg-pure-white">
  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
        Section Title
      </h2>
      <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
        Section description
      </p>
    </motion.div>
    
    {/* Section content */}
  </div>
</section>
```

## 🖼️ Image Management

### FeaturedImage Component

**Location**: `src/components/FeaturedImage.jsx`

**Features**:
- Automatic fallback gradients
- Loading states
- Overlay support
- Error handling

**Usage**:
```jsx
<FeaturedImage
  imageUrl={imageUrl}
  alt="Image description"
  className="h-64"
  showOverlay={true}
  overlayOpacity={0.2}
>
  {/* Optional overlay content */}
</FeaturedImage>
```

### Adding New Images

1. **Static Images**: Place in `public/` directory
2. **Dynamic Images**: Use FeaturedImage component with URLs
3. **Fallback Gradients**: Automatically generated for failed loads

## 🔌 API Integration

### WordPress Integration

The site integrates with WordPress REST API:

**Endpoints Used**:
- `/wp/v2/posts` - Blog posts
- `/wp/v2/pages` - Static pages
- `/wp/v2/portfolio` - Portfolio projects
- `/wp/v2/services` - Service pages

### Custom Hooks

#### useApi Hook

```javascript
// Basic API fetching
const { data, loading, error } = useApi('https://api.example.com/endpoint');
```

#### useApiWithImages Hook

```javascript
// API fetching with image processing
const { data, loading, error } = useApiWithImages('https://api.example.com/posts');
```

#### usePortfolioWithImages Hook

```javascript
// Portfolio-specific API calls
const { data, loading, error } = usePortfolioWithImages('https://api.example.com/portfolio');
```

## ⚡ Performance Optimization

### Code Splitting

Routes are automatically code-split using React.lazy():

```jsx
const HomePage = React.lazy(() => import('./pages/HomePage'));
```

### Image Optimization

- Lazy loading with `loading="lazy"`
- Responsive images with CSS
- Fallback gradients for failed loads
- WebP support where available

### Bundle Analysis

```bash
npm run build
npm run preview
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository** to Vercel
2. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Netlify Deployment

1. **Connect Repository** to Netlify
2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🛠️ Development Workflow

### Code Quality

**ESLint Configuration**: `eslint.config.js`
```bash
npm run lint          # Check for issues
npm run lint:error    # Show only errors
```

**Prettier** (recommended):
```bash
npm install -D prettier
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request for review
```

### Environment Variables

Create `.env` file for environment-specific settings:

```env
VITE_API_BASE_URL=https://your-api.com
VITE_CONTACT_EMAIL=hello@yourdomain.com
```

Usage in code:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

1. **Clear node_modules**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**:
   ```bash
   node --version  # Should be v16+
   ```

#### Styling Issues

1. **Purge Tailwind cache**:
   ```bash
   rm -rf node_modules/.cache
   npm run dev
   ```

2. **Check class names** for typos in Tailwind classes

#### API Issues

1. **Check CORS settings** on your API server
2. **Verify API endpoints** are accessible
3. **Check network requests** in browser dev tools

### Performance Issues

1. **Bundle size analysis**:
   ```bash
   npm run build
   npx vite-bundle-analyzer dist
   ```

2. **Image optimization**:
   - Use appropriate image formats
   - Implement lazy loading
   - Optimize image sizes

## 📚 Dependencies

### Core Dependencies

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animations and gestures
- **React Icons** - Icon components
- **Tailwind CSS** - Utility-first CSS framework

### Development Dependencies

- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📞 Support

### Getting Help

1. **Check this documentation** first
2. **Search existing issues** in the repository
3. **Create a new issue** with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if relevant

### Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Submit a pull request**

---

## 📝 License

This project is proprietary and confidential. All rights reserved.

---

**Built with ❤️ by the FridayPR team**