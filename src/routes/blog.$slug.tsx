import { useParams, Navigate, Link } from 'react-router'
import type { Route } from './+types/blog.$slug'
import { BRAND_NAME } from '~/constants'
import { fetchBlogPosts, useBlogPosts } from '~/services/blog'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'
import { Badge } from '~/components/ui/Badge'
import { Button } from '~/components/ui/Button'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { ArrowLeft, Share2, Mail } from 'lucide-react'

export function meta({ params }: Route.MetaArgs) {
  // Real app: fetch article dynamically for title
  return [
    { title: `Journal | ${BRAND_NAME}` },
    { name: "description", content: "Science-backed insights on the microbiome." },
  ]
}

export async function loader() {
  const posts = await fetchBlogPosts()
  return { posts }
}

export default function BlogPostDetail({ loaderData }: Route.ComponentProps) {
  const { slug } = useParams()
  const { data: posts } = useBlogPosts(loaderData.posts)

  if (!posts) {
    return <Navigate to="/blog" replace />
  }

  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-32 bg-surface items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-text-muted mb-8">The journal entry you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/blog">Return to Journal</Link>
        </Button>
      </div>
    )
  }

  return (
    <article className="flex flex-col min-h-screen bg-surface pt-24 pb-32">
      <div className="container-app">
        
        {/* Back link */}
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
          </Link>
        </div>
        
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-12 text-center">
          <AnimatedSection direction="up">
            <Badge variant="outline" className="mb-6 bg-brand-50/50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-800">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-balance leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
              <div className="font-semibold text-foreground">{post.author}</div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div>{post.date}</div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div>{post.readTime}</div>
            </div>
          </AnimatedSection>
        </header>
        
        {/* Hero Image */}
        <AnimatedSection direction="up" delay={0.1}>
          <div className="max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl">
            <ResponsiveImage 
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full"
            />
          </div>
        </AnimatedSection>
        
        {/* Content Body */}
        <div className="max-w-prose mx-auto">
          <AnimatedSection direction="up" delay={0.2}>
            
            <div className="prose prose-lg dark:prose-invert prose-brand mx-auto">
              <p className="lead text-xl md:text-2xl text-text-muted mb-10 text-pretty font-medium leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Fake Content Renderer */}
              {post.content.map((paragraph, idx) => (
                <div key={idx}>
                  <p className="text-lg leading-relaxed text-foreground/90 mb-8">
                    {paragraph}
                  </p>
                  
                  {/* Inject Newsletter inline halfway through */}
                  {idx === Math.floor(post.content.length / 2) && (
                    <aside className="my-12 p-8 rounded-3xl bg-brand-50 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900 text-center shadow-lg relative overflow-hidden not-prose">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
                      <div className="relative z-10">
                        <Mail className="w-8 h-8 text-brand-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2 text-foreground">Advanced Insights, Delivered.</h3>
                        <p className="text-text-muted mb-6">Join 50,000+ readers getting the latest in microbiome research and exclusive product drops.</p>
                        <form className="flex max-w-sm mx-auto gap-2">
                          <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="flex h-11 w-full px-4 text-sm bg-white dark:bg-neutral-900 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500"
                            required
                          />
                          <Button type="button" className="rounded-full shrink-0">
                            Subscribe
                          </Button>
                        </form>
                      </div>
                    </aside>
                  )}
                </div>
              ))}
            </div>
            
            {/* Share / Footer */}
            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">Share article:</span>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 border-border bg-transparent text-text-muted hover:text-foreground border">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/blog">More Articles</Link>
              </Button>
            </div>
            
          </AnimatedSection>
        </div>
        
      </div>
    </article>
  )
}
