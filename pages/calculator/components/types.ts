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
