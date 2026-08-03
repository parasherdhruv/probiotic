import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { TestimonialCard } from '~/components/ui/TestimonialCard'
import { useTestimonials } from '~/services/testimonials'

export function ProductReviews() {
  const { data: testimonials, isLoading } = useTestimonials()

  if (isLoading || !testimonials) return null

  return (
    <section className="section-padding bg-bg-muted border-t border-border/50">
      <div className="container-app max-w-6xl">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Real results.
          </h2>
          <p className="text-xl text-text-muted">
            See what others are saying about their journey.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} direction="up" delay={i * 0.1}>
              <TestimonialCard testimonial={t} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
