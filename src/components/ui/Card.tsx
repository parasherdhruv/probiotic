import { cn } from '~/lib/cn'

// ── Card ──────────────────────────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply a hover lift effect (scale + shadow increase) */
  interactive?: boolean
}

function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-md',
        interactive && [
          'cursor-pointer',
          'transition-all duration-200',
          'hover:-translate-y-1 hover:shadow-xl',
          'active:translate-y-0 active:shadow-md',
        ],
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('text-xl font-bold leading-tight tracking-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground leading-relaxed', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

// ── GlassCard ─────────────────────────────────────────────────────────────────
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'default' = neutral glass | 'brand' = brand-tinted glass */
  variant?: 'default' | 'brand'
  interactive?: boolean
}

function GlassCard({
  className,
  variant = 'default',
  interactive = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      data-slot="glass-card"
      className={cn(
        'rounded-2xl p-6',
        variant === 'default' && 'glass',
        variant === 'brand' && 'glass-brand',
        interactive && [
          'cursor-pointer',
          'transition-all duration-200',
          'hover:-translate-y-1',
          'active:translate-y-0',
        ],
        className,
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  GlassCard,
}
