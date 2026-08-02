import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS class names with clsx + tailwind-merge.
 *
 * clsx:         handles conditionals, arrays, and objects
 * tailwind-merge: resolves Tailwind class conflicts (e.g., p-4 + p-6 → p-6)
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-brand-500', className)
 * cn({ 'text-white': isDark, 'text-neutral-900': !isDark })
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
