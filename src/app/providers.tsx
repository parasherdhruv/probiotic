import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { QUERY_STALE_TIME, QUERY_GC_TIME } from '~/constants'

/**
 * TanStack Query client — single instance shared across the app.
 *
 * Defaults tuned for a content-heavy site:
 * - staleTime 5min: content endpoints are cached 5min server-side too,
 *   so re-fetching earlier is wasteful.
 * - gcTime 10min: data stays in cache for 10min after last subscriber,
 *   so navigating back to a page doesn't trigger a new fetch.
 * - refetchOnWindowFocus false: wellness content doesn't change per focus.
 * - retry 2: network blips shouldn't immediately surface errors to users.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0, // Don't retry mutations (leads, newsletter) — could double-submit
    },
  },
})

/**
 * Providers — all context providers composed into a single wrapper.
 *
 * Add new providers here as milestones progress:
 * - Milestone 2: Zustand stores (no provider needed — global)
 * - Milestone 3: ThemeProvider, ConsentProvider
 * - Milestone 12: SentryErrorBoundary
 *
 * Keep this flat — avoid deep nesting.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* TanStack Query DevTools — only visible in dev, tree-shaken in prod */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  )
}

/**
 * Export the queryClient for use in route loaders.
 * Route loaders use queryClient.ensureQueryData() for SSR hydration.
 */
export { queryClient }
