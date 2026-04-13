<template>
  <div class="flex items-center gap-x-2 flex-wrap gap-y-2">
    <span class="text-xs text-sb-subtle shrink-0">{{ $t('stockComparison.popularTickers.label') }}</span>
    <button
      v-for="stock in POPULAR_STOCKS"
      :key="stock.symbol"
      class="px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors border"
      :style="buttonStyles[stock.symbol]"
      :class="!buttonStyles[stock.symbol] && 'bg-surface/30 border-sb-border text-sb-secondary hover:border-sb-border-light hover:text-sb-text'"
      :title="stock.name"
      @click="emit('select', stock.symbol, stock.name)"
    >
      {{ stock.symbol }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { POPULAR_STOCKS, STOCK_COLORS } from '../constants'

const props = defineProps<{
  stock1Symbol: string | undefined
  stock2Symbol: string | undefined
}>()

const emit = defineEmits<{
  (e: 'select', symbol: string, name: string): void
}>()

const ACTIVE_STYLES = [
  { background: `${STOCK_COLORS[0]}22`, borderColor: `${STOCK_COLORS[0]}99`, color: STOCK_COLORS[0] },
  { background: `${STOCK_COLORS[1]}22`, borderColor: `${STOCK_COLORS[1]}99`, color: STOCK_COLORS[1] }
] as const

const buttonStyles = computed(() => {
  const result: Record<string, typeof ACTIVE_STYLES[number] | undefined> = {}
  for (const { symbol } of POPULAR_STOCKS) {
    if (props.stock1Symbol === symbol) result[symbol] = ACTIVE_STYLES[0]
    else if (props.stock2Symbol === symbol) result[symbol] = ACTIVE_STYLES[1]
  }
  return result
})
</script>
