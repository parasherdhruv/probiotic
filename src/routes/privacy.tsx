import type { Route } from './+types/privacy'
import { BRAND_NAME } from '~/constants'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Privacy Policy | ${BRAND_NAME}` },
    { name: "description", content: "Our privacy policy and data handling practices." },
  ]
}

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="max-w-3xl mx-auto bg-card border border-border p-8 md:p-12 rounded-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-text-muted mb-8">Last Updated: October 2024</p>
        
        <div className="space-y-6 text-text-muted leading-relaxed">
          <p>
            At {BRAND_NAME}, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
          </p>
          <p>
            Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. Data Retention</h2>
          <p>
            When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">4. Changes</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
          </p>
        </div>
      </div>
    </div>
  )
}
