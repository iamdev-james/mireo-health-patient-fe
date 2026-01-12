// types/compliance.ts

export type ReadingStatus = "good" | "slightly-off" | "needs-review"
export type MedicationStatus = "taken" | "missed" | "partial" | "future"
export type TimeOfDay = "morning" | "afternoon" | "night"

export interface Reading {
  id: string
  type: "blood-pressure" | "blood-sugar"
  value: string
  unit: string
  status: ReadingStatus
  timestamp: string
  time: string
  subType?: string // For blood sugar: "random", "fasting", "post-meal"
  note?: string
}

export interface DailyReading {
  date: string
  displayDate: string
  readings: Reading[]
}

export interface MedicationDose {
  time: TimeOfDay | string
  taken: boolean
}

export interface MedicationDay {
  day: number
  status: MedicationStatus
  doses: MedicationDose[]
}

export interface MonthData {
  month: string // e.g., "October", "November", "December"
  year: number // e.g., 2024
  totalDays: number
  takenDays: number
  calendar: MedicationDay[]
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: number
  totalDays?: number
  takenDays?: number
  months: MonthData[]
  dosage_taken?: MedicationDose[]
}

export interface ComplianceData {
  readings: DailyReading[]
  medications: Medication[]
}
