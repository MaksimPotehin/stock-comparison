<template>
  <div>
    <h1>Дані про акції</h1>
    <div v-if="stockData">
      <pre>{{ stockData }}</pre>
    </div>
    <div v-else>Завантаження...</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app' // Імпортуємо useNuxtApp

definePageMeta({
  pageLabel: 'Comparison',
  navOrder: 1
})

const stockData = ref(null) as any

const { $finnhubClient } = useNuxtApp()

onMounted(async () => {
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf($finnhubClient)))

  // Виконуємо запит на котирування акцій
  const { data4 } = await $finnhubClient.companyNews({ symbol: 'AAPL', from: '2023-01-01', to: '2023-12-31' })
  const { data3 } = await $finnhubClient.earningsCalendar()
  const { data2 } = await $finnhubClient.marketNews({ category: 'general' })
  const { data1 } = await $finnhubClient.companyProfile2({ symbol: 'AAPL' })
  console.log('Дані про акції:', data1)
})
</script>
