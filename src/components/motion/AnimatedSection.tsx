'use client'

import { useRef, createElement } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '~/lib/cn'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  /** Delay in seconds before animation starts */
  delay?: number
  /** Whether to only animate once (vs every time it enters viewport) */
  once?: boolean
  /** Direction the element slides in from */
  direction?: Direction
  /** Fraction of element visible before triggering (0–1) */
  amount?: number
  /** Override the element tag */
  as?: React.ElementType
}

const directionOffset = {
  up:    { y:  24, x: 0 },
  down:  { y: -24, x: 0 },
  left:  { y: 0, x:  24 },
  right: { y: 0, x: -24 },
  none:  { y: 0,  x: 0 },
}

/**
 * AnimatedSection — scroll-triggered fade+slide reveal.
 *
 * Uses Motion's useInView (not GSAP) because this is state-driven
 * (visible/hidden) not position-scrubbed. This is the correct tool per
 * the architecture's Motion/GSAP division of labor.
 *
 * Respects prefers-reduced-motion via Motion's built-in support.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  once = true,
  direction = 'up',
  amount = 0.12,
  as: Component = 'div',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const shouldReduceMotion = useReducedMotion()

  const { y, x } = shouldReduceMotion ? { x: 0, y: 0 } : directionOffset[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y, x }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1], // matches --ease-out
      }}
      className={cn(className)}
    >
      {/* Render as the custom element if needed (for semantic HTML) */}
      {Component !== 'div' ? (
        createElement(Component, null, children)
      ) : (
        children
      )}
    </motion.div>
  )
}

/**
 * AnimatedGroup — staggers children with a delay offset.
 *
 * @example
 * <AnimatedGroup stagger={0.1}>
 *   <ProductCard />
 *   <ProductCard />
 *   <ProductCard />
 * </AnimatedGroup>
 */
interface AnimatedGroupProps {
  children: React.ReactNode[]
  className?: string
  stagger?: number
  direction?: Direction
  once?: boolean
}

export function AnimatedGroup({
  children,
  className,
  stagger = 0.08,
  direction = 'up',
  once = true,
}: AnimatedGroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimatedSection
          key={i}
          delay={i * stagger}
          direction={direction}
          once={once}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  )
}
