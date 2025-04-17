export enum EFrequency {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly'
}

export enum EDurationUnit {
  Years = 'years',
  Months = 'months',
  Weeks = 'weeks'
}

export interface IFormModel {
  start: number
  deposit: number
  percent: number
  duration: number
  depositFrequency: EFrequency
  durationUnit: EDurationUnit
  reinvestment: boolean
  reinvestmentFrequency: EFrequency
}

export interface ITableRecord {
  period: number
  date: string
  initialDeposit: string
  interestPerPeriod: string
  totalAmount: string
}

export type TTimeUnit = 'weeks' | 'months' | 'years'
export type TFrequency = 'weekly' | 'monthly' | 'yearly'

export interface IInvestmentResult {
  period: number
  date: Date
  deposits: number
  periodInterest: number
  totalBalance: number
}

export interface IInvestmentParameters {
  initialDeposit: number
  contributionAmount: number
  contributionPeriod: TFrequency
  annualInterestRate: number
  duration: number
  durationUnit: TTimeUnit
  reinvesting: boolean
  reinvestingPeriod: TFrequency
  displayedPeriod: TTimeUnit
}
