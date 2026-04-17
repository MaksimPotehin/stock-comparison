export type TBlogCategory =
  | 'calculator-guides'
  | 'investment-basics'
  | 'financial-planning'
  | 'investment-tools'
  | 'strategies-analysis'
  | 'practical-tips'
  | 'financial-education'

export interface IBlogLocalizedText {
  en: string
  ua: string
}

export interface IBlogPostCta {
  href: string
  en: string
  ua: string
}

export interface IBlogPost {
  id: string
  slug: string
  title: IBlogLocalizedText
  metaTitle?: IBlogLocalizedText
  metaDescription?: IBlogLocalizedText
  excerpt: IBlogLocalizedText
  content: IBlogLocalizedText
  category: TBlogCategory
  tags: string[]
  author: string
  publishedAt: string
  updatedAt?: string
  readingTime: number
  featured: boolean
  image?: string
  cta?: IBlogPostCta
}

export interface IBlogFilter {
  category?: TBlogCategory | 'all' | TBlogCategory[]
  tags?: string[]
  search?: string
}

export interface IBlogPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface IBlogResponse {
  posts: IBlogPost[]
  pagination: IBlogPagination
}
