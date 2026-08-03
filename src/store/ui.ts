import { create } from 'zustand'

interface UIStore {
  isMobileNavOpen: boolean
  isAnnouncementDismissed: boolean
  activeModal: string | null

  openMobileNav: () => void
  closeMobileNav: () => void
  toggleMobileNav: () => void
  dismissAnnouncement: () => void
  openModal: (id: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileNavOpen: false,
  isAnnouncementDismissed: false,
  activeModal: null,

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),
  dismissAnnouncement: () => set({ isAnnouncementDismissed: true }),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}))
