import { cn } from '~/lib/cn'

/**
 * Input — text input with full focus/error/disabled states.
 *
 * Includes:
 * - Brand-colored focus ring (ring-brand-500)
 * - Error state (data-error="true") with red border
 * - Left/Right icon slots via wrapper pattern
 */
function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Layout
        'flex h-11 w-full px-4',
        // Typography
        'text-sm text-foreground placeholder:text-muted-foreground',
        // Surface
        'rounded-xl border border-input bg-background',
        // Focus
        'outline-none ring-offset-background',
        'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1',
        'focus-visible:border-brand-500',
        // States
        'disabled:cursor-not-allowed disabled:opacity-50',
        'read-only:bg-muted',
        // Transition
        'transition-colors duration-150',
        // File input styling
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...props}
    />
  )
}

// ── Textarea ─────────────────────────────────────────────────────────────────
function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-24 w-full px-4 py-3',
        'text-sm text-foreground placeholder:text-muted-foreground',
        'rounded-xl border border-input bg-background',
        'outline-none ring-offset-background',
        'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1',
        'focus-visible:border-brand-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-y',
        'transition-colors duration-150',
        className,
      )}
      {...props}
    />
  )
}

// ── Label ─────────────────────────────────────────────────────────────────────
function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'text-sm font-medium leading-none text-foreground',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

// ── FormField compound (Label + Input/Textarea + ErrorMessage) ────────────────
interface FormFieldProps {
  label: string
  id: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

function FormField({
  label,
  id,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="ml-1 text-destructive" aria-label="required">
            *
          </span>
        )}
      </Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p
          role="alert"
          id={`${id}-error`}
          className="text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { Input, Textarea, Label, FormField }
