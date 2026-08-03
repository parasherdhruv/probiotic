import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

/**
 * Badge — compact label for status, categories, counts.
 * Chip  — interactive version with optional remove button.
 *
 * Badge variants align to our brand vocabulary:
 * - default  → neutral surface
 * - brand    → green (gut health, probiotic strength)
 * - science  → blue (clinical, research)
 * - fitness  → coral (sport, energy, fitness)
 * - accent   → gold (featured, new, sale)
 * - success  → green feedback
 * - warning  → amber feedback
 * - error    → red feedback
 */

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1',
    'rounded-full font-medium',
    'border',
    'transition-colors duration-150',
    'select-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-muted text-muted-foreground border-border',
        ],
        brand: [
          'bg-brand-100 text-brand-700 border-brand-200',
          'dark:bg-brand-950 dark:text-brand-300 dark:border-brand-800',
        ],
        science: [
          'bg-[oklch(0.95_0.02_240)] text-science-600 border-[oklch(0.87_0.04_240)]',
          'dark:bg-[oklch(0.15_0.02_240)] dark:text-science-300 dark:border-[oklch(0.22_0.03_240)]',
        ],
        fitness: [
          'bg-[oklch(0.96_0.02_25)] text-fitness-600 border-[oklch(0.88_0.04_25)]',
          'dark:bg-[oklch(0.15_0.02_25)] dark:text-fitness-300 dark:border-[oklch(0.22_0.03_25)]',
        ],
        accent: [
          'bg-[oklch(0.97_0.03_85)] text-accent-700 border-[oklch(0.88_0.06_85)]',
          'dark:bg-[oklch(0.15_0.03_85)] dark:text-accent-300 dark:border-[oklch(0.25_0.05_85)]',
        ],
        success: [
          'bg-[oklch(0.95_0.03_145)] text-[oklch(0.42_0.12_145)] border-[oklch(0.87_0.05_145)]',
          'dark:bg-[oklch(0.15_0.03_145)] dark:text-[oklch(0.72_0.12_145)] dark:border-[oklch(0.22_0.04_145)]',
        ],
        warning: [
          'bg-[oklch(0.97_0.04_70)] text-[oklch(0.50_0.12_70)] border-[oklch(0.88_0.07_70)]',
          'dark:bg-[oklch(0.15_0.03_70)] dark:text-[oklch(0.75_0.12_70)] dark:border-[oklch(0.22_0.04_70)]',
        ],
        error: [
          'bg-[oklch(0.96_0.02_25)] text-destructive border-[oklch(0.88_0.06_25)]',
          'dark:bg-[oklch(0.15_0.03_25)] dark:text-[oklch(0.72_0.15_25)] dark:border-[oklch(0.22_0.04_25)]',
        ],
        // High-visibility outline variant for tags/filters
        outline: [
          'bg-transparent text-foreground border-border',
          'hover:bg-muted',
        ],
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

// ── Badge (static) ─────────────────────────────────────────────────────────────
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// ── Chip (interactive) ────────────────────────────────────────────────────────
interface ChipProps extends BadgeProps {
  onRemove?: () => void
}

function Chip({ className, variant, size, children, onRemove, ...props }: ChipProps) {
  return (
    <span
      data-slot="chip"
      className={cn(
        badgeVariants({ variant, size }),
        'pr-1',
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className={cn(
            'ml-0.5 rounded-full p-0.5',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'transition-colors duration-100',
            'cursor-pointer',
          )}
        >
          {/* ×  */}
          <svg
            className="h-3 w-3"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 3L3 9M3 3l6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

export { Badge, Chip, badgeVariants }
