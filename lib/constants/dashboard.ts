// lib/constants/dashboard.ts

import { PatientStatus } from "@/types/dashboard"

export const STATUS_CONFIG: Record<PatientStatus, { title: string; message: string }> = {
  // Screening flow
  [PatientStatus.SCREENING_NOT_STARTED]: {
    title: "Get started with Mireo health",
    message: "Screen for your health conditions, get follow up care, and manage your health",
  },
  [PatientStatus.SCREENING_PENDING_PAYMENT]: {
    title: "Complete your payment",
    message: "Your screening is booked. Please complete payment to confirm your appointment",
  },
  [PatientStatus.SCREENING_PAYMENT_FAILED]: {
    title: "Payment failed",
    message: "Your payment attempt was unsuccessful. Please try again to confirm your screening",
  },
  [PatientStatus.SCREENING_AWAITING_CONFIRMATION]: {
    title: "Payment successful!",
    message: "We're assigning a health worker to your screening. You'll be notified shortly",
  },
  [PatientStatus.SCREENING_BOOKING_CONFIRMED]: {
    title: "Your screening has been booked!",
    message: "Your assessment is set for 23 October, 1PM",
  },
  [PatientStatus.SCREENING_CHEW_ARRIVED]: {
    title: "Health worker has arrived",
    message: "Your screening is about to begin",
  },
  [PatientStatus.SCREENING_END]: {
    title: "Screening completed",
    message: "Your results are being processed. You'll be notified when they're ready",
  },
  [PatientStatus.SCREENING_RESULT_READY_POSITIVE]: {
    title: "Your screening results are ready",
    message: "The doctor has reviewed your screening and recommended next steps",
  },
  [PatientStatus.SCREENING_RESULT_READY_NEGATIVE]: {
    title: "Your screening results are ready",
    message: "Great news! Your screening came back clear",
  },

  // Case flow
  [PatientStatus.AI_CLERKING]: {
    title: "Gathering your health information",
    message: "We're collecting your symptoms and medical history to help the doctor",
  },
  [PatientStatus.AWAITING_DOCTOR_REVIEW]: {
    title: "Awaiting doctor's review",
    message: "We've sent your report to the doctor. They will review it and we'll let you know the next steps",
  },
  [PatientStatus.AWAITING_CONSULTATION_BOOKING]: {
    title: "Schedule a call with Doctor",
    message: "The doctor is reviewing your file and will like to talk to you, please schedule a convenient time",
  },
  [PatientStatus.CONSULTATION_BOOKED]: {
    title: "Your Consultation Call Has Been Scheduled!",
    message: "Your consultation call with Dr David is set for 23 October, 1PM",
  },
  [PatientStatus.CONSULTATION_ENDED]: {
    title: "Consultation completed",
    message: "The doctor is preparing your management plan",
  },
  [PatientStatus.MANAGEMENT_PLAN_READY]: {
    title: "Your management plan is now available",
    message: "The doctor has reviewed your screening and recommended next steps",
  },
  [PatientStatus.LABS_UPLOADED]: {
    title: "Your lab results have been uploaded",
    message:
      "The doctor will review your lab results and you will receive a notification to follow up with the next steps",
  },
  [PatientStatus.LABS_REVIEWED]: {
    title: "Lab results reviewed",
    message: "The doctor has reviewed your lab results",
  },
  [PatientStatus.FOLLOWUP_CONSULTATION_BOOKED]: {
    title: "Follow-up consultation scheduled",
    message: "Your follow-up call is scheduled. The doctor will discuss your lab results",
  },
  [PatientStatus.TREATMENT_PLAN_READY]: {
    title: "Your treatment plan is ready!",
    message: "The doctor has reviewed your result and your treatment plan is ready",
  },
  [PatientStatus.ACTIVE_TREATMENT]: {
    title: "",
    message: "",
  },
}

export const STATUS_ACTIONS: Partial<
  Record<PatientStatus, { label: string; href: string; icon?: "phone" | "arrow-right" }>
> = {
  [PatientStatus.SCREENING_NOT_STARTED]: {
    label: "Start Screening",
    href: "/screening",
    icon: "arrow-right",
  },
  [PatientStatus.SCREENING_PENDING_PAYMENT]: {
    label: "Complete payment",
    href: "/payment",
  },
  [PatientStatus.SCREENING_PAYMENT_FAILED]: {
    label: "Retry payment",
    href: "/payment",
  },
  [PatientStatus.SCREENING_RESULT_READY_POSITIVE]: {
    label: "View results",
    href: "/results",
  },
  [PatientStatus.SCREENING_RESULT_READY_NEGATIVE]: {
    label: "View results",
    href: "/results",
  },
  [PatientStatus.AWAITING_DOCTOR_REVIEW]: {
    label: "View report",
    href: "/report",
  },
  [PatientStatus.AWAITING_CONSULTATION_BOOKING]: {
    label: "Schedule call",
    href: "/schedule",
    icon: "phone",
  },
  [PatientStatus.MANAGEMENT_PLAN_READY]: {
    label: "View plan",
    href: "/plan",
  },
  [PatientStatus.TREATMENT_PLAN_READY]: {
    label: "View treatment plan",
    href: "/treatment-plan",
  },
}

export const READING_STATUS_COLORS = {
  good: "bg-success-500",
  "slightly-off": "bg-warning-500",
  "needs-review": "bg-error-500",
}
