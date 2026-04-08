import type { INewsArticle, INewsSentiment, TNewsCategory } from '~/types/news'

export async function fetchNewsFeed (params: {
  symbols?: string[]
  category?: TNewsCategory
}): Promise<INewsArticle[]> {
  const query: Record<string, string> = {}
  if (params.symbols?.length) query.symbols = params.symbols.join(',')
  if (params.category) query.category = params.category
  return $fetch('/api/news/feed', { query })
}

export async function fetchNewsSentiment (symbol: string): Promise<INewsSentiment> {
  return $fetch('/api/news/sentiment', { query: { symbol } })
}
