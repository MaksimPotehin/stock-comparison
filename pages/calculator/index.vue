<template>
  <div class="flex flex-col gap-y-8">
    <div>
      <p class="text-warning text-2xl mb-4">Інвестиційний калькулятор</p>
      <p class="text-white-400 leading-7">
        Розраховуйте прибуток із врахуванням складних відсотків.
        Цей калькулятор допоможе вам легко розрахувати зростання капіталу, показати динаміку на графіку та порівняти
        інвестиційні стратегії для досягнення найвищого результату.
      </p>
    </div>

    <div class="flex w-full h-full space-x-8 overflow-hidden">
      <CalculatorForm v-model="formModel" />

      <div class="flex flex-col w-full h-full overflow-hidden">
        <div class="flex items-center gap-x-3 mb-3">
          <p>Оберіть спосіб перегляду результатів:</p>

          <el-radio-group v-model="resultViewType">
            <el-radio-button label="chart">Графік</el-radio-button>
            <el-radio-button label="table">Таблиця</el-radio-button>
          </el-radio-group>
        </div>

        <div class="w-full h-full overflow-auto">
          <CalculatorTable v-if="resultViewType === 'table'" :table-data="tableData" />
          <div v-else class="w-full h-[1000px] bg-purple" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import CalculatorForm from './components/CalculatorForm.vue'
import CalculatorTable from './components/CalculatorTable.vue'

definePageMeta({
  pageLabel: 'Calculator',
  navOrder: 1
})

const resultViewType = ref('table')

const formModel = ref({
  start: 1000,
  deposit: 0,
  percent: 10,
  duration: 10,
  frequency: 'monthly', // частота реінвестування
  durationUnit: 'years', // одиниця тривалості інвестицій
  inflation: '',
  reinvestment: true
})

// Computed property to calculate the table data based on user input
const tableData = computed(() => {
  const { duration, durationUnit, frequency, deposit } = formModel.value
  let totalPeriods = 0
  const start = formModel.value.start // Початкова сума
  let currentAmount = start // Поточна сума для реінвестування

  // Визначення загальної кількості періодів на основі тривалості та одиниці
  if (durationUnit === 'years') {
    totalPeriods = duration * (frequency === 'monthly' ? 12 : 52) // 12 місяців або 52 тижні на рік
  } else if (durationUnit === 'months') {
    totalPeriods = duration * (frequency === 'weekly' ? 4.33 : 1) // Перетворення місяців на тижні
  } else if (durationUnit === 'weeks') {
    totalPeriods = frequency === 'monthly' ? Math.floor(duration / 4.33) : duration // Округлення до меншого
  }

  // Генерація даних таблиці
  const data = []
  for (let record = 0; record < totalPeriods; record++) {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + (frequency === 'weekly' ? record * 7 : record * 30)) // Корекція для тижнів або місяців

    const interest = calculateInterest(currentAmount, formModel.value.percent, frequency) // Розрахунок відсотків за період
    const totalAmount = currentAmount + interest // Загальна сума включаючи відсотки

    // Додавання нового запису в масив даних
    data.push({
      period: record + 1, // Період (індекс з 1)
      initialDeposit: currentAmount.toFixed(), // Поточна сума
      interestPerPeriod: interest.toFixed(), // Відсотки за цей період
      totalAmount: totalAmount.toFixed(), // Загальна сума після відсотків
      date: currentDate.toLocaleDateString() // Формат дати за потребою
    })

    // Оновлення початкової суми для наступного періоду, якщо реінвестування
    if (formModel.value.reinvestment) {
      currentAmount = totalAmount // Реінвестування прибутку в загальну суму
    }

    // Додаємо депозит лише після обчислення поточного періоду
    currentAmount += deposit
  }

  return data
})

// Function to calculate interest based on principal, rate, and frequency
function calculateInterest (principal, rate, frequency) {
  const interestRate = rate / 100 // Convert percentage to decimal
  return principal * interestRate / (frequency === 'monthly' ? 12 : 52) // Adjust based on frequency
}

</script>
