// types/dashboard.ts

export enum PatientStatus {
  PENDING_TREATMENT_PLAN = "PENDING_TREATMENT_PLAN",
  RESULTS_UPLOADED = "RESULTS_UPLOADED",
  AWAITING_REVIEW = "AWAITING_REVIEW",
  SCHEDULE_CONSULTATION = "SCHEDULE_CONSULTATION",
  CONSULTATION_SCHEDULED = "CONSULTATION_SCHEDULED",
  PLAN_AVAILABLE = "PLAN_AVAILABLE",
  LAB_REQUEST = "LAB_REQUEST",
  LAB_RESULTS_UPLOADED = "LAB_RESULTS_UPLOADED",
  NEW_USER = "NEW_USER",
  SCREENING_BOOKED = "SCREENING_BOOKED",
  ACTIVE_TREATMENT = "ACTIVE_TREATMENT",
  TREATMENT_PLAN_READY = "TREATMENT_PLAN_READY",
}

export interface Patient {
  name: string
  avatar?: string
  diagnosis?: string
}

export interface StatusCardAction {
  label: string
  href?: string
  icon?: "phone" | "arrow-right"
}

export interface StatusCardData {
  title: string
  message: string
  action?: StatusCardAction
  countdown?: string
}

export interface LabTest {
  id: string
  name: string
  uploaded: boolean
}

export interface BoardItem {
  id: string
  type: "lab-request" | "booking-confirmation" | "next-steps" | "doctor-review"
  title: string
  message: string
  action?: StatusCardAction
  tests?: LabTest[]
  scheduledDate?: string
  scheduledTime?: string
}

export interface HealthReading {
  id: string
  label: string
  value: string
  lastReading: string
}

export interface MedicationDose {
  id: string
  name: string
  schedule: string
  taken: number
  total: number
}

export interface ReadingStatus {
  day: string
  status: "good" | "slightly-off" | "needs-review"
}

export interface DashboardData {
  status: PatientStatus
  patient: Patient
  statusCard: StatusCardData
  boardItems?: BoardItem[]
  healthReadings?: HealthReading[]
  medications?: MedicationDose[]
  weeklyReadings?: ReadingStatus[]
}
