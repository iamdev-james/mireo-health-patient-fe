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
      //   const response = await fetch("/api/readings/blood-sugar", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ type, value }),
      //   })
      //   if (!response.ok) {
      //     throw new APIError("Failed to log blood sugar reading", response.status)
      //   }
      //   return response.json()
    } catch (error) {
      if (error instanceof APIError) throw error
    }
  },

  async submitBloodPressure(systolic: number, diastolic: number) {
    try {
      //   const response = await fetch("/api/readings/blood-pressure", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ systolic, diastolic }),
      //   })
      //   if (!response.ok) {
      //     throw new APIError("Failed to log blood pressure reading", response.status)
      //   }
      //   return response.json()
    } catch (error) {
      if (error instanceof APIError) throw error
    }
  },
}
