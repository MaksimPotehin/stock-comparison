import type { TTimeUnit, TFrequency, IInvestmentParameters, IInvestmentResult } from '@/pages/calculator/types'

/** Перетворення загальної тривалості в тижні */
export function convertDurationToWeeks (duration: number, unit: TTimeUnit): number {
  switch (unit) {
    case 'weeks': return duration
    case 'months': return duration * 4 // приблизно 4 тижні в місяці
    case 'years': return duration * 52 // приблизно 52 тижні в році
    default: throw new Error('Invalid time unit')
  }
}

/** Отримання інтервалу в тижнях для внеску/реінвестування */
export function getIntervalInWeeks (frequency: TFrequency): number {
  switch (frequency) {
    case 'weekly': return 1
    case 'monthly': return 4
    case 'yearly': return 52
    default: throw new Error('Invalid frequency')
  }
}

/** Отримання інтервалу в тижнях для періоду відображення */
export function getDisplayPeriodInWeeks (unit: TTimeUnit): number {
  switch (unit) {
    case 'weeks': return 1
    case 'months': return 4
    case 'years': return 52
    default: throw new Error('Invalid display period')
  }
}

/** Перевірка кількості періодів відображення */
function validateDisplayPeriods (duration: number, durationUnit: TTimeUnit, displayPeriod: TTimeUnit): number {
  const totalWeeks = convertDurationToWeeks(duration, durationUnit)
  const displayPeriodInWeeks = getDisplayPeriodInWeeks(displayPeriod)

  // For years, we want exactly 12 months per year
  if (durationUnit === 'years' && displayPeriod === 'months') {
    return duration * 12
  }

  return Math.ceil(totalWeeks / displayPeriodInWeeks)
}

/** Основна функція симуляції інвестицій */
export function simulateInvestment (params: IInvestmentParameters): IInvestmentResult[] {
  const results: IInvestmentResult[] = []
  let currentDate = new Date()
  let totalBalance = params.initialDeposit
  let accumulatedDeposits = params.initialDeposit // Track only deposits
  let accumulatedInterest = 0
  let displayPeriodInterest = 0

  // Convert annual rate to decimal and get weekly rate
  const annualRate = params.annualInterestRate / 100
  const monthlyRate = annualRate / 12
  const weeklyRate = monthlyRate / 4

  // Calculate total weeks for simulation
  const totalWeeks = convertDurationToWeeks(params.duration, params.durationUnit)

  // Define display period in weeks
  const displayPeriodInWeeks = getDisplayPeriodInWeeks(params.displayedPeriod)

  // Calculate total display periods
  const totalDisplayPeriods = validateDisplayPeriods(params.duration, params.durationUnit, params.displayedPeriod)

  let lastDisplayPeriod = 0
  let weekInPeriod = 0

  // Simulate week by week
  for (let week = 1; week <= totalWeeks; week++) {
    weekInPeriod++

    // Add contributions based on frequency
    if (week > 1) { // Skip first week as we have initial deposit
      const contributionInterval = getIntervalInWeeks(params.contributionPeriod)
      if (week % contributionInterval === 0) {
        accumulatedDeposits += params.contributionAmount
        totalBalance += params.contributionAmount
      }
    }

    // Calculate interest for this week
    const weeklyInterest = totalBalance * weeklyRate

    if (params.reinvesting) {
      const reinvestInterval = getIntervalInWeeks(params.reinvestingPeriod)
      if (week % reinvestInterval === 0) {
        // Add accumulated interest at reinvestment period
        totalBalance += accumulatedInterest + weeklyInterest
        displayPeriodInterest += weeklyInterest
        accumulatedInterest = 0
      } else {
        // Accumulate interest until reinvestment period
        accumulatedInterest += weeklyInterest
        displayPeriodInterest += weeklyInterest
      }
    } else {
      // Just accumulate interest if not reinvesting
      accumulatedInterest += weeklyInterest
      displayPeriodInterest += weeklyInterest
    }

    // Advance date by one week
    currentDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)

    // Store results at the end of display period
    if (weekInPeriod === displayPeriodInWeeks || week === totalWeeks) {
      const currentDisplayPeriod = Math.floor((week - 1) / displayPeriodInWeeks) + 1

      if (currentDisplayPeriod > lastDisplayPeriod && currentDisplayPeriod <= totalDisplayPeriods) {
        results.push({
          period: currentDisplayPeriod,
          date: new Date(currentDate),
          deposits: accumulatedDeposits,
          periodInterest: displayPeriodInterest,
          totalBalance: params.reinvesting ? totalBalance : totalBalance + accumulatedInterest
        })

        lastDisplayPeriod = currentDisplayPeriod
        displayPeriodInterest = 0
        weekInPeriod = 0
      }
    }
  }

  return results
}
