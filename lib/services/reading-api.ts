// lib/services/reading-api.ts

import { BloodSugarType } from "@/types/readings"

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = "APIError"
  }
}

export const readingAPI = {
  async submitBloodSugar(type: BloodSugarType, value: number) {
    try {
    } catch (error) {
      if (error instanceof APIError) throw error
    }
  },

  async submitBloodPressure(systolic: number, diastolic: number) {
    try {
    } catch (error) {
      if (error instanceof APIError) throw error
    }
  },
}
