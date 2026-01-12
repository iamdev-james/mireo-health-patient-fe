// components/compliance/time-slot-selector.tsx
"use client"

import { Check, X } from "lucide-react"
import { MedicationDose, TimeOfDay } from "@/types/compliance"

interface TimeSlotSelectorProps {
  doses: MedicationDose[]
  onToggle?: (time: TimeOfDay | string) => void
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
      {doses.map((dose: MedicationDose) => {
        const isActive = dose.taken
        const timeLabel =
          dose.time && typeof dose.time === "string" && dose.time in timeLabels
            ? timeLabels[dose.time as TimeOfDay]
            : dose.time || "Unknown"

        return (
          <button
            key={dose.time}
            onClick={() => !readonly && dose.time && onToggle?.(dose.time)}
            disabled={readonly}
            className={`flex items-center gap-2 rounded-md border px-4 py-2.5 transition-all ${
              isActive
                ? "bg-primary-200/10 border-primary-200/50 text-primary"
                : "bg-gray-350 border-transparent text-gray-400"
            } ${!readonly && "hover:border-primary-200/70"} disabled:cursor-default`}
          >
            {isActive ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-sm font-medium">{timeLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
