import { motion } from 'motion/react'
import * as LucideIcons from 'lucide-react'
import { Card, CardHeader, CardContent } from '~/components/ui/Card'
import type { Benefit } from '~/types/content'

interface BenefitCardProps {
  benefit: Benefit
  index?: number
}

export function BenefitCard({ benefit, index = 0 }: BenefitCardProps) {
  // Dynamically resolve icon from Lucide, fallback to Sparkles if not found
  const Icon = (LucideIcons as any)[benefit.icon] || LucideIcons.Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm hover:border-brand-300/50 transition-colors duration-normal">
        <CardHeader className="pb-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4 dark:bg-brand-900/30 dark:text-brand-400">
            <Icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{benefit.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-text-muted leading-relaxed">{benefit.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
