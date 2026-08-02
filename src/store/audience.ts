import { create } from 'zustand'

export type Audience = 'gut-health' | 'fitness' | 'family'

interface AudienceState {
  selectedAudience: Audience
  setAudience: (audience: Audience) => void
}

export const useAudienceStore = create<AudienceState>((set) => ({
  selectedAudience: 'gut-health',
  setAudience: (audience) => set({ selectedAudience: audience }),
}))
