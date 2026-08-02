import { useProducts } from '~/services/products'
import { ProductCard } from '~/components/ui/ProductCard'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

export function ProductHighlights() {
  const { data: products, isLoading } = useProducts()

  if (isLoading || !products) {
    return (
      <section className="section-padding">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl bg-surface animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-app">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12" direction="up">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Targeted formulas.
            </h2>
            <p className="text-xl text-text-muted">
              Find the perfect strain combination for your specific wellness goals.
            </p>
          </div>
          <Button asChild variant="secondary" className="hidden md:flex">
            <Link to="/products">
              View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Button asChild variant="secondary" className="w-full">
            <Link to="/products">
              View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
