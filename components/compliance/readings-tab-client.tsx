// components/compliance/readings-tab-client.tsx
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { DailyReading } from "@/types/compliance"
import { DailyReadings } from "./daily-readings"

interface ReadingsTabClientProps {
  initialReadings: DailyReading[]
}

export function ReadingsTabClient({ initialReadings }: ReadingsTabClientProps) {
  const router = useRouter()
  const [readings] = useState(initialReadings)

  const handleReadingClick = (date: string, type: string) => {
    router.push(`/compliance/reading/${date}?type=${type}`)
  }

  if (readings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium text-black">No Readings Yet</h3>
          <p className="text-sm text-gray-400">Start tracking your health readings</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {readings.map((dailyReading) => (
        <DailyReadings key={dailyReading.date} dailyReading={dailyReading} onReadingClick={handleReadingClick} />
      ))}
    </div>
  )
}
