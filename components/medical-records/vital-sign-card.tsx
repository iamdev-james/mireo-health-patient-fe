// components/medical-records/vital-sign-card.tsx

import { VitalStatus } from "@/types/medical-records"

interface VitalSignCardProps {
  label: string
  value: string
  unit: string
  status: VitalStatus
}

const statusConfig = {
  normal: { text: "Normal", color: "#12AF03" },
  high: { text: "High", color: "#F60000" },
  low: { text: "Low", color: "#F60000" },
}

export function VitalSignCard({ label, value, unit, status }: VitalSignCardProps) {
  const config = statusConfig[status]

  return (
    <div className="bg-gray-350 rounded-lg border border-gray-50 p-4">
      <p className="text-sm text-gray-400 md:text-base">{label}</p>
      <p className="mt-2 text-xl text-black">
        {value}
        <span className="ml-1.5 text-sm font-medium text-gray-400">{unit}</span>
      </p>
      <p className="mt-1 text-sm md:text-base" style={{ color: config.color }}>
        {config.text}
      </p>
    </div>
  )
}
