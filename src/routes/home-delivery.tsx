import type { Route } from './+types/home-delivery'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { Snowflake, PackageCheck, Truck, ShieldCheck, ThermometerSnowflake, Leaf } from 'lucide-react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Home Delivery | ${BRAND_NAME}` },
    { name: "description", content: "Learn about our cold-chain shipping and flexible home delivery subscription for maximum probiotic viability." },
  ]
}

export default function HomeDelivery() {
  const steps = [
    {
      icon: <Snowflake className="w-8 h-8 text-brand-500" />,
      title: 'Climate Controlled Storage',
      description: 'Our formulations are stored in highly monitored, temperature-controlled facilities to ensure the cultures remain in a state of suspended animation.'
    },
    {
      icon: <ThermometerSnowflake className="w-8 h-8 text-brand-500" />,
      title: 'Cold-Chain Shipping',
      description: 'Each package is shipped with sustainable, insulated liners and medical-grade ice packs. This ensures a stable temperature throughout transit.'
    },
    {
      icon: <Truck className="w-8 h-8 text-brand-500" />,
      title: 'Expedited Transit',
      description: 'We utilize expedited 2-day shipping networks for all orders, minimizing the time your package spends outside a controlled environment.'
    },
    {
      icon: <PackageCheck className="w-8 h-8 text-brand-500" />,
      title: 'Guaranteed Viability',
      description: 'By the time it reaches your fridge, we guarantee 100% of the stated colony-forming units (CFUs) are alive, active, and ready.'
    }
  ]

  const subscriptionBenefits = [
    {
      title: "Set It and Forget It",
      description: "Receive your formulations every 30 days. Never run out of your daily routine.",
      icon: <Leaf className="w-5 h-5 text-brand-600" />
    },
    {
      title: "15% Ongoing Discount",
      description: "Subscribers receive a permanent 15% discount on all recurring orders.",
      icon: <Leaf className="w-5 h-5 text-brand-600" />
    },
    {
      title: "Flexible Scheduling",
      description: "Pause, skip, or cancel your subscription at any time directly from your account.",
      icon: <Leaf className="w-5 h-5 text-brand-600" />
    },
    {
      title: "Priority Fulfillment",
      description: "In the event of inventory shortages, subscribers are always fulfilled first.",
      icon: <Leaf className="w-5 h-5 text-brand-600" />
    }
  ]

  return (
    <div className="pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection direction="down">
            <Badge className="mb-4">Cold-Chain Guaranteed</Badge>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Alive upon arrival.
              <br className="hidden md:block" /> Guaranteed.
            </h1>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.2}>
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Unlike shelf-stable probiotics which often contain dead strains, our formulations are shipped cold and arrive alive, ensuring maximum viability and efficacy.
            </p>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/products">Shop Formulations</Link>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full" asChild>
                <Link to="/faq">Read Delivery FAQ</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Cold Chain Process */}
      <section className="bg-neutral-100 dark:bg-neutral-900 py-24 mb-24">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Cold-Chain Process</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">How we ensure your probiotics survive the journey from our lab to your refrigerator.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="bg-surface p-8 rounded-3xl shadow-sm h-full border border-border/50">
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Benefits */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="left">
              <div className="aspect-square bg-brand-100 dark:bg-brand-900/20 rounded-full flex items-center justify-center p-12 relative overflow-hidden">
                <ShieldCheck className="w-32 h-32 text-brand-500 absolute" />
                <div className="absolute inset-0 border-[40px] border-surface/50 rounded-full blur-xl mix-blend-overlay"></div>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The {BRAND_NAME} Subscription</h2>
              <p className="text-lg text-text-muted mb-8">
                Building a resilient microbiome takes time. Our flexible subscription ensures you never miss a day of your protocol.
              </p>
              
              <div className="space-y-6">
                {subscriptionBenefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{benefit.title}</h4>
                      <p className="text-text-muted">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link to="/find-your-routine">Start Your Routine</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300 ${className || ''}`}>
      {children}
    </span>
  )
}
