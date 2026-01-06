// components/medical-records/medical-record-card.tsx

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { RecordType } from "@/types/medical-records"

interface MedicalRecordCardProps {
  id: string
  type: RecordType
  title: string
  date: string
}

const typeRoutes: Record<RecordType, string> = {
  screening: "/medical-records/screening",
  consultation: "/medical-records/consultation",
  lab_test: "/medical-records/lab-tests",
}

export function MedicalRecordCard({ id, type, title, date }: MedicalRecordCardProps) {
  const href = `${typeRoutes[type]}/${id}`

  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl bg-white p-6 transition-colors hover:bg-gray-50"
    >
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{date}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </Link>
  )
}
