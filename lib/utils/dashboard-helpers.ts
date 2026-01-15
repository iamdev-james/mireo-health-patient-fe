// lib/utils/dashboard-helpers.ts

import { PatientStatus, StatusCardData } from "@/types/dashboard"
import { STATUS_CONFIG, STATUS_ACTIONS } from "@/lib/constants/dashboard"

export function getStatusConfig(status: PatientStatus, countdown?: string): StatusCardData {
  const config = STATUS_CONFIG[status]
  const action = STATUS_ACTIONS[status]

  return {
    ...config,
    action,
    countdown,
  }
}

export function hasBoard(status: PatientStatus): boolean {
  return [
    PatientStatus.SCHEDULE_CONSULTATION,
    PatientStatus.LAB_REQUEST,
    PatientStatus.SCREENING_BOOKED,
    PatientStatus.TREATMENT_PLAN_READY,
  ].includes(status)
}

export function isActiveTreatment(status: PatientStatus): boolean {
  return status === PatientStatus.ACTIVE_TREATMENT
}

export function hasCountdown(status: PatientStatus): boolean {
  return [PatientStatus.CONSULTATION_SCHEDULED, PatientStatus.SCREENING_BOOKED].includes(status)
}
