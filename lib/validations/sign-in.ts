// lib/validations/signin.ts

import { z } from "zod"

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const isPhone = (value: string) => /^\d{10,15}$/.test(value)

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone number is required")
    .refine((value) => isEmail(value) || isPhone(value), "Please enter a valid email address or phone number"),
})

export const signInOTPSchema = z.object({
  code: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP can only contain digits"),
})

export type SignInInput = z.infer<typeof signInSchema>
export type SignInOTPInput = z.infer<typeof signInOTPSchema>
