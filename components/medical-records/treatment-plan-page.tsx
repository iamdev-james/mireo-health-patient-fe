// components/medical-records/medical-records-page.tsx

import { MoveUpRight, ArrowRight } from "lucide-react"
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
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Treatment plan</p>
        <div />
      </div>

      <div className="space-y-3 px-6 py-2">
        {/* Full consultation note link */}
        {data.consultationNoteLink && (
          <Link
            href={data.consultationNoteLink}
            className="text-primary flex items-center gap-2 text-sm hover:underline"
          >
            <span>Full consultation note</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        {/* Diagnosis */}
        <div>
          <h2 className="mb-4 text-lg font-medium">Diagnosis</h2>
          <div className="rounded-xl border border-gray-50 bg-white p-5">
            <h3 className="font-medium">{data.diagnosis.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-800">{data.diagnosis.description}</p>
          </div>
        </div>

        {/* Treatment Plan Section */}
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-medium">Treatment Plan</h2>

          {/* Medication prescription */}
          <CollapsibleSection
            title="Medication prescription"
            defaultOpen
            className="mb-3 rounded-2xl border border-gray-50 bg-white p-4"
          >
            <div className="space-y-5 border-t border-gray-50 pt-4">
              {data.medications.map((med, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <h4 className="text-base font-medium">{med.name}</h4>
                  <p className="mt-2 text-sm text-gray-400">{med.frequency}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Lifestyle recommendations */}
          {data.lifestyleRecommendations && data.lifestyleRecommendations.length > 0 && (
            <CollapsibleSection
              title="Lifestyle recommendations"
              defaultOpen
              className="mb-3 rounded-2xl border border-gray-50 p-4"
            >
              <ul className="list-disc space-y-2 pl-5">
                {data.lifestyleRecommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-800">
                    {rec.text}
                  </li>
                ))}
              </ul>
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

        {/* Start health management journey */}
        <Link
          href="/medical-records/management-plan"
          className="bg-primary hover:bg-primary/90 block w-full rounded-md py-3 text-center text-sm font-medium text-white"
          prefetch
        >
          Start your health management journey
        </Link>
      </div>
    </PageTransition>
  )
}
