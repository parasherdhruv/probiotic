import type { AnalyticsEventName } from './events'
import { useConsentStore } from '~/store/consent'

/**
 * Consent-gated analytics tracking.
 *
 * All analytics calls must go through this function — never call
 * posthog.capture() directly in component code.
 *
 * Implementation:
 * - v1 (Milestone 1–12): Logs to console in dev, silently drops in prod
 * - v2 (Milestone 13): Wires PostHog when analytics consent is given
 *
 * @param event  Event name from AnalyticsEvents constants
 * @param props  Optional event properties (typed for each event category)
 */
export function track(
  event: AnalyticsEventName | string,
  props?: Record<string, unknown>,
): void {
  // Consent gate — never fire events without explicit user consent
  const { analytics } = useConsentStore.getState()
  if (!analytics) return

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[analytics]', event, props)
  }

  // PostHog integration (added in Milestone 3 / after analytics consent wired)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ph = (typeof window !== 'undefined') ? (window as any).posthog : null
  if (ph?.capture) {
    ph.capture(event, props)
  }
}

/**
 * Track a page view — called in root loader or route loader.
 * Includes the current pathname automatically.
 */
export function trackPageView(pathname: string): void {
  track('page_viewed', { path: pathname })
}
