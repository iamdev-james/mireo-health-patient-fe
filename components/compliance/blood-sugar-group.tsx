// components/compliance/blood-sugar-group.tsx
"use client"

import { Reading, ReadingStatus } from "@/types/compliance"

interface BloodSugarGroupProps {
  title: string
  subtitle: string
  readings: Reading[]
}

const statusConfig: Record<ReadingStatus, { text: string; color: string }> = {
  good: { text: "Good", color: "#12AF03" },
  "slightly-off": { text: "Slightly off range", color: "#FFA500" },
  "needs-review": { text: "Needs Review", color: "#F60000" },
}

export function BloodSugarGroup({ title, subtitle, readings }: BloodSugarGroupProps) {
  if (readings.length === 0) return null

  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4">
      <h3 className="mb-1 text-base font-medium text-black">{title}</h3>
      <p className="mb-4 text-sm text-gray-400">{subtitle}</p>

      <div className="border-t border-gray-100 pt-4">
        <div className="grid grid-cols-3 gap-4">
          {readings.map((reading) => {
            const config = statusConfig[reading.status]

            return (
              <div key={reading.id}>
                <p className="mb-2 text-xs text-gray-400">{reading.time}</p>
                <p className="mb-1 text-base font-medium text-black">
                  {reading.value} <span className="text-xs font-normal text-gray-400">{reading.unit}</span>
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
          })}
        </div>
      </div>
    </div>
  )
}
