// lib/constants/registration.ts

import { HealthCheckQuestion } from "@/types/registration"

export const REGISTRATION_STORAGE_KEY = "mireo_registration_state"

export const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
]

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

export const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
]

export const RELIGION_OPTIONS = [
  { value: "christianity", label: "Christianity" },
  { value: "islam", label: "Islam" },
  { value: "traditional", label: "Traditional" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
]

export const HEALTH_CHECK_QUESTIONS: HealthCheckQuestion[] = [
  {
    id: 1,
    question: "Do you have any known medical conditions?",
    type: "boolean",
  },
  {
    id: 2,
    question: "Are you currently taking any medications?",
    type: "boolean",
  },
  {
    id: 3,
    question: "Do you have any allergies?",
    type: "boolean",
  },
  {
    id: 4,
    question: "Have you had any surgeries in the past?",
    type: "boolean",
  },
  {
    id: 5,
    question: "Do you smoke or use tobacco products?",
    type: "boolean",
  },
]

export const OTP_RESEND_COOLDOWN = 60
