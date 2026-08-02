import type { Route } from './+types/testimonials'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { useTestimonials } from '~/services/testimonials'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'
import { Badge } from '~/components/ui/Badge'
import { Star, MessageSquareQuote } from 'lucide-react'
import { motion } from 'motion/react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Wall of Love | ${BRAND_NAME}` },
    { name: "description", content: "See what our community is saying about the impact of precision probiotics." },
  ]
}

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials()

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-surface">
      <div className="container-app">
        
        <AnimatedSection direction="up" className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <Badge variant="outline" className="mb-6 bg-brand-50/50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-800">
            Real Stories
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            Wall of Love
          </h1>
          <p className="text-lg text-text-muted text-pretty">
            Don't just take our word for it. Here is what athletes, professionals, and wellness enthusiasts are saying about {BRAND_NAME}.
          </p>
        </AnimatedSection>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
                className="break-inside-avoid"
              >
                <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-brand-300/50 transition-all duration-500 group relative overflow-hidden">
                  
                  {/* Subtle quote icon background */}
                  <MessageSquareQuote className="absolute -top-4 -right-4 w-24 h-24 text-brand-500/5 dark:text-brand-400/5 group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-border'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-lg leading-relaxed text-foreground/90 mb-8 font-medium">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    {testimonial.avatarUrl ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-border/50 shrink-0">
                        <ResponsiveImage 
                          src={testimonial.avatarUrl} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{testimonial.name}</span>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Verified Buyer
                      </span>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  )
}
// Need to add Badge to imports
