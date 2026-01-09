// components/compliance/daily-readings.tsx
"use client"

import { DailyReading } from "@/types/compliance"
import { ReadingCard } from "./reading-card"

interface DailyReadingsProps {
  dailyReading: DailyReading
  onReadingClick?: (date: string, type: string) => void
}

export function DailyReadings({ dailyReading, onReadingClick }: DailyReadingsProps) {
  const bloodPressure = dailyReading.readings.find((r) => r.type === "blood-pressure")
  const bloodSugar = dailyReading.readings.find((r) => r.type === "blood-sugar")

  // Check if blood sugar has actual data (not just a placeholder)
  const hasBloodSugar = bloodSugar && bloodSugar.value && !bloodSugar.value.toLowerCase().includes("not logged")

  return (
    <div className="mb-6">
      <p className="mb-3 text-sm text-gray-400">{dailyReading.displayDate}</p>
      <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4">
        {bloodPressure && (
          <ReadingCard reading={bloodPressure} onClick={() => onReadingClick?.(dailyReading.date, "blood-pressure")} />
        )}

        {bloodPressure && <div className="w-px bg-gray-100" />}

        {hasBloodSugar ? (
          <ReadingCard reading={bloodSugar} onClick={() => onReadingClick?.(dailyReading.date, "blood-sugar")} />
        ) : (
          <div className="flex-1">
            <p className="mb-1 text-sm text-gray-400">Blood Sugar</p>
            <p className="text-base text-gray-400">Not logged</p>
          </div>
        )}
      </div>
    </div>
  )
}
