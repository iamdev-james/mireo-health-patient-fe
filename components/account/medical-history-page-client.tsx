// components/account/medical-history-page-client.tsx

"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { BioDataRow } from "@/components/account/bio-data-page-client"
import { PageTransition } from "@/components/ui/page-transition"

interface MedicalHistoryPageClientProps {
  data: {
    hypertension: boolean
    diabetes: boolean
    currentMedication: string
    allergies: string
  }
}

export default function MedicalHistoryPageClient({ data }: MedicalHistoryPageClientProps) {
  const router = useRouter()

  return (
    <PageTransition className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <button
          onClick={() => router.back()}
          className="justify-self-start rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 font-light" />
        </button>

        <p className="text-center text-lg font-medium md:text-xl whitespace-nowrap">Medical History</p>

        <div />
      </div>

      <div className="px-6 py-2">
        <div className="rounded-2xl border border-gray-50 bg-white px-4 pt-0 pb-2">
          <BioDataRow label="History of hypertension :" value={data.hypertension ? "Yes" : "No"} />

          <BioDataRow label="Diagnosed with diabetes:" value={data.diabetes ? "Yes" : "No"} />

          <BioDataRow label="Current medication :" value={data.currentMedication || "None"} />

          <BioDataRow label="Allergies :" value={data.allergies || "None"} />
        </div>
      </div>
    </PageTransition>
  )
}
