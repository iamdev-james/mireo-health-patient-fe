// components/compliance/reading-card.tsx
"use client"

import { Reading, ReadingStatus } from "@/types/compliance"

interface ReadingCardProps {
  reading: Reading
  noLabel?: boolean
  onClick?: () => void
}

const statusConfig: Record<ReadingStatus, { text: string; color: string }> = {
  good: { text: "Good", color: "#00A841" },
  "slightly-off": { text: "Slightly off range", color: "#F09E06" },
  "needs-review": { text: "Needs Review", color: "#D9191B" },
}

export function ReadingCard({ reading, onClick, noLabel }: ReadingCardProps) {
  const config = statusConfig[reading.status]
  const label = reading.type === "blood-pressure" ? "Blood Pressure" : "Blood Sugar"

  return (
    <div className="flex-1 cursor-pointer" onClick={onClick}>
      {!noLabel && <p className="mb-1 text-xs font-medium text-gray-400">{label}</p>}
      <p className="mb-2 text-lg font-medium text-gray-800">
        {reading.value} <span className="text-sm text-gray-800">{reading.unit}</span>
      </p>
      <div className="mb-1 h-1 w-full overflow-hidden rounded-full bg-white">
        <div
          className="h-full w-28 rounded-full"
          style={{
            backgroundColor: config.color,
          }}
        />
      </div>
      <p className="text-xs" style={{ color: config.color }}>
        {config.text}
      </p>
    </div>
  )
}
