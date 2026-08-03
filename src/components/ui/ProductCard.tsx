import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { Badge } from '~/components/ui/Badge'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'
import type { Product } from '~/types/content'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link to={`/products/${product.slug}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
        <Card className="h-full overflow-hidden border-border/50 bg-surface/50 backdrop-blur-sm transition-all duration-normal group-hover:shadow-xl group-hover:border-brand-300/50 flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
              <ResponsiveImage
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Content */}
          <CardContent className="flex flex-col flex-grow p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold tracking-tight">{product.name}</h3>
              <span className="font-semibold text-lg text-text-muted">
                ₹{product.price}
              </span>
            </div>
            <p className="text-text-muted mb-4">{product.tagline}</p>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-text-muted font-semibold">Potency</span>
                <span className="text-sm font-medium">{product.cfu} CFU</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
