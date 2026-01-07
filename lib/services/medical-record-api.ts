import { APIError, fetchAPI } from "@/lib/utils/api"
import {
  LabTestsResponse,
  ManagementPlanResponse,
  MedicalRecordsResponse,
  PreDiagnosis,
  ScreeningResultResponse,
  TreatmentPlanResponse,
} from "@/types/medical-records"

export const medicalRecordsAPI = {
  getMedicalRecords: async (): Promise<MedicalRecordsResponse> => {
    return fetchAPI<MedicalRecordsResponse>("/medical-records", {
      method: "GET",
      requiresAuth: true,
    })
  },

  getScreeningResult: async (): Promise<ScreeningResultResponse> => {
    return fetchAPI<ScreeningResultResponse>("/medical-records/screening", {
      method: "GET",
      requiresAuth: true,
    })
  },

  getTreatmentPlan: async (): Promise<TreatmentPlanResponse> => {
    return fetchAPI<TreatmentPlanResponse>("/medical-records/treatment-plan", {
      method: "GET",
      requiresAuth: true,
    })
  },

  getManagementPlan: async (): Promise<ManagementPlanResponse> => {
    return fetchAPI<ManagementPlanResponse>("/medical-records/management-plan", {
      method: "GET",
      requiresAuth: true,
    })
  },

  getPreDiagnosis: async (): Promise<{ success: boolean; data: PreDiagnosis }> => {
    return fetchAPI<{ success: boolean; data: PreDiagnosis }>("/medical-records/pre-diagnosis", {
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

    // Note: For FormData, we need to override headers
    const token = typeof window !== "undefined" ? sessionStorage.getItem("auth_token") : null

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/medical-records/lab-tests/upload`, {
      method: "POST",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    return response.json() as Promise<{ success: boolean }>
  },
}

export { APIError }
