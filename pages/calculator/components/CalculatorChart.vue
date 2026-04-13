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
        borderColor: '#3699ff',
        backgroundColor: 'rgba(54, 153, 255, 0.15)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Deposits',
        data: props.data.map(d => d.deposits),
        borderColor: '#1bc5bd',
        backgroundColor: 'rgba(27, 197, 189, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Interest',
        data: props.data.map(d => d.periodInterest),
        borderColor: '#ffa800',
        backgroundColor: 'rgba(255, 168, 0, 0.1)',
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
        position: 'top' as const,
        labels: { color: '#b5b5c3', usePointStyle: true, pointStyleWidth: 10 }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        ticks: { color: '#7e8299', maxRotation: 0 },
        grid: { color: 'rgba(73,80,87,0.5)' }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#7e8299',
          callback: (value) => `$${value.toLocaleString()}`
        },
        grid: { color: 'rgba(73,80,87,0.5)' }
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
