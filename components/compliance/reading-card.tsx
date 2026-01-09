// components/compliance/reading-card.tsx
"use client"

import { Reading, ReadingStatus } from "@/types/compliance"

interface ReadingCardProps {
  reading: Reading
  onClick?: () => void
}

const statusConfig: Record<ReadingStatus, { text: string; color: string }> = {
  good: { text: "Good", color: "#12AF03" },
  "slightly-off": { text: "Slightly off range", color: "#FFA500" },
  "needs-review": { text: "Needs Review", color: "#F60000" },
}

export function ReadingCard({ reading, onClick }: ReadingCardProps) {
  const config = statusConfig[reading.status]
  const label = reading.type === "blood-pressure" ? "Blood Pressure" : "Blood Sugar"

  return (
    <div className="flex-1 cursor-pointer" onClick={onClick}>
      <p className="mb-1 text-sm text-gray-400">{label}</p>
      <p className="mb-1 text-lg font-medium text-black">
        {reading.value} <span className="text-sm font-normal text-gray-400">{reading.unit}</span>
      </p>
      <div className="mb-1 h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: config.color,
            width: "70%",
          }}
        />
      </div>
      <p className="text-xs" style={{ color: config.color }}>
        {config.text}
      </p>
    </div>
  )
}
