// lib/services/monthly-reports-api.ts

import { APIError, fetchAPI } from "@/lib/utils/api"
import { MonthlyReportDetailResponse, MonthlyReportsResponse } from "@/types/monthly-reports"

export const monthlyReportsAPI = {
  getMonthlyReports: async (): Promise<MonthlyReportsResponse> => {
    return fetchAPI<MonthlyReportsResponse>("/monthly-reports", {
      method: "GET",
      requiresAuth: true,
    })
  },

  getMonthlyReportDetail: async (reportId: string): Promise<MonthlyReportDetailResponse> => {
    return fetchAPI<MonthlyReportDetailResponse>(`/monthly-reports/${reportId}`, {
      method: "GET",
      requiresAuth: true,
    })
  },
}

export { APIError }
