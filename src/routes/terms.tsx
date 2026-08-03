import type { Route } from './+types/terms'
import { BRAND_NAME } from '~/constants'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Terms of Service | ${BRAND_NAME}` },
    { name: "description", content: "Terms and conditions for using our services." },
  ]
}

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="max-w-3xl mx-auto bg-card border border-border p-8 md:p-12 rounded-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-text-muted mb-8">Last Updated: October 2024</p>
        
        <div className="space-y-6 text-text-muted leading-relaxed">
          <p>
            Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Online Store Terms</h2>
          <p>
            By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. General Conditions</h2>
          <p>
            We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. Accuracy of Billing</h2>
          <p>
            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">4. Subscriptions</h2>
          <p>
            When you sign up for a subscription, you will be billed on a recurring basis. You may cancel your subscription at any time through your account dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
