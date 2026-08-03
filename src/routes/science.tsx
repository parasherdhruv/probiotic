import { useRef } from 'react'
import { useClinicalStudies, useStrainProfiles } from '~/services/science'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Microscope, Beaker, Dna, FileText, ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '~/lib/gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router'

export default function ScienceRoute() {
  const { data: studies, isLoading: studiesLoading } = useClinicalStudies()
  const { data: strains, isLoading: strainsLoading } = useStrainProfiles()
  const containerRef = useRef<HTMLDivElement>(null)

  // Subtle parallax effect for background elements
  useGSAP(() => {
    gsap.to('.science-parallax', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      
      {/* Hero */}
      <section className="relative section-padding overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-science-900/40 via-neutral-950 to-neutral-950 z-0" />
        
        {/* Parallax background molecules */}
        <div className="science-parallax absolute top-20 right-20 w-64 h-64 border border-science-500/20 rounded-full opacity-50 z-0" />
        <div className="science-parallax absolute bottom-20 left-20 w-96 h-96 border border-brand-500/20 rounded-full opacity-50 z-0 delay-100" />
        
        <div className="container-app relative z-10 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center rounded-full border border-science-500/30 bg-science-500/10 px-4 py-1.5 text-sm font-medium text-science-400 mb-8 backdrop-blur-md">
              <Microscope className="w-4 h-4 mr-2" /> Peer-Reviewed Research
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Driven by data.<br/>Backed by science.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-10">
              We partnered with leading gastroenterologists and neuroscientists to engineer a formula with 100% survivability and clinically proven efficacy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The 100% Survivability Claim */}
      <section className="section-padding bg-card border-b border-border">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <h2 className="text-4xl font-bold mb-6">The 100% Survivability Guarantee.</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Most probiotics are destroyed by stomach acid within 15 minutes of ingestion. By the time they reach your intestine, they are completely dead.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our proprietary delayed-release vegan capsule is engineered to withstand gastric acid for up to 60 minutes. It does not begin dissolving until it reaches the neutral pH of the lower intestine—exactly where your microbiome needs it.
              </p>
              
              <div className="flex gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-brand-500 mb-1">0%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Stomach Dissolve</div>
                </div>
                <div className="w-px bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-science-500 mb-1">100%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Intestinal Delivery</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="aspect-square bg-muted rounded-3xl p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-science-500/5" />
                <div className="relative z-10 w-full max-w-sm">
                  {/* Simplified graphical representation of survivability */}
                  <div className="w-full h-12 bg-background rounded-full mb-4 border border-border flex items-center p-2 relative shadow-inner">
                    <div className="absolute left-4 text-sm font-semibold text-muted-foreground z-10">Standard Probiotics</div>
                    <div className="h-full bg-destructive/20 w-[15%] rounded-full"></div>
                  </div>
                  <div className="w-full h-12 bg-background rounded-full border border-border flex items-center p-2 relative shadow-inner">
                    <div className="absolute left-4 text-sm font-semibold text-foreground z-10">Lastly Delayed-Release</div>
                    <div className="h-full bg-brand-500 w-[100%] rounded-full shadow-glow"></div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Strain Breakdown */}
      <section className="section-padding bg-muted border-b border-border">
        <div className="container-app">
          <AnimatedSection className="text-center mb-16">
            <Dna className="w-12 h-12 text-science-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Precision Microbiome Strains</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every strain in our formula was selected based on targeted clinical outcomes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strainsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-card rounded-2xl animate-pulse" />
              ))
            ) : (
              strains?.map((strain, index) => (
                <AnimatedSection key={strain.id} delay={index * 0.1} direction="up">
                  <div className="bg-card rounded-2xl p-8 shadow-sm border border-border h-full flex flex-col hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-science-500/10 flex items-center justify-center mb-6">
                      <Microscope className="w-6 h-6 text-science-600 dark:text-science-400" />
                    </div>
                    <h3 className="text-xl font-bold italic mb-3">{strain.name}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{strain.description}</p>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Targeted Benefits</div>
                      {strain.benefits.map((benefit, i) => (
                        <div key={i} className="text-sm font-medium flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-science-500 mr-2" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Clinical Studies Library */}
      <section className="section-padding bg-background">
        <div className="container-app max-w-4xl">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Clinical Research Library</h2>
            <p className="text-muted-foreground">Peer-reviewed studies supporting our formulation.</p>
          </AnimatedSection>

          <div className="space-y-6">
            {studiesLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
              ))
            ) : (
              studies?.map((study, index) => (
                <AnimatedSection key={study.id} delay={index * 0.1} direction="up">
                  <div className="p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-science-500/50 transition-colors group">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      <div className="shrink-0 pt-1">
                        <FileText className="w-8 h-8 text-science-500/50 group-hover:text-science-500 transition-colors" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-science-600 dark:text-science-400 uppercase tracking-wide">
                            {study.journal}
                          </span>
                          <span className="text-sm text-muted-foreground">• {study.year}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-science-600 dark:group-hover:text-science-400 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {study.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-900 text-white text-center">
        <div className="container-app">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-6">Ready to optimize your microbiome?</h2>
            <p className="text-xl text-brand-100 max-w-2xl mx-auto mb-10">
              Experience the difference of a scientifically formulated, targeted probiotic.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 bg-white text-brand-900 hover:bg-brand-50">
              <Link to="/products">Shop Daily Core</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
