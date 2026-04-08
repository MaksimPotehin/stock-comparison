<template>
  <div class="flex flex-col w-full gap-y-4 min-h-0 overflow-auto">
    <!-- Page heading -->
    <div>
      <h1 class="text-xl font-bold text-white">{{ $t('stockComparison.pageTitle') }}</h1>
      <p class="text-gray-400 text-sm mt-1">{{ $t('stockComparison.pageSubtitle') }}</p>
    </div>

    <!-- Controls -->
    <div class="flex flex-col gap-y-3">
      <!-- Popular tickers -->
      <PopularTickers
        :stock1-symbol="stock1?.symbol"
        :stock2-symbol="stock2?.symbol"
        @select="onSelectPopular"
      />

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

      <!-- Period selector + SPY checkbox in one row -->
      <div v-if="stock1 || stock2" class="flex flex-col gap-y-1">
        <div class="flex items-center justify-between gap-x-3 flex-wrap gap-y-2">
          <!-- Period buttons -->
          <div class="flex items-center gap-x-1 flex-wrap">
            <button
              v-for="p in PERIODS"
              :key="p"
              class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              :class="selectedPeriod === p
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'"
              @click="selectedPeriod = p"
            >
              {{ $t(`stockComparison.periods.${p}`) }}
            </button>
          </div>

          <!-- SPY benchmark checkbox -->
          <el-checkbox v-model="showSpy" size="small" class="spy-checkbox" :disabled="isSpyLoading">
            {{ $t('stockComparison.spy.label') }}
          </el-checkbox>
        </div>

        <!-- Date range -->
        <p v-if="dateRangeLabel" class="text-xs text-gray-500">{{ dateRangeLabel }}</p>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!stock1 && !stock2"
      class="flex flex-col items-center justify-center flex-grow text-center py-10 gap-y-3"
    >
      <AppIconChartUp class="w-12 h-12 text-gray-600" />
      <p class="text-white font-semibold text-lg">{{ $t('stockComparison.emptyTitle') }}</p>
      <p class="text-gray-400 text-sm max-w-xs">{{ $t('stockComparison.emptySubtitle') }}</p>
    </div>

    <!-- Chart area -->
    <template v-if="stock1 || stock2">
      <!-- Loading -->
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
        <StockComparisonChart
          :stock1="stock1"
          :stock2="stock2"
          :spy-history="showSpy ? spyHistory : undefined"
        />
      </div>

      <!-- Normalized note -->
      <p class="text-gray-500 text-xs -mt-2">
        {{ $t('stockComparison.chart.normalized') }}
      </p>

      <!-- Metrics table -->
      <div v-if="!isLoading && !loadError" class="bg-gray-700/20 rounded-xl p-3 md:p-4">
        <StockMetricsTable :stock1="stock1" :stock2="stock2" />
      </div>

      <!-- News link -->
      <NuxtLink
        v-if="!isLoading && !loadError"
        :to="newsPageLink"
        class="flex items-center gap-x-1 text-sm text-gray-400 hover:text-white transition-colors"
      >
        {{ $t('stockComparison.readNewsLink', { symbols: newsLinkLabel }) }}
      </NuxtLink>

      <!-- Disclaimer -->
      <p class="text-gray-600 text-xs mt-auto pt-2">{{ $t('stockComparison.disclaimer') }}</p>
    </template>

    <!-- How to use -->
    <section class="mt-2 bg-gray-700/10 rounded-xl p-4 md:p-5">
      <h2 class="text-base font-semibold text-white mb-3">{{ $t('stockComparison.howTo.title') }}</h2>
      <ol class="list-decimal list-inside space-y-1.5">
        <li
          v-for="(step, i) in $tm('stockComparison.howTo.steps')"
          :key="i"
          class="text-gray-400 text-sm"
        >
          {{ step }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'
import type { IStockComparisonData, IStockHistoricalPoint, IStockSearchResult, TStockPeriod } from '~/types/stock'
import { searchStocks, fetchStockHistory } from './stock.service'
import { STOCK_COLORS } from './constants'
import StockSearchField from './components/StockSearchField.vue'
import StockComparisonChart from './components/StockComparisonChart.vue'
import StockMetricsTable from './components/StockMetricsTable.vue'
import PopularTickers from './components/PopularTickers.vue'

useSeo('stock-comparison')
const { t } = useI18n()
const localePath = useLocalePath()

const PERIODS: TStockPeriod[] = ['1m', '3m', '6m', 'ytd', '1y', '5y']

const route = useRoute()
const router = useRouter()

const stock1 = ref<IStockComparisonData | null>(null)
const stock2 = ref<IStockComparisonData | null>(null)
const selectedPeriod = ref<TStockPeriod>('1y')
const isLoading = ref(false)
const loadError = ref('')

const showSpy = ref(false)
const spyHistory = ref<IStockHistoricalPoint[]>([])
const isSpyLoading = ref(false)

const field1Ref = ref<InstanceType<typeof StockSearchField> | null>(null)
const field2Ref = ref<InstanceType<typeof StockSearchField> | null>(null)

// ─── News link ────────────────────────────────────────────────────────────────

const newsPageLink = computed(() => {
  const query: Record<string, string> = {}
  if (stock1.value) query.s1 = stock1.value.symbol
  if (stock2.value) query.s2 = stock2.value.symbol
  return localePath({ path: '/news', query })
})

const newsLinkLabel = computed(() => {
  return [stock1.value?.symbol, stock2.value?.symbol].filter(Boolean).join(' & ')
})

// ─── Date range label ─────────────────────────────────────────────────────────

const dateRangeLabel = computed(() => {
  const history = (stock1.value ?? stock2.value)?.history
  if (!history || history.length < 2) return ''
  const from = new Date(history[0].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  const to = new Date(history[history.length - 1].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  return t('stockComparison.dateRange', { from, to })
})

// ─── Race condition guard ─────────────────────────────────────────────────────

let loadSeq = 0

async function loadHistories () {
  if (!stock1.value && !stock2.value) return

  const seq = ++loadSeq
  isLoading.value = true
  loadError.value = ''

  try {
    const [h1, h2] = await Promise.all([
      stock1.value ? fetchStockHistory(stock1.value.symbol, selectedPeriod.value) : Promise.resolve(null),
      stock2.value ? fetchStockHistory(stock2.value.symbol, selectedPeriod.value) : Promise.resolve(null)
    ])

    if (seq !== loadSeq) return

    if (stock1.value && h1) stock1.value = { ...stock1.value, history: h1 }
    if (stock2.value && h2) stock2.value = { ...stock2.value, history: h2 }
  } catch (err: unknown) {
    if (seq !== loadSeq) return
    const fetchErr = err as { data?: { message?: string } }
    loadError.value = fetchErr?.data?.message ?? t('stockComparison.errors.generic')
  } finally {
    if (seq === loadSeq) isLoading.value = false
  }
}

async function loadSpy () {
  if (!showSpy.value) {
    spyHistory.value = []
    return
  }

  isSpyLoading.value = true
  try {
    spyHistory.value = await fetchStockHistory('SPY', selectedPeriod.value)
  } catch {
    spyHistory.value = []
  } finally {
    isSpyLoading.value = false
  }
}

const debouncedLoad = useDebounceFn(loadHistories, 400)

// ─── Stock selection ──────────────────────────────────────────────────────────

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
  field1Ref.value?.clear()
  if (!stock2.value) {
    loadError.value = ''
    spyHistory.value = []
  }
}

function removeStock2 () {
  stock2.value = null
  field2Ref.value?.clear()
  if (!stock1.value) {
    loadError.value = ''
    spyHistory.value = []
  }
}

function onSelectPopular (symbol: string, name: string) {
  if (stock1.value?.symbol === symbol) {
    removeStock1()
    return
  }
  if (stock2.value?.symbol === symbol) {
    removeStock2()
    return
  }
  const data = { symbol, name, exchange: '', history: [] }
  if (!stock1.value) {
    stock1.value = data
  } else if (!stock2.value) {
    stock2.value = data
  } else {
    return
  }
  debouncedLoad()
}

// ─── Watchers ─────────────────────────────────────────────────────────────────

watch(selectedPeriod, () => {
  debouncedLoad()
  if (showSpy.value) loadSpy()
})

watch(showSpy, () => loadSpy())

watch([stock1, stock2, selectedPeriod], () => {
  router.replace({
    query: {
      ...(stock1.value && { s1: stock1.value.symbol }),
      ...(stock2.value && { s2: stock2.value.symbol }),
      period: selectedPeriod.value
    }
  } as RouteLocationRaw)
})

// ─── URL restore on mount ──────────────────────────────────────────────────────

onMounted(async () => {
  const { s1, s2, period } = route.query

  if (period && PERIODS.includes(period as TStockPeriod)) {
    selectedPeriod.value = period as TStockPeriod
  }

  async function resolveStock (symbol: string): Promise<IStockComparisonData> {
    try {
      const results = await searchStocks(symbol)
      const match = results.find(r => r.symbol === symbol.toUpperCase())
      return match
        ? { symbol: match.symbol, name: match.name, exchange: match.exchange, history: [] }
        : { symbol, name: symbol, exchange: '', history: [] }
    } catch {
      return { symbol, name: symbol, exchange: '', history: [] }
    }
  }

  if (s1) stock1.value = await resolveStock(s1 as string)
  if (s2) stock2.value = await resolveStock(s2 as string)

  if (stock1.value || stock2.value) await loadHistories()
})
</script>

<style scoped>
.spy-checkbox :deep(.el-checkbox__inner) {
  width: 16px;
  height: 16px;
}

.spy-checkbox :deep(.el-checkbox__label) {
  font-size: 12px;
  color: rgb(156 163 175); /* gray-400 */
  padding-left: 8px;
}

.spy-checkbox :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
}
</style>
