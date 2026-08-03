import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '~/lib/cn'

const Tabs = TabsPrimitive.Root

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex items-center rounded-xl',
        'bg-muted p-1 text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex items-center justify-center gap-1.5',
        'rounded-lg px-4 py-2 text-sm font-medium',
        'transition-all duration-150',
        'cursor-pointer select-none',
        'whitespace-nowrap',
        // Active state
        'data-[state=active]:bg-background',
        'data-[state=active]:text-foreground',
        'data-[state=active]:shadow-sm',
        // Brand-tinted active for the audience selector tabs
        'data-[state=active]:font-semibold',
        // Focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        // Disabled
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'mt-4',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
