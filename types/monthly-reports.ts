// types/monthly-reports.ts

export interface UserInfo {
  name: string
  reportMonth: string
  dateOfBirth: string
  gender: string
  diagnosis: string
}

export interface BloodPressureData {
  averageReading: string
  range: string
  interpretation: string
}

export interface BloodSugarData {
  averageReading: string
  range: string
  interpretation: string
}

export interface MedicationAdherence {
  monthlyAdherenceRate: string
  daysFullyCompliant: string
  totalDays: string
  missedDoses: number
  interpretation: string
}

export interface MonthlyReportDetail {
  id: string
  userInfo: UserInfo
  reportSummary: string
  bloodPressure: BloodPressureData
  bloodSugar: BloodSugarData
  medicationAdherence: MedicationAdherence
  findingsAndTrends: string[]
}

export interface MonthlyReportListItem {
  id: string
  month: string
  year: string
  label: string
}

export interface MonthlyReportsResponse {
  success: boolean
  data: MonthlyReportListItem[]
}

export interface MonthlyReportDetailResponse {
  success: boolean
  data: MonthlyReportDetail
}
