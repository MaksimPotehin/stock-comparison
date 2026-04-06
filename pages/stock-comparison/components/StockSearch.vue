<template>
  <div ref="containerRef" class="relative">
    <AppSearch
      v-model="query"
      :placeholder="placeholder"
      :clearable="false"
      @update:model-value="onInput"
      @enter="onEnter"
    />

    <!-- Dropdown results -->
    <div
      v-if="isOpen && (results.length > 0 || isLoading || errorMsg)"
      class="absolute z-50 top-[calc(100%+4px)] left-0 right-0
       bg-gray-700 rounded-xl border border-gray-600 shadow-xl overflow-hidden"
    >
      <!-- Loading -->
      <div v-if="isLoading" class="px-4 py-3 text-sm text-gray-400 flex items-center gap-x-2">
        <span class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>{{ $t('stockComparison.loading') }}</span>
      </div>

      <!-- Error -->
      <div v-else-if="errorMsg" class="px-4 py-3 text-sm text-red-400">
        {{ errorMsg }}
      </div>

      <!-- Results -->
      <template v-else>
        <button
          v-for="item in results"
          :key="item.symbol"
          class="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-600/60 transition-colors text-left"
          @click="select(item)"
        >
          <div class="flex items-center gap-x-3 min-w-0">
            <span class="font-mono font-semibold text-white text-sm shrink-0">{{ item.symbol }}</span>
            <span class="text-gray-300 text-sm truncate">{{ item.name }}</span>
          </div>
          <span class="text-gray-500 text-xs shrink-0 ml-2">{{ item.exchange }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { IStockSearchResult } from '~/types/stock'
import { searchStocks } from '../stock.service'

const { t } = useI18n()

const props = defineProps<{
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'select', stock: IStockSearchResult): void
}>()

const query = ref('')
const results = ref<IStockSearchResult[]>([])
const isLoading = ref(false)
const isOpen = ref(false)
const errorMsg = ref('')
const containerRef = ref<HTMLElement | null>(null)

onClickOutside(containerRef, () => {
  isOpen.value = false
})

const SEARCH_DEBOUNCE_MS = 600
let searchDebounceId: ReturnType<typeof setTimeout> | null = null

async function runSearch () {
  if (query.value.length < 3) {
    results.value = []
    isOpen.value = false
    return
  }

  isLoading.value = true
  errorMsg.value = ''
  isOpen.value = true

  try {
    results.value = await searchStocks(query.value)
  } catch (err: unknown) {
    const fetchErr = err as { data?: { message?: string } }
    errorMsg.value = fetchErr?.data?.message ?? t('stockComparison.errors.generic')
    results.value = []
  } finally {
    isLoading.value = false
  }
}

function scheduleSearch () {
  if (searchDebounceId !== null) clearTimeout(searchDebounceId)
  searchDebounceId = setTimeout(() => {
    searchDebounceId = null
    void runSearch()
  }, SEARCH_DEBOUNCE_MS)
}

function onInput () {
  errorMsg.value = ''
  scheduleSearch()
}

function onEnter () {
  if (searchDebounceId !== null) {
    clearTimeout(searchDebounceId)
    searchDebounceId = null
  }
  void runSearch()
}

onBeforeUnmount(() => {
  if (searchDebounceId !== null) clearTimeout(searchDebounceId)
})

function select (item: IStockSearchResult) {
  query.value = `${item.symbol} – ${item.name}`
  isOpen.value = false
  results.value = []
  emit('select', item)
}

// Clear the input when parent wants to reset
defineExpose({ clear: () => { query.value = ''; results.value = []; isOpen.value = false } })
</script>
