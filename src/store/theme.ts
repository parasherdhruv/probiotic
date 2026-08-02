import { create } from 'zustand'
import { THEME_STORAGE_KEY, HIGH_CONTRAST_STORAGE_KEY } from '~/constants'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  isHighContrast: boolean
  /** Initialize from localStorage — call once on client mount */
  init: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  toggleHighContrast: () => void
}

function getResolvedTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'system',
  resolvedTheme: 'light',
  isHighContrast: false,

  init: () => {
    // Read persisted theme — the root.tsx script already applied it visually,
    // this syncs the Zustand state to match on hydration
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    const theme = stored ?? 'system'
    const resolved = getResolvedTheme(theme)
    const hc = localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === 'true'

    set({ theme, resolvedTheme: resolved, isHighContrast: hc })

    // Listen for system theme changes when in 'system' mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.addEventListener('change', (e) => {
      if (get().theme === 'system') {
        const newResolved = e.matches ? 'dark' : 'light'
        set({ resolvedTheme: newResolved })
        applyTheme(newResolved)
      }
    })
  },

  setTheme: (theme) => {
    const resolved = getResolvedTheme(theme)
    set({ theme, resolvedTheme: resolved })
    applyTheme(resolved)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  },

  toggleTheme: () => {
    const current = get().resolvedTheme
    get().setTheme(current === 'dark' ? 'light' : 'dark')
  },

  toggleHighContrast: () => {
    const next = !get().isHighContrast
    set({ isHighContrast: next })
    document.documentElement.classList.toggle('high-contrast', next)
    localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(next))
  },
}))
