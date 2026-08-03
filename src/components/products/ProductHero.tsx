import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Badge } from '~/components/ui/Badge'
import { ShoppingCart, Star, Info } from 'lucide-react'
import type { Product } from '~/types/content'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'

interface ProductHeroProps {
  product: Product
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-50/50 dark:bg-brand-950/20 -skew-x-12 origin-top-right transform translate-x-1/4 pointer-events-none" />
      
      <div className="container-app relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <AnimatedSection direction="left">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-border/50 shadow-2xl relative">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <ResponsiveImage 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full"
                />
              </div>
            </AnimatedSection>
          </div>
          
          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex items-center gap-2 mb-4 text-brand-600 dark:text-brand-400">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">124 Reviews</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>
              
              <p className="text-2xl text-text-muted mb-8">
                {product.tagline}
              </p>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold">₹{product.price}</span>
                <span className="text-text-muted">/ One-time purchase</span>
              </div>
              
              <div className="flex flex-col gap-4 mb-10">
                <Button size="lg" className="h-14 text-lg w-full md:w-auto shadow-brand-500/25 shadow-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Info className="w-4 h-4" />
                  <span>Free shipping on orders over ₹1000. 30-day money-back guarantee.</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
                <div>
                  <div className="text-sm text-text-muted uppercase tracking-wider font-semibold mb-1">Potency</div>
                  <div className="text-lg font-medium">{product.cfu} CFU</div>
                </div>
                <div>
                  <div className="text-sm text-text-muted uppercase tracking-wider font-semibold mb-1">Supply</div>
                  <div className="text-lg font-medium">30 Capsules</div>
                </div>
                <div>
                  <div className="text-sm text-text-muted uppercase tracking-wider font-semibold mb-1">Form</div>
                  <div className="text-lg font-medium">Delayed-release</div>
                </div>
                <div>
                  <div className="text-sm text-text-muted uppercase tracking-wider font-semibold mb-1">Storage</div>
                  <div className="text-lg font-medium">Shelf-stable</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </div>
    </section>
  )
}
