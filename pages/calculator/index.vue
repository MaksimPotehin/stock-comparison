<template>
  <div class="w-full flex flex-col gap-y-8 overflow-auto md:overflow-hidden">
    <div>
      <h1 class="text-warning text-2xl mb-4">{{ $t('calculator.title') }}</h1>
      <p class="text-white-400 leading-7">{{ $t('calculator.description') }}</p>
      
      <!-- SEO Content for better indexing (EN only) -->
      <div v-if="$i18n.locale === 'en'" class="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <h2 class="text-warning text-lg mb-3">Free Investment Calculator Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white-400">
          <div>
            <h3 class="text-warning mb-2">Compound Interest Calculator</h3>
            <p>Calculate compound interest with regular monthly contributions. See how your investments grow over time with our free online calculator.</p>
          </div>
          <div>
            <h3 class="text-warning mb-2">Investment Planning Tool</h3>
            <p>Plan your long-term investments with our free calculator. Input initial deposit, monthly contributions, and interest rate to see potential returns.</p>
          </div>
          <div>
            <h3 class="text-warning mb-2">Interactive Charts & Tables</h3>
            <p>View your investment growth in detailed tables or interactive charts. Track your portfolio performance over different time periods.</p>
          </div>
          <div>
            <h3 class="text-warning mb-2">No Registration Required</h3>
            <p>Use our free investment calculator without signing up. Start calculating compound interest immediately with your own investment parameters.</p>
          </div>
        </div>
      </div>
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
    
    <!-- Additional SEO Content (EN only) -->
    <div v-if="$i18n.locale === 'en'" class="mt-8 p-6 bg-gray-800/50 rounded-lg">
      <h2 class="text-warning text-xl mb-4">About Our Free Investment Calculator</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white-400">
        <div>
          <h3 class="text-warning mb-3">Best Free Investment Calculator Online</h3>
          <p>Our free investment calculator is designed to help you understand compound interest and plan your financial future. Whether you're planning for retirement, saving for a major purchase, or building wealth through regular investments, our calculator provides accurate projections based on your specific parameters.</p>
        </div>
        <div>
          <h3 class="text-warning mb-3">Compound Interest Calculator with Monthly Contributions</h3>
          <p>Calculate compound interest with regular monthly contributions to see how small, consistent investments can grow into significant wealth over time. Our calculator shows you the power of compound interest with detailed breakdowns of your investment growth.</p>
        </div>
        <div>
          <h3 class="text-warning mb-3">Investment Planning Made Simple</h3>
          <p>Plan your investments with confidence using our comprehensive calculator. Input your initial deposit, set up regular contributions, choose your investment period, and see realistic projections of your potential returns.</p>
        </div>
        <div>
          <h3 class="text-warning mb-3">Free Online Calculator - No Registration Required</h3>
          <p>Access our investment calculator instantly without any registration or sign-up process. Start calculating compound interest immediately and explore different investment scenarios to find the best strategy for your financial goals.</p>
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
