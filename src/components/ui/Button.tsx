import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

/**
 * Button variants:
 * - primary   (default) — filled brand green, main CTAs
 * - secondary           — outlined, secondary actions
 * - ghost               — text-only, tertiary actions
 * - accent              — gold/warm, promotional CTAs
 * - danger              — destructive actions (delete, remove)
 *
 * Sizes: sm | md (default) | lg | xl | icon
 *
 * asChild: renders as the child element (useful for link-styled buttons)
 *
 * All variants include:
 * - active:scale-95 micro-press feedback
 * - focus-visible ring matching brand color
 * - disabled:opacity-50 + disabled:pointer-events-none
 * - transition on all color/shadow properties
 */
const buttonVariants = cva(
  // ── Base styles ────────────────────────────────────────────────────────────
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-full',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95',
    'cursor-pointer select-none',
    'shrink-0',
  ],
  {
    variants: {
      variant: {
        // Main CTA — brand green filled
        primary: [
          'bg-brand-500 text-white',
          'hover:bg-brand-600',
          'shadow-[0_0_20px_oklch(0.58_0.15_155_/_0.30)]',
          'hover:shadow-[0_0_30px_oklch(0.58_0.15_155_/_0.40)]',
          'dark:bg-brand-400 dark:text-neutral-950 dark:hover:bg-brand-500',
        ],
        // Outlined — for secondary actions
        secondary: [
          'bg-transparent text-brand-700 border border-brand-300',
          'hover:bg-brand-50',
          'dark:text-brand-300 dark:border-brand-700 dark:hover:bg-brand-950',
        ],
        // Ghost — text only, for nav and tertiary actions
        ghost: [
          'bg-transparent text-neutral-700',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
        ],
        // Accent — warm gold for promotional CTAs
        accent: [
          'bg-accent-500 text-white',
          'hover:bg-accent-600',
          'shadow-[0_0_20px_oklch(0.72_0.14_85_/_0.30)]',
          'hover:shadow-[0_0_30px_oklch(0.72_0.14_85_/_0.40)]',
        ],
        // Danger — destructive actions
        danger: [
          'bg-destructive text-white',
          'hover:bg-[oklch(0.52_0.18_25)]',
          'dark:bg-[oklch(0.65_0.18_25)] dark:text-white',
        ],
        // Flat/no background — for icon buttons in nav
        flat: [
          'bg-transparent text-neutral-600',
          'hover:text-neutral-900',
          'dark:text-neutral-400 dark:hover:text-neutral-100',
        ],
      },
      size: {
        sm:   'h-8  px-3   text-xs',
        md:   'h-10 px-5   text-sm',
        lg:   'h-12 px-7   text-base',
        xl:   'h-14 px-8   text-lg',
        icon: 'h-10 w-10  p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
