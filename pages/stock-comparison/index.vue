<template>
  <div class="flex flex-col w-full gap-y-4 min-h-0 overflow-auto">
    <!-- Controls row -->
    <div class="flex flex-col gap-y-3">
      <!-- Stock search inputs -->
      <div class="flex flex-col md:flex-row gap-3">
        <StockSearchField
          ref="field1Ref"
          :placeholder="$t('stockComparison.searchPlaceholder')"
          :stock="stock1"
          :color="STOCK_COLORS[0]"
          @select="onSelectStock1"
          @remove="removeStock1"
        />
        <StockSearchField
          ref="field2Ref"
          :placeholder="stock1 ? $t('stockComparison.addStock') : $t('stockComparison.searchPlaceholder')"
          :stock="stock2"
          :color="STOCK_COLORS[1]"
          @select="onSelectStock2"
          @remove="removeStock2"
        />
      </div>

      <!-- Period selector -->
      <div v-if="stock1" class="flex items-center gap-x-1 flex-wrap">
        <button
          v-for="p in PERIODS"
          :key="p"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          :class="selectedPeriod === p
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'"
          @click="selectedPeriod = p"
        >
          {{ $t(`stockComparison.periods.${p}`) }}
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!stock1"
      class="flex flex-col items-center justify-center flex-grow text-center py-10 gap-y-3"
    >
      <AppIconChartUp class="w-12 h-12 text-gray-600" />
      <p class="text-white font-semibold text-lg">{{ $t('stockComparison.emptyTitle') }}</p>
      <p class="text-gray-400 text-sm max-w-xs">{{ $t('stockComparison.emptySubtitle') }}</p>
    </div>

    <!-- Chart area -->
    <template v-if="stock1">
      <!-- Loading state -->
      <div v-if="isLoading" class="flex items-center justify-center h-64 rounded-xl bg-gray-700/30">
        <span class="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Error -->
      <div
        v-else-if="loadError"
        class="flex items-center justify-center h-32 rounded-xl bg-gray-700/30 text-red-400 text-sm"
      >
        {{ loadError }}
      </div>

      <!-- Chart -->
      <div v-else class="flex-shrink-0 h-64 md:h-80 w-full rounded-xl overflow-hidden bg-gray-700/20 p-3">
        <StockComparisonChart :stock1="stock1" :stock2="stock2" />
      </div>

      <!-- Normalized note -->
      <p class="text-gray-500 text-xs -mt-2">
        {{ $t('stockComparison.chart.normalized') }}
      </p>

      <!-- Metrics table -->
      <div v-if="!isLoading && !loadError" class="bg-gray-700/20 rounded-xl p-3 md:p-4">
        <StockMetricsTable :stock1="stock1" :stock2="stock2" />
      </div>

      <!-- Disclaimer -->
      <p class="text-gray-600 text-xs mt-auto pt-2">{{ $t('stockComparison.disclaimer') }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'
import type { IStockComparisonData, IStockSearchResult, TStockPeriod } from '~/types/stock'
import { searchStocks, fetchStockHistory } from './stock.service'
import { STOCK_COLORS } from './constants'
import StockSearchField from './components/StockSearchField.vue'
import StockComparisonChart from './components/StockComparisonChart.vue'
import StockMetricsTable from './components/StockMetricsTable.vue'

useSeo('stock-comparison')
const { t } = useI18n()
const PERIODS: TStockPeriod[] = ['1m', '3m', '6m', 'ytd', '1y', '5y']

const route = useRoute()
const router = useRouter()

const stock1 = ref<IStockComparisonData | null>(null)
const stock2 = ref<IStockComparisonData | null>(null)
const selectedPeriod = ref<TStockPeriod>('1y')
const isLoading = ref(false)
const loadError = ref('')

const field1Ref = ref<InstanceType<typeof StockSearchField> | null>(null)
const field2Ref = ref<InstanceType<typeof StockSearchField> | null>(null)

// Request counter — guards against race conditions when period changes rapidly
let loadSeq = 0

async function loadHistories () {
  if (!stock1.value) return

  const seq = ++loadSeq
  isLoading.value = true
  loadError.value = ''

  try {
    const [h1, h2] = await Promise.all([
      fetchStockHistory(stock1.value.symbol, selectedPeriod.value),
      stock2.value ? fetchStockHistory(stock2.value.symbol, selectedPeriod.value) : Promise.resolve(null)
    ])

    // Discard result if a newer request already started
    if (seq !== loadSeq) return

    stock1.value = { ...stock1.value, history: h1 }
    if (stock2.value && h2) {
      stock2.value = { ...stock2.value, history: h2 }
    }
  } catch (err: unknown) {
    if (seq !== loadSeq) return
    const fetchErr = err as { data?: { message?: string } }
    loadError.value = fetchErr?.data?.message ?? t('stockComparison.errors.generic')
  } finally {
    if (seq === loadSeq) isLoading.value = false
  }
}

const debouncedLoad = useDebounceFn(loadHistories, 400)

function onSelectStock1 (result: IStockSearchResult) {
  stock1.value = { symbol: result.symbol, name: result.name, exchange: result.exchange, history: [] }
  debouncedLoad()
}

function onSelectStock2 (result: IStockSearchResult) {
  stock2.value = { symbol: result.symbol, name: result.name, exchange: result.exchange, history: [] }
  debouncedLoad()
}

function removeStock1 () {
  stock1.value = null
  stock2.value = null
  field1Ref.value?.clear()
  field2Ref.value?.clear()
  loadError.value = ''
}

function removeStock2 () {
  stock2.value = null
  field2Ref.value?.clear()
}

// Reload on period change (debounced)
watch(selectedPeriod, () => debouncedLoad())

// Sync URL state
watch([stock1, stock2, selectedPeriod], () => {
  router.replace({
    query: {
      ...(stock1.value && { s1: stock1.value.symbol }),
      ...(stock2.value && { s2: stock2.value.symbol }),
      period: selectedPeriod.value
    }
  } as RouteLocationRaw)
})

// Restore state from URL on mount
onMounted(async () => {
  const { s1, s2, period } = route.query

  if (period && PERIODS.includes(period as TStockPeriod)) {
    selectedPeriod.value = period as TStockPeriod
  }

  if (s1) {
    try {
      const results = await searchStocks(s1 as string)
      const match = results.find(r => r.symbol === (s1 as string).toUpperCase())
      stock1.value = match
        ? { symbol: match.symbol, name: match.name, exchange: match.exchange, history: [] }
        : { symbol: s1 as string, name: s1 as string, exchange: '', history: [] }
    } catch {
      stock1.value = { symbol: s1 as string, name: s1 as string, exchange: '', history: [] }
    }
  }

  if (s2) {
    try {
      const results = await searchStocks(s2 as string)
      const match = results.find(r => r.symbol === (s2 as string).toUpperCase())
      stock2.value = match
        ? { symbol: match.symbol, name: match.name, exchange: match.exchange, history: [] }
        : { symbol: s2 as string, name: s2 as string, exchange: '', history: [] }
    } catch {
      stock2.value = { symbol: s2 as string, name: s2 as string, exchange: '', history: [] }
    }
  }

  if (stock1.value) {
    await loadHistories()
  }
})
</script>
