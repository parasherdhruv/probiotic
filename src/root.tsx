import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { Providers } from '~/app/providers'
import type { LinksFunction, MetaFunction } from 'react-router'
import globalStylesUrl from '~/styles/globals.css?url'
import { BRAND_NAME, BRAND_TAGLINE } from '~/constants'

export const links: LinksFunction = () => [
  // Preconnect to Google Fonts CDN — fires on every SSR response
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  // Inter variable font — full weight + italic range
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  // Processed Tailwind v4 stylesheet
  { rel: 'stylesheet', href: globalStylesUrl },
]

// Default meta — individual routes override these
export const meta: MetaFunction = () => [
  {
    title: `${BRAND_NAME} — Premium Probiotics for Gut Health, Immunity & Wellness`,
  },
  { name: 'description', content: BRAND_TAGLINE },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: BRAND_NAME },
  { name: 'theme-color', content: '#3d9970' },
]

/**
 * Layout wraps everything — both page content and error boundaries.
 * This is where the <html> document lives.
 * suppressHydrationWarning prevents React from complaining about
 * class="dark" being added by our theme initializer script.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme initializer — runs before paint to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('lastly-theme');
                  var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = stored || preferred;
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                  var hc = localStorage.getItem('lastly-high-contrast');
                  if (hc === 'true') document.documentElement.classList.add('high-contrast');
                } catch(e) {}
              })()
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Skip to main content — first focusable element for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

/**
 * App is the actual application component rendered inside Layout.
 * Outlet renders the matched route component.
 */
export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}
