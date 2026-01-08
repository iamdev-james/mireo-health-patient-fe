// components/medical-records/medical-records-page.tsx

import { Info, MoveUpRight } from "lucide-react"
import Link from "next/link"
import { CollapsibleSection } from "@/components/medical-records/collapsible-section"
import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { ManagementPlan } from "@/types/medical-records"

interface ManagementPlanPageClientProps {
  data: ManagementPlan
}

export default function ManagementPlanPageClient({ data }: ManagementPlanPageClientProps) {
  return (
    <PageTransition className="bg-gray-350 m-auto min-h-screen w-full max-w-2xl pb-20 sm:bg-white">
      <div className="bg-gray-350 sticky top-0 z-10 grid grid-cols-3 items-center px-3 py-4 sm:bg-white">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Management Plan</p>
        <div />
      </div>

      <div className="space-y-6 px-4 pt-3 pb-6">
        {/* Pre Diagnosis */}
        {data.preDiagnosis && (
          <CollapsibleSection
            title="Pre Diagnosis"
            defaultOpen
            className="mb-3 rounded-2xl border border-gray-50 bg-white p-4"
          >
            <p className="text-sm leading-relaxed text-gray-800">{data.preDiagnosis.description}</p>

            <div className="bg-gray-350 mt-4 flex gap-3 rounded-xl border border-gray-50 p-3">
              <Info className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
              <p className="text-sm leading-relaxed text-gray-400">{data.preDiagnosis.disclaimer}</p>
            </div>
          </CollapsibleSection>
        )}

        {/* Provisional Diagnosis */}
        {data.provisionalDiagnosis && (
          <CollapsibleSection
            title="Provisional Diagnosis"
            defaultOpen
            className="mb-3 rounded-2xl border border-gray-50 bg-white p-4"
          >
            <p className="mb-3 text-sm text-gray-400">Patient shows indicators consistent with:</p>
            <ul className="list-disc space-y-2 pl-5">
              {data.provisionalDiagnosis.conditions.map((condition, index) => (
                <li key={index} className="text-sm text-black">
                  {condition}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {/* Laboratory Test Request */}
        {data.labTestRequest && (
          <CollapsibleSection
            title="Laboratory Test Request"
            defaultOpen
            className="mb-3 rounded-2xl border border-gray-50 bg-white p-4"
          >
            <p className="mb-4 text-sm leading-relaxed font-medium text-gray-400">{data.labTestRequest.description}</p>
            <ul className="list-disc space-y-4 pl-5">
              {data.labTestRequest.tests.map((test, index) => (
                <li key={index} className="text-sm text-black">
                  {test}
                </li>
              ))}
            </ul>
            {data.labTestRequest.resultsLink && (
              <Link
                href={data.labTestRequest.resultsLink}
                className="border-primary text-primary mt-4 block w-full rounded-md border py-3 text-center text-sm font-medium hover:bg-blue-50"
              >
                View results
              </Link>
            )}
          </CollapsibleSection>
        )}

        {/* Medication prescription */}
        {data.medications && data.medications.length > 0 && (
          <CollapsibleSection
            title="Medication prescription"
            defaultOpen
            className="mb-3 rounded-2xl border border-gray-50 bg-white p-4"
          >
            <div className="space-y-6">
              {data.medications.map((med, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <h4 className="text-base font-medium">{med.name}</h4>
                    <p className="mt-1 text-sm text-gray-400">{med.frequency}</p>
                  </div>
                  <span className="text-sm text-gray-400">{med.dosage}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Hospital Referral */}
        {data.hospitalReferral && (
          <CollapsibleSection
            title="Hospital Referral"
            defaultOpen
            className="rounded-2xl border border-gray-50 bg-white p-4"
          >
            <p className="text-sm leading-relaxed text-gray-400">
              You are advised to visit <span className="text-black">{data.hospitalReferral.hospitalName}</span>,{" "}
              <span className="text-black">{data.hospitalReferral.location}</span> for {data.hospitalReferral.reason}.
            </p>
            {data.hospitalReferral.mapsLink && (
              <Link
                href={data.hospitalReferral.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-4 inline-flex items-center gap-2 underline"
              >
                <span>Get directions from google</span>
                <MoveUpRight className="h-4 w-4" />
              </Link>
            )}
          </CollapsibleSection>
        )}
      </div>
    </PageTransition>
  )
}
