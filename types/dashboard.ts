// types/dashboard.ts

export enum PatientStatus {
  // Screening flow
  SCREENING_NOT_STARTED = "SCREENING_NOT_STARTED",
  SCREENING_PENDING_PAYMENT = "SCREENING_PENDING_PAYMENT",
  SCREENING_PAYMENT_FAILED = "SCREENING_PAYMENT_FAILED",
  SCREENING_AWAITING_CONFIRMATION = "SCREENING_AWAITING_CONFIRMATION",
  SCREENING_BOOKING_CONFIRMED = "SCREENING_BOOKING_CONFIRMED",
  SCREENING_CHEW_ARRIVED = "SCREENING_CHEW_ARRIVED",
  SCREENING_END = "SCREENING_END",
  SCREENING_RESULT_READY_POSITIVE = "SCREENING_RESULT_READY_POSITIVE",
  SCREENING_RESULT_READY_NEGATIVE = "SCREENING_RESULT_READY_NEGATIVE",

  // Case flow
  AI_CLERKING = "AI_CLERKING",
  AWAITING_DOCTOR_REVIEW = "AWAITING_DOCTOR_REVIEW",
  AWAITING_CONSULTATION_BOOKING = "AWAITING_CONSULTATION_BOOKING",
  CONSULTATION_BOOKED = "CONSULTATION_BOOKED",
  CONSULTATION_ENDED = "CONSULTATION_ENDED",
  MANAGEMENT_PLAN_READY = "MANAGEMENT_PLAN_READY",
  LABS_UPLOADED = "LABS_UPLOADED",
  LABS_REVIEWED = "LABS_REVIEWED",
  FOLLOWUP_CONSULTATION_BOOKED = "FOLLOWUP_CONSULTATION_BOOKED",
  TREATMENT_PLAN_READY = "TREATMENT_PLAN_READY",

  // Special UI state
  ACTIVE_TREATMENT = "ACTIVE_TREATMENT",
}

// Helper to map backend status to frontend enum
export function mapBackendStatusToEnum(backendStatus: string): PatientStatus {
  const statusMap: Record<string, PatientStatus> = {
    screening_not_started: PatientStatus.SCREENING_NOT_STARTED,
    screening_pending_payment: PatientStatus.SCREENING_PENDING_PAYMENT,
    screening_payment_failed: PatientStatus.SCREENING_PAYMENT_FAILED,
    screening_awaiting_confirmation: PatientStatus.SCREENING_AWAITING_CONFIRMATION,
    screening_booking_confirmed: PatientStatus.SCREENING_BOOKING_CONFIRMED,
    screening_chew_arrived: PatientStatus.SCREENING_CHEW_ARRIVED,
    screening_end: PatientStatus.SCREENING_END,
    screening_result_ready_positive: PatientStatus.SCREENING_RESULT_READY_POSITIVE,
    screening_result_ready_negative: PatientStatus.SCREENING_RESULT_READY_NEGATIVE,
    ai_clerking: PatientStatus.AI_CLERKING,
    awaiting_doctor_review: PatientStatus.AWAITING_DOCTOR_REVIEW,
    awaiting_consultation_booking: PatientStatus.AWAITING_CONSULTATION_BOOKING,
    consultation_booked: PatientStatus.CONSULTATION_BOOKED,
    consultation_ended: PatientStatus.CONSULTATION_ENDED,
    management_plan_ready: PatientStatus.MANAGEMENT_PLAN_READY,
    labs_uploaded: PatientStatus.LABS_UPLOADED,
    labs_reviewed: PatientStatus.LABS_REVIEWED,
    followup_consultation_booked: PatientStatus.FOLLOWUP_CONSULTATION_BOOKED,
    treatment_plan_ready: PatientStatus.TREATMENT_PLAN_READY,
  }

  return statusMap[backendStatus] || PatientStatus.SCREENING_NOT_STARTED
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
  type: "blood-pressure" | "blood-sugar"
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
