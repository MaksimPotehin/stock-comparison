export const stockComparisonMessages = {
  title: 'Stock Comparison',
  description: 'Compare two stocks side by side across different time periods',
  searchPlaceholder: 'Search by ticker or company name…',
  addStock: 'Add stock to compare',
  emptyTitle: 'Compare any two stocks',
  emptySubtitle: 'Enter a ticker symbol or company name to get started',
  pageTitle: 'Stock Comparison Chart',
  pageSubtitle: 'Compare the performance of two stocks side by side. Enter tickers to see a normalized return chart and key metrics — no signup needed.',
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
    normalized: 'Performance vs. start of period (% return)',
    spy: 'S&P 500 (SPY)'
  },
  spy: {
    label: 'Show S&P 500 (SPY) benchmark'
  },
  dateRange: '{from} – {to}',
  metrics: {
    title: 'Key Metrics',
    return: 'Total Return',
    cagr: 'CAGR',
    high: 'Period High',
    low: 'Period Low',
    volatility: 'Volatility (ann.)',
    maxDrawdown: 'Max Drawdown',
    correlation: 'Correlation',
    peak: 'Peak',
    trough: 'Trough',
    tooltips: {
      return: 'Total price change from the start to the end of the selected period.',
      cagr: 'Compound Annual Growth Rate — the annualized return assuming reinvestment. Most useful for periods longer than 1 year.',
      high: 'Highest closing price during the selected period.',
      low: 'Lowest closing price during the selected period.',
      volatility: 'Annualized standard deviation of daily returns (× √252). Higher = more risk.',
      maxDrawdown: 'Largest peak-to-trough decline during the period. Shows the worst loss an investor could have experienced.',
      correlation: 'Pearson correlation between daily returns of both stocks. +1 means they move in sync, −1 means they move opposite, 0 means no relationship.'
    }
  },
  howTo: {
    title: 'How to use',
    steps: [
      'Type a ticker (e.g. AAPL) or company name in the search field.',
      'Optionally add a second stock to compare them on the same chart.',
      'Select a time period: 1M, 3M, 6M, YTD, 1Y, or 5Y.',
      'Toggle the S&P 500 benchmark to see how stocks perform against the market.',
      'Review the metrics table — return, CAGR, volatility, and max drawdown.'
    ]
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'What does the normalized chart show?',
        a: 'It shows each stock\'s % gain or loss relative to its price at the start of the selected period. This makes it fair to compare stocks with very different absolute prices (e.g. $10 vs. $3,000).'
      },
      {
        q: 'What is CAGR?',
        a: 'Compound Annual Growth Rate is the constant annual rate at which an investment would have grown to reach its current value. It smooths out volatility and is the standard way to compare investment performance across different time horizons.'
      },
      {
        q: 'What does volatility measure?',
        a: 'Volatility here is the annualized standard deviation of daily returns. It measures how much a stock\'s price fluctuates day to day. Higher volatility means higher risk — but also the potential for higher returns.'
      },
      {
        q: 'What is max drawdown?',
        a: 'Max drawdown is the largest percentage drop from a peak to a subsequent trough during the selected period. It shows the worst-case loss an investor holding through the period could have experienced.'
      },
      {
        q: 'What does the correlation number mean?',
        a: 'Correlation measures how closely the two stocks move together on a daily basis. A value near +1 means they tend to rise and fall together; near −1 means they move in opposite directions. A low or negative correlation between holdings reduces overall portfolio risk through diversification.'
      },
      {
        q: 'Why use S&P 500 as a benchmark?',
        a: 'The S&P 500 (tracked by the SPY ETF) is the most widely used benchmark for U.S. large-cap stocks. Comparing a stock against SPY quickly shows whether it has outperformed or underperformed the broad market over the same period.'
      }
    ]
  },
  errors: {
    notFound: 'Symbol not found',
    unavailable: 'Data temporarily unavailable. Please try again later.',
    generic: 'Failed to load data'
  },
  disclaimer: 'Data provided by Twelve Data. For informational purposes only. Not financial advice.'
}
