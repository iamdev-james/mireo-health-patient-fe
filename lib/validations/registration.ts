// lib/validations/registration.ts

import { z } from "zod"

export const createAccountSchema = z.object({
  surname: z
    .string()
    .min(2, "Surname must be at least 2 characters")
    .max(50, "Surname must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Surname can only contain letters, spaces, hyphens, and apostrophes"),
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\d+$/, "Phone number can only contain digits"),
  countryCode: z.string().min(1, "Country code is required"),
})

export const otpVerificationSchema = z.object({
  code: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP can only contain digits"),
})

export const personalInfoSchema = z.object({
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
    .refine((date) => {
      const parts = date.split("/").map(Number)
      const [day, month, year] = parts
      if (!day || !month || !year || parts.length !== 3) {
        return false
      }
      const birthDate = new Date(year, month - 1, day)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 13 && age <= 120
    }, "You must be at least 13 years old"),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    required_error: "Please select your marital status",
  }),
  religion: z.string().min(1, "Please select your religion"),
  tribe: z.enum(["igbo", "yoruba", "hausa", "other"], {
    required_error: "Please select your tribe",
  }),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(100, "Occupation must not exceed 100 characters"),
})

export const healthCheckAnswerSchema = z.object({
  questionId: z.number(),
  answer: z.union([z.string(), z.boolean()]),
})

export type CreateAccountInput = z.infer<typeof createAccountSchema>
export type OTPVerificationInput = z.infer<typeof otpVerificationSchema>
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>
export type HealthCheckAnswerInput = z.infer<typeof healthCheckAnswerSchema>
