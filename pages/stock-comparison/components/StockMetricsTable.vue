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
          v-for="row in visibleRows"
          :key="row.key"
          class="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
        >
          <!-- Label + tooltip -->
          <td class="py-2.5 pr-4 text-gray-400">
            <div class="flex items-center gap-x-1.5">
              <span>{{ row.label }}</span>
              <AppTooltip v-if="row.tooltip" :content="row.tooltip" placement="top">
                <AppIconInfo class="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 cursor-help flex-shrink-0 transition-colors" />
              </AppTooltip>
            </div>
          </td>

          <!-- Stock 1 value -->
          <td v-if="stock1" class="text-right py-2.5 px-3 font-mono" :class="row.colorClass?.(metrics1)">
            <template v-if="row.subline1">
              <div>{{ row.format(metrics1) }}</div>
              <div class="text-xs text-gray-500">{{ row.subline1(metrics1) }}</div>
            </template>
            <template v-else>{{ row.format(metrics1) }}</template>
          </td>

          <!-- Stock 2 value -->
          <td
            v-if="stock2 && metrics2"
            class="text-right py-2.5 pl-3 font-mono"
            :class="row.colorClass?.(metrics2)"
          >
            <template v-if="row.subline2">
              <div>{{ row.format(metrics2) }}</div>
              <div class="text-xs text-gray-500">{{ row.subline2(metrics2) }}</div>
            </template>
            <template v-else>{{ row.format(metrics2) }}</template>
          </td>
        </tr>

        <!-- Correlation row (only when both stocks present) -->
        <tr
          v-if="stock2 && metrics2 && correlation !== null"
          class="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
        >
          <td class="py-2.5 pr-4 text-gray-400">
            <div class="flex items-center gap-x-1.5">
              <span>{{ $t('stockComparison.metrics.correlation') }}</span>
              <AppTooltip :content="$t('stockComparison.metrics.tooltips.correlation')" placement="top">
                <AppIconInfo class="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 cursor-help flex-shrink-0 transition-colors" />
              </AppTooltip>
            </div>
          </td>
          <td class="text-right py-2.5 px-3 font-mono" colspan="2" :class="correlationClass">
            {{ formatCorrelation(correlation) }}
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface IMetrics {
  returnPct: number
  cagrPct: number | null
  high: number
  low: number
  volatility: number
  maxDrawdown: number
  peakDate: string
  troughDate: string
  years: number
}

// ─── Calculation helpers ───────────────────────────────────────────────────────

function calcMetrics(history: IStockHistoricalPoint[]): IMetrics {
  if (history.length < 2) {
    return { returnPct: 0, cagrPct: null, high: 0, low: 0, volatility: 0, maxDrawdown: 0, peakDate: '', troughDate: '', years: 0 }
  }

  const closes = history.map(p => p.close)
  const dailyReturns = closes.slice(1).map((c, i) => (c - closes[i]) / closes[i])

  // Annualized volatility (sample variance)
  const mean = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length
  const variance = dailyReturns.reduce((a, b) => a + (b - mean) ** 2, 0) / (dailyReturns.length - 1)
  const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100

  // Max drawdown + peak/trough dates
  let peak = closes[0]
  let peakIdx = 0
  let maxDD = 0
  let peakDate = history[0].date
  let troughDate = history[0].date

  for (let i = 1; i < closes.length; i++) {
    if (closes[i] > peak) {
      peak = closes[i]
      peakIdx = i
    }
    const dd = (peak - closes[i]) / peak
    if (dd > maxDD) {
      maxDD = dd
      peakDate = history[peakIdx].date
      troughDate = history[i].date
    }
  }

  // CAGR
  const years = history.length / 252
  const startClose = closes[0]
  const endClose = closes[closes.length - 1]
  const cagrPct = years >= 1
    ? (Math.pow(endClose / startClose, 1 / years) - 1) * 100
    : null

  return {
    returnPct: ((endClose - startClose) / startClose) * 100,
    cagrPct,
    high: history.reduce((max, p) => p.high > max ? p.high : max, history[0].high),
    low: history.reduce((min, p) => p.low < min ? p.low : min, history[0].low),
    volatility,
    maxDrawdown: maxDD * 100,
    peakDate,
    troughDate,
    years
  }
}

