export interface IStockSearchResult {
  symbol: string
  name: string
  exchange: string
  type: string
}

export interface IStockHistoricalPoint {
  date: string
  close: number
  high: number
  low: number
  open: number
}

export interface IStockComparisonData {
  symbol: string
  name: string
  exchange: string
  history: IStockHistoricalPoint[]
}

export type TStockPeriod = '1m' | '3m' | '6m' | 'ytd' | '1y' | '5y'
