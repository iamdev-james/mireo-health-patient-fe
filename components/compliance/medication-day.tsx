// components/compliance/medication-day.tsx
"use client"

import { MedicationStatus } from "@/types/compliance"

interface MedicationDayProps {
  day: number
  status: MedicationStatus
  onClick?: () => void
}

const statusColors: Record<MedicationStatus, string> = {
  taken: "#4A90E2",
  partial: "#FFA500",
  missed: "#F60000",
  future: "#E5E5E5",
}

export function MedicationDay({ day, status, onClick }: MedicationDayProps) {
  const bgColor = statusColors[status]
  const textColor = status === "future" ? "#999999" : "#FFFFFF"

  return (
    <button
      onClick={onClick}
      disabled={status === "future"}
      className="flex h-11 w-11 items-center justify-center rounded-lg text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {day}
    </button>
  )
}
