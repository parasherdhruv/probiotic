import { Toaster as Sonner } from 'sonner'
import { useThemeStore } from '~/store/theme'

/**
 * Toast via Sonner — wired to our theme store.
 *
 * The Toaster component should be rendered once at the layout root.
 * Use toast() from 'sonner' to trigger toasts anywhere in the app:
 *
 * @example
 * import { toast } from 'sonner'
 * toast.success('Subscribed to newsletter!')
 * toast.error('Something went wrong.')
 * toast('', { description: 'Some neutral message.' })
 */
function Toaster() {
  const { resolvedTheme } = useThemeStore()

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: [
            'group toast rounded-xl border border-border bg-background shadow-lg',
            'text-foreground text-sm',
          ].join(' '),
          description: 'text-muted-foreground',
          actionButton: 'bg-brand-500 text-white rounded-full',
          cancelButton: 'bg-muted text-muted-foreground rounded-full',
          success: 'border-[oklch(0.87_0.05_145)] text-[oklch(0.42_0.12_145)]',
          error: 'border-[oklch(0.88_0.06_25)] text-destructive',
        },
      }}
    />
  )
}

// Re-export toast for use throughout the app
export { toast } from 'sonner'
export { Toaster }
