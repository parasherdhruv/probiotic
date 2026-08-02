import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'

/**
 * Client entry point — hydrates the SSR'd HTML with React.
 *
 * startTransition: wraps hydration so it doesn't block user interaction
 * while React reconciles the server-rendered HTML with the virtual DOM.
 *
 * StrictMode: enabled in all environments for early detection of
 * deprecated APIs and side effects. Effects run twice in dev — this is
 * expected and intentional.
 *
 * HydratedRouter: React Router v7's client-side router that hydrates
 * from the server-rendered router context.
 */
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  )
})
