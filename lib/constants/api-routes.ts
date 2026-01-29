export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    CONFIRM_OTP: "/auth/confirm-otp",
    SEND_OTP: "/auth/send-otp",
    REFRESH_TOKEN: "/auth/refresh-token",
    UPDATE_PROFILE: "/users/patients",
  },
  USER: {
    PROFILE: "/users/patient",
    DASHBOARD_STATUS: "/users/patient/dashboard-status",
  },
  SCREENING: {
    REQUEST: "/screenings/requests",
    VERIFY_PAYMENT: (screeningId: string) => `/screenings/${screeningId}/verify_payment`,
  },
  LOCATIONS: {
    STATES: "/common/locations/states",
    LGAS: "/common/locations/lgas",
  },
} as const
