// lib/utils/dashboard-helpers.ts

import { STATUS_ACTIONS, STATUS_CONFIG } from "@/lib/constants/dashboard"
import { PatientStatus, StatusCardData } from "@/types/dashboard"

export function getStatusConfig(status: PatientStatus, countdown?: string): StatusCardData {
  const config = STATUS_CONFIG[status]
  const action = STATUS_ACTIONS[status]

  return {
    ...config,
    action,
    countdown,
  }
}

export function isActiveTreatment(status: PatientStatus): boolean {
  return status === PatientStatus.ACTIVE_TREATMENT
}

export function hasCountdown(status: PatientStatus): boolean {
  return [
    PatientStatus.CONSULTATION_BOOKED,
    PatientStatus.SCREENING_BOOKING_CONFIRMED,
    PatientStatus.FOLLOWUP_CONSULTATION_BOOKED,
  ].includes(status)
}

export function formatScheduledDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  // Format: "23 October, 1PM"
  const day = date.getDate()
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const time = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
    .replace(":00", "")
    .replace(" ", "") // Remove space before AM/PM if needed to match design (1PM)

  return `${day} ${month}, ${time}`
}

export function calculateCountdown(targetDateString: string): string {
  if (!targetDateString) return ""
  const target = new Date(targetDateString).getTime()
  const now = new Date().getTime()
  const diff = target - now

  if (diff <= 0) return "00d :00h :00m"

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  const pad = (num: number) => num.toString().padStart(2, "0")

  return `${pad(days)}d :${pad(hours)}h :${pad(minutes)}m`
}
