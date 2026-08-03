import { useState } from 'react'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { cn } from '~/lib/cn'

interface ProductFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function ProductFilter({ categories, activeCategory, onCategoryChange }: ProductFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      <button
        onClick={() => onCategoryChange('All')}
        className={cn(
          "px-6 py-2.5 rounded-full text-sm font-medium transition-colors border",
          activeCategory === 'All'
            ? "bg-brand-900 border-brand-900 text-white dark:bg-brand-100 dark:border-brand-100 dark:text-brand-950"
            : "bg-transparent border-border hover:border-brand-300 text-text-muted hover:text-text"
        )}
      >
        All Formulas
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-medium transition-colors border",
            activeCategory === category
              ? "bg-brand-900 border-brand-900 text-white dark:bg-brand-100 dark:border-brand-100 dark:text-brand-950"
              : "bg-transparent border-border hover:border-brand-300 text-text-muted hover:text-text"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
