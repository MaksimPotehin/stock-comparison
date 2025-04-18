<template>
  <div class="w-full flex flex-col gap-y-8">
    <div>
      <p class="text-warning text-2xl mb-4">{{ $t('calculator.title') }}</p>
      <p class="text-white-400 leading-7">{{ $t('calculator.description') }}</p>
    </div>

    <div class="flex w-full h-full space-x-8 overflow-hidden">
      <!-- Форма для введення даних -->
      <CalculatorForm v-model="formModel" />

      <div class="flex flex-col w-full h-full overflow-hidden">
        <div class="flex items-center gap-x-10">
          <div class="flex items-center gap-x-3 mb-3">
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
import { ref, computed } from 'vue'
import CalculatorForm from './components/CalculatorForm.vue'
import CalculatorChart from './components/CalculatorChart.vue'
import TableModule from '@/components/TableModule.vue'
import { EDurationUnit, EFrequency } from './types'
import type { IFormModel, ITableRecord, IInvestmentResult, IInvestmentParameters, TTimeUnit } from './types'
import { simulateInvestment } from '@/utils/investment-calculator'

// Початкові значення форми
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

// Режим відображення результатів
const resultViewType = ref<'chart' | 'table'>('table')

// Заголовки таблиці
const headings = [
  { value: 'period', label: 'calculator.tableHeaders.period', minWidth: 80 },
  { value: 'date', label: 'calculator.tableHeaders.date', minWidth: 180 },
  { value: 'initialDeposit', label: 'calculator.tableHeaders.accValue', minWidth: 180 },
  { value: 'interestPerPeriod', label: 'calculator.tableHeaders.interestPerPeriod', minWidth: 180 },
  { value: 'totalAmount', label: 'calculator.tableHeaders.totalAmount', minWidth: 180 }
]

// Валідація вхідних даних
const validateInputs = (model: IFormModel): boolean => {
  if (model.start < 0) return false
  if (model.deposit < 0) return false
  if (model.duration <= 0) return false
  if (model.percent < 0) return false
  return true
}

// Перетворення даних форми у параметри для симуляції
const simulationParams = computed<IInvestmentParameters>(() => {
  // Визначення періоду відображення на основі вибраної одиниці тривалості
  let displayPeriod: TTimeUnit
  if (formModel.value.durationUnit === EDurationUnit.Weeks) {
    displayPeriod = 'weeks'
  } else {
    displayPeriod = 'months' // і для місяців, і для років показуємо щомісячні дані
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

// Результати симуляції
const simulationResults = computed<IInvestmentResult[]>(() => {
  console.log('Simulation params changed:', simulationParams.value)
  const results = simulateInvestment(simulationParams.value)
  console.log('Simulation results:', results)
  return results
})

// Обчислення даних для таблиці
const tableData = computed<ITableRecord[]>(() => {
  return simulationResults.value.map(result => ({
    period: result.period,
    date: result.date.toLocaleDateString(),
    initialDeposit: parseFloat(result.deposits?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    interestPerPeriod: parseFloat(result.periodInterest?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    totalAmount: parseFloat(result.totalBalance?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }))
})
</script>
