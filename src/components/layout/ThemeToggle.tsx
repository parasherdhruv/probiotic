import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '~/store/theme'
import { track } from '~/analytics/track'
import { cn } from '~/lib/cn'

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeStore()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      role="switch"
      aria-checked={isDark}
      onClick={() => {
        toggleTheme()
        track('theme_toggled', { to: isDark ? 'light' : 'dark' })
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark ? "bg-neutral-800" : "bg-neutral-200"
      )}
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Background Icons (visible when thumb moves away) */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Moon className="h-3.5 w-3.5 text-neutral-500" />
        <Sun className="h-3.5 w-3.5 text-neutral-400" />
      </span>

      {/* Thumb */}
      <span
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-white shadow-sm ring-0 transition-transform duration-300 z-10 flex items-center justify-center",
          isDark ? "translate-x-6" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-neutral-800" />
        ) : (
          <Sun className="h-3 w-3 text-neutral-600" />
        )}
      </span>
    </button>
  )
}
