// components/medical-records/medical-records-page.tsx

import { MedicalRecordCard } from "@/components/medical-records/medical-record-card"
import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { MedicalRecord } from "@/types/medical-records"

interface MedicalRecordsPageClientProps {
  records: MedicalRecord[]
}

export default function MedicalRecordsPageClient({ records }: MedicalRecordsPageClientProps) {
  return (
    <PageTransition className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Medical Records</p>
        <div />
      </div>

      <div className="px-6 py-6">
        {records.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-gray-500">No medical records found</p>
            <p className="mt-2 text-sm text-gray-400">
              Your medical records will appear here after consultations
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <MedicalRecordCard
                key={record.id}
                id={record.id}
                type={record.type}
                title={record.title}
                date={record.date}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}