import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '~/components/ui/Card'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'
import type { Testimonial } from '~/types/content'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm transition-all duration-normal hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-6 md:p-8 flex flex-col h-full">
        <Quote className="w-10 h-10 text-brand-200 dark:text-brand-900 mb-6 opacity-50" />
        
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < testimonial.rating ? 'fill-accent-500 text-accent-500' : 'text-neutral-200 dark:text-neutral-800'}`} 
            />
          ))}
        </div>
        
        <blockquote className="text-lg text-text leading-relaxed mb-8 flex-grow">
          "{testimonial.quote}"
        </blockquote>
        
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
          {testimonial.avatarUrl && (
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <ResponsiveImage 
                src={testimonial.avatarUrl} 
                alt={testimonial.name}
                className="w-full h-full"
              />
            </div>
          )}
          <div>
            <div className="font-bold text-text">{testimonial.name}</div>
            <div className="text-sm text-text-muted">Verified Buyer</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
