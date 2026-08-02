import { Link } from 'react-router'
import { motion } from 'motion/react'
import { Card, CardContent } from '~/components/ui/Card'
import { Badge } from '~/components/ui/Badge'
import type { BlogPost } from '~/types/content'
import { ResponsiveImage } from './ResponsiveImage'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  // Format date simply
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link to={`/blog/${post.slug}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
        <Card className="h-full overflow-hidden border-border/50 bg-surface/50 backdrop-blur-sm transition-all duration-normal group-hover:shadow-xl group-hover:border-brand-300/50 flex flex-col">
          <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <ResponsiveImage
              src={post.imageUrl}
              alt={post.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <CardContent className="flex flex-col flex-grow p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 border-none">
                {post.category}
              </Badge>
              <span className="text-sm text-text-muted">{formattedDate}</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-text-muted line-clamp-3 leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="mt-auto pt-4 border-t border-border/50 font-medium text-brand-600 dark:text-brand-400 flex items-center group-hover:translate-x-1 transition-transform">
              Read Article <span className="ml-2">→</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
