// components/account/bio-data-row.tsx

import { cn } from "@/lib/utils"

interface BioDataRowProps {
  label: string
  value: string
  editable?: boolean
  onEdit?: () => void
}

export function BioDataRow({ label, value, editable = false, onEdit }: BioDataRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-base font-medium text-gray-900">{value}</span>
        {editable && onEdit && (
          <button onClick={onEdit} className="text-sm font-medium text-[#0066CC] hover:underline">
            Edit
          </button>
        )}
      </div>
    </div>
  )
}
