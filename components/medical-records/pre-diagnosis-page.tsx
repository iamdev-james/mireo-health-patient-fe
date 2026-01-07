// components/medical-records/medical-records-page.tsx

import { Info } from "lucide-react"
import { CollapsibleSection } from "@/components/medical-records/collapsible-section"
import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { PreDiagnosis } from "@/types/medical-records"

interface PreDiagnosisPageClientProps {
  data: PreDiagnosis
}

export default function PreDiagnosisPageClient({ data }: PreDiagnosisPageClientProps) {
  return (
    <PageTransition className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Pre-diagnosis</p>
        <div />
      </div>

      <div className="px-6 py-6">
        <CollapsibleSection title="Pre Diagnosis" defaultOpen>
          <p className="text-sm leading-relaxed text-gray-700">{data.description}</p>

          <div className="mt-4 flex gap-3 rounded-xl bg-blue-50 p-4">
            <Info className="h-5 w-5 flex-shrink-0 text-[#0066CC]" />
            <p className="text-sm leading-relaxed text-gray-600">{data.disclaimer}</p>
          </div>
        </CollapsibleSection>
      </div>
    </PageTransition>
  )
}