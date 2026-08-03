import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// Vitest uses its own config (NOT vite.config.ts) to avoid pulling in
// @react-router/dev's Framework Mode, which isn't compatible with jsdom
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        'src/entry.client.tsx',
        'src/entry.server.tsx',
        '**/*.d.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'react-router.config.ts',
        'eslint.config.js',
      ],
    },
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
})
