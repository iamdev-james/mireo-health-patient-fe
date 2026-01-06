// components/medical-records/vital-sign-card.tsx

import { cn } from "@/lib/utils"
import { VitalStatus } from "@/types/medical-records"

interface VitalSignCardProps {
  label: string
  value: string
  unit: string
  status: VitalStatus
}

const statusConfig = {
  normal: { text: "Normal", color: "text-green-600" },
  high: { text: "High", color: "text-red-600" },
  low: { text: "Low", color: "text-red-600" },
}

export function VitalSignCard({ label, value, unit, status }: VitalSignCardProps) {
  const config = statusConfig[status]

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
        <span className="text-sm font-normal text-gray-500">{unit}</span>
      </p>
      <p className={cn("mt-1 text-sm font-medium", config.color)}>{config.text}</p>
    </div>
  )
}
