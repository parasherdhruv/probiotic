import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Card, CardContent } from '~/components/ui/Card'
import { Dna, CheckCircle2 } from 'lucide-react'
import type { Product } from '~/types/content'

interface ProductIngredientsProps {
  product: Product
}

export function ProductIngredients({ product }: ProductIngredientsProps) {
  return (
    <section className="section-padding bg-bg-muted">
      <div className="container-app max-w-5xl">
        <AnimatedSection direction="up" className="text-center mb-16">
          <div className="w-16 h-16 bg-science-100 dark:bg-science-900/30 rounded-2xl flex items-center justify-center text-science-600 dark:text-science-400 mx-auto mb-6">
            <Dna className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Total transparency.
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            We don't hide behind proprietary blends. Every strain in {product.name} is clinically validated and explicitly listed.
          </p>
        </AnimatedSection>
        
        <AnimatedSection direction="up" delay={0.2}>
          <Card className="border-border/50 bg-surface/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              
              {/* Mobile View (Stacked) */}
              <div className="md:hidden flex flex-col divide-y divide-border">
                <div className="p-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                  <div className="font-semibold mb-1">Lactobacillus acidophilus</div>
                  <div className="text-sm text-text-muted mb-4">NCFM®</div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm uppercase tracking-wider text-text-muted font-semibold">CFU Count</span>
                    <span className="font-medium">5 Billion</span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">Supports nutrient absorption and helps reduce occasional bloating.</p>
                </div>
                
                <div className="p-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                  <div className="font-semibold mb-1">Bifidobacterium lactis</div>
                  <div className="text-sm text-text-muted mb-4">Bi-07®</div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm uppercase tracking-wider text-text-muted font-semibold">CFU Count</span>
                    <span className="font-medium">3 Billion</span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">Promotes healthy immune system function and respiratory health.</p>
                </div>
                
                <div className="p-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                  <div className="font-semibold mb-1">Lactobacillus rhamnosus</div>
                  <div className="text-sm text-text-muted mb-4">GG</div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm uppercase tracking-wider text-text-muted font-semibold">CFU Count</span>
                    <span className="font-medium">2 Billion</span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">The most clinically studied strain for overall digestive comfort.</p>
                </div>
              </div>

              {/* Desktop View (Table) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-neutral-50 dark:bg-neutral-900/50 text-sm uppercase tracking-wider text-text-muted">
                      <th className="p-6 font-semibold">Strain</th>
                      <th className="p-6 font-semibold">CFU Count</th>
                      <th className="p-6 font-semibold">Primary Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                      <td className="p-6">
                        <div className="font-semibold mb-1">Lactobacillus acidophilus</div>
                        <div className="text-sm text-text-muted">NCFM®</div>
                      </td>
                      <td className="p-6 font-medium">5 Billion</td>
                      <td className="p-6 text-text-muted">Supports nutrient absorption and helps reduce occasional bloating.</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                      <td className="p-6">
                        <div className="font-semibold mb-1">Bifidobacterium lactis</div>
                        <div className="text-sm text-text-muted">Bi-07®</div>
                      </td>
                      <td className="p-6 font-medium">3 Billion</td>
                      <td className="p-6 text-text-muted">Promotes healthy immune system function and respiratory health.</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                      <td className="p-6">
                        <div className="font-semibold mb-1">Lactobacillus rhamnosus</div>
                        <div className="text-sm text-text-muted">GG</div>
                      </td>
                      <td className="p-6 font-medium">2 Billion</td>
                      <td className="p-6 text-text-muted">The most clinically studied strain for overall digestive comfort.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm font-medium text-text-muted">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Vegan</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Non-GMO</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Gluten Free</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> No Artificial Fillers</div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
