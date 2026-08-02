import { Contrast } from 'lucide-react'
import { useThemeStore } from '~/store/theme'
import { Button } from '~/components/ui/Button'
import { track } from '~/analytics/track'

export function HighContrastToggle() {
  const { isHighContrast, toggleHighContrast } = useThemeStore()

  return (
    <Button
      variant={isHighContrast ? 'secondary' : 'ghost'}
      size="icon"
      onClick={() => {
        toggleHighContrast()
        track('theme_toggled', { to: isHighContrast ? 'normal_contrast' : 'high_contrast' })
      }}
      aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast mode`}
      className="relative"
    >
      <Contrast className="h-5 w-5" />
    </Button>
  )
}
