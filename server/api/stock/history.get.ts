import type { IStockHistoricalPoint, TStockPeriod } from '~/types/stock'

interface ICacheEntry<T> {
  data: T
  expiresAt: number
}

// In-memory cache (10 min TTL) to stay within rate limits
const cache = new Map<string, ICacheEntry<IStockHistoricalPoint[]>>()

function evictExpired () {
  const now = Date.now()
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(key)
  }
}

function getOutputsize(period: TStockPeriod): number {
  if (period === 'ytd') {
    const now = new Date()
    const jan1 = new Date(now.getFullYear(), 0, 1)
    const calendarDays = Math.ceil((now.getTime() - jan1.getTime()) / (1000 * 60 * 60 * 24))
    // Approximate trading days (roughly 5/7 of calendar days)
    return Math.max(5, Math.ceil(calendarDays * 5 / 7))
  }
  const map: Record<TStockPeriod, number> = {
    '1m': 30,
    '3m': 90,
    '6m': 180,
    'ytd': 252,
    '1y': 365,
    '5y': 1260
  }
  return map[period]
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const symbol = (query.symbol as string | undefined)?.trim().toUpperCase()
  const period = (query.period as TStockPeriod | undefined) ?? '1y'

  if (!symbol) {
    throw createError({ statusCode: 400, message: 'symbol is required' })
  }

  const validPeriods: TStockPeriod[] = ['1m', '3m', '6m', 'ytd', '1y', '5y']
  if (!validPeriods.includes(period)) {
    throw createError({ statusCode: 400, message: 'invalid period' })
  }

  const cacheKey = `${symbol}:${period}`
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

  const outputsize = getOutputsize(period)

  let response: Response
  try {
    response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(symbol)}&interval=1day&outputsize=${outputsize}&apikey=${apiKey}`,
      { signal: AbortSignal.timeout(8000) }
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

  if (json.status === 'error' || !json.values || !Array.isArray(json.values)) {
    throw createError({ statusCode: 404, message: `Symbol "${symbol}" not found` })
  }

  // Twelve Data returns newest-first — reverse to chronological order
  const data: IStockHistoricalPoint[] = json.values
    .reverse()
    .map((item: Record<string, string>) => ({
      date: item.datetime,
      close: parseFloat(item.close),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      open: parseFloat(item.open)
    }))

  cache.set(cacheKey, { data, expiresAt: now + 10 * 60 * 1000 })
  evictExpired()

  return data
})
