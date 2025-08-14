# Gaurav Kumar's Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a cybersecurity specialist and full-stack developer. Built with React 19, TypeScript, and cutting-edge web technologies including 3D graphics, PWA capabilities, and performance optimizations.

## 🌟 Features

- 🎨 **Modern Dark Theme** - Sleek, professional design with glassmorphism effects
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - 120fps animations, optimized rendering, and performance hooks
- 🔒 **PWA Ready** - Service worker, offline support, and installable app
- 🎯 **Interactive 3D Elements** - Three.js globe and Babylon.js 3D scenes
- 🎭 **Advanced Animations** - Framer Motion with scroll-triggered effects
- 🌐 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and structured data
- 🎨 **Micro-interactions** - Floating cards, gradient text, pulse effects, and magnetic buttons
- 📝 **Comprehensive Sections** - About, Education, Experience, Skills, Projects, and Contact
- 🐍 **Python Automation** - CV generator script with PDF generation capabilities
- 🚀 **Modern Development** - Vite, TypeScript, ESLint, and modern React patterns

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **React Router DOM 7** - Client-side routing

### **Styling & UI**
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **PostCSS 8.4** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### **Animation & Graphics**
- **Framer Motion 12.10** - Production-ready motion library
- **Three.js 0.176** - 3D graphics library
- **Babylon.js 8.7** - Advanced 3D engine
- **React Babylon.js** - React wrapper for Babylon.js

### **Performance & Optimization**
- **Vite 6.3** - Fast build tool and dev server
- **Custom Performance Hooks** - FPS monitoring and optimization
- **Scroll Animation Hooks** - Optimized scroll-based animations

### **PWA & Service Worker**
- **Service Worker** - Offline support and caching
- **Web App Manifest** - Installable app configuration
- **PWA Features** - Background sync, push notifications

### **Development Tools**
- **ESLint 9.25** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **React Hooks ESLint** - React hooks linting rules

### **Deployment**
- **GitHub Pages** - Static site hosting
- **gh-pages** - Automated deployment

## 📁 Project Structure

```
Portfolio/
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── vite.config.ts              # Vite build configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.cjs          # PostCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tsconfig.app.json           # App-specific TS config
│   ├── tsconfig.node.json          # Node-specific TS config
│   ├── eslint.config.js            # ESLint configuration
│   └── index.html                  # Main HTML entry point
│
├── 🐍 Python Scripts
│   └── cv.py                       # Automated CV/Resume PDF generator
│
├── 📁 Source Code (src/)
│   ├── 🚀 Entry Points
│   │   ├── main.tsx                # Application entry point
│   │   ├── index.tsx               # React entry point
│   │   ├── Root.tsx                # Root component
│   │   └── App.tsx                 # Main application component
│   │
│   ├── 🎨 Styling
│   │   ├── index.css               # Global CSS styles
│   │   └── App.css                 # App-specific styles
│   │
│   ├── 🧩 Components
│   │   ├── Navbar.tsx              # Navigation component
│   │   ├── HeroSection.tsx         # Hero section component
│   │   ├── GlobeSection.tsx        # 3D globe section
│   │   ├── ThreeGlobe.tsx          # Three.js globe implementation
│   │   ├── BabylonScene.tsx        # Babylon.js 3D scene
│   │   ├── Footer.tsx              # Footer component
│   │   ├── Loading.tsx             # Loading states
│   │   ├── MobileMenu.tsx          # Mobile navigation menu
│   │   ├── ScrollToTop.tsx         # Scroll to top button
│   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   └── MicroInteractions.tsx   # Micro-interaction components
│   │
│   ├── 📄 Pages
│   │   └── Home.tsx                # Main portfolio page
│   │
│   ├── 🪝 Custom Hooks
│   │   ├── usePerformanceOptimization.ts  # Performance monitoring
│   │   └── useScrollAnimation.ts           # Scroll-based animations
│   │
│   └── 🎯 Assets
│       └── react.svg               # React logo
│
├── 🌐 Public Assets (public/)
│   ├── sw.js                       # Service worker
│   ├── site.webmanifest            # PWA manifest
│   ├── GK.jpeg                     # Profile image
│   ├── GCV.pdf                     # Resume/CV
│   ├── PAC.png                     # Certificate
│   ├── 🌍 Earth Textures
│   │   ├── earth-blue-marble.jpg   # Earth texture
│   │   ├── earth-clouds.png        # Cloud layer
│   │   ├── earth-specular.jpg      # Specular map
│   │   └── earth-topology.png      # Topography map
│   └── 📁 projects/                # Project images
│
├── 📦 Build Output
│   ├── dist/                       # Production build
│   └── node_modules/               # Dependencies
│
└── 📚 Documentation
    ├── README.md                   # This file
    └── LICENSE                     # MIT License
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gks281263/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/Portfolio/`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

6. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## 🎨 Customization

### **Personal Information**
- Update profile details in `src/pages/Home.tsx`
- Modify skills, projects, and experience sections
- Update contact information and social links

### **Styling & Theme**
- Customize colors in `tailwind.config.js`
- Modify global styles in `src/index.css`
- Update component-specific styles

### **3D Elements**
- Adjust globe settings in `src/components/ThreeGlobe.tsx`
- Modify Babylon.js scene in `src/components/BabylonScene.tsx`
- Update earth textures in `public/` directory

### **Animations**
- Customize Framer Motion animations in components
- Modify scroll triggers in `src/hooks/useScrollAnimation.ts`
- Adjust performance settings in `src/hooks/usePerformanceOptimization.ts`

### **PWA Configuration**
- Update `public/site.webmanifest` for app details
- Modify service worker in `public/sw.js`
- Update icons and splash screens

### **Python Scripts**
- Customize CV content in `cv.py`
- Modify styling and formatting in the script
- Add new sections or modify existing ones
- Install required Python dependencies: `pip install reportlab`

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### **Python Scripts**
- `python cv.py` - Generate professional CV PDF
- Install dependencies: `pip install reportlab`

### **Code Quality**
- **ESLint** - Code linting and style enforcement
- **TypeScript** - Static type checking
- **Prettier** - Code formatting (via Tailwind CSS)

### **Performance Features**
- **120fps Animations** - Optimized for high refresh rate displays
- **Scroll Optimization** - Efficient scroll-based animations
- **Lazy Loading** - Optimized asset loading
- **PWA Caching** - Intelligent resource caching

## 🌟 Key Components

### **MicroInteractions.tsx**
- Floating cards with physics
- Gradient text effects
- Pulse glow animations
- Magnetic button interactions
- Scroll-triggered animations

### **Performance Hooks**
- **usePerformanceOptimization** - FPS monitoring and optimization
- **useScrollAnimation** - Scroll-based animation triggers

### **3D Graphics**
- **ThreeGlobe.tsx** - Interactive 3D globe
- **BabylonScene.tsx** - Advanced 3D scenes
- **GlobeSection.tsx** - Globe section wrapper

### **Python Automation**
- **cv.py** - Automated CV/Resume PDF generator using ReportLab
  - ATS-friendly formatting with hidden keywords
  - Professional styling and consistent layout
  - Automated content generation from structured data

## 📱 PWA Features

- **Offline Support** - Service worker caching
- **Installable** - Add to home screen
- **Background Sync** - Offline action queuing
- **Push Notifications** - Update notifications
- **Responsive Design** - Mobile-first approach

## 🚀 Performance Optimizations

- **Vite Build** - Fast development and optimized builds
- **Tree Shaking** - Unused code elimination
- **Code Splitting** - Lazy-loaded components
- **Image Optimization** - Optimized asset loading
- **CSS Optimization** - Purged unused styles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

### **Contribution Guidelines**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Gaurav Kumar**
- **LinkedIn:** [gauravkumar7777](https://www.linkedin.com/in/gauravkumar7777/)
- **GitHub:** [gks281263](https://github.com/gks281263)
- **Email:** gks281263@gmail.com
- **Portfolio:** [https://gks281263.github.io/Portfolio/](https://gks281263.github.io/Portfolio/)

---

⭐ **Star this repository if you found it helpful!**
