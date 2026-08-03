import { useEffect, useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router'
import { cn } from '~/lib/cn'
import { gsap, ScrollTrigger } from '~/lib/gsap'
import { Button } from '~/components/ui/Button'
import { useDeviceTier } from '~/hooks/useDeviceTier'
import { track } from '~/analytics/track'

// Lazy load the 3D scene to prevent @react-three/fiber from crashing SSR (React 19 issue)
const Hero3DScene = lazy(() => import('~/components/three/Hero3DScene').then(m => ({ default: m.Hero3DScene })))

export function HeroSection() {
  const tier = useDeviceTier()
  const overlayRef = useRef<HTMLDivElement>(null)
  
  // The scroll proxy element that drives the 3D camera
  const proxyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax fade on the text overlay as user scrolls down
    if (!overlayRef.current) return
    
    const trigger = ScrollTrigger.create({
      trigger: overlayRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(overlayRef.current, {
        opacity: 0,
        y: -100,
        ease: 'none',
      })
    })

    return () => trigger.kill()
  }, [])

  return (
    <section className="relative">
      
      {/* 
        1. Scroll Proxy 
      */}
      <div id="hero-scroll-proxy" ref={proxyRef} className="h-[300vh]" />

      {/* 
        2. Sticky Container
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* 
          3. Background / 3D Layer 
        */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          {(!tier || tier === 'C') && (
            <img 
              src="/images/hero-poster.png" 
              alt="Premium Probiotic" 
              className="h-full w-full object-cover opacity-80"
            />
          )}
          {tier && tier !== 'C' && (
            <Suspense fallback={null}>
              <Hero3DScene />
            </Suspense>
          )}
        </div>

        {/* 
          4. Content Overlay Layer
          Sits above the 3D scene, fades out on scroll.
        */}
        <div 
          ref={overlayRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
        >
          {/* Tagline */}
          <span className="mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
            Next Generation Gut Health
          </span>
          
          {/* Kinetic Headline */}
          <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
            Science that works <br className="hidden sm:block" />
            <span className="text-brand-400">for your body.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-lg text-neutral-300 sm:text-xl">
            Clinically proven strains delivered alive. Designed to optimize immunity, digestion, and daily performance.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button 
              size="xl" 
              asChild
              onClick={() => track('hero_cta_primary_clicked')}
            >
              <Link to="/find-your-routine">Find Your Routine</Link>
            </Button>
            <Button 
              size="xl" 
              variant="secondary" 
              asChild
              className="border-white/30 text-white hover:bg-white/10 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
              onClick={() => track('hero_cta_secondary_clicked')}
            >
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
