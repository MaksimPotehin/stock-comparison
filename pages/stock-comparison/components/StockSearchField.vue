<template>
  <div class="flex-1 min-w-0">
    <StockSearch
      ref="searchRef"
      :placeholder="placeholder"
      @select="onSelect"
    />
    <div v-if="stock" class="mt-1.5">
      <StockBadge
        :symbol="stock.symbol"
        :name="stock.name"
        :color="color"
        @remove="emit('remove')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IStockComparisonData, IStockSearchResult } from '~/types/stock'
import StockSearch from './StockSearch.vue'
import StockBadge from './StockBadge.vue'

defineProps<{
  placeholder: string
  stock: IStockComparisonData | null
  color: string
}>()

const emit = defineEmits<{
  (e: 'select', result: IStockSearchResult): void
  (e: 'remove'): void
}>()

const searchRef = ref<InstanceType<typeof StockSearch> | null>(null)

function onSelect(result: IStockSearchResult) {
  emit('select', result)
}

defineExpose({
  clear: () => searchRef.value?.clear()
})
</script>
