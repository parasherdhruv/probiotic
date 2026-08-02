import { useState, useEffect } from 'react'

/**
 * Reactive wrapper around window.matchMedia.
 * Returns false during SSR (no window object).
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 767px)')
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    // Sync immediately in case value changed between render and effect
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

// ── Convenience hooks ────────────────────────────────────────────────────────
// Prefer these over calling useMediaQuery directly with magic strings

export const useIsMobile = () =>
  useMediaQuery('(max-width: 767px)')

export const useIsTablet = () =>
  useMediaQuery('(min-width: 768px) and (max-width: 1023px)')

export const useIsDesktop = () =>
  useMediaQuery('(min-width: 1024px)')

export const useIsLargeDesktop = () =>
  useMediaQuery('(min-width: 1440px)')

export const usePrefersDark = () =>
  useMediaQuery('(prefers-color-scheme: dark)')

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

export const usePrefersHighContrast = () =>
  useMediaQuery('(prefers-contrast: more)')

export const useIsTouch = () =>
  useMediaQuery('(hover: none) and (pointer: coarse)')
