/**
 * GSAP plugin registration — import this file once to register all plugins.
 * All GSAP-using components import { gsap, ScrollTrigger } from '~/lib/gsap'
 * instead of importing directly, to guarantee plugins are registered.
 *
 * Motion/GSAP division of labor (mandatory — see architecture doc):
 * - Motion (motion/react): state/gesture-driven animations
 * - GSAP + ScrollTrigger:  scroll-position-driven, pinned, timeline-scrub work
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins — safe to call multiple times (GSAP deduplicates)
gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP easing values that match our CSS motion tokens (theme.css).
 * Use these in gsap.to() calls to stay consistent with Motion animations.
 */
export const GSAP_EASE = {
  out:    'power3.out',       // matches --ease-out
  in:     'power3.in',        // matches --ease-in
  inOut:  'power2.inOut',     // matches --ease-in-out
  spring: 'back.out(1.7)',    // matches --ease-spring (approximate)
  smooth: 'power1.inOut',     // matches --ease-smooth
} as const

export { gsap, ScrollTrigger }
