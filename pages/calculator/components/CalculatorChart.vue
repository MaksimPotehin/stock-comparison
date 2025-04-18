<template>
  <div class="w-full h-full">
    <canvas ref="chartRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, type ChartData, type ChartOptions } from 'chart.js/auto'
import type { IInvestmentResult } from '../types'

const props = defineProps<{
  data: IInvestmentResult[]
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const createChart = () => {
  if (!chartRef.value) return

  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return

  if (chart) {
    chart.destroy()
  }

  const chartData: ChartData = {
    labels: props.data.map(d => d.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Total Balance',
        data: props.data.map(d => d.totalBalance),
        borderColor: '#00bff5',
        backgroundColor: 'rgba(0, 191, 245, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Deposits',
        data: props.data.map(d => d.deposits),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Interest',
        data: props.data.map(d => d.periodInterest),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    }
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.data, () => {
  createChart()
}, { deep: true })
</script>
