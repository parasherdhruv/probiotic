import { create } from 'zustand'
import { DEVICE_TIER_STORAGE_KEY } from '~/constants'

/**
 * Device capability tiers — used to gate 3D scene complexity.
 *
 * Tier A: GPU tier ≥ 3, no reduced-motion
 *         → Full cinematic scene: postprocessing, 2000 particles, full camera choreography
 *
 * Tier B: GPU tier 1–2, or mid-range mobile
 *         → Same scene, no postprocessing, 600 particles, simplified camera path
 *
 * Tier C: GPU tier 0, no WebGL2, or reduced-motion requested
 *         → No Canvas. Static hero image or muted video. No 3D at all.
 */
export type DeviceTier = 'A' | 'B' | 'C'

interface DeviceTierStore {
  /** null = not yet computed */
  tier: DeviceTier | null
  /** True once tier has been determined (prevents re-computation) */
  isComputed: boolean
  setTier: (tier: DeviceTier) => void
}

export const useDeviceTierStore = create<DeviceTierStore>((set) => ({
  tier: null,
  isComputed: false,

  setTier: (tier) => {
    set({ tier, isComputed: true })
    // Persist for the session so route changes don't re-compute
    try {
      sessionStorage.setItem(DEVICE_TIER_STORAGE_KEY, tier)
    } catch {
      // sessionStorage unavailable (private browsing, etc.) — silently continue
    }
  },
}))
