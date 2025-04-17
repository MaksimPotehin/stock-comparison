export enum EPeriod {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

export interface IInvestmentParams {
  initialDeposit: number
  contributionAmount: number
  contributionPeriod: EPeriod
  reinvestment: boolean
  reinvestmentPeriod: EPeriod
  annualInterestRate: number
  duration: number
  durationUnit: EPeriod
  viewMode: 'table' | 'chart'
  periodView: EPeriod
}

export interface IInvestmentResult {
  period: number
  date: string
  accValue: string
  interestPerPeriod: string
  totalAmount: string
}
