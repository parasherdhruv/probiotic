import { useBlogPosts } from '~/services/blog'
import { BlogCard } from '~/components/ui/BlogCard'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { Button } from '~/components/ui/Button'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

export function BlogPreview() {
  const { data: posts, isLoading } = useBlogPosts()

  if (isLoading || !posts) {
    return (
      <section className="section-padding bg-surface">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-surface">
      <div className="container-app">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12" direction="up">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Latest from the journal.
            </h2>
            <p className="text-xl text-text-muted">
              Deep dives into microbiome research, wellness routines, and brand news.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex text-brand-600 hover:text-brand-700 hover:bg-brand-50">
            <Link to="/blog">
              View All Articles <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Button asChild variant="ghost" className="w-full text-brand-600 hover:text-brand-700 hover:bg-brand-50">
            <Link to="/blog">
              View All Articles <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
