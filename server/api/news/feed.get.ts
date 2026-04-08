import type { INewsArticle, TNewsCategory } from '~/types/news'

interface ICacheEntry<T> {
  data: T
  expiresAt: number
}

const cache = new Map<string, ICacheEntry<INewsArticle[]>>()

function evictExpired () {
  const now = Date.now()
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(key)
  }
}

const VALID_CATEGORIES: TNewsCategory[] = ['general', 'forex', 'crypto', 'merger']

interface FinnhubNewsItem {
  id: number
  headline: string
  summary: string
  source: string
  url: string
  image: string
  datetime: number
  related: string
  category: string
}

function mapArticle (item: FinnhubNewsItem, symbol = ''): INewsArticle {
  return {
    id: item.id,
    headline: item.headline,
    summary: item.summary,
    source: item.source,
    url: item.url,
    imageUrl: item.image ?? '',
    publishedAt: item.datetime,
    symbol: item.related ?? symbol,
    category: item.category
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const symbolsParam = (query.symbols as string | undefined)?.trim()
  const category = ((query.category as string | undefined) ?? 'general') as TNewsCategory

  if (!VALID_CATEGORIES.includes(category)) {
    throw createError({ statusCode: 400, message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` })
  }

  const symbols = symbolsParam
    ? symbolsParam.split(',').map(s => s.trim().toUpperCase()).filter(Boolean).sort()
    : []

  const cacheKey = symbols.length ? `symbols:${symbols.join(',')}` : `category:${category}`
  const now = Date.now()
  const cached = cache.get(cacheKey)

  if (cached && cached.expiresAt > now) {
    return cached.data
  }

  const config = useRuntimeConfig()
  const apiKey = config.finnhubApiKey

  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'API key not configured' })
  }

  const to = new Date().toISOString().slice(0, 10)
  const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

  let articles: INewsArticle[]

  try {
    if (symbols.length) {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(symbol)}&from=${from}&to=${to}&token=${apiKey}`,
            { signal: AbortSignal.timeout(5000) }
          )
          if (response.status === 429) {
            throw createError({ statusCode: 503, message: 'Data temporarily unavailable' })
          }
          if (!response.ok) {
            throw createError({ statusCode: 502, message: 'Upstream error' })
          }
          const json = await response.json() as FinnhubNewsItem[]
          return (Array.isArray(json) ? json : []).map(item => mapArticle(item, symbol))
        })
      )
      const seenIds = new Set<number>()
      articles = results
        .flat()
        .filter(a => {
          if (seenIds.has(a.id)) return false
          seenIds.add(a.id)
          return true
        })
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, 30)
    } else {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=${encodeURIComponent(category)}&token=${apiKey}`,
        { signal: AbortSignal.timeout(5000) }
      )
      if (response.status === 429) {
        throw createError({ statusCode: 503, message: 'Data temporarily unavailable' })
      }
      if (!response.ok) {
        throw createError({ statusCode: 502, message: 'Upstream error' })
      }
      const json = await response.json() as FinnhubNewsItem[]
      articles = (Array.isArray(json) ? json : [])
        .map(item => mapArticle(item))
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, 30)
    }
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'statusCode' in err) throw err
    throw createError({ statusCode: 503, message: 'Data temporarily unavailable' })
  }

  cache.set(cacheKey, { data: articles, expiresAt: now + 15 * 60 * 1000 })
  evictExpired()

  return articles
})
