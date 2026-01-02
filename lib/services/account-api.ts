// lib/services/account-api.ts

import { APIError, fetchAPI } from "@/lib/utils/api"
import { BioData, MedicalHistory, UserProfile } from "@/types/account"

export interface GetUserProfileResponse {
  success: boolean
  data: UserProfile
}

export interface GetBioDataResponse {
  success: boolean
  data: BioData
}

export interface UpdateBioDataResponse {
  success: boolean
  message: string
}

export interface GetMedicalHistoryResponse {
  success: boolean
  data: MedicalHistory
}

export interface DeleteAccountResponse {
  success: boolean
  message: string
}

export const accountAPI = {
  getUserProfile: async (): Promise<GetUserProfileResponse> => {
    return fetchAPI<GetUserProfileResponse>("/account/profile", {
      method: "GET",
      requiresAuth: true,
    })
  },

  getBioData: async (): Promise<GetBioDataResponse> => {
    return fetchAPI<GetBioDataResponse>("/account/bio-data", {
      method: "GET",
      requiresAuth: true,
    })
  },

  updateBioDataField: async (field: string, value: string): Promise<UpdateBioDataResponse> => {
    return fetchAPI<UpdateBioDataResponse>("/account/bio-data/update", {
      method: "PATCH",
      body: JSON.stringify({ field, value }),
      requiresAuth: true,
    })
  },

  getMedicalHistory: async (): Promise<GetMedicalHistoryResponse> => {
    return fetchAPI<GetMedicalHistoryResponse>("/account/medical-history", {
      method: "GET",
      requiresAuth: true,
    })
  },

  deleteAccount: async (): Promise<DeleteAccountResponse> => {
    return fetchAPI<DeleteAccountResponse>("/account/delete", {
      method: "DELETE",
      requiresAuth: true,
    })
  },

  signOut: async (): Promise<{ success: boolean }> => {
    return fetchAPI<{ success: boolean }>("/auth/sign-out", {
      method: "POST",
      requiresAuth: true,
    })
  },
}

export { APIError }
