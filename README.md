# Lastly — Premium Probiotic Brand Platform

A production-ready, 3D animated digital experience for a modern wellness brand.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + React Router v7 (Framework Mode) |
| Build | Vite 6 |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS v4 (CSS-first, `@theme` tokens) |
| UI Components | shadcn/ui v4 (OKLCH tokens, `data-slot` attributes) |
| 3D | Three.js + React Three Fiber + Drei + Postprocessing |
| Animation | Motion (gesture/state) + GSAP (scroll) + Lenis (smooth scroll) |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 |
| Forms | React Hook Form + Zod |
| Analytics | PostHog (behind consent gate) |
| Error Tracking | Sentry |
| Testing | Vitest + React Testing Library + Playwright |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd lastly
npm install --legacy-peer-deps

# 2. Configure environment
cp .env.example .env
# Edit .env and fill in required values (see .env.example for docs)

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build (prerender + SSR bundle) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript type checking (no emit) |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run test` | Vitest (watch mode) |
| `npm run test:run` | Vitest (single run, CI) |
| `npm run test:e2e` | Playwright E2E tests |

## Project Structure

```
src/
├── root.tsx              # HTML document root (React Router)
├── entry.server.tsx      # SSR entry (streaming, bot vs browser)
├── entry.client.tsx      # Client hydration entry
├── routes.ts             # Route configuration (manual, explicit)
│
├── app/                  # App infrastructure
│   └── providers.tsx     # TanStack Query + all context providers
│
├── components/           # (Added milestone by milestone)
│   ├── layout/           # Header, Footer, Nav, AnnouncementBar
│   ├── ui/               # shadcn/ui + custom design system components
│   ├── sections/         # Page section components
│   ├── motion/           # Animation wrappers
│   ├── three/            # React Three Fiber 3D components
│   └── forms/            # Form components
│
├── routes/               # React Router v7 route modules
│   ├── _layout.tsx       # Shared layout (Header + Footer)
│   └── home.tsx          # Homepage (Milestone 1 scaffold)
│
├── constants/index.ts    # Brand, API, env constants
├── lib/cn.ts             # clsx + tailwind-merge utility
│
└── styles/               # Tailwind v4 CSS
    ├── globals.css       # @import chain, base layer, utilities
    ├── theme.css         # @theme tokens + semantic CSS vars
    └── fonts.css         # Font feature settings
```

## Design System

Colors are defined as OKLCH CSS custom properties in `src/styles/theme.css`.

```css
/* Usage examples */
bg-brand-500      /* Primary brand green */
text-brand-700    /* Dark brand text */
bg-primary        /* Semantic: adapts to light/dark mode */
text-muted-foreground  /* Semantic: muted text */
shadow-glow       /* Brand glow shadow */
```

See `src/styles/theme.css` for the full token reference.

## Animation System

| Type | Library | Example |
|------|---------|---------|
| Gesture / state / component-level | `motion` (import from `motion/react`) | hover, tap, accordion, route transitions |
| Scroll-driven / pinned / timeline | `gsap` + `ScrollTrigger` | hero camera, sticky sections, counters |
| Smooth scroll | `lenis` (wired to GSAP ticker) | site-wide smooth scroll |

**Rule:** Never implement the same interaction in both libraries.

## Rendering Strategy

| Route | Mode |
|-------|------|
| `/`, `/products/*`, `/science`, `/benefits`, `/faq`, `/blog/*`, `/about`, `/contact`, legal | SSR + Prerender |
| `/compare`, `/stores` | SSR shell + client hydration |
| `/find-your-routine`, `/search` | Client-only |

## Known Issues & Notes

> **Resolved R3F + React 19 Issue:** The initial scaffolding used `@react-three/fiber@^8.x` which conflicted with React 19, causing a `ConcurrentRoot` export error during Vite HMR. This was fully resolved in Milestone 4 by upgrading to `@react-three/fiber@^9.0.0-rc.3` and the latest versions of `drei` and `postprocessing`, which officially support React 19.

## Environment Variables

See `.env.example` for the complete list with descriptions. Required for local dev:

- `VITE_API_BASE_URL` — backend API URL
- `VITE_MAPBOX_ACCESS_TOKEN` — Mapbox public token (store locator)
- `VITE_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key (forms)

## Build Status

| Milestone | Status |
|-----------|--------|
| 1 — Project scaffold & toolchain | ✅ |
| 2 — Design system & component library | ✅ |
| 3 — Layout system | ✅ |
| 4 — Hero 3D scene | ✅ |
| 5 — Homepage (below fold) | ✅ |
| 6 — Product pages | ✅ |
| 7 — Science / Benefits / FAQ | ✅ |
| 8 — Quiz | ✅ |
| 9 — Blog | ✅ |
| 10 — Lead forms & conversion | ✅ |
| 11 — Store locator | ✅ |
| 12 — Remaining & system pages | ✅ |
| 13 — Backend API | ✅ |
| 14 — DevOps, testing & polish | ✅ |