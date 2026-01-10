// components/compliance/medication-calendar.tsx
"use client"

import { Medication, MedicationStatus } from "@/types/compliance"

interface MedicationCalendarProps {
  medication: Medication
  monthIndex: number
  onDayClick: (medicationId: string, day: number) => void
}

export function MedicationCalendar({ medication, monthIndex, onDayClick }: MedicationCalendarProps) {
  const monthData = medication?.months?.[monthIndex]

  if (!monthData) {
    return null
  }
  return (
    <div className="mb-4 rounded-xl border border-gray-50 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base md:text-lg">{medication.name}</h3>
        <span className="text-sm text-gray-400">
          {monthData?.takenDays}/{monthData?.totalDays}
        </span>
      </div>

      <div className="grid grid-cols-10 gap-2">
        {monthData?.calendar?.map((day) => (
          <button
            key={day.day}
            onClick={() => onDayClick(medication.id, day.day)}
            className={`h-9 w-8 rounded-md border text-xs transition-all active:scale-95 ${getStatusColor(day.status)}`}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  )
}

function getStatusColor(status: MedicationStatus): string {
  switch (status) {
    case "taken":
      return "bg-[#055CBE66] text-primary border-[#055CBE]"
    case "missed":
      return "bg-[#F11C1E] text-white border-transparent"
    case "partial":
      return "bg-[#FF983F] text-white border-transparent"
    case "future":
      return "bg-gray-50 text-white border-[#EDEDED]"
    default:
      return "bg-gray-50 text-white border-[#EDEDED]"
  }
}
