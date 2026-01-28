import { API_ROUTES } from "@/lib/constants/api-routes"
import { fetchAPI } from "@/lib/utils/api"
import {
  AuthResponse,
  ConfirmOtpRequest,
  ConfirmOtpResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  SendOtpRequest,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/types/auth"

export const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>(API_ROUTES.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  confirmOtp: async (data: ConfirmOtpRequest): Promise<ConfirmOtpResponse> => {
    return fetchAPI<ConfirmOtpResponse>(API_ROUTES.AUTH.CONFIRM_OTP, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  sendOtp: async (data: SendOtpRequest): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>(API_ROUTES.AUTH.SEND_OTP, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    return fetchAPI<RefreshTokenResponse>(API_ROUTES.AUTH.REFRESH_TOKEN, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    return fetchAPI<UpdateProfileResponse>(API_ROUTES.AUTH.UPDATE_PROFILE, {
      method: "PATCH",
      body: JSON.stringify(data),
      requiresAuth: true,
    })
  },
}
