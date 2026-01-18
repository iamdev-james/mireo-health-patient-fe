// types/readings.ts

export type BloodSugarType = "random" | "fasting" | "post-meal"

export interface BloodSugarReading {
  type: BloodSugarType
  value: number
  unit: "mg/dl"
  timestamp: string
}

export interface BloodPressureReading {
  systolic: number
  diastolic: number
  unit: "mmHg"
  timestamp: string
}

export interface ReadingTypeOption {
  id: BloodSugarType
  title: string
  description: string
}

export const BLOOD_SUGAR_TYPES: ReadingTypeOption[] = [
  {
    id: "random",
    title: "Random blood sugar",
    description: "Anytime of the day",
  },
  {
    id: "fasting",
    title: "Fasting blood sugar",
    description: "Before eating",
  },
  {
    id: "post-meal",
    title: "Post-meal blood sugar",
    description: "2 hours after eating",
  },
]
