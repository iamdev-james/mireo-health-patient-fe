// lib/services/medical-record-api.ts

import {
  MedicalRecordsResponse,
  ScreeningResultResponse,
  TreatmentPlanResponse,
  ManagementPlanResponse,
  LabTestsResponse,
} from "@/types/medical-records"
import { fetchAPI, APIError } from "@/lib/utils/api"

export const medicalRecordsAPI = {
  getMedicalRecords: async (): Promise<MedicalRecordsResponse> => {
    return fetchAPI<MedicalRecordsResponse>("/medical-records", {
      method: "GET",
      requiresAuth: true,
    })
  },

  getScreeningResult: async (id: string): Promise<ScreeningResultResponse> => {
    return fetchAPI<ScreeningResultResponse>(`/medical-records/screening/${id}`, {
      method: "GET",
      requiresAuth: true,
    })
  },

  getTreatmentPlan: async (id: string): Promise<TreatmentPlanResponse> => {
    return fetchAPI<TreatmentPlanResponse>(`/medical-records/treatment-plan/${id}`, {
      method: "GET",
      requiresAuth: true,
    })
  },

  getManagementPlan: async (id: string): Promise<ManagementPlanResponse> => {
    return fetchAPI<ManagementPlanResponse>(`/medical-records/management-plan/${id}`, {
      method: "GET",
      requiresAuth: true,
    })
  },

  getLabTests: async (): Promise<LabTestsResponse> => {
    return fetchAPI<LabTestsResponse>("/medical-records/lab-tests", {
      method: "GET",
      requiresAuth: true,
    })
  },

  uploadLabResult: async (testId: string, file: File): Promise<{ success: boolean }> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("testId", testId)

    return fetchAPI<{ success: boolean }>("/medical-records/lab-tests/upload", {
      method: "POST",
      body: formData as any,
      requiresAuth: true,
    })
  },
}

export { APIError }
