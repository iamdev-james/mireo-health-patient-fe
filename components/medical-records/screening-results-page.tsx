// components/medical-records/screening-results-page.tsx

import Link from "next/link"
import { PageTransition } from "@/components/ui/page-transition"
import { VitalSignCard } from "@/components/medical-records/vital-sign-card"
import { CollapsibleSection } from "@/components/medical-records/collapsible-section"
import { ScreeningResult } from "@/types/medical-records"
import { BackButton } from "@/components/ui/back-button"
import { cn } from "@/lib/utils"

interface ScreeningResultsPageClientProps {
  data: ScreeningResult
}

export default function ScreeningResultsPageClient({ data }: ScreeningResultsPageClientProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "high":
      case "low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <PageTransition className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Screening Results</p>
        <div />
      </div>

      <div className="space-y-6 px-6 py-6">
        {/* Vital Signs */}
        <CollapsibleSection title="Vital Signs" defaultOpen>
          <div className="grid grid-cols-2 gap-3">
            <VitalSignCard
              label="Pulse"
              value={data.vitalSigns.pulse.value}
              unit={data.vitalSigns.pulse.unit}
              status={data.vitalSigns.pulse.status}
            />
            <VitalSignCard
              label="Blood Pressure"
              value={data.vitalSigns.bloodPressure.value}
              unit={data.vitalSigns.bloodPressure.unit}
              status={data.vitalSigns.bloodPressure.status}
            />
            <VitalSignCard
              label="Respiratory Rate"
              value={data.vitalSigns.respiratoryRate.value}
              unit={data.vitalSigns.respiratoryRate.unit}
              status={data.vitalSigns.respiratoryRate.status}
            />
            <VitalSignCard
              label="Temperature"
              value={data.vitalSigns.temperature.value}
              unit={data.vitalSigns.temperature.unit}
              status={data.vitalSigns.temperature.status}
            />
          </div>
        </CollapsibleSection>

        {/* BMI */}
        <CollapsibleSection title="BMI" defaultOpen>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="mt-1 text-base font-medium text-gray-900">
                  {data.bmi.height}
                  <span className="text-sm text-gray-500">{data.bmi.heightUnit}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="mt-1 text-base font-medium text-gray-900">
                  {data.bmi.weight}
                  <span className="text-sm text-gray-500">{data.bmi.weightUnit}</span>
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">BMI</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {data.bmi.bmi}
                <span className="text-sm font-normal text-gray-500">{data.bmi.bmiUnit}</span>
              </p>
              <p className={cn("mt-1 text-sm font-medium", getStatusColor(data.bmi.status))}>
                {data.bmi.status.charAt(0).toUpperCase() + data.bmi.status.slice(1)}
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Baseline Tests */}
        <CollapsibleSection title="Baseline Tests" defaultOpen>
          <div className="space-y-6">
            {/* Blood Sugar */}
            <div>
              <p className="mb-3 font-medium text-gray-900">Blood Sugar</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Random Blood Sugar</p>
                  <p className="mt-2 text-xl font-semibold text-gray-900">
                    {data.baselineTests.bloodSugar.random.value}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      {data.baselineTests.bloodSugar.random.unit}
                    </span>
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm font-medium",
                      getStatusColor(data.baselineTests.bloodSugar.random.status)
                    )}
                  >
                    {data.baselineTests.bloodSugar.random.status.charAt(0).toUpperCase() +
                      data.baselineTests.bloodSugar.random.status.slice(1)}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Fasting Blood Sugar</p>
                  <p className="mt-2 text-xl font-semibold text-gray-900">
                    {data.baselineTests.bloodSugar.fasting.value}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      {data.baselineTests.bloodSugar.fasting.unit}
                    </span>
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm font-medium",
                      getStatusColor(data.baselineTests.bloodSugar.fasting.status)
                    )}
                  >
                    {data.baselineTests.bloodSugar.fasting.status.charAt(0).toUpperCase() +
                      data.baselineTests.bloodSugar.fasting.status.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Urinalysis */}
            <div>
              <p className="mb-3 font-medium text-gray-900">Urinalysis</p>
              <div className="grid grid-cols-2 gap-3">
                {data.baselineTests?.urinalysis?.map((test, index) => (
                  <div key={index} className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">{test.label}</p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">{test.value}</p>
                    <p className={cn("mt-1 text-sm font-medium", getStatusColor(test.status))}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* View Pre-diagnosis Button */}
        <Link
          href={`/medical-records/pre-diagnosis/${data.id}`}
          className="block w-full rounded-xl bg-[#0066CC] py-4 text-center text-lg font-medium text-white hover:bg-[#0052A3]"
        >
          View pre - diagnosis
        </Link>
      </div>
    </PageTransition>
  )
}
