export interface INewsArticle {
  id: number
  headline: string
  summary: string
  source: string
  url: string
  imageUrl: string
  publishedAt: number  // unix timestamp (seconds)
  symbol: string       // empty string for market news
  category: string
}

export interface INewsSentiment {
  symbol: string
  bullishPercent: number
  bearishPercent: number
  score: number
}

export type TNewsCategory = 'general' | 'forex' | 'crypto' | 'merger'
