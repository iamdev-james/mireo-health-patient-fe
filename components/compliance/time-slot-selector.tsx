// components/compliance/time-slot-selector.tsx
"use client"

import { Check, X } from "lucide-react"
import { MedicationDose, TimeOfDay } from "@/types/compliance"

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
            className={`flex items-center gap-2 rounded-md border px-4 py-2.5 transition-all ${
              isActive
                ? "bg-primary-200/10 border-primary-200/50 text-primary"
                : "bg-gray-350 border-transparent text-gray-400"
            } ${!readonly && "hover:border-primary-200/70"} disabled:cursor-default`}
          >
            {isActive ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-sm font-medium">{timeLabels[dose.time]}</span>
          </button>
        )
      })}
    </div>
  )
}