function calcCorrelation(h1: IStockHistoricalPoint[], h2: IStockHistoricalPoint[]): number | null {
  // Align by date
  const dates2 = new Set(h2.map(p => p.date))
  const aligned1 = h1.filter(p => dates2.has(p.date))
  const dates1 = new Set(aligned1.map(p => p.date))
  const aligned2 = h2.filter(p => dates1.has(p.date))

  if (aligned1.length < 3) return null

  const returns1 = aligned1.slice(1).map((p, i) => (p.close - aligned1[i].close) / aligned1[i].close)
  const returns2 = aligned2.slice(1).map((p, i) => (p.close - aligned2[i].close) / aligned2[i].close)

  const n = returns1.length
  const mean1 = returns1.reduce((a, b) => a + b, 0) / n
  const mean2 = returns2.reduce((a, b) => a + b, 0) / n

  let cov = 0
  let std1 = 0
  let std2 = 0
  for (let i = 0; i < n; i++) {
    const d1 = returns1[i] - mean1
    const d2 = returns2[i] - mean2
    cov += d1 * d2
    std1 += d1 * d1
    std2 += d2 * d2
  }

  const denom = Math.sqrt(std1 * std2)
  return denom === 0 ? null : cov / denom
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatPct(v: number, decimals = 2): string {
  return (v >= 0 ? '+' : '') + v.toFixed(decimals) + '%'
}

function formatPrice(v: number): string {
  return '$' + v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatCorrelation(v: number): string {
  return (v >= 0 ? '+' : '') + v.toFixed(2)
}

function pctClass(m: IMetrics, key: 'returnPct' | 'cagrPct'): string {
  const v = key === 'cagrPct' ? m.cagrPct : m.returnPct
  if (v === null) return 'text-gray-500'
  if (v > 0) return 'text-success-800'
  if (v < 0) return 'text-error-700'
  return 'text-white'
}

// ─── Computed ─────────────────────────────────────────────────────────────────

const metrics1 = computed<IMetrics>(() =>
  props.stock1 ? calcMetrics(props.stock1.history) : { returnPct: 0, cagrPct: null, high: 0, low: 0, volatility: 0, maxDrawdown: 0, peakDate: '', troughDate: '', years: 0 }
)

const metrics2 = computed<IMetrics | null>(() =>
  props.stock2 ? calcMetrics(props.stock2.history) : null
)

const correlation = computed<number | null>(() => {
  if (!props.stock1 || !props.stock2) return null
  return calcCorrelation(props.stock1.history, props.stock2.history)
})

const correlationClass = computed(() => {
  if (correlation.value === null) return 'text-gray-500'
  if (correlation.value >= 0.7) return 'text-warning'
  if (correlation.value <= -0.3) return 'text-success-800'
  return 'text-white'
})

// ─── Rows config ──────────────────────────────────────────────────────────────

interface IRow {
  key: string
  label: string
  tooltip?: string
  format: (m: IMetrics) => string
  colorClass?: (m: IMetrics) => string
  subline1?: (m: IMetrics) => string
  subline2?: (m: IMetrics) => string
  hidden?: boolean
}

const rows = computed<IRow[]>(() => [
  {
    key: 'return',
    label: t('stockComparison.metrics.return'),
    tooltip: t('stockComparison.metrics.tooltips.return'),
    format: (m) => formatPct(m.returnPct),
    colorClass: (m) => pctClass(m, 'returnPct')
  },
  {
    key: 'cagr',
    label: t('stockComparison.metrics.cagr'),
    tooltip: t('stockComparison.metrics.tooltips.cagr'),
    format: (m) => m.cagrPct !== null ? formatPct(m.cagrPct) : '—',
    colorClass: (m) => pctClass(m, 'cagrPct')
  },
  {
    key: 'high',
    label: t('stockComparison.metrics.high'),
    tooltip: t('stockComparison.metrics.tooltips.high'),
    format: (m) => formatPrice(m.high)
  },
  {
    key: 'low',
    label: t('stockComparison.metrics.low'),
    tooltip: t('stockComparison.metrics.tooltips.low'),
    format: (m) => formatPrice(m.low)
  },
  {
    key: 'volatility',
    label: t('stockComparison.metrics.volatility'),
    tooltip: t('stockComparison.metrics.tooltips.volatility'),
    format: (m) => m.volatility.toFixed(1) + '%'
  },
  {
    key: 'maxDrawdown',
    label: t('stockComparison.metrics.maxDrawdown'),
    tooltip: t('stockComparison.metrics.tooltips.maxDrawdown'),
    format: (m) => formatPct(-m.maxDrawdown),
    colorClass: () => 'text-error-700',
    subline1: (m) => m.peakDate
      ? `${t('stockComparison.metrics.peak')}: ${formatDate(m.peakDate)} → ${t('stockComparison.metrics.trough')}: ${formatDate(m.troughDate)}`
      : '',
    subline2: (m) => m.peakDate
      ? `${t('stockComparison.metrics.peak')}: ${formatDate(m.peakDate)} → ${t('stockComparison.metrics.trough')}: ${formatDate(m.troughDate)}`
      : ''
  }
])

const visibleRows = computed(() => rows.value.filter(r => !r.hidden))
</script>
