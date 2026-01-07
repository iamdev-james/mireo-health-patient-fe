// components/medical-records/medical-records-page.tsx

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { CollapsibleSection } from "@/components/medical-records/collapsible-section"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import { TreatmentPlan } from "@/types/medical-records"

interface TreatmentPlanPageClientProps {
  data: TreatmentPlan
}

export default function TreatmentPlanPageClient({ data }: TreatmentPlanPageClientProps) {
  return (
    <PageTransition className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Treatment plan</p>
        <div />
      </div>

      <div className="space-y-6 px-6 py-6">
        {/* Full consultation note link */}
        {data.consultationNoteLink && (
          <Link href={data.consultationNoteLink} className="flex items-center gap-2 text-[#0066CC] hover:underline">
            <span className="font-medium">Full consultation note</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}

        {/* Diagnosis */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Diagnosis</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">{data.diagnosis.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{data.diagnosis.description}</p>
          </div>
        </div>

        {/* Treatment Plan Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Treatment Plan</h2>

          {/* Medication prescription */}
          <CollapsibleSection title="Medication prescription" defaultOpen className="mb-3">
            <div className="space-y-6">
              {data.medications.map((med, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <h4 className="text-base font-semibold text-gray-900">{med.name}</h4>
                  <p className="mt-2 text-sm text-gray-600">{med.frequency}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Lifestyle recommendations */}
          {data.lifestyleRecommendations && data.lifestyleRecommendations.length > 0 && (
            <CollapsibleSection title="Lifestyle recommendations" defaultOpen className="mb-3">
              <ul className="list-disc space-y-2 pl-5">
                {data.lifestyleRecommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {rec.text}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          {/* Hospital Referral */}
          {data.hospitalReferral && (
            <CollapsibleSection title="Hospital Referral" defaultOpen>
              <p className="text-sm leading-relaxed text-gray-700">
                You are advised to visit <span className="font-semibold">{data.hospitalReferral.hospitalName}</span>,{" "}
                <span className="font-semibold">{data.hospitalReferral.location}</span> for{" "}
                {data.hospitalReferral.reason}.
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

        {/* Start health management journey button */}
        <Button className="h-14 w-full rounded-xl bg-[#0066CC] text-lg font-medium text-white hover:bg-[#0052A3]">
          Start your health management journey
        </Button>
      </div>
    </PageTransition>
  )
}
