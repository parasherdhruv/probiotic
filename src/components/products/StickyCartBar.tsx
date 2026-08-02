import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/Button'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '~/types/content'

interface StickyCartBarProps {
  product: Product
}

export function StickyCartBar({ product }: StickyCartBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past the main hero add-to-cart button (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
        >
          <div className="container-app max-w-4xl">
            <div className="bg-surface/80 dark:bg-neutral-900/90 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 flex items-center justify-between pointer-events-auto">
              
              <div className="flex items-center gap-4 hidden sm:flex">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-bold">{product.name}</div>
                  <div className="text-sm text-text-muted">₹{product.price} / month</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="sm:hidden font-bold">
                  ₹{product.price}
                </div>
                <Button size="lg" className="shadow-lg shadow-brand-500/20 whitespace-nowrap">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
