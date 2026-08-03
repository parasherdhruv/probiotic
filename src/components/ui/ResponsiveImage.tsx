import { useState } from 'react'
import { cn } from '~/lib/cn'

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  objectFit?: 'cover' | 'contain' | 'fill'
}

export function ResponsiveImage({ 
  src, 
  alt, 
  className, 
  objectFit = 'cover',
  ...props 
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn("relative overflow-hidden bg-neutral-100 dark:bg-neutral-900", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full transition-opacity duration-500",
          objectFit === 'cover' && "object-cover",
          objectFit === 'contain' && "object-contain",
          objectFit === 'fill' && "object-fill",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        {...props}
      />
      {/* Simple skeleton overlay until image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      )}
    </div>
  )
}
