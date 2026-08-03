import { Outlet, ScrollRestoration } from 'react-router'

import { AnnouncementBar } from '~/components/layout/AnnouncementBar'
import { Header } from '~/components/layout/Header'
import { Footer } from '~/components/layout/Footer'
import { CookieConsentBanner } from '~/components/layout/CookieConsentBanner'
import { PageTransition } from '~/components/motion/PageTransition'
import { Toaster } from '~/components/ui/Toast'

/**
 * Shared layout route — wraps all public pages.
 *
 * This is where the persistent shell lives:
 * - Providers (TanStack Query, theme, consent)
 * - AnnouncementBar
 * - Header (includes MobileNav and Theme toggles)
 * - Footer
 * - Cookie consent banner
 * - Toaster (for global notifications)
 *
 * The <main> element has id="main-content" so the skip-to-content
 * link in root.tsx can jump directly to page content.
 *
 * flex + min-h-screen + flex-1 on main = sticky footer pattern
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
        <div className="fixed inset-x-0 top-0 z-sticky flex flex-col">
          <AnnouncementBar />
          <Header />
        </div>

        <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>

        <Footer />
        <CookieConsentBanner />
        <Toaster />
      </div>
  )
}

