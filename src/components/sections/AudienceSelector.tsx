import { useAudienceStore, type Audience } from '~/store/audience'
import { motion } from 'motion/react'
import { cn } from '~/lib/cn'

const audiences: { id: Audience; label: string }[] = [
  { id: 'gut-health', label: 'Gut Health' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'family', label: 'Family Wellness' },
]

export function AudienceSelector() {
  const { selectedAudience, setAudience } = useAudienceStore()

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-surface/50 backdrop-blur-md rounded-full border border-border/50 shadow-sm max-w-fit mx-auto mt-8">
      {audiences.map((aud) => {
        const isSelected = selectedAudience === aud.id
        return (
          <button
            key={aud.id}
            onClick={() => setAudience(aud.id)}
            className={cn(
              "relative px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              isSelected ? "text-brand-900 dark:text-brand-50" : "text-text-muted hover:text-text"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="audience-pill"
                className="absolute inset-0 bg-brand-100 dark:bg-brand-900/50 rounded-full border border-brand-200 dark:border-brand-800"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{aud.label}</span>
          </button>
        )
      })}
    </div>
  )
}
