// components/medical-records/medical-record-card.tsx

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { RecordType } from "@/types/medical-records"

interface MedicalRecordCardProps {
  id: string
  type: RecordType
  title: string
  date: string
}

const typeRoutes: Record<RecordType, string> = {
  screening: "/medical-records/screening",
  consultation: "/medical-records/treatment-plan",
  lab_test: "/medical-records/lab-tests",
}

export function MedicalRecordCard({ type, title, date }: MedicalRecordCardProps) {
  const href = typeRoutes[type]

  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-solid border-gray-50 bg-white p-4 transition-colors hover:bg-gray-50/50 md:p-6"
      prefetch
    >
      <div>
        <h3 className="text-lg text-black">{title}</h3>
        <p className="mt-1.5 text-sm text-gray-400">{date}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-700" />
    </Link>
  )
}
