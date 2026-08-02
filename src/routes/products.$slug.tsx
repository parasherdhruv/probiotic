import { useParams, Navigate } from 'react-router'
import type { Route } from './+types/products.$slug'
import { BRAND_NAME } from '~/constants'
import { fetchProducts, useProducts } from '~/services/products'
import { ProductHero } from '~/components/products/ProductHero'
import { ProductIngredients } from '~/components/products/ProductIngredients'
import { ProductBenefits } from '~/components/products/ProductBenefits'
import { ProductReviews } from '~/components/products/ProductReviews'
import { StickyCartBar } from '~/components/products/StickyCartBar'

export function meta({ params }: Route.MetaArgs) {
  // In a real app we'd fetch the product details for the title
  return [
    { title: `Product Details | ${BRAND_NAME}` },
    { name: "description", content: "Detailed breakdown of our clinical-grade probiotic strains and benefits." },
  ]
}

export async function loader() {
  const products = await fetchProducts()
  return { products }
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { slug } = useParams()
  const { data: products } = useProducts(loaderData.products)

  if (!products) {
    return <Navigate to="/products" replace />
  }

  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-32 bg-surface items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-text-muted">The formula you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProductHero product={product} />
      <ProductIngredients product={product} />
      <ProductBenefits />
      <ProductReviews />
      <StickyCartBar product={product} />
    </div>
  )
}
