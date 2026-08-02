import posthog from 'posthog-js'
import { POSTHOG_KEY, POSTHOG_HOST } from '~/constants'

/**
 * Initializes PostHog analytics.
 * This should ONLY be called after explicit user consent is granted.
 */
export function initPostHog() {
  if (typeof window === 'undefined') return
  if (!POSTHOG_KEY) return

  // Prevent double-init
  if ((window as any).posthog) return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // We handle pageviews manually in our router to avoid SPA issues
    capture_pageview: false, 
    // Opt out of automatic click/form capture — we prefer explicit events via track()
    autocapture: false,
    // Disable session recording by default (can be enabled server-side in PostHog UI)
    disable_session_recording: true,
  })

  // Expose to window for the track() abstraction
  ;(window as any).posthog = posthog
}
