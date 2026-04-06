<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-600">
          <th class="text-left py-2.5 pr-4 text-gray-400 font-medium w-1/3">
            {{ $t('stockComparison.metrics.title') }}
          </th>
          <th v-if="stock1" class="text-right py-2.5 px-3 font-semibold" :style="{ color: STOCK_COLORS[0] }">
            {{ stock1.symbol }}
          </th>
          <th v-if="stock2" class="text-right py-2.5 pl-3 font-semibold" :style="{ color: STOCK_COLORS[1] }">
            {{ stock2.symbol }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.key"
          class="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
        >
          <td class="py-2.5 pr-4 text-gray-400">{{ row.label }}</td>
          <td v-if="stock1" class="text-right py-2.5 px-3 font-mono" :class="row.colorClass?.(metrics1)">
            {{ row.format(metrics1) }}
          </td>
          <td v-if="stock2 && metrics2" class="text-right py-2.5 pl-3 font-mono" :class="row.colorClass?.(metrics2)">
            {{ row.format(metrics2) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IStockComparisonData, IStockHistoricalPoint } from '~/types/stock'
import { STOCK_COLORS } from '../constants'

const props = defineProps<{
  stock1: IStockComparisonData | null
  stock2: IStockComparisonData | null
}>()

const { t } = useI18n()

interface IMetrics {
  returnPct: number
  high: number
  low: number
  volatility: number
  maxDrawdown: number
}

function calcMetrics(history: IStockHistoricalPoint[]): IMetrics {
  if (history.length < 2) {
    return { returnPct: 0, high: 0, low: 0, volatility: 0, maxDrawdown: 0 }
  }

  const closes = history.map(p => p.close)
  const dailyReturns = closes.slice(1).map((c, i) => (c - closes[i]) / closes[i])

  // Annualized volatility
  const mean = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length
  const variance = dailyReturns.reduce((a, b) => a + (b - mean) ** 2, 0) / (dailyReturns.length - 1)
  const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100

  // Max drawdown
  let peak = closes[0]
  let maxDD = 0
  for (const c of closes) {
    if (c > peak) peak = c
    const dd = (peak - c) / peak
    if (dd > maxDD) maxDD = dd
  }

  return {
    returnPct: ((closes[closes.length - 1] - closes[0]) / closes[0]) * 100,
    high: history.reduce((max, p) => p.high > max ? p.high : max, history[0].high),
    low: history.reduce((min, p) => p.low < min ? p.low : min, history[0].low),
    volatility,
    maxDrawdown: maxDD * 100
  }
}

const metrics1 = computed<IMetrics>(() =>
  props.stock1 ? calcMetrics(props.stock1.history) : { returnPct: 0, high: 0, low: 0, volatility: 0, maxDrawdown: 0 }
)

const metrics2 = computed<IMetrics | null>(() =>
  props.stock2 ? calcMetrics(props.stock2.history) : null
)

function pctClass(m: IMetrics, key: 'returnPct' | 'maxDrawdown') {
  const v = m[key]
  if (v > 0) return 'text-success-800'
  if (v < 0) return 'text-error-700'
  return 'text-white'
}

function formatPct(v: number, decimals = 2): string {
  return (v >= 0 ? '+' : '') + v.toFixed(decimals) + '%'
}

function formatPrice(v: number): string {
  return '$' + v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const rows = computed(() => [
  {
    key: 'return',
    label: t('stockComparison.metrics.return'),
    format: (m: IMetrics) => formatPct(m.returnPct),
    colorClass: (m: IMetrics) => pctClass(m, 'returnPct')
  },
  {
    key: 'high',
    label: t('stockComparison.metrics.high'),
    format: (m: IMetrics) => formatPrice(m.high)
  },
  {
    key: 'low',
    label: t('stockComparison.metrics.low'),
    format: (m: IMetrics) => formatPrice(m.low)
  },
  {
    key: 'volatility',
    label: t('stockComparison.metrics.volatility'),
    format: (m: IMetrics) => m.volatility.toFixed(1) + '%'
  },
  {
    key: 'maxDrawdown',
    label: t('stockComparison.metrics.maxDrawdown'),
    format: (m: IMetrics) => formatPct(-m.maxDrawdown),
    colorClass: () => 'text-error-700'
  }
])
</script>
