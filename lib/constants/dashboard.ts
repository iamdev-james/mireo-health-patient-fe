// lib/constants/dashboard.ts

import { PatientStatus } from "@/types/dashboard"

export const STATUS_CONFIG: Record<PatientStatus, { title: string; message: string }> = {
  [PatientStatus.PENDING_TREATMENT_PLAN]: {
    title: "Your treatment plan will be sent shortly",
    message: "The doctor is reviewing your result, your treatment plan will be sent shortly",
  },
  [PatientStatus.RESULTS_UPLOADED]: {
    title: "Your screening results have been uploaded!",
    message: "",
  },
  [PatientStatus.AWAITING_REVIEW]: {
    title: "Awaiting doctor's review",
    message: "We've sent your report to the doctor. They will review it and we'll let you know the next steps",
  },
  [PatientStatus.SCHEDULE_CONSULTATION]: {
    title: "Schedule a call with Doctor",
    message: "The doctor is reviewing your file and will like to talk to you, please schedule a convenient time",
  },
  [PatientStatus.CONSULTATION_SCHEDULED]: {
    title: "Your Consultation Call Has Been Scheduled!",
    message: "Your consultation call with Dr David is set for 23 October, 1PM",
  },
  [PatientStatus.PLAN_AVAILABLE]: {
    title: "Your management plan is now available",
    message: "The doctor has reviewed your screening and recommended next steps",
  },
  [PatientStatus.LAB_REQUEST]: {
    title: "Your management plan is now available",
    message: "The doctor has reviewed your screening and recommended next steps",
  },
  [PatientStatus.LAB_RESULTS_UPLOADED]: {
    title: "Your lab results have been uploaded",
    message:
      "The doctor will review your lab results and you will receive a notification to follow up with the next steps",
  },
  [PatientStatus.NEW_USER]: {
    title: "Get started with Mireo health",
    message: "Screen for your health conditions, get follow up care, and manage your health",
  },
  [PatientStatus.SCREENING_BOOKED]: {
    title: "Your screening has been booked!",
    message: "Your assessment is set for 23 October, 1PM",
  },
  [PatientStatus.ACTIVE_TREATMENT]: {
    title: "",
    message: "",
  },
  [PatientStatus.TREATMENT_PLAN_READY]: {
    title: "Your treatment plan is ready!",
    message: "The doctor has reviewed your result and your treatment plan is ready",
  },
}

export const STATUS_ACTIONS: Partial<
  Record<PatientStatus, { label: string; href: string; icon?: "phone" | "arrow-right" }>
> = {
  [PatientStatus.RESULTS_UPLOADED]: { label: "View results", href: "/results" },
  [PatientStatus.AWAITING_REVIEW]: { label: "View report", href: "/report" },
  [PatientStatus.SCHEDULE_CONSULTATION]: { label: "Schedule call", href: "/schedule", icon: "phone" },
  [PatientStatus.PLAN_AVAILABLE]: { label: "View plan", href: "/plan" },
  [PatientStatus.LAB_REQUEST]: { label: "View plan", href: "/plan" },
  [PatientStatus.NEW_USER]: { label: "Start Screening", href: "/screening", icon: "arrow-right" },
  [PatientStatus.TREATMENT_PLAN_READY]: { label: "View treatment plan", href: "/treatment-plan" },
}

export const READING_STATUS_COLORS = {
  good: "bg-success-500",
  "slightly-off": "bg-warning-500",
  "needs-review": "bg-error-500",
}
