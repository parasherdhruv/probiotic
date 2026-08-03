import { AnimatePresence, motion } from 'motion/react'
import { useLocation } from 'react-router'

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * PageTransition — wraps route content in AnimatePresence.
 *
 * Uses Motion (not GSAP) because this is a discrete enter/exit state
 * transition, not a scroll-position-driven animation.
 *
 * The key={location.pathname} tells AnimatePresence when to trigger
 * exit of the previous page and enter of the new page.
 *
 * mode="wait" ensures the exit animation completes before the enter
 * animation starts (no visual overlap between pages).
 *
 * initial={false} disables the initial enter animation on first render
 * (page already has SSR content — animating in would look wrong).
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.28,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ minHeight: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
