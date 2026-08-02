import { Link } from 'react-router'
import type { Route } from './+types/blog._index'
import { BRAND_NAME } from '~/constants'
import { AnimatedSection } from '~/components/motion/AnimatedSection'
import { ResponsiveImage } from '~/components/ui/ResponsiveImage'
import { Badge } from '~/components/ui/Badge'
import { fetchBlogPosts, useBlogPosts } from '~/services/blog'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Journal | ${BRAND_NAME}` },
    { name: "description", content: "Science-backed insights on gut health, performance, and family wellness." },
  ]
}

export async function loader() {
  const posts = await fetchBlogPosts()
  return { posts }
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { data: posts } = useBlogPosts(loaderData.posts)

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-32 bg-surface items-center justify-center">
        <h1 className="text-4xl font-bold">Journal</h1>
        <p className="text-text-muted mt-4">Check back soon for new articles.</p>
      </div>
    )
  }

  const featuredPost = posts[0]!
  const remainingPosts = posts.slice(1)

  return (
    <div className="flex flex-col min-h-screen bg-bg-subtle pt-24 pb-32">
      <div className="container-app">
        
        {/* Header */}
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            The Journal.
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Science-backed insights on the microbiome, athletic performance, and optimizing your daily routine.
          </p>
        </AnimatedSection>

        {/* Featured Post */}
        <AnimatedSection direction="up" delay={0.1} className="mb-16">
          <Link to={`/blog/${featuredPost.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-card border border-border/50 rounded-3xl p-4 lg:p-8 overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:border-brand-300/50">
              
              <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden w-full">
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="default" className="bg-brand-500 hover:bg-brand-600 text-white shadow-md">
                    Featured
                  </Badge>
                </div>
                <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                  <ResponsiveImage 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title}
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col justify-center p-4 lg:p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-800">
                    {featuredPost.category}
                  </Badge>
                  <span className="text-sm font-medium text-text-muted">
                    {featuredPost.readTime}
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300 text-balance">
                  {featuredPost.title}
                </h2>
                
                <p className="text-lg text-text-muted mb-8 text-pretty">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{featuredPost.author}</span>
                    <span className="text-xs text-text-muted">{featuredPost.date}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
            </div>
          </Link>
        </AnimatedSection>

        {/* Grid */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Link to={`/blog/${post.slug}`} className="group h-full flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
                  <div className="bg-card border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:border-brand-300/50 flex flex-col h-full">
                    
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="outline" className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                        <ResponsiveImage 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-text-muted text-sm line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold">{post.author}</span>
                          <span className="text-xs text-text-muted">{post.date}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                    
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        
      </div>
    </div>
  )
}
