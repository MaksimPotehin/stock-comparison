<template>
  <div class="w-full flex flex-col gap-y-8 overflow-auto md:overflow-hidden">
    <div>
      <h1 class="text-warning text-2xl mb-4">{{ $t('calculator.title') }}</h1>
      <p class="text-white-400 leading-7">{{ $t('calculator.description') }}</p>
    </div>

    <div class="flex w-full md:space-x-8 flex-col md:flex-row gap-16 md:gap-0 md:overflow-hidden">
      <!-- Форма для введення даних -->
      <CalculatorForm v-model="formModel" class="w-full max-w-full md:max-w-[350px]" />

      <div class="flex flex-col w-full h-full overflow-hidden">
        <div class="flex items-center gap-x-10">
          <div class="flex items-center gap-x-3 mb-3">
            <h2 class="text-lg mr-2">{{ $t('calculator.results') }}</h2>
            <p>{{ $t('calculator.viewMode') }}:</p>
            <el-radio-group v-model="resultViewType">
              <el-radio-button value="table">{{ $t('calculator.table') }}</el-radio-button>
              <el-radio-button value="chart">{{ $t('calculator.chart') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div class="w-full h-full overflow-hidden">
          <!-- Відображення таблиці -->
          <TableModule
            v-if="resultViewType === 'table'"
            :key="tableData.length"
            :data="tableData"
            :headings="headings"
          />
          <!-- Відображення графіка -->
          <CalculatorChart
            v-else
            :data="simulationResults"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import CalculatorForm from './components/CalculatorForm.vue'
import CalculatorChart from './components/CalculatorChart.vue'
import TableModule from '@/components/TableModule.vue'
import { EDurationUnit, EFrequency } from './types'
import type { IFormModel, ITableRecord, IInvestmentResult, IInvestmentParameters, TTimeUnit } from './types'
import { simulateInvestment } from '@/utils/investment-calculator'
import { useSeo } from '~/composables/useSeo'
import { useStructuredData } from '~/composables/useStructuredData'
import { useAnalytics } from '~/composables/useAnalytics'

  // SEO metadata
useSeo('calculator')

  // Extended structured data
const { addCalculatorSchema } = useStructuredData()
onMounted(() => {
  addCalculatorSchema()
})

const { trackCalculatorEvent, trackNavigation } = useAnalytics()

  // Initial form values
const formModel = ref<IFormModel>({
  start: 1000,
  deposit: 0,
  percent: 12,
  duration: 1,
  depositFrequency: EFrequency.Monthly,
  durationUnit: EDurationUnit.Years,
  reinvestment: true,
  reinvestmentFrequency: EFrequency.Monthly
})

  // Results display mode
const resultViewType = ref<'chart' | 'table'>('table')

  // Table headers
const headings = [
  { value: 'period', label: 'calculator.tableHeaders.period', minWidth: 80 },
  { value: 'date', label: 'calculator.tableHeaders.date', minWidth: 100 },
  { value: 'initialDeposit', label: 'calculator.tableHeaders.accValue', minWidth: 120 },
  { value: 'interestPerPeriod', label: 'calculator.tableHeaders.interestPerPeriod', minWidth: 150 },
  { value: 'totalAmount', label: 'calculator.tableHeaders.totalAmount', minWidth: 150 }
]

  // Input validation
const validateInputs = (model: IFormModel): boolean => {
  if (model.start < 0) return false
  if (model.deposit < 0) return false
  if (model.duration <= 0) return false
  if (model.percent < 0) return false
  return true
}

  // Transform form data into simulation parameters
const simulationParams = computed<IInvestmentParameters>(() => {
      // Determine display period based on selected duration unit
  let displayPeriod: TTimeUnit
  if (formModel.value.durationUnit === EDurationUnit.Weeks) {
    displayPeriod = 'weeks'
  } else {
          displayPeriod = 'months' // for both months and years we show monthly data
  }

  const params = {
    reinvesting: formModel.value.reinvestment,
    reinvestingPeriod: formModel.value.reinvestmentFrequency as 'weekly' | 'monthly' | 'yearly',
    initialDeposit: formModel.value.start,
    contributionAmount: formModel.value.deposit,
    contributionPeriod: formModel.value.depositFrequency as 'weekly' | 'monthly' | 'yearly',
    annualInterestRate: formModel.value.percent,
    duration: formModel.value.duration,
    durationUnit: formModel.value.durationUnit as 'weeks' | 'months' | 'years',
    displayedPeriod: displayPeriod
  }

  if (!validateInputs(formModel.value)) {
    return {
      ...params,
      initialDeposit: 0,
      contributionAmount: 0,
      annualInterestRate: 0,
      duration: 0
    }
  }

  return params
})

  // Simulation results
const simulationResults = computed<IInvestmentResult[]>(() => {
  console.log('Simulation params changed:', simulationParams.value)
  const results = simulateInvestment(simulationParams.value)
  console.log('Simulation results:', results)
  return results
})

  // Calculate data for table
const tableData = computed<ITableRecord[]>(() => {
  return simulationResults.value.map(result => ({
    period: result.period,
    date: result.date.toLocaleDateString(),
    initialDeposit: parseFloat(result.deposits?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    interestPerPeriod: parseFloat(result.periodInterest?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    totalAmount: parseFloat(result.totalBalance?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }))
})

onMounted(() => {
  trackNavigation('calculator')
})

  // Add tracking when parameters change
watch(simulationParams, (newParams) => {
  trackCalculatorEvent('parameter_change', JSON.stringify(newParams))
}, { deep: true })

  // Add tracking when display type changes
watch(resultViewType, (newType) => {
  trackCalculatorEvent('view_type_change', newType)
})
</script>
