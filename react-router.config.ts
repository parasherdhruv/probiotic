import type { Config } from '@react-router/dev/config'

export default {
  // Enable SSR — required for prerendering and server-rendered routes
  ssr: true,

  // All source files live under src/ — React Router looks for
  // src/root.tsx, src/routes.ts, src/entry.server.tsx, src/entry.client.tsx
  appDirectory: 'src',

  // Opt into React Router v8 future flags early — silences migration warnings
  // and ensures forward compatibility with the next major version.
  future: {
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },

  // Prerender at build time — these routes get static HTML for SEO & LCP
  // Client-only routes (quiz, search, admin) are NOT in this list
  async prerender() {
    return [
      '/',
      '/products',
      '/compare',
      // '/science',
      // '/benefits',
      // '/faq',
      // '/home-delivery',
      // '/blog',
      // '/testimonials',
      // '/about',
      // '/contact',
      // '/privacy',
      // '/terms',
      // '/cookies',
    ]
  },
} satisfies Config
