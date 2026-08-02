import { useState, useMemo } from 'react'
import type { Route } from './+types/search'
import { BRAND_NAME } from '~/constants'
import { useProducts } from '~/services/products'
import { useBlogPosts } from '~/services/blog'
import { Link } from 'react-router'
import { Search as SearchIcon, ArrowRight, Package, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '~/components/ui/Button'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Search | ${BRAND_NAME}` },
    { name: "description", content: "Search our formulations, science, and journal." },
  ]
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  
  // In a real app, this would hit a backend search endpoint or Algolia.
  // For now, we query our mock client-side services.
  const { data: products } = useProducts()
  const { data: posts } = useBlogPosts()

  const results = useMemo(() => {
    if (!query || query.length < 2) return []
    
    const searchLower = query.toLowerCase()
    const found: Array<{ type: 'product' | 'article', title: string, desc: string, link: string }> = []
    
    // Search Products
    products?.forEach((p: any) => {
      if (p.name.toLowerCase().includes(searchLower) || p.tagline.toLowerCase().includes(searchLower)) {
        found.push({
          type: 'product',
          title: p.name,
          desc: p.tagline,
          link: `/products/${p.slug}`
        })
      }
    })

    // Search Posts
    posts?.forEach((p: any) => {
      if (p.title.toLowerCase().includes(searchLower) || p.excerpt.toLowerCase().includes(searchLower)) {
        found.push({
          type: 'article',
          title: p.title,
          desc: p.excerpt,
          link: `/blog/${p.slug}`
        })
      }
    })

    return found
  }, [query, products, posts])

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Search Header */}
        <div className="mb-12">
          <Button variant="ghost" size="sm" asChild className="mb-8 rounded-full -ml-4">
            <Link to="/">← Back to Home</Link>
          </Button>
          
          <div className="relative group">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-text-muted transition-colors group-focus-within:text-brand-500" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search formulations, articles..."
              className="w-full bg-card border-2 border-border/50 text-2xl md:text-4xl py-6 pl-20 pr-8 rounded-3xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 transition-all placeholder:text-text-muted/50"
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {query.length > 0 && query.length < 2 ? (
              <motion.div 
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-text-muted py-12"
              >
                Keep typing...
              </motion.div>
            ) : query.length >= 2 && results.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-8 h-8 text-text-muted opacity-50" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-text-muted">We couldn't find anything matching "{query}".</p>
              </motion.div>
            ) : query.length >= 2 && results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-sm font-medium text-text-muted mb-6 px-4">
                  Found {results.length} {results.length === 1 ? 'result' : 'results'}
                </p>
                {results.map((result, i) => (
                  <motion.div
                    key={result.link}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      to={result.link}
                      className="block p-6 bg-card border border-border rounded-2xl hover:border-brand-500 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 group-hover:bg-brand-50 group-hover:border-brand-200 dark:group-hover:bg-brand-900/30 transition-colors">
                          {result.type === 'product' ? <Package className="w-5 h-5 text-brand-500" /> : <BookOpen className="w-5 h-5 text-brand-500" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-brand-600 transition-colors">{result.title}</h3>
                          <p className="text-text-muted line-clamp-2">{result.desc}</p>
                        </div>
                        <div className="shrink-0 mt-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-500">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h4 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-4">Quick Links</h4>
                  <ul className="space-y-3">
                    <li><Link to="/products" className="text-lg hover:text-brand-500 transition-colors">All Formulations</Link></li>
                    <li><Link to="/find-your-routine" className="text-lg hover:text-brand-500 transition-colors">Find Your Routine</Link></li>
                    <li><Link to="/science" className="text-lg hover:text-brand-500 transition-colors">Our Science</Link></li>
                  </ul>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h4 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-4">Popular Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Gut Health', 'Immunity', 'Sleep', 'Travel'].map(term => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-surface border border-border rounded-full hover:border-brand-500 hover:text-brand-600 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
