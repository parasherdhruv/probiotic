import { useRef } from 'react'
import { gsap, ScrollTrigger } from '~/lib/gsap'
import { useGSAP } from '@gsap/react'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { Microscope, Beaker, Dna } from 'lucide-react'

const STORY_PANELS = [
  {
    id: 's1',
    title: 'Clinically Studied Strains',
    description: 'We don\'t just throw random bacteria into a capsule. Every strain is chosen based on peer-reviewed, double-blind clinical trials.',
    icon: Microscope,
    color: 'bg-science-500'
  },
  {
    id: 's2',
    title: 'Targeted Delivery',
    description: 'Probiotics are useless if stomach acid destroys them. Our delayed-release capsules ensure 100% survivability to the lower intestine.',
    icon: Beaker,
    color: 'bg-brand-500'
  },
  {
    id: 's3',
    title: 'Microbiome Precision',
    description: 'By mapping the gut microbiome, we formulate ratios that work synergistically rather than competitively.',
    icon: Dna,
    color: 'bg-accent-500'
  }
]

export function ScienceStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // We only want this effect on desktop where there's room to pin side-by-side
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const container = containerRef.current
      const leftCol = leftColRef.current
      
      if (!container || !leftCol) return

      // Pin the left column while the right column scrolls
      ScrollTrigger.create({
        trigger: container,
        start: 'top top+=100',
        end: 'bottom bottom',
        pin: leftCol,
        pinSpacing: false,
        anticipatePin: 1
      })

      // Animate the icons in the pinned section based on scroll progress of the panels
      const panels = gsap.utils.toArray('.story-panel') as HTMLElement[]
      
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(`.story-icon-${i}`, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' })
            gsap.to(`.story-icon:not(.story-icon-${i})`, { scale: 0.8, opacity: 0.3, duration: 0.4 })
          },
          onEnterBack: () => {
            gsap.to(`.story-icon-${i}`, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' })
            gsap.to(`.story-icon:not(.story-icon-${i})`, { scale: 0.8, opacity: 0.3, duration: 0.4 })
          }
        })
      })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="section-padding bg-neutral-950 text-white relative">
      <div className="container-app">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Left Column (Pinned on Desktop) */}
          <div className="lg:w-1/2 relative">
            <div ref={leftColRef} className="lg:h-[calc(100vh-200px)] flex flex-col justify-center">
              <AnimatedSection direction="up" className="mb-8">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-science-400 mb-6">
                  Science-First Approach
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Formulated for <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-science-400 to-brand-400">
                    maximum impact.
                  </span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-lg mb-8">
                  The wellness industry is full of marketing fluff. We prefer clinical data, targeted delivery, and transparent sourcing.
                </p>
                <Button asChild variant="secondary" className="border-white/20 text-white hover:bg-white hover:text-black">
                  <Link to="/science">Read the Clinical Data</Link>
                </Button>
              </AnimatedSection>
              
              {/* Visual Indicators for Desktop Pinning */}
              <div className="hidden lg:flex gap-4 mt-12 relative h-16">
                {STORY_PANELS.map((panel, i) => {
                  const Icon = panel.icon
                  return (
                    <div 
                      key={`icon-${i}`} 
                      className={`story-icon story-icon-${i} absolute left-${i * 16} w-12 h-12 rounded-full ${panel.color} flex items-center justify-center`}
                      style={{ opacity: i === 0 ? 1 : 0.3, transform: i === 0 ? 'scale(1)' : 'scale(0.8)', left: `${i * 64}px` }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column (Scrolling content) */}
          <div ref={rightColRef} className="lg:w-1/2 flex flex-col gap-24 lg:pt-32 lg:pb-64">
            {STORY_PANELS.map((panel, i) => {
              const Icon = panel.icon
              return (
                <div key={panel.id} className="story-panel min-h-[50vh] flex flex-col justify-center">
                  <div className={`w-16 h-16 rounded-2xl ${panel.color} flex items-center justify-center mb-6 lg:hidden`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">{panel.title}</h3>
                  <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
                    {panel.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
