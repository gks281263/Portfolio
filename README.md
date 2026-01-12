# Gaurav Kumar's Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a cybersecurity specialist and full-stack developer. Built with React 19, TypeScript, and cutting-edge web technologies including 3D graphics, PWA capabilities, and performance optimizations.

## 🌟 Features

- 🎨 **Modern Dark Theme** - Sleek, professional design with glassmorphism effects
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - 120fps animations, optimized rendering, lazy loading
- 🔒 **PWA Ready** - Service worker, offline support, and installable app
- 🎯 **Interactive 3D Elements** - Three.js globe and Babylon.js 3D scenes
- 🎭 **Advanced Animations** - Framer Motion with scroll-triggered effects
- 🌐 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and structured data
- 🎨 **Micro-interactions** - Floating cards, gradient text, pulse effects, and magnetic buttons
- 📝 **Comprehensive Sections** - About, Education, Experience, Skills, Projects, and Contact
- 🐍 **Python Automation** - CV generator script with PDF generation capabilities
- 🚀 **Pure SPA Architecture** - State-driven navigation, persistent AppShell, no page reloads

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **Zustand 5.0** - Lightweight state management

### **Styling & UI**
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **PostCSS 8.4** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### **Animation & Graphics**
- **Framer Motion 12.10** - Production-ready motion library
- **Three.js 0.176** - 3D graphics library
- **Babylon.js 8.7** - Advanced 3D engine

### **Performance & Optimization**
- **Vite 6.3** - Fast build tool and dev server
- **React.lazy** - Code splitting and lazy loading
- **Suspense** - Optimized loading states

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
│   ├── cv.py                       # Automated CV/Resume PDF generator
│
├── 📁 Source Code (src/)
│   ├── 🚀 Entry Points
│   │   └── main.tsx                # Application entry point
│   │
│   ├── 🎨 Styling
│   │   └── index.css               # Global CSS styles and animations
│   │
│   ├── 🏗️ Application Core (app/)
│   │   ├── AppShell.tsx            # Persistent application shell
│   │   ├── MainView.tsx            # State-driven view switcher
│   │   └── store.ts                # Global state management (Zustand)
│   │
│   ├── 🧩 Components
│   │   ├── Navbar.tsx              # Navigation component
│   │   ├── HeroSection.tsx         # Hero section component
│   │   ├── GlobeSection.tsx        # 3D globe section
│   │   ├── ThreeGlobe.tsx          # Three.js globe implementation
│   │   ├── BabylonScene.tsx        # Babylon.js 3D scene
│   │   ├── Footer.tsx              # Footer component
│   │   ├── ScrollToTop.tsx         # Scroll to top button
│   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   └── MicroInteractions.tsx   # Micro-interaction components
│   │
│   ├── 📄 Views
│   │   ├── HomeView.tsx            # Main portfolio view
│   │   └── ThoughtsView.tsx        # Thoughts/Blog view
│   │
│   ├── 📊 Data
│   │   └── thoughts.ts             # Thoughts/Blog data
│   │
│   └── 🎯 Assets
│       └── (assets directory)
│
├── 🌐 Public Assets (public/)
│   ├── sw.js                       # Service worker
│   ├── site.webmanifest            # PWA manifest
│   ├── GK.jpeg                     # Profile image
│   ├── profile.jpg                  # Profile image
│   ├── GCV.pdf                     # Resume/CV
│   ├── PAC.png, PACN.png           # Certificates
│   ├── JPM_SW.png                  # Project image
│   ├── 🌍 Earth Textures
│   │   ├── earth-blue-marble.jpg   # Earth texture
│   │   ├── earth-clouds.png        # Cloud layer
│   │   ├── earth-specular.jpg      # Specular map
│   │   └── earth-topology.png      # Topography map
│   └── 📁 projects/                # Project images
│
├── 📜 Scripts
│   └── copy-404.js                 # 404.html generator for SPA routing
│
├── 📦 Build Output
│   └── dist/                       # Production build
│
└── 📚 Documentation
    ├── README.md                   # This file
    ├── ARCHITECTURE.md             # Architecture documentation
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
- Update profile details in `src/views/HomeView.tsx`
- Modify skills, projects, and experience sections
- Update contact information and social links
- Edit thoughts/blog content in `src/data/thoughts.ts`

### **Styling & Theme**
- Customize colors in `tailwind.config.js`
- Modify global styles in `src/index.css`
- Update component-specific styles
- Adjust animation timings for mobile/desktop

### **3D Elements**
- Adjust globe settings in `src/components/ThreeGlobe.tsx`
- Modify Babylon.js scene in `src/components/BabylonScene.tsx`
- Update earth textures in `public/` directory

### **Animations**
- Customize Framer Motion animations in components
- Modify micro-interactions in `src/components/MicroInteractions.tsx`
- Adjust pulse glow animation speeds for mobile/desktop

### **PWA Configuration**
- Update `public/site.webmanifest` for app details
- Modify service worker in `public/sw.js`
- Update icons and splash screens

### **Python Scripts**
- Customize CV content in `cv.py` or `SCV.py`
- Modify styling and formatting in the scripts
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
- `python SCV.py` - Generate additional CV variant
- Install dependencies: `pip install reportlab`

### **Code Quality**
- **ESLint** - Code linting and style enforcement
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first styling

### **Performance Features**
- **120fps Animations** - Optimized for high refresh rate displays
- **Lazy Loading** - Views loaded on-demand with React.lazy
- **Code Splitting** - Automatic chunk optimization
- **PWA Caching** - Intelligent resource caching
- **Mobile Optimizations** - Reduced animation intensity on mobile

## 🌟 Key Components

### **Application Core**
- **AppShell.tsx** - Persistent application shell that never remounts
- **MainView.tsx** - State-driven view switcher with lazy loading
- **store.ts** - Global state management with Zustand and persistence

### **MicroInteractions.tsx**
- Floating cards with physics
- Gradient text effects
- Pulse glow animations (mobile-optimized)
- Magnetic button interactions
- Scroll-triggered animations

### **3D Graphics**
- **ThreeGlobe.tsx** - Interactive 3D globe
- **BabylonScene.tsx** - Advanced 3D scenes
- **GlobeSection.tsx** - Globe section wrapper

### **Python Automation**
- **cv.py** - Automated CV/Resume PDF generator using ReportLab
- **SCV.py** - Additional CV generation script
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
- **Code Splitting** - Lazy-loaded views and components
- **Image Optimization** - Optimized asset loading with error handling
- **CSS Optimization** - Purged unused styles
- **Mobile-Specific** - Reduced animation intensity on mobile devices

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
