import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

/**
 * Application route configuration for React Router v7 Framework Mode.
 *
 * Route rendering strategy (per architecture doc Section 2):
 * - SSR/Prerender:   home, products, science, benefits, faq, home-delivery,
 *                    blog, testimonials, about, contact, legal pages
 * - Client-only:     quiz (stateful), search (non-indexable)
 * - 404:             catch-all (SSR, returns proper 404 status)
 *
 * Routes are added here as pages are built in subsequent milestones.
 * Placeholder routes are commented out — uncomment as you implement.
 *
 * Path resolution: all file paths are relative to appDirectory (src/).
 */
export default [
  // ── Public layout wrapper (Header + Footer + providers) ──────────
  layout('routes/_layout.tsx', [
    // Home — SSR/Prerender
    index('routes/home.tsx'),

    // Products — Milestones 6
    route('/products', 'routes/products.tsx'),
    route('/products/:slug', 'routes/products.$slug.tsx'),

    // Science hub — Milestone 7
    route('/science', 'routes/science.tsx'),

    // Benefits — Milestone 7
    route('/benefits', 'routes/benefits.tsx'),

    // FAQ — Milestone 7
    route('/faq', 'routes/faq.tsx'),

    // Compare — Milestone 6
    route('/compare', 'routes/compare.tsx'),

    // Store locator — Milestone 11
    route('/stores', 'routes/stores.tsx'),

    // Home delivery — Milestone 10
    route('/home-delivery', 'routes/home-delivery.tsx'),

    // Blog — Milestone 9
    route('/blog', 'routes/blog._index.tsx'),
    route('/blog/:slug', 'routes/blog.$slug.tsx'),

    // Testimonials — Milestone 10
    route('/testimonials', 'routes/testimonials.tsx'),

    // About — Milestone 10
    route('/about', 'routes/about.tsx'),

    // Contact — Milestone 10
    route('/contact', 'routes/contact.tsx'),

    // Legal — Milestone 12
    route('/privacy', 'routes/privacy.tsx'),
    route('/terms', 'routes/terms.tsx'),
    route('/cookies', 'routes/cookies.tsx'),
  ]),

  // ── Client-only routes (no layout wrapper needed) ────────────────

  // Quiz — Milestone 8 (client-only: no SSR, no prerender)
  route('/find-your-routine', 'routes/find-your-routine.tsx'),

  // Search — Milestone 12 (client-only)
  route('/search', 'routes/search.tsx'),

  // ── 404 catch-all ────────────────────────────────────────────────
  // Milestone 12
  route('*', 'routes/$.tsx'),
] satisfies RouteConfig
