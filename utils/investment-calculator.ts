import type { TTimeUnit, TFrequency, IInvestmentParameters, IInvestmentResult } from '@/pages/calculator/types'

/** Перетворення загальної тривалості в тижні */
export function convertDurationToWeeks (duration: number, unit: TTimeUnit): number {
  switch (unit) {
    case 'weeks': return duration
    case 'months': return duration * 4 // approximately 4 weeks in a month
    case 'years': return duration * 52 // approximately 52 weeks in a year
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
  // Set default values for undefined parameters
  const safeParams = {
    ...params,
    initialDeposit: params.initialDeposit || 0,
    contributionAmount: params.contributionAmount || 0,
    annualInterestRate: params.annualInterestRate || 0,
    duration: params.duration || 0
  }

  const results: IInvestmentResult[] = []
  let currentDate = new Date()
  let totalBalance = safeParams.initialDeposit
  let accumulatedDeposits = safeParams.initialDeposit
  let accumulatedInterest = 0
  let displayPeriodInterest = 0

  // Return empty results if duration is 0
  if (safeParams.duration === 0) {
    return [{
      period: 1,
      date: currentDate,
      deposits: accumulatedDeposits,
      periodInterest: 0,
      totalBalance
    }]
  }

  // Convert annual rate to decimal and get weekly rate
  const annualRate = safeParams.annualInterestRate / 100
  const monthlyRate = annualRate / 12
  const weeklyRate = monthlyRate / 4

  // Calculate total weeks for simulation
  const totalWeeks = convertDurationToWeeks(safeParams.duration, safeParams.durationUnit)

  // Define display period in weeks
  const displayPeriodInWeeks = getDisplayPeriodInWeeks(safeParams.displayedPeriod)

  // Calculate total display periods
  const totalDisplayPeriods = validateDisplayPeriods(
    safeParams.duration,
    safeParams.durationUnit,
    safeParams.displayedPeriod
  )

  let lastDisplayPeriod = 0
  let weekInPeriod = 0

  // Simulate week by week
  for (let week = 1; week <= totalWeeks; week++) {
    weekInPeriod++

    // Add contributions based on frequency
    if (week > 1) { // Skip first week as we have initial deposit
      const contributionInterval = getIntervalInWeeks(safeParams.contributionPeriod)
      if (week % contributionInterval === 0) {
        accumulatedDeposits += safeParams.contributionAmount
        totalBalance += safeParams.contributionAmount
      }
    }

    // Calculate interest for this week
    const weeklyInterest = totalBalance * weeklyRate

    if (safeParams.reinvesting) {
      const reinvestInterval = getIntervalInWeeks(safeParams.reinvestingPeriod)
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
          totalBalance: safeParams.reinvesting ? totalBalance : totalBalance + accumulatedInterest
        })

        lastDisplayPeriod = currentDisplayPeriod
        displayPeriodInterest = 0
        weekInPeriod = 0
      }
    }
  }

  return results
}
