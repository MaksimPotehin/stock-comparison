// ~/calculations.ts
export type TimeUnit = 'weeks' | 'months' | 'years';
export type Frequency = 'weekly' | 'monthly' | 'yearly';
export type ViewMode = 'table' | 'chart';
export type DisplayPeriod = 'week' | 'month' | 'year';

export interface InvestmentParameters {
  reinvesting: boolean
  reinvestingPeriod: Frequency
  initialDeposit: number
  contributionAmount: number
  contributionPeriod: Frequency
  annualInterestRate: number
  duration: number
  durationUnit: TimeUnit
  resultViewMode: ViewMode
  displayedPeriod: DisplayPeriod
}

export interface InvestmentResult {
  period: number // номер тижня
  date: Date
  totalBalance: number
  periodInterest: number
  cumulativeInterest: number
  deposits: number
}

/** Перетворення загальної тривалості в тижні */
export function convertDurationToWeeks (duration: number, unit: TimeUnit): number {
  switch (unit) {
    case 'weeks': return duration
    case 'months': return duration * 4 // приблизно 4 тижні в місяці
    case 'years': return duration * 52 // приблизно 52 тижні в році
    default: throw new Error('Invalid time unit')
  }
}

/** Отримання інтервалу в тижнях для внеску/реінвестування */
export function getIntervalInWeeks (frequency: Frequency): number {
  switch (frequency) {
    case 'weekly': return 1
    case 'monthly': return 4
    case 'yearly': return 52
    default: throw new Error('Invalid frequency')
  }
}

/** Основна функція симуляції інвестицій */
export function simulateInvestment (params: InvestmentParameters): InvestmentResult[] {
  const totalWeeks = convertDurationToWeeks(params.duration, params.durationUnit)
  const contributionInterval = getIntervalInWeeks(params.contributionPeriod)
  const reinvestingInterval = getIntervalInWeeks(params.reinvestingPeriod)
  const weeklyInterestRate = (params.annualInterestRate / 100) / 52

  let balance = params.initialDeposit
  let deposits = params.initialDeposit
  let cumulativeInterest = 0
  const results: InvestmentResult[] = []
  const baseDate = new Date()

  for (let week = 1; week <= totalWeeks; week++) {
    // Додаємо внесок за встановленим інтервалом
    if (week % contributionInterval === 0) {
      balance += params.contributionAmount
      deposits += params.contributionAmount
    }

    // Розрахунок відсотків за поточний тиждень
    const interest = balance * weeklyInterestRate
    const periodInterest = interest
    if (params.reinvesting) {
      if (week % reinvestingInterval === 0) {
        balance += interest
      }
      cumulativeInterest += interest
    } else {
      // Якщо реінвестування вимкнено – відсотки не додаються до балансу
      cumulativeInterest += interest
    }

    // Розрахунок дати для поточного тижня
    const resultDate = new Date(baseDate.getTime())
    resultDate.setDate(baseDate.getDate() + week * 7)

    results.push({
      period: week,
      date: resultDate,
      totalBalance: balance,
      periodInterest,
      cumulativeInterest,
      deposits
    })
  }

  return results
}
