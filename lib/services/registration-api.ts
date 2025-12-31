import {
  APIErrorResponse,
  CreateAccountFormData,
  HealthCheckAnswer,
  OTPVerificationData,
  PersonalInfoFormData,
  VerifyOTPResponse,
} from "@/types/registration"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "APIError"
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = (await response.json().catch(() => ({}))) as APIErrorResponse
      throw new APIError(error.message || "An error occurred", response.status, error.errors)
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof APIError) throw error
    throw new APIError("Network error occurred", 500)
  }
}

export const registrationAPI = {
  createAccount: async (data: CreateAccountFormData) => {
    return fetchAPI<{ success: boolean; message: string }>("/auth/register", {
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

  resendOTP: async (phoneNumber: string, email: string) => {
    return fetchAPI<{ success: boolean; message: string }>("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, email }),
    })
  },

  submitPersonalInfo: async (data: PersonalInfoFormData, token: string) => {
    return fetchAPI<{ success: boolean }>("/auth/personal-info", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
  },

  submitHealthCheck: async (answers: HealthCheckAnswer[], token: string) => {
    return fetchAPI<{ success: boolean }>("/auth/health-check", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answers }),
    })
  },

  completeRegistration: async (token: string) => {
    return fetchAPI<{ success: boolean; userId: string }>("/auth/complete-registration", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}

export { APIError }
