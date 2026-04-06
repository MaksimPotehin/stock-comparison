import type { IStockSearchResult, IStockHistoricalPoint, TStockPeriod } from '~/types/stock'

export async function searchStocks(q: string): Promise<IStockSearchResult[]> {
  return $fetch<IStockSearchResult[]>('/api/stock/search', { query: { q } })
}

export async function fetchStockHistory(symbol: string, period: TStockPeriod): Promise<IStockHistoricalPoint[]> {
  return $fetch<IStockHistoricalPoint[]>('/api/stock/history', { query: { symbol, period } })
}
