// components/medical-records/medical-records-page.tsx

import { Info, ExternalLink } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/ui/page-transition"
import { CollapsibleSection } from "@/components/medical-records/collapsible-section"
import { ManagementPlan } from "@/types/medical-records"
import { BackButton } from "@/components/ui/back-button"

interface ManagementPlanPageClientProps {
  data: ManagementPlan
}

export default function ManagementPlanPageClient({ data }: ManagementPlanPageClientProps) {
  return (
    <PageTransition className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Management Plan</p>
        <div />
      </div>

      <div className="space-y-6 px-6 py-6">
        {/* Pre Diagnosis */}
        {data.preDiagnosis && (
          <CollapsibleSection title="Pre Diagnosis" defaultOpen>
            <p className="text-sm leading-relaxed text-gray-700">{data.preDiagnosis.description}</p>

            <div className="mt-4 flex gap-3 rounded-xl bg-blue-50 p-4">
              <Info className="h-5 w-5 flex-shrink-0 text-[#0066CC]" />
              <p className="text-sm leading-relaxed text-gray-600">{data.preDiagnosis.disclaimer}</p>
            </div>
          </CollapsibleSection>
        )}

        {/* Provisional Diagnosis */}
        {data.provisionalDiagnosis && (
          <CollapsibleSection title="Provisional Diagnosis" defaultOpen>
            <p className="mb-3 text-sm text-gray-700">Patient shows indicators consistent with:</p>
            <ul className="list-disc space-y-2 pl-5">
              {data.provisionalDiagnosis.conditions.map((condition, index) => (
                <li key={index} className="text-sm font-medium text-gray-900">
                  {condition}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {/* Laboratory Test Request */}
        {data.labTestRequest && (
          <CollapsibleSection title="Laboratory Test Request" defaultOpen>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">{data.labTestRequest.description}</p>
            <ul className="list-disc space-y-2 pl-5">
              {data.labTestRequest.tests.map((test, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {test}
                </li>
              ))}
            </ul>
            {data.labTestRequest.resultsLink && (
              <Link
                href={data.labTestRequest.resultsLink}
                className="mt-4 block w-full rounded-xl border-2 border-[#0066CC] py-3 text-center text-base font-medium text-[#0066CC] hover:bg-blue-50"
              >
                View results
              </Link>
            )}
          </CollapsibleSection>
        )}

        {/* Medication prescription */}
        {data.medications && data.medications.length > 0 && (
          <CollapsibleSection title="Medication prescription" defaultOpen>
            <div className="space-y-6">
              {data.medications.map((med, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">{med.name}</h4>
                    <p className="mt-1 text-sm text-gray-600">{med.frequency}</p>
                  </div>
                  <span className="text-sm text-gray-500">{med.dosage}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Hospital Referral */}
        {data.hospitalReferral && (
          <CollapsibleSection title="Hospital Referral" defaultOpen>
            <p className="text-sm leading-relaxed text-gray-700">
              You are advised to visit <span className="font-semibold">{data.hospitalReferral.hospitalName}</span>,{" "}
              <span className="font-semibold">{data.hospitalReferral.location}</span> for {data.hospitalReferral.reason}
              .
            </p>
            {data.hospitalReferral.mapsLink && (
              <Link
                href={data.hospitalReferral.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[#0066CC] hover:underline"
              >
                <span className="font-medium">Get directions from google</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </CollapsibleSection>
        )}
      </div>
    </PageTransition>
  )
}
