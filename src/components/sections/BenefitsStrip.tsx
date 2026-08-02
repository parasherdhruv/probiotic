import { useRef } from 'react'
import { useBenefits } from '~/services/benefits'
import { BenefitCard } from '~/components/ui/BenefitCard'
import { AnimatedSection } from '~/components/motion/AnimatedSection'

export function BenefitsStrip() {
  const { data: benefits, isLoading } = useBenefits()

  if (isLoading || !benefits) {
    return (
      <section className="section-padding bg-bg-subtle">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-surface/50 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-bg-subtle relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="container-app relative z-10">
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            More than just digestion.
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Our multi-strain formula is designed to support your entire body by starting at the foundation: your gut.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
