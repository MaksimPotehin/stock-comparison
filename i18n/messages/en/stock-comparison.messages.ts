export const stockComparisonMessages = {
  title: 'Stock Comparison',
  description: 'Compare two stocks side by side across different time periods',
  searchPlaceholder: 'Search by ticker or company name…',
  addStock: 'Add stock to compare',
  emptyTitle: 'Compare any two stocks',
  emptySubtitle: 'Enter a ticker symbol or company name to get started',
  periods: {
    '1m': '1M',
    '3m': '3M',
    '6m': '6M',
    ytd: 'YTD',
    '1y': '1Y',
    '5y': '5Y'
  },
  loading: 'Loading…',
  chart: {
    noData: 'No data available for the selected period',
    normalized: 'Performance vs. start of period'
  },
  metrics: {
    title: 'Key Metrics',
    return: 'Return',
    high: 'Period High',
    low: 'Period Low',
    volatility: 'Volatility (ann.)',
    maxDrawdown: 'Max Drawdown'
  },
  errors: {
    notFound: 'Symbol not found',
    unavailable: 'Data temporarily unavailable. Please try again later.',
    generic: 'Failed to load data'
  },
  disclaimer: 'Data provided by Twelve Data. For informational purposes only.'
}
