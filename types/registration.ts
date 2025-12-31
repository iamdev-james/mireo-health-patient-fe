// types/registration.ts

export interface VerifyOTPResponse {
  success: boolean
  token: string
}

export interface APIErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export interface CreateAccountFormData {
  surname: string
  firstname: string
  email: string
  phoneNumber: string
  countryCode: string
}

export interface PersonalInfoFormData {
  gender: string
  dateOfBirth: string
  maritalStatus: string
  religion: string
  tribe?: string | undefined
  occupation: string
}

export interface HealthCheckQuestion {
  id: number
  question: string
  type: "boolean" | "text" | "multiple"
  options?: string[]
}

export interface HealthCheckAnswer {
  questionId: number | undefined
  answer: string | boolean
}

export interface OTPVerificationData {
  code: string
  phoneNumber: string
  email: string
}

export interface RegistrationState {
  currentStep: number
  accountInfo: Partial<CreateAccountFormData>
  personalInfo: Partial<PersonalInfoFormData>
  healthCheckAnswers: HealthCheckAnswer[]
  isVerified: boolean
  completedSteps: number[]
}

export type RegistrationStep = "account-creation" | "otp-verification" | "personal-info" | "health-check" | "completion"
