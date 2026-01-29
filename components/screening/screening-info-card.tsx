// components/screening/screening-info-card.tsx
"use client"

interface ScreeningInfoCardProps {
  icon: string
  title: string
  description: string
}

export function ScreeningInfoCard({ icon, title, description }: ScreeningInfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
      <div className="mb-2 text-xl">
        {icon} <span>{title}</span>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}
