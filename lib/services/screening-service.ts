// lib/services/screening-service.ts
import { API_ROUTES } from "@/lib/constants/api-routes"
import { fetchAPI } from "@/lib/utils/api"

export interface State {
  id: number
  name: string
}

export interface LGA {
  id: number
  name: string
  state_id: number
}

export interface ScreeningRequest {
  lga_id: number
  address: string
  scheduled_at: string // ISO date format
}

export interface ScreeningResponse {
  screening_id: string
  access_code: string
  authorization_url: string
  amount: number
  status: "screening_not_started" | string
}

export interface VerifyPaymentResponse {
  id: string
  patient_id: string
  chew_id: string | null
  status: "screening_not_started" | "pending" | "completed" | string
  scheduled_at: string
  lga_id: number
  address: string
  result: Record<string, unknown> | null
  pre_diagnosis: string | null
}

export const screeningService = {
  /**
   * Get all states
   */
  getStates: async (): Promise<State[]> => {
    return fetchAPI<State[]>(API_ROUTES.LOCATIONS.STATES, { requiresAuth: true })
  },

  /**
   * Get LGAs for a specific state
   */
  getLGAs: async (stateId: number): Promise<LGA[]> => {
    return fetchAPI<LGA[]>(`${API_ROUTES.LOCATIONS.LGAS}?state_id=${stateId}`, { requiresAuth: true })
  },

  /**
   * Request a screening appointment
   */
  requestScreening: async (data: ScreeningRequest): Promise<ScreeningResponse> => {
    return fetchAPI<ScreeningResponse>(API_ROUTES.SCREENING.REQUEST, {
      method: "POST",
      body: JSON.stringify(data),
      requiresAuth: true,
    })
  },

  /**
   * Verify payment for a screening
   */
  verifyPayment: async (screeningId: string): Promise<VerifyPaymentResponse> => {
    return fetchAPI<VerifyPaymentResponse>(API_ROUTES.SCREENING.VERIFY_PAYMENT(screeningId), {
      method: "POST",
      requiresAuth: true,
    })
  },
}
