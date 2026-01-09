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
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Pre-diagnosis</p>
        <div />
      </div>

      <div className="px-6 py-6">
        <CollapsibleSection title="Pre Diagnosis" className="rounded-2xl border border-gray-50 p-5" defaultOpen>
          <p className="text-sm font-medium text-gray-800">{data.description}</p>

          <div className="bg-gray-350 mt-4 flex gap-3 rounded-xl border border-gray-50 p-4">
            <Info className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
            <p className="text-sm text-gray-400">{data.disclaimer}</p>
          </div>
        </CollapsibleSection>
      </div>
    </PageTransition>
  )
}
