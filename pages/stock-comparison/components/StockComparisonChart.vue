<template>
  <div class="w-full h-full">
    <canvas ref="chartRef" />
  </div>
</template>

<script lang="ts" setup>
import { Chart, type ChartDataset, type ChartOptions } from 'chart.js/auto'
import type { IStockComparisonData, IStockHistoricalPoint } from '~/types/stock'
import { STOCK_COLORS, SPY_COLOR } from '../constants'

const props = defineProps<{
  stock1: IStockComparisonData | null
  stock2: IStockComparisonData | null
  spyHistory?: IStockHistoricalPoint[]
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

// ─── Helpers ─────────────────────────────────────────────────────────────────

function alignByDates(
  h1: IStockHistoricalPoint[],
  h2: IStockHistoricalPoint[]
): [IStockHistoricalPoint[], IStockHistoricalPoint[]] {
  const dates2 = new Set(h2.map(p => p.date))
  const filtered1 = h1.filter(p => dates2.has(p.date))
  const dates1 = new Set(filtered1.map(p => p.date))
  const filtered2 = h2.filter(p => dates1.has(p.date))
  return [filtered1, filtered2]
}

function normalizeToPercent(prices: number[]): number[] {
  const base = prices[0]
  if (!base) return prices.map(() => 0)
  return prices.map(p => +((p - base) / base * 100).toFixed(2))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })
}

function makeDataset(
  label: string,
  data: number[],
  color: string
): ChartDataset<'line'> {
  return {
    label,
    data,
    borderColor: color,
    backgroundColor: `${color}14`,
    fill: true,
    tension: 0.3,
    pointRadius: 0,
    pointHoverRadius: 4,
    borderWidth: 2
  }
}

// ─── Chart build ─────────────────────────────────────────────────────────────

function createChart() {
  const baseStock = props.stock1 ?? props.stock2
  if (!chartRef.value || !baseStock || baseStock.history.length === 0) return

  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return

  chart?.destroy()
  chart = null

  const baseColor = props.stock1 ? STOCK_COLORS[0] : STOCK_COLORS[1]
  const secondStock = props.stock1 ? props.stock2 : null

  let h1 = baseStock.history
  let h2 = secondStock?.history ?? []
  let hSpy = props.spyHistory ?? []

  // Align all series to the same dates (step by step)
  if (secondStock && h2.length > 0) {
    ;[h1, h2] = alignByDates(h1, h2)
  }

  if (hSpy.length > 0) {
    ;[h1, hSpy] = alignByDates(h1, hSpy)
    if (h2.length > 0) {
      ;[h2, hSpy] = alignByDates(h2, hSpy)
      // Re-align h1 to the intersection of h1 and h2 after SPY trim
      ;[h1, h2] = alignByDates(h1, h2)
      ;[h1, hSpy] = alignByDates(h1, hSpy)
    }
  }

  const labels = h1.map(p => formatDate(p.date))

  const datasets: ChartDataset<'line'>[] = [
    makeDataset(baseStock.symbol, normalizeToPercent(h1.map(p => p.close)), baseColor)
  ]

  if (secondStock && h2.length > 0) {
    datasets.push(makeDataset(secondStock.symbol, normalizeToPercent(h2.map(p => p.close)), STOCK_COLORS[1]))
  }

  if (hSpy.length > 0) {
    datasets.push(makeDataset('SPY', normalizeToPercent(hSpy.map(p => p.close)), SPY_COLOR))
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#b5b5c3', usePointStyle: true, pointStyleWidth: 10 }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const v = ctx.parsed.y
            return ` ${ctx.dataset.label}: ${v >= 0 ? '+' : ''}${v.toFixed(2)}%`
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#7e8299', maxTicksLimit: 8, maxRotation: 0 },
        grid: { color: 'rgba(73,80,87,0.5)' }
      },
      y: {
        ticks: {
          color: '#7e8299',
          callback: (value) => {
            const v = Number(value)
            return (v >= 0 ? '+' : '') + v.toFixed(1) + '%'
          }
        },
        grid: { color: 'rgba(73,80,87,0.5)' }
      }
    }
  }

  chart = new Chart(ctx, { type: 'line', data: { labels, datasets }, options })
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

onMounted(() => createChart())

watch(
  [() => props.stock1?.history, () => props.stock2?.history, () => props.spyHistory],
  () => createChart()
)

onBeforeUnmount(() => chart?.destroy())
</script>
