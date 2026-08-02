import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Card, CardContent } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { Check, Minus, ShoppingCart } from 'lucide-react'
import type { Product } from '~/types/content'
import { Link } from 'react-router'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'

interface CompareTableProps {
  products: Product[]
}

export function CompareTable({ products }: CompareTableProps) {
  // Take up to 3 products for comparison
  const compareList = products.slice(0, 3)
  
  if (compareList.length === 0) return null

  return (
    <Card className="border-border/50 bg-surface/80 backdrop-blur-sm overflow-hidden shadow-xl">
      <CardContent className="p-0">
        
        {/* Mobile View (Stacked Cards) */}
        <div className="md:hidden flex flex-col divide-y divide-border/50">
          {compareList.map(product => (
            <div key={product.id} className="p-6">
              <div className="w-full aspect-[4/3] rounded-xl mb-4 overflow-hidden">
                <ResponsiveImage 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full"
                />
              </div>
              <h4 className="text-xl font-bold">{product.name}</h4>
              <p className="text-lg font-medium text-text-muted mb-6">₹{product.price}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-text-muted">Target</span>
                  <span className="font-semibold">{product.tags[0] || 'Everyone'}</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-text-muted">CFU</span>
                  <span className="font-semibold">{product.cfu}</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-text-muted">Delayed Release</span>
                  <Check className="w-5 h-5 text-brand-500" />
                </div>
              </div>
              
              <Button asChild className="w-full" variant={product.slug === 'daily-core' ? 'primary' : 'secondary'}>
                <Link to={`/products/${product.slug}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop View (Traditional Table) */}
        <div className="hidden md:block overflow-x-auto">
        <div className="overflow-x-auto w-full pb-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-neutral-50 dark:bg-neutral-900/50">
                <th className="p-6 w-1/4">
                  <h3 className="text-xl font-bold">Compare Formulas</h3>
                  <p className="text-sm text-text-muted font-normal mt-1">Find the right fit for your body.</p>
                </th>
                {compareList.map(product => (
                  <th key={product.id} className="p-6 w-1/4 align-top">
                    <div className="w-full aspect-[4/3] rounded-xl mb-4 overflow-hidden">
                      <ResponsiveImage 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full"
                      />
                    </div>
                    <h4 className="text-lg font-bold">{product.name}</h4>
                    <p className="text-xl font-medium mt-1 mb-4">₹{product.price}</p>
                    <Button asChild className="w-full" variant={product.slug === 'daily-core' ? 'primary' : 'secondary'}>
                      <Link to={`/products/${product.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-center">
              
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                <td className="p-6 text-left font-semibold text-text-muted">Target Audience</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 font-medium">
                    {p.tags[0] || 'Everyone'}
                  </td>
                ))}
              </tr>
              
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                <td className="p-6 text-left font-semibold text-text-muted">CFU Count</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6 font-medium">
                    {p.cfu}
                  </td>
                ))}
              </tr>
              
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                <td className="p-6 text-left font-semibold text-text-muted">Strains</td>
                {compareList.map((p, i) => (
                  <td key={p.id} className="p-6 font-medium">
                    {10 + i * 2} Clinically Studied
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                <td className="p-6 text-left font-semibold text-text-muted">Delayed Release Capsule</td>
                {compareList.map(p => (
                  <td key={p.id} className="p-6">
                    <Check className="w-6 h-6 text-brand-500 mx-auto" />
                  </td>
                ))}
              </tr>
              
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                <td className="p-6 text-left font-semibold text-text-muted">Prebiotic Blend Included</td>
                {compareList.map((p, i) => (
                  <td key={p.id} className="p-6">
                    {i === 1 ? (
                      <Check className="w-6 h-6 text-brand-500 mx-auto" />
                    ) : (
                      <Minus className="w-6 h-6 text-neutral-300 dark:text-neutral-700 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              
            </tbody>
          </table>
        </div>
        </div>
      </CardContent>
    </Card>
  )
}
