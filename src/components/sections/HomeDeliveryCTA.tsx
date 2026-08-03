import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { ArrowRight, Package } from 'lucide-react'

export function HomeDeliveryCTA() {
  return (
    <section className="section-padding bg-brand-50 dark:bg-brand-950/30 relative">
      <div className="container-app">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="left">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800" 
                  alt="Package delivery"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
          
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="right">
              <div className="w-16 h-16 bg-white dark:bg-neutral-900 rounded-2xl flex items-center justify-center text-brand-600 mb-8 shadow-sm">
                <Package className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Cold-shipped to your door.
              </h2>
              <p className="text-xl text-text-muted mb-8 leading-relaxed">
                We ensure peak potency by shipping our probiotics in temperature-controlled packaging right to your doorstep. Schedule a delivery today.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/home-delivery">
                  Schedule Home Delivery <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
