import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  build: {
    // Performance optimizations
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // Code splitting strategy - optimize chunk sizes
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Smart chunking - only create chunks for libraries actually used
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Animation library
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            // 3D libraries (only if used)
            if (id.includes('three') && !id.includes('three/examples')) {
              return 'three-vendor';
            }
            if (id.includes('@babylonjs')) {
              return 'babylon-vendor';
            }
            // UI libraries
            if (id.includes('@headlessui') || id.includes('@heroicons')) {
              return 'ui-vendor';
            }
            // Other vendor code
            return 'vendor';
          }
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    // Source maps for production debugging (optional - remove for smaller builds)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand'],
    exclude: ['three', '@babylonjs/core'], // Exclude heavy libs - load on demand
  },
})
