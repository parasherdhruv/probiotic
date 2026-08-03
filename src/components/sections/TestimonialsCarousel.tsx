import { useTestimonials } from '~/services/testimonials'
import { TestimonialCard } from '~/components/ui/TestimonialCard'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/Button'

export function TestimonialsCarousel() {
  const { data: testimonials, isLoading } = useTestimonials()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  if (isLoading || !testimonials || testimonials.length === 0) {
    return (
      <section className="section-padding bg-bg-muted">
        <div className="container-app max-w-4xl">
          <div className="h-96 rounded-3xl bg-surface animate-pulse" />
        </div>
      </section>
    )
  }

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    let newIndex = currentIndex + newDirection
    if (newIndex < 0) newIndex = testimonials.length - 1
    if (newIndex >= testimonials.length) newIndex = 0
    setCurrentIndex(newIndex)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section className="section-padding bg-bg-muted overflow-hidden relative">
      <div className="container-app max-w-5xl">
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Don't just take our word for it.
          </h2>
          <p className="text-xl text-text-muted">
            Hear from people who transformed their health from the inside out.
          </p>
        </AnimatedSection>
        
        <div className="relative h-[400px] max-w-3xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <TestimonialCard testimonial={testimonials[currentIndex]!} />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)} 
              className="rounded-full bg-white dark:bg-neutral-900 shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-12 h-12"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(1)} 
              className="rounded-full bg-white dark:bg-neutral-900 shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-800 w-12 h-12"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1)
                setCurrentIndex(i)
              }}
              className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? 'bg-brand-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
