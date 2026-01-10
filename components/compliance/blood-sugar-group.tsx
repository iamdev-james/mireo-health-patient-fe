// components/compliance/blood-sugar-group.tsx
"use client"

import { Reading, ReadingStatus } from "@/types/compliance"

interface BloodSugarGroupProps {
  title: string
  subtitle: string
  readings: Reading[]
}

const statusConfig: Record<ReadingStatus, { text: string; color: string }> = {
  good: { text: "Good", color: "#00A841" },
  "slightly-off": { text: "Slightly off range", color: "#F09E06" },
  "needs-review": { text: "Needs Review", color: "#D9191B" },
}

export function BloodSugarGroup({ title, subtitle, readings }: BloodSugarGroupProps) {
  if (readings.length === 0) return null

  return (
    <div className="mb-4 rounded-xl border border-gray-50 bg-white p-4">
      <h3 className="mb-1 text-base font-medium text-black">{title}</h3>
      <p className="mb-4 text-sm text-gray-400">{subtitle}</p>

      <div className="border-t border-gray-50 pt-4">
        <div className="grid grid-cols-3 gap-4">
          {readings.map((reading) => {
            const config = statusConfig[reading.status]

            return (
              <div key={reading.id}>
                <p className="mb-2 text-xs font-medium text-gray-400">{reading.time}</p>
                <p className="mb-1 text-base font-medium text-black">
                  {reading.value} <span className="text-xs">{reading.unit}</span>
                </p>
                <div className="mb-1 h-1 w-28 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
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
          })}
        </div>
      </div>
    </div>
  )
}
