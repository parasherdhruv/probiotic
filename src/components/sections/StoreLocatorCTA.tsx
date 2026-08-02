import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { ArrowRight, MapPin } from 'lucide-react'

export function StoreLocatorCTA() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-100 dark:bg-neutral-900 -skew-x-12 origin-top-right transform translate-x-1/4 pointer-events-none" />
      
      <div className="container-app relative z-10">
        <div className="max-w-4xl flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-square rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative border-8 border-surface shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600" 
                alt="Retail store interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm shadow-brand-500/50">
                  <MapPin className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="up">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Find us locally.
              </h2>
              <p className="text-xl text-text-muted mb-8 leading-relaxed">
                Lastly is available in select pharmacies and premium wellness stores nationwide. Enter your pincode to find the nearest authorized retailer.
              </p>
              <Button asChild size="lg">
                <Link to="/stores">
                  Find a Store near you <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
