<template>
  <div class="w-full h-full">
    <canvas ref="chartRef" />
  </div>
</template>

<script lang="ts" setup>
import { Chart, type ChartData, type ChartOptions } from 'chart.js/auto'
import type { IStockComparisonData, IStockHistoricalPoint } from '~/types/stock'
import { STOCK_COLORS } from '../constants'

const props = defineProps<{
  stock1: IStockComparisonData | null
  stock2: IStockComparisonData | null
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

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
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })
}

const createChart = () => {
  if (!chartRef.value) return

  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return

  if (chart) {
    chart.destroy()
    chart = null
  }

  if (!props.stock1 || props.stock1.history.length === 0) return

  let h1 = props.stock1.history
  let h2 = props.stock2?.history ?? []

  // Align dates when both stocks present
  if (props.stock2 && h2.length > 0) {
    ;[h1, h2] = alignByDates(h1, h2)
  }

  const labels = h1.map(p => formatDate(p.date))
  const prices1 = normalizeToPercent(h1.map(p => p.close))

  const datasets: ChartData['datasets'] = [
    {
      label: props.stock1.symbol,
      data: prices1,
      borderColor: STOCK_COLORS[0],
      backgroundColor: `${STOCK_COLORS[0]}14`,
      fill: true,
      tension: 0.3,
      pointRadius: 0,
      pointHoverRadius: 4,
      borderWidth: 2
    }
  ]

  if (props.stock2 && h2.length > 0) {
    const prices2 = normalizeToPercent(h2.map(p => p.close))
    datasets.push({
      label: props.stock2.symbol,
      data: prices2,
      borderColor: STOCK_COLORS[1],
      backgroundColor: `${STOCK_COLORS[1]}14`,
      fill: true,
      tension: 0.3,
      pointRadius: 0,
      pointHoverRadius: 4,
      borderWidth: 2
    })
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#d1d5db',
          usePointStyle: true,
          pointStyleWidth: 10
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y
            const sign = val >= 0 ? '+' : ''
            return ` ${ctx.dataset.label}: ${sign}${val.toFixed(2)}%`
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af',
          maxTicksLimit: 8,
          maxRotation: 0
        },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: {
          color: '#9ca3af',
          callback: (value) => {
            const v = Number(value)
            return (v >= 0 ? '+' : '') + v.toFixed(1) + '%'
          }
        },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }

  chart = new Chart(ctx, { type: 'line', data: { labels, datasets }, options })
}

onMounted(() => createChart())

watch(
  [() => props.stock1?.history, () => props.stock2?.history],
  () => createChart()
)

onBeforeUnmount(() => {
  chart?.destroy()
})
</script>
