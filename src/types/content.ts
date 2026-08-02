export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  imageUrl: string
  tags: string[]
  cfu: string
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  imageUrl: string
  category: string
  author: string
  readTime: string
  content: string[]
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  rating: number
  avatarUrl?: string
}
