import { useState, useMemo } from 'react'
import type { Route } from './+types/products'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { ProductFilter } from '~/components/products/ProductFilter'
import { ProductGrid } from '~/components/products/ProductGrid'
import { fetchProducts, useProducts } from '~/services/products'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Shop Probiotics | ${BRAND_NAME}` },
    { name: "description", content: "Explore our full range of science-backed probiotics targeted for gut health, fitness, and family wellness." },
  ]
}

export async function loader() {
  const products = await fetchProducts()
  return { products }
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { data: products } = useProducts(loaderData.products)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    if (!products) return []
    const allTags = products.flatMap(p => p.tags)
    return Array.from(new Set(allTags)).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    if (activeCategory === 'All') return products
    return products.filter(p => p.tags.includes(activeCategory))
  }, [products, activeCategory])

  return (
    <div className="flex flex-col min-h-screen bg-bg-subtle pt-24 pb-32">
      <div className="container-app">
        
        {/* Header */}
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Find your formula.
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Every body is different. Whether you're looking for foundational gut support, athletic recovery, or family immunity, we have a scientifically validated strain for you.
          </p>
        </AnimatedSection>

        {/* Filter */}
        {categories.length > 0 && (
          <AnimatedSection direction="up" delay={0.1}>
            <ProductFilter 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </AnimatedSection>
        )}

        {/* Grid */}
        <AnimatedSection direction="up" delay={0.2} className="min-h-[50vh]">
          <ProductGrid products={filteredProducts} />
          
          {filteredProducts.length === 0 && (
            <div className="text-center section-padding text-text-muted">
              No products found for this category.
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  )
}
