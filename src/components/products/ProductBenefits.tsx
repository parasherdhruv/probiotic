import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Card, CardContent } from '~/components/ui/Card'
import { CheckCircle2 } from 'lucide-react'

const BENEFITS = [
  "Maintains healthy bowel function and regularity.",
  "Supports the digestion of lactose.",
  "Promotes a healthy immune system response.",
  "Helps ease occasional bloating and gas.",
  "Supports the gut-brain axis for mental clarity.",
  "Enhances nutrient absorption from your diet."
]

export function ProductBenefits() {
  return (
    <section className="section-padding bg-surface border-t border-border/50">
      <div className="container-app">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <AnimatedSection direction="left">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                What to expect.
              </h2>
              <p className="text-xl text-text-muted mb-8 leading-relaxed">
                Consistent daily use is key. While some experience digestive relief in days, systemic benefits build over 4-6 weeks as your microbiome ecosystem stabilizes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BENEFITS.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
          
          <div className="w-full lg:w-1/2">
            <AnimatedSection direction="right" delay={0.2}>
              <div className="aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
                  alt="Active lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </div>
    </section>
  )
}
