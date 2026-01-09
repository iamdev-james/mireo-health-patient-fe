// components/compliance/time-slot-selector.tsx
"use client"

import { Check, X } from "lucide-react"
import { TimeOfDay, MedicationDose } from "@/types/compliance"

interface TimeSlotSelectorProps {
  doses: MedicationDose[]
  onToggle?: (time: TimeOfDay) => void
  readonly?: boolean
}

const timeLabels: Record<TimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  night: "Night",
}

export function TimeSlotSelector({ doses, onToggle, readonly = false }: TimeSlotSelectorProps) {
  return (
    <div className="flex gap-3">
      {doses.map((dose) => {
        const isActive = dose.taken

        return (
          <button
            key={dose.time}
            onClick={() => !readonly && onToggle?.(dose.time)}
            disabled={readonly}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 transition-all ${
              isActive ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 bg-white text-gray-400"
            } ${!readonly && "hover:border-blue-400"} disabled:cursor-default`}
          >
            {isActive ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-sm font-medium">{timeLabels[dose.time]}</span>
          </button>
        )
      })}
    </div>
  )
}
