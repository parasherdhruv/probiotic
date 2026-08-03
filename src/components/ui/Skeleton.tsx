import { cn } from '~/lib/cn'

/**
 * Skeleton — animated shimmer placeholder for loading states.
 *
 * Variants:
 * - default: uses the global .shimmer class from globals.css
 * - text:    rounded-full for text line placeholders
 * - avatar:  aspect-square rounded-full for avatar placeholders
 * - card:    rounded-2xl for card placeholders
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'avatar' | 'card'
}

function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        'shimmer',
        variant === 'text' && 'rounded-full',
        variant === 'avatar' && 'aspect-square rounded-full',
        variant === 'card' && 'rounded-2xl',
        variant === 'default' && 'rounded-md',
        className,
      )}
      {...props}
    />
  )
}

// ── Compound skeleton patterns ────────────────────────────────────────────────
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-border p-6 space-y-4', className)}>
      <Skeleton variant="card" className="h-48 w-full" />
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  )
}

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-2/3' : 'w-full',
          )}
        />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonText }
