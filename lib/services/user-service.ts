import { API_ROUTES } from "@/lib/constants/api-routes"
import { fetchAPI } from "@/lib/utils/api"
import { DashboardStatus, UserProfile } from "@/types/auth"

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    return fetchAPI<UserProfile>(API_ROUTES.USER.PROFILE, {
      requiresAuth: true,
    })
  },

  getDashboardStatus: async (): Promise<DashboardStatus> => {
    return fetchAPI<DashboardStatus>(API_ROUTES.USER.DASHBOARD_STATUS, {
      requiresAuth: true,
    })
  },
}
