// lib/services/sign-in-api.ts

import { APIError, fetchAPI } from "@/lib/utils/api"
import { SignInFormData, SignInOTPData } from "@/types/sign-in"

export interface RequestSignInOTPResponse {
  success: boolean
  message: string
}

export interface VerifySignInOTPResponse {
  success: boolean
  token: string
  user: {
    id: string
    email?: string
    phoneNumber?: string
    name?: string
  }
}

export interface ResendSignInOTPResponse {
  success: boolean
  message: string
}

export const signInAPI = {
  requestOTP: async (data: SignInFormData): Promise<RequestSignInOTPResponse> => {
    return fetchAPI<RequestSignInOTPResponse>("/auth/sign-in/request-otp", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  verifyOTP: async (data: SignInOTPData): Promise<VerifySignInOTPResponse> => {
    return fetchAPI<VerifySignInOTPResponse>("/auth/sign-in/verify-otp", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  resendOTP: async (identifier: string): Promise<ResendSignInOTPResponse> => {
    return fetchAPI<ResendSignInOTPResponse>("/auth/sign-in/resend-otp", {
      method: "POST",
      body: JSON.stringify({ identifier }),
    })
  },
}

export { APIError }
