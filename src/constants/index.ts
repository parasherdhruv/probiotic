/**
 * Application-wide constants.
 *
 * Naming conventions:
 * - BRAND_*        → brand identity strings
 * - API_BASE_URL   → server-side URL (SSR, no VITE_ prefix)
 * - VITE_*         → client-side values (exposed to browser bundle)
 *
 * How env vars are accessed:
 * - On server (SSR):   process.env.VAR_NAME
 * - On client (CSR):   import.meta.env.VITE_VAR_NAME
 * The API_BASE_URL constant handles both cases below.
 */

// ── Brand Identity ─────────────────────────────────────────────────
export const BRAND_NAME = 'Lastly' as const
export const BRAND_TAGLINE =
  'Premium probiotics for gut health, immunity, and daily wellness.' as const
export const BRAND_URL = 'https://lastly.in' as const
export const BRAND_EMAIL = 'hello@lastly.in' as const
export const BRAND_SUPPORT_EMAIL = 'support@lastly.in' as const
export const BRAND_PHONE = '+91 98765 43210' as const

// ── API ────────────────────────────────────────────────────────────
export const API_BASE_URL = (() => {
  // Server-side: use the non-VITE_ env var
  if (typeof window === 'undefined') {
    return process.env['API_BASE_URL'] ?? 'http://localhost:3001'
  }
  // Client-side: use the VITE_ prefixed var
  return import.meta.env['VITE_API_BASE_URL'] ?? 'http://localhost:3001'
})()

export const API_VERSION = 'v1' as const
export const API_PREFIX = `/api/${API_VERSION}` as const

// ── Map Provider (config-driven, swappable) ────────────────────────
// Supported values: 'mapbox' | 'google'
// Swap by changing VITE_MAP_PROVIDER env var — no code changes required
export const MAP_PROVIDER = (
  import.meta.env['VITE_MAP_PROVIDER'] ?? 'mapbox'
) as 'mapbox' | 'google'

export const MAPBOX_ACCESS_TOKEN =
  import.meta.env['VITE_MAPBOX_ACCESS_TOKEN'] ?? ''

// ── Bot Protection ─────────────────────────────────────────────────
export const TURNSTILE_SITE_KEY =
  import.meta.env['VITE_TURNSTILE_SITE_KEY'] ?? ''

// ── Analytics ─────────────────────────────────────────────────────
export const POSTHOG_KEY = import.meta.env['VITE_POSTHOG_KEY'] ?? ''
export const POSTHOG_HOST =
  import.meta.env['VITE_POSTHOG_HOST'] ?? 'https://app.posthog.com'

// ── Error Tracking ─────────────────────────────────────────────────
export const SENTRY_DSN = import.meta.env['VITE_SENTRY_DSN'] ?? ''

// ── India-specific Validation Patterns ────────────────────────────
export const INDIA_PHONE_REGEX: RegExp = /^[+]?[0-9]{10,15}$/
export const INDIA_PINCODE_REGEX: RegExp = /^[1-9][0-9]{5}$/

// ── Query Cache Settings ───────────────────────────────────────────
export const QUERY_STALE_TIME = 5 * 60 * 1000  // 5 minutes
export const QUERY_GC_TIME = 10 * 60 * 1000     // 10 minutes

// ── Device Tier — session storage key ─────────────────────────────
export const DEVICE_TIER_STORAGE_KEY = 'lastly-device-tier' as const

// ── Theme — localStorage keys ──────────────────────────────────────
export const THEME_STORAGE_KEY = 'lastly-theme' as const
export const HIGH_CONTRAST_STORAGE_KEY = 'lastly-high-contrast' as const

// ── Consent — localStorage key ────────────────────────────────────
export const CONSENT_STORAGE_KEY = 'lastly-consent' as const

// ── Quiz — session storage key ─────────────────────────────────────
export const QUIZ_STORAGE_KEY = 'lastly-quiz-progress' as const
