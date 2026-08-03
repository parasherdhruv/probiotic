import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CONSENT_STORAGE_KEY } from '~/constants'

interface ConsentCategories {
  /** Always true — session cookies, preference storage (no banner needed) */
  functional: boolean
  /** PostHog, analytics events — gated by this flag */
  analytics: boolean
  /** Marketing pixels, retargeting — not used in v1, reserved for future */
  marketing: boolean
}

interface ConsentStore extends ConsentCategories {
  /** True once the user has made any choice */
  hasResponded: boolean
  acceptAll: () => void
  rejectAll: () => void
  /** Set granular consent per category */
  updateConsent: (categories: Partial<ConsentCategories>) => void
}

export const useConsentStore = create<ConsentStore>()(
  persist(
    (set) => ({
      functional: true,    // Always on — essential cookies
      analytics: false,
      marketing: false,
      hasResponded: false,

      acceptAll: () =>
        set({ functional: true, analytics: true, marketing: true, hasResponded: true }),

      rejectAll: () =>
        set({ functional: true, analytics: false, marketing: false, hasResponded: true }),

      updateConsent: (categories) =>
        set((state) => ({ ...state, ...categories, hasResponded: true })),
    }),
    {
      name: CONSENT_STORAGE_KEY,
      // Only persist the consent decision, not UI state
      partialize: (state) => ({
        functional: state.functional,
        analytics: state.analytics,
        marketing: state.marketing,
        hasResponded: state.hasResponded,
      }),
    },
  ),
)
