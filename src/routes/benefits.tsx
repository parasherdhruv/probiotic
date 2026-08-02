import { useBenefits } from '~/services/benefits'
import { BenefitCard } from '~/components/ui/BenefitCard'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '~/lib/cn'

export default function BenefitsRoute() {
  const { data: benefits, isLoading } = useBenefits()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-brand-900 z-0" />
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-[150vw] max-w-[800px] h-[150vw] max-h-[800px] bg-brand-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
        <div className="absolute bottom-0 left-0 w-[120vw] max-w-[600px] h-[120vw] max-h-[600px] bg-brand-800/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 z-0" />
        
        <div className="container-app relative z-10 text-center text-white">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Total body health.<br/>Starts in the gut.
            </h1>
            <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto mb-10">
              Your microbiome influences nearly every system in your body. Discover how our multi-strain formula provides comprehensive support from immunity to mental clarity.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 bg-white text-brand-900 hover:bg-brand-50">
              <Link to="/products">Shop Formulas</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Grid Overview Section */}
      <section className="section-padding bg-muted border-b border-border">
        <div className="container-app">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Benefits Overview</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four primary pillars of health supported by our targeted probiotic strains.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-64 rounded-3xl bg-card animate-pulse" />
              ))
            ) : (
              benefits?.map((benefit, index) => (
                <BenefitCard key={benefit.id} benefit={benefit} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Deep Dive: Immune System */}
      <section className="section-padding">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="relative aspect-square rounded-3xl bg-muted overflow-hidden flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-brand-500/10" />
                <img 
                  src="/images/family_immunity.png" 
                  alt="Immune System visualization"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="left">
              <div className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-sm text-brand-600 dark:text-brand-400 mb-6">
                System 01: Immunity
              </div>
              <h2 className="text-4xl font-bold mb-6">70% of your immune system is in your gut.</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Your gut lining is the body's first line of defense. When your microbiome is out of balance, pathogens can slip through, triggering inflammation and illness. Our formulas reinforce this vital barrier.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Increases production of immune cells',
                  'Strengthens the intestinal mucosal barrier',
                  'Crowds out harmful pathogens and bad bacteria'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 mr-3 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant="secondary" asChild className="rounded-full">
                <Link to="/science">Read the clinical data <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Deep Dive: Gut-Brain Axis */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right" className="lg:order-2">
              <div className="relative aspect-square rounded-3xl bg-muted overflow-hidden flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-science-500/10" />
                <img 
                  src="/images/gut_brain_blog.png" 
                  alt="Gut-Brain Axis visualization"
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl"
                />
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="left" className="lg:order-1">
              <div className="inline-flex items-center rounded-full border border-science-500/20 bg-science-500/10 px-3 py-1 text-sm text-science-600 dark:text-science-400 mb-6">
                System 02: Neurology
              </div>
              <h2 className="text-4xl font-bold mb-6">The Gut-Brain Connection.</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Your gut produces approximately 90% of your body's serotonin. The vagus nerve creates a direct superhighway between your digestive tract and your brain, meaning gut health directly dictates mental health.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Reduces cortisol (the stress hormone) levels',
                  'Supports healthy serotonin and dopamine production',
                  'Reduces brain fog and improves daily mental clarity'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-science-500 mr-3 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant="secondary" asChild className="rounded-full">
                <Link to="/science">Explore Gut-Brain science <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  )
}
