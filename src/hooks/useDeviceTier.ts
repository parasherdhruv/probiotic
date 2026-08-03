import { useEffect } from 'react'
import * as detectGpuPkg from 'detect-gpu'
const getGPUTier = detectGpuPkg.getGPUTier || (detectGpuPkg as any).default?.getGPUTier
import { useDeviceTierStore } from '~/store/device-tier'
import type { DeviceTier } from '~/store/device-tier'
import { DEVICE_TIER_STORAGE_KEY } from '~/constants'

/**
 * Computes the device rendering tier once per session.
 *
 * Tier determination algorithm:
 * 1. reduced-motion preference → Tier C (respect accessibility first)
 * 2. No WebGL2 support         → Tier C (can't run Three.js)
 * 3. GPU tier 0 (blacklisted)  → Tier C
 * 4. GPU tier 1–2              → Tier B
 * 5. GPU tier 3+ (high-end)    → Tier A
 *
 * Results are cached in:
 * - sessionStorage (survives route changes, resets on browser close)
 * - Zustand store (survives React re-renders, lost on page refresh → reads sessionStorage)
 *
 * @returns The device tier, or null while computing
 */
export function useDeviceTier(): DeviceTier | null {
  const { tier, isComputed, setTier } = useDeviceTierStore()

  useEffect(() => {
    if (isComputed) return

    // Check sessionStorage cache first
    try {
      const cached = sessionStorage.getItem(DEVICE_TIER_STORAGE_KEY)
      if (cached === 'A' || cached === 'B' || cached === 'C') {
        setTier(cached)
        return
      }
    } catch {
      // sessionStorage unavailable — continue with detection
    }

    async function compute() {
      // Rule 1: Accessibility overrides everything
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTier('C')
        return
      }

      // Rule 2: WebGL2 check
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2')
      if (!gl) {
        setTier('C')
        return
      }

      // Rule 3–5: GPU tier via detect-gpu
      try {
        const gpuTier = await getGPUTier()
        if (gpuTier.tier === 0) {
          setTier('C')
        } else if (gpuTier.tier >= 3) {
          setTier('A')
        } else {
          setTier('B')
        }
      } catch {
        // detect-gpu failed (unusual) — default to Tier B (safe middle ground)
        setTier('B')
      }
    }

    void compute()
  }, [isComputed, setTier])

  return tier
}
