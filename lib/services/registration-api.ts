// lib/services/registration-api.ts

import { APIError, fetchAPI } from "@/lib/utils/api"
import {
  CreateAccountFormData,
  HealthCheckAnswer,
  OTPVerificationData,
  PersonalInfoFormData,
} from "@/types/registration"

export interface CreateAccountResponse {
  success: boolean
  message: string
}

export interface VerifyOTPResponse {
  success: boolean
  token: string
}

export interface ResendOTPResponse {
  success: boolean
  message: string
}

export interface SubmitPersonalInfoResponse {
  success: boolean
}

export interface SubmitHealthCheckResponse {
  success: boolean
}

export interface CompleteRegistrationResponse {
  success: boolean
  userId: string
}

export const registrationAPI = {
  createAccount: async (data: CreateAccountFormData): Promise<CreateAccountResponse> => {
    return fetchAPI<CreateAccountResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  verifyOTP: async (data: OTPVerificationData): Promise<VerifyOTPResponse> => {
    return fetchAPI<VerifyOTPResponse>("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  resendOTP: async (phoneNumber: string, email: string): Promise<ResendOTPResponse> => {
    return fetchAPI<ResendOTPResponse>("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, email }),
    })
  },

  submitPersonalInfo: async (data: PersonalInfoFormData): Promise<SubmitPersonalInfoResponse> => {
    return fetchAPI<SubmitPersonalInfoResponse>("/auth/personal-info", {
      method: "POST",
      body: JSON.stringify(data),
      requiresAuth: true,
    })
  },

  submitHealthCheck: async (answers: HealthCheckAnswer[]): Promise<SubmitHealthCheckResponse> => {
    return fetchAPI<SubmitHealthCheckResponse>("/auth/health-check", {
      method: "POST",
      body: JSON.stringify({ answers }),
      requiresAuth: true,
    })
  },

  completeRegistration: async (): Promise<CompleteRegistrationResponse> => {
    return fetchAPI<CompleteRegistrationResponse>("/auth/complete-registration", {
      method: "POST",
      requiresAuth: true,
    })
  },
}

export { APIError }
