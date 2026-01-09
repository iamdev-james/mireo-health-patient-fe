// components/compliance/medication-calendar.tsx
"use client"

import { Medication } from "@/types/compliance"
import { MedicationDay } from "./medication-day"

interface MedicationCalendarProps {
  medication: Medication
  onDayClick?: (medicationId: string, day: number) => void
}

export function MedicationCalendar({ medication, onDayClick }: MedicationCalendarProps) {
  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium text-black">{medication.name}</h3>
        <p className="text-sm text-gray-400">
          {medication.takenDays}/{medication.totalDays}
        </p>
      </div>

      <div className="grid grid-cols-10 gap-2">
        {medication.calendar.map((day) => (
          <MedicationDay
            key={day.day}
            day={day.day}
            status={day.status}
            onClick={() => onDayClick?.(medication.id, day.day)}
          />
        ))}
      </div>
    </div>
  )
}
