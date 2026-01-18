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
  return [PatientStatus.CONSULTATION_SCHEDULED, PatientStatus.SCREENING_BOOKED].includes(status)
}
