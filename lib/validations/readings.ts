// lib/validations/readings.ts

import { z } from "zod"

export const bloodSugarSchema = z.object({
  type: z.enum(["random", "fasting", "post-meal"]),
  value: z
    .string()
    .min(1, "Blood sugar value is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid blood sugar value",
    }),
})

export const bloodPressureSchema = z.object({
  value: z
    .string()
    .min(1, "Blood pressure value is required")
    .refine(
      (val) => {
        const parts = val.split("/")
        if (parts.length !== 2) return false
        const systolic = Number(parts[0])
        const diastolic = Number(parts[1])
        return !isNaN(systolic) && !isNaN(diastolic) && systolic > 0 && diastolic > 0
      },
      {
        message: "Please enter a valid blood pressure (e.g., 120/80)",
      }
    ),
})

export type BloodSugarInput = z.infer<typeof bloodSugarSchema>
export type BloodPressureInput = z.infer<typeof bloodPressureSchema>
