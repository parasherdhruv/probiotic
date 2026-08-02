import { Suspense, lazy } from 'react'
import type { Route } from './+types/home'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { AudienceSelector } from '~/components/sections/AudienceSelector'
import { BenefitsStrip } from '~/components/sections/BenefitsStrip'
import { ScienceStory } from '~/components/sections/ScienceStory'
import { ProductHighlights } from '~/components/sections/ProductHighlights'
import { TestimonialsCarousel } from '~/components/sections/TestimonialsCarousel'
import { FAQPreview } from '~/components/sections/FAQPreview'
import { StoreLocatorCTA } from '~/components/sections/StoreLocatorCTA'
import { HomeDeliveryCTA } from '~/components/sections/HomeDeliveryCTA'
import { BlogPreview } from '~/components/sections/BlogPreview'
import { NewsletterSignup } from '~/components/sections/NewsletterSignup'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${BRAND_NAME} | Advanced Probiotic Formulations` },
    { name: "description", content: "Science-backed probiotics for gut health, fitness recovery, and family wellness." },
  ]
}

// Lazy load the Hero 3D scene to ensure it doesn't cause SSR hydration mismatches
// The 3D canvas is inherently client-side only
const Hero3DScene = lazy(() => import('~/components/three/Hero3DScene').then(m => ({ default: m.Hero3DScene })))

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 
        HERO SECTION (Above the Fold)
        The container provides a minimum height. The Hero3DScene handles its own
        tier-gated logic internally (showing 3D, simplified 3D, or static fallback).
      */}
      <section className="relative w-full h-[120vh] bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
        {/* Client-only 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
              {/* Optional: Add a subtle loading spinner or logo here */}
            </div>
          }>
            <Hero3DScene />
          </Suspense>
        </div>

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="container-app h-screen flex flex-col justify-center">
            <div className="max-w-3xl pointer-events-auto">
              <AnimatedSection direction="up" delay={0.2} amount={0.1}>
                <div className="inline-flex items-center rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50/80 dark:bg-brand-900/50 backdrop-blur-md px-3 py-1 text-sm text-brand-600 dark:text-brand-400 mb-6 font-medium shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
                  Next-generation formulation
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6">
                  Your Gut. <br className="hidden md:block" />
                  Your Strength.
                </h1>
                
                <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-2xl mb-8 leading-relaxed">
                  Science-backed probiotics engineered for total body wellness, from digestion to immunity.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="h-14 px-8 text-base shadow-brand-500/25 shadow-lg">
                    <Link to="/find-your-routine">
                      Find Your Routine
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-800 border-border/50">
                    <Link to="/products">Explore Products</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center opacity-50 animate-bounce">
          <span className="text-xs font-medium uppercase tracking-widest mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>
      
      {/* 
        TRUST BAR (Fold transition) 
      */}
      <section className="relative z-20 bg-card border-y border-border py-8">
        <div className="container-app">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-center">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">10B+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Live CFU</div>
            </AnimatedSection>
            
            <div className="w-px h-12 bg-border hidden md:block"></div>
            
            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">14</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Targeted Strains</div>
            </AnimatedSection>
            
            <div className="w-px h-12 bg-border hidden md:block"></div>
            
            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">100%</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Survivability</div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AUDIENCE SELECTOR */}
      <section className="py-12 bg-muted border-b border-border">
        <div className="container-app text-center">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">I'm looking for support with:</h3>
          <AudienceSelector />
        </div>
      </section>

      <BenefitsStrip />
      <ScienceStory />
      <ProductHighlights />
      <HomeDeliveryCTA />
      <TestimonialsCarousel />
      <StoreLocatorCTA />
      <FAQPreview />
      <BlogPreview />
      <NewsletterSignup />
    </div>
  )
}
