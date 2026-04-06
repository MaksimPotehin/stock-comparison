import type { IStockSearchResult } from '~/types/stock'

interface ICacheEntry<T> {
  data: T
  expiresAt: number
}

// In-memory cache to minimize API credit usage (60 min TTL)
const cache = new Map<string, ICacheEntry<IStockSearchResult[]>>()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = (query.q as string | undefined)?.trim()

  if (!q || q.length < 3) {
    return []
  }

  const cacheKey = q.toLowerCase()
  const now = Date.now()
  const cached = cache.get(cacheKey)

  if (cached && cached.expiresAt > now) {
    return cached.data
  }

  const config = useRuntimeConfig()
  const apiKey = config.twelveDataApiKey

  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'API key not configured' })
  }

  let response: Response
  try {
    response = await fetch(
      `https://api.twelvedata.com/symbol_search?symbol=${encodeURIComponent(q)}&outputsize=10&apikey=${apiKey}`,
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

  if (!json.data || !Array.isArray(json.data)) {
    return []
  }

  const results: IStockSearchResult[] = json.data
    .filter((item: Record<string, string>) => item.instrument_type === 'Common Stock' || item.instrument_type === 'ETF')
    .slice(0, 8)
    .map((item: Record<string, string>) => ({
      symbol: item.symbol,
      name: item.instrument_name,
      exchange: item.exchange,
      type: item.instrument_type
    }))

  cache.set(cacheKey, { data: results, expiresAt: now + 60 * 60 * 1000 })

  return results
})
