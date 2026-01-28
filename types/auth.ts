export interface RegisterRequest {
  first_name: string
  last_name: string
  email: string
  phone: string
  role: "patient"
  invitation_code?: string
}

export interface AuthResponse {
  status: string
  message: string
}

export interface ConfirmOtpRequest {
  identifier: string
  otp: string
}

export interface Dashboard {
  stage: string
  status: string
  screening_id: string
  case_id: string
  scheduled_at: string
  chew_name: string
  chew_phone: string
  doctor_name: string
  doctor_id: string
  management_plan_id: string
  treatment_plan_id: string
  lab_requests: string[]
}

export interface ConfirmOtpResponse {
  access_token: string
  refresh_token: string
  email: string
  user_id: string
  role: string
  dashboard: Dashboard
}

export interface SendOtpRequest {
  identifier: string
}

export interface RefreshTokenRequest {
  refresh_token: string
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
  email: string
  user_id: string
  role: string
  dashboard: Dashboard
}

export interface UpdateProfileRequest {
  marital_status: string
  religion: string
  tribe: string
  occupation: string
  lga_id: number
  address: string
  gender: string
  date_of_birth: string
}

export interface UpdateProfileResponse {
  email: string
  phone: string
  first_name: string
  last_name: string
  id: string
  role: string
  gender: string
  date_of_birth: string
  marital_status: string
  religion: string
  tribe: string
  occupation: string
  address: string
  lga_name: string
  state_name: string
  manager_id: string
  primary_doctor_id: string
}
