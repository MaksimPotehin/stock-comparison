// Brand chart color sequence (Snowball Analytics palette)
export const STOCK_COLORS = ['#3699ff', '#1bc5bd'] as const
// SPY is a neutral benchmark — violet keeps it clearly distinct from both stock colors
export const SPY_COLOR = '#9a6afa' as const

export const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'META', name: 'Meta' },
  { symbol: 'AMD', name: 'AMD' },
  { symbol: 'BRK.B', name: 'Berkshire' },
  { symbol: 'JPM', name: 'JPMorgan' }
] as const
