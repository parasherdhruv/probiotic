import type { Route } from './+types/cookies'
import { BRAND_NAME } from '~/constants'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Cookie Policy | ${BRAND_NAME}` },
    { name: "description", content: "Information about how we use cookies." },
  ]
}

export default function CookiePolicy() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="max-w-3xl mx-auto bg-card border border-border p-8 md:p-12 rounded-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-text-muted mb-8">Last Updated: October 2024</p>
        
        <div className="space-y-6 text-text-muted leading-relaxed">
          <p>
            This Cookie Policy explains how {BRAND_NAME} uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Why do we use cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. Types of Cookies We Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</li>
            <li><strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</li>
            <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">4. How can I control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in our cookie consent banner.
          </p>
        </div>
      </div>
    </div>
  )
}
