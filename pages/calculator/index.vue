<template>
  <div class="flex flex-col gap-y-8">
    <div>
      <p class="text-warning text-2xl mb-4">Інвестиційний калькулятор</p>
      <p class="text-white-400 leading-7">
        Calculate profit with compound interest.
        This calculator helps you easily calculate capital growth, visualize the dynamics on a graph, and compare
        investment strategies to achieve the best result.
      </p>
    </div>

    <div class="flex w-full h-full space-x-8 overflow-hidden">
      <CalculatorForm v-model="formModel" />

      <div class="flex flex-col w-full h-full overflow-hidden">
        <div class="flex items-center gap-x-3 mb-3">
          <p>Select a view mode:</p>

          <el-radio-group v-model="resultViewType">
            <el-radio-button label="table">Table</el-radio-button>
            <el-radio-button label="chart">Chart</el-radio-button>
          </el-radio-group>
        </div>

        <div class="w-full h-full overflow-hidden">
          <TableModule v-if="resultViewType === 'table'" :data="tableData" :headings="headings" />
          <CalculatorTable v-else :table-data="tableData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import CalculatorForm from './components/CalculatorForm.vue'
import CalculatorTable from './components/CalculatorTable.vue'

enum EFrequency {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly'
}

enum EDurationUnit {
  Years = 'years',
  Months = 'months',
  Weeks = 'weeks'
}

interface IFormModel {
  start: number
  deposit: number
  percent: number
  duration: number
  frequency: EFrequency
  durationUnit: EDurationUnit
  reinvestment: boolean
}

interface ITableRecord {
  period: number
  initialDeposit: string
  interestPerPeriod: string
  totalAmount: string
  date: string
}

definePageMeta({
  pageLabel: 'Calculator',
  navOrder: 1
})

const resultViewType = ref<'chart' | 'table'>('table')

const formModel = ref<IFormModel>({
  start: 1000,
  deposit: 0,
  percent: 10,
  duration: 10,
  frequency: EFrequency.Monthly, // Reinvestment frequency
  durationUnit: EDurationUnit.Years, // Investment duration unit
  reinvestment: true
})

const headings = [
  { value: 'period', label: 'Period', minWidth: 80 },
  { value: 'date', label: 'Date', minWidth: 180 },
  { value: 'initialDeposit', label: 'Acc value', minWidth: 180 },
  { value: 'interestPerPeriod', label: 'Interest per period', minWidth: 180 },
  { value: 'totalAmount', label: 'Total amount', minWidth: 180 }
]

// Computed property to calculate the table data based on user input
const tableData = computed<ITableRecord[]>(() => {
  const { duration, durationUnit, frequency, deposit } = formModel.value
  let totalPeriods = 0
  const start = formModel.value.start // Initial amount
  let currentAmount = start // Current amount for reinvestment

  // Determine the total number of periods based on duration and unit
  if (durationUnit === EDurationUnit.Years) {
    totalPeriods = duration * (frequency === EFrequency.Monthly ? 12 : frequency === EFrequency.Weekly ? 52 : 1) // 12 months, 52 weeks, or 1 year
  } else if (durationUnit === EDurationUnit.Months) {
    totalPeriods = duration * (frequency === EFrequency.Weekly ? 4.33 : frequency === EFrequency.Yearly ? 1 / 12 : 1) // Convert months to weeks or yearly
  } else if (durationUnit === EDurationUnit.Weeks) {
    totalPeriods = frequency === EFrequency.Monthly
      ? Math.floor(duration / 4.33)
      : frequency === EFrequency.Yearly
        ? Math.floor(duration / 52)
        : duration // Round down for weeks
  }

  // Generate table data
  const data: ITableRecord[] = []
  for (let record = 0; record < totalPeriods; record++) {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + (frequency === EFrequency.Weekly ? record * 7 : 0)) // Adjust for weeks
    currentDate.setMonth(currentDate.getMonth() + (frequency === EFrequency.Monthly ? record : 0)) // Adjust for months
    currentDate.setFullYear(currentDate.getFullYear() + (frequency === EFrequency.Yearly ? record : 0)) // Adjust for years

    const interest = calculateInterest(currentAmount, formModel.value.percent, frequency) // Calculate interest per period
    const totalAmount = currentAmount + interest // Total amount including interest

    // Add new record to the data array
    data.push({
      period: record + 1, // Period (index starting from 1)
      date: currentDate.toLocaleDateString(), // Date format if needed
      initialDeposit: currentAmount.toFixed(), // Current amount
      interestPerPeriod: interest.toFixed(), // Interest for this period
      totalAmount: totalAmount.toFixed() // Total amount after interest
    })

    // Update the initial amount for the next period if reinvesting
    if (formModel.value.reinvestment) {
      currentAmount = totalAmount // Reinvest profit into total amount
    }

    // Add deposit only after calculating the current period
    currentAmount += deposit
  }

  return data
})

// Function to calculate interest based on principal, rate, and frequency
function calculateInterest (principal: number, rate: number, frequency: EFrequency): number {
  const interestRate = rate / 100 // Convert percentage to decimal
  if (frequency === EFrequency.Monthly) {
    return principal * interestRate / 12 // Adjust based on monthly frequency
  } else if (frequency === EFrequency.Weekly) {
    return principal * interestRate / 52 // Adjust based on weekly frequency
  } else if (frequency === EFrequency.Yearly) {
    return principal * interestRate // Adjust based on yearly frequency
  }
  return 0
}

</script>
