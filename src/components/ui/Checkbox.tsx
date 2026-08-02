import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Check, Circle } from 'lucide-react'
import { cn } from '~/lib/cn'

// ── Checkbox ─────────────────────────────────────────────────────────────────
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer h-5 w-5 shrink-0',
        'rounded-md border border-input',
        'bg-background',
        // Checked state
        'data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500',
        'data-[state=checked]:text-white',
        // Focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        // Disabled
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-150',
        'cursor-pointer',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-current"
      >
        <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

// ── RadioGroup ────────────────────────────────────────────────────────────────
const RadioGroup = RadioGroupPrimitive.Root

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'aspect-square h-5 w-5 shrink-0',
        'rounded-full border-2 border-input',
        'bg-background',
        // Checked state
        'data-[state=checked]:border-brand-500',
        'data-[state=checked]:text-brand-500',
        // Focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        // Disabled
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-150',
        'cursor-pointer',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle
          className="h-2.5 w-2.5 fill-brand-500 text-brand-500"
          aria-hidden="true"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { Checkbox, RadioGroup, RadioGroupItem }
