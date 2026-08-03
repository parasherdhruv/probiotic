import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import netlifyPlugin from '@netlify/vite-plugin-react-router'

export default defineConfig({
  plugins: [
    // Tailwind v4 — must come BEFORE reactRouter
    tailwindcss(),
    // React Router v7 Framework Mode — handles SSR, routing, prerendering
    reactRouter(),
    netlifyPlugin(),
    // Resolve path aliases from tsconfig.json (~/*)
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    // Target modern browsers that support OKLCH and CSS nesting
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Route-based code splitting: Three.js and GSAP chunks
        // stay out of routes that don't use them
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three'
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
          if (id.includes('node_modules/motion')) {
            return 'motion'
          }
        },
      },
    },
  },
  // Optimize these large packages for dev server speed
  optimizeDeps: {
    force: true,
    include: [
      'react',
      'react-dom',
      'react-router',
      '@tanstack/react-query',
      'zustand',
      'motion',
      'use-sync-external-store/shim/with-selector.js',
    ],
  },
})
