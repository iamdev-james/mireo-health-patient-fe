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
  time: TimeOfDay
  taken: boolean
}

export interface DailyMedication {
  day: number
  status: MedicationStatus
  doses: MedicationDose[]
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: number // doses per day
  totalDays: number
  takenDays: number
  calendar: DailyMedication[]
}

export interface ComplianceData {
  readings: DailyReading[]
  medications: Medication[]
}
