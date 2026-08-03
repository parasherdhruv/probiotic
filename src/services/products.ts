import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '~/lib/api'
import type { Product } from '~/types/content'

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'daily-core',
    name: 'Daily Core',
    tagline: 'Foundation for everyday gut health',
    price: 39.00,
    imageUrl: '/images/daily_core.png',
    tags: ['Best Seller', 'Gut Health'],
    cfu: '10 Billion'
  },
  {
    id: 'p2',
    slug: 'sport-recovery',
    name: 'Sport Recovery',
    tagline: 'Accelerated recovery & protein synthesis',
    price: 49.00,
    imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=600',
    tags: ['Fitness', 'High Potency'],
    cfu: '25 Billion'
  },
  {
    id: 'p3',
    slug: 'family-immunity',
    name: 'Family Immunity',
    tagline: 'Gentle support for all ages',
    price: 35.00,
    imageUrl: '/images/family_immunity.png',
    tags: ['Family', 'Immunity'],
    cfu: '5 Billion'
  }
]

export async function fetchProducts(): Promise<Product[]> {
  try {
    return await fetchApi<Product[]>('/api/v1/products')
  } catch (error) {
    console.log('Falling back to mock products data:', error instanceof Error ? error.message : String(error))
    await new Promise(resolve => setTimeout(resolve, 500))
    return MOCK_PRODUCTS
  }
}

export function useProducts(initialData?: Product[]) {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialData,
  })
}
