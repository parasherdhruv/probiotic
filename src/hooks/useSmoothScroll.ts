import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '~/lib/gsap'

/**
 * Initialize Lenis smooth scroll and wire it to GSAP's ticker.
 *
 * Wiring details:
 * 1. Lenis owns the scroll position interpolation
 * 2. GSAP's ticker calls lenis.raf() on every frame (replaces requestAnimationFrame)
 * 3. Lenis fires 'scroll' events → ScrollTrigger.update() reads the new position
 *
 * This is the canonical Lenis + GSAP integration pattern.
 * Do NOT use Lenis with its own RAF — it conflicts with GSAP's scheduler.
 *
 * Skip initialization when:
 * - SSR (no window)
 * - User prefers reduced motion (honor accessibility, use native scroll)
 *
 * @returns A ref to the Lenis instance (for programmatic scroll control)
 */
export function useSmoothScroll(): RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return

    // Accessibility: respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      // Custom easing that matches --ease-out in theme.css
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices benefit from native scroll — disable smooth on touch
      touchMultiplier: 0,
    })

    lenisRef.current = lenis

    // Critical: disable GSAP's lag smoothing so it doesn't
    // interfere with Lenis's frame-perfect scroll
    gsap.ticker.lagSmoothing(0)

    // Drive Lenis's RAF from GSAP's ticker
    // time in GSAP ticker is in seconds — Lenis.raf expects milliseconds
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)

    // Keep ScrollTrigger positions accurate as Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
