import type { Route } from './+types/compare'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { CompareTable } from '~/components/products/CompareTable'
import { fetchProducts, useProducts } from '~/services/products'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Compare Formulas | ${BRAND_NAME}` },
    { name: "description", content: "Compare our different probiotic formulations to find the perfect match for your gut health goals." },
  ]
}

export async function loader() {
  const products = await fetchProducts()
  return { products }
}

export default function Compare({ loaderData }: Route.ComponentProps) {
  const { data: products } = useProducts(loaderData.products)

  return (
    <div className="flex flex-col min-h-screen bg-bg-subtle pt-24 pb-32">
      <div className="container-app max-w-6xl">
        
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Compare Formulas.
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Every body is unique. Find the exact combination of clinically studied strains tailored to your specific wellness goals.
          </p>
        </AnimatedSection>

        {!products ? (
          <div className="h-[60vh] rounded-3xl bg-surface animate-pulse" />
        ) : (
          <AnimatedSection direction="up" delay={0.2}>
            <CompareTable products={products} />
          </AnimatedSection>
        )}
        
      </div>
    </div>
  )
}
