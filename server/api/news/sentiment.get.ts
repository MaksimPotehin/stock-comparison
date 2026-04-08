import type { INewsSentiment } from '~/types/news'

interface ICacheEntry<T> {
  data: T
  expiresAt: number
}

const cache = new Map<string, ICacheEntry<INewsSentiment>>()

function evictExpired () {
  const now = Date.now()
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(key)
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const symbol = (query.symbol as string | undefined)?.trim().toUpperCase()

  if (!symbol) {
    throw createError({ statusCode: 400, message: 'symbol is required' })
  }

  const cacheKey = `sentiment:${symbol}`
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

  let response: Response
  try {
    response = await fetch(
      `https://finnhub.io/api/v1/news-sentiment?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`,
      { signal: AbortSignal.timeout(5000) }
    )
  } catch {
    throw createError({ statusCode: 503, message: 'Data temporarily unavailable' })
  }

  if (response.status === 429) {
    throw createError({ statusCode: 503, message: 'Data temporarily unavailable' })
  }

  if (!response.ok) {
    throw createError({ statusCode: 502, message: 'Upstream error' })
  }

  const json = await response.json()

  const result: INewsSentiment = {
    symbol,
    bullishPercent: json.sentiment?.bullishPercent ?? 0,
    bearishPercent: json.sentiment?.bearishPercent ?? 0,
    score: json.companyNewsScore ?? 0
  }

  cache.set(cacheKey, { data: result, expiresAt: now + 30 * 60 * 1000 })
  evictExpired()

  return result
})
