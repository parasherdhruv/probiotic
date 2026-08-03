import type { Route } from './+types/about'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { CheckCircle2, ShieldCheck, Microscope } from 'lucide-react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `About Us | ${BRAND_NAME}` },
    { name: "description", content: "Learn about our mission to redefine wellness through precision probiotics." },
  ]
}

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      
      {/* Hero Section */}
      <section className="container-app mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <AnimatedSection direction="up" className="order-2 lg:order-1">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
              Redefining wellness from the inside out.
            </h1>
            <p className="text-xl text-text-muted leading-relaxed mb-8 text-pretty">
              We started {BRAND_NAME} because we were tired of generic supplements making bold claims with zero clinical backing. We believe true health starts in the gut, and precision matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg" asChild>
                <Link to="/products">Shop the Science</Link>
              </Button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="left" delay={0.2} className="order-1 lg:order-2">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900 border border-border/50">
              <ResponsiveImage 
                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1200" 
                alt="Scientists in a modern lab"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent mix-blend-overlay" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-surface py-24 md:py-32 border-y border-border">
        <div className="container-app">
          <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Our Core Philosophy
            </h2>
            <p className="text-lg text-text-muted">
              We don't do "proprietary blends". We use clinically validated strains at dosages proven to work in human trials.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="bg-card p-8 rounded-3xl border border-border/50 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
                  <Microscope className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Strain Specificity</h3>
                <p className="text-text-muted">
                  Not all probiotics are the same. We select strains right down to the genomic level, ensuring they target your specific health needs.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-card p-8 rounded-3xl border border-border/50 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Guaranteed Survivability</h3>
                <p className="text-text-muted">
                  Using advanced delayed-release capsules, we ensure 100% of our CFUs survive stomach acid to reach your lower intestine alive.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={0.3}>
              <div className="bg-card p-8 rounded-3xl border border-border/50 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Third-Party Tested</h3>
                <p className="text-text-muted">
                  Every batch is rigorously tested for identity, purity, and potency by an independent, ISO-certified laboratory.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="relative h-[60vh] min-h-[500px]">
        <ResponsiveImage 
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000"
          alt="Active lifestyle"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <AnimatedSection direction="up">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl text-balance tracking-tight">
              A balanced gut is the foundation of a balanced life.
            </h2>
            <Button size="lg" variant="primary" className="rounded-full h-14 px-10 text-lg bg-white text-neutral-950 hover:bg-neutral-200" asChild>
              <Link to="/find-your-routine">Find Your Routine</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
