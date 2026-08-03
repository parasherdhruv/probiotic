import { useEffect, useRef } from 'react'
import { cn } from '~/lib/cn'
import { gsap, ScrollTrigger } from '~/lib/gsap'

interface AnimatedCounterProps {
  /** Target number to count to */
  value: number
  /** Text displayed after the number (e.g. '+', 'B CFU', '%') */
  suffix?: string
  /** Text displayed before the number (e.g. '₹', '#') */
  prefix?: string
  /** Duration of the counting animation in seconds */
  duration?: number
  /** Whether to format with locale-aware thousand separators */
  format?: boolean
  className?: string
}

/**
 * AnimatedCounter — GSAP-driven number counter with ScrollTrigger.
 *
 * Uses GSAP (not Motion) because this is a scroll-position-triggered
 * timeline animation — exactly the GSAP use case per the architecture.
 *
 * The counter fires once when the element enters the viewport at 85%
 * scroll position. Uses en-IN locale for Indian number formatting:
 * 10,00,000 (lakh format) instead of 1,000,000.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  format = true,
  className,
}: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const countObj = useRef({ val: 0 })

  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    // Reset on value change
    countObj.current.val = 0
    el.textContent = `${prefix}0${suffix}`

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(countObj.current, {
          val: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            const formatted = format
              ? Math.round(countObj.current.val).toLocaleString('en-IN')
              : Math.round(countObj.current.val).toString()
            el.textContent = `${prefix}${formatted}${suffix}`
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [value, suffix, prefix, duration, format])

  return (
    <span
      ref={spanRef}
      className={cn('tabular-nums', className)}
      aria-label={`${prefix}${value.toLocaleString('en-IN')}${suffix}`}
    >
      {prefix}0{suffix}
    </span>
  )
}
