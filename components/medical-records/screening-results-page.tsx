// components/medical-records/screening-results-page.tsx

import Link from "next/link"
import { CollapsibleSection } from "@/components/medical-records/collapsible-section"
import { VitalSignCard } from "@/components/medical-records/vital-sign-card"
import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { ScreeningResult } from "@/types/medical-records"

interface ScreeningResultsPageClientProps {
  data: ScreeningResult
}

export default function ScreeningResultsPageClient({ data }: ScreeningResultsPageClientProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "#12AF03"
      case "high":
      case "low":
        return "#F60000"
      default:
        return "#6B7280"
    }
  }

  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white pb-20">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Screening Results</p>
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
          <div className="bg-gray-350 space-y-3 rounded-lg border border-gray-50 p-4">
            <div className="space-y-3">
              <div className="items-cemter flex justify-between">
                <p className="text-sm text-gray-400">Height</p>
                <p className="mt-1 text-base font-medium text-black">
                  {data.bmi.height}
                  <span className="ml-1 text-sm text-gray-400">{data.bmi.heightUnit}</span>
                </p>
              </div>
              <div className="items-cemter flex justify-between">
                <p className="text-sm text-gray-400">Weight</p>
                <p className="mt-1 text-base font-medium text-black">
                  {data.bmi.weight}
                  <span className="ml-1 text-sm text-gray-400">{data.bmi.weightUnit}</span>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-black">BMI</p>
                <p className="mt-1 text-lg font-medium text-black">
                  {data.bmi.bmi}
                  <span className="ml-1 text-sm font-normal text-gray-500">{data.bmi.bmiUnit}</span>
                </p>
              </div>
              <p className="mt-1 text-sm" style={{ color: getStatusColor(data.bmi.status) }}>
                {data.bmi.status.charAt(0).toUpperCase() + data.bmi.status.slice(1)}
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Baseline Tests */}
        <CollapsibleSection title="Baseline Tests" defaultOpen>
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm">Blood Sugar</p>
              <div className="bg-gray-350 grid grid-cols-2 gap-3 rounded-lg border border-gray-50 p-4">
                <div className="">
                  <p className="text-sm text-gray-400">Random Blood Sugar</p>
                  <p className="mt-2 text-xl font-medium">
                    {data.baselineTests.bloodSugar.random.value} {data.baselineTests.bloodSugar.random.unit}
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: getStatusColor(data.baselineTests.bloodSugar.random.status) }}
                  >
                    {data.baselineTests.bloodSugar.random.status.charAt(0).toUpperCase() +
                      data.baselineTests.bloodSugar.random.status.slice(1)}
                  </p>
                </div>
                <div className="">
                  <p className="text-sm text-gray-400">Fasting Blood Sugar</p>
                  <p className="mt-2 text-xl font-medium">
                    {data.baselineTests.bloodSugar.fasting.value} {data.baselineTests.bloodSugar.fasting.unit}
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: getStatusColor(data.baselineTests.bloodSugar.fasting.status) }}
                  >
                    {data.baselineTests.bloodSugar.fasting.status.charAt(0).toUpperCase() +
                      data.baselineTests.bloodSugar.fasting.status.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm">Urinalysis</p>
              <div className="bg-gray-350 grid grid-cols-2 rounded-lg border border-gray-50 px-4">
                {data.baselineTests.urinalysis.map((test, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-50 py-5 last:border-0 [&:nth-last-child(2)]:border-b-0"
                  >
                    <p className="text-sm text-gray-400">{test.label}</p>
                    <p className="mt-2 text-xl font-medium">{test.value}</p>
                    <p className="mt-1 text-sm" style={{ color: getStatusColor(test.status) }}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <Link
          href="/medical-records/pre-diagnosis"
          className="bg-primary hover:bg-primary/90 block w-full rounded-md py-3 text-center text-sm font-medium text-white"
          prefetch
        >
          View pre - diagnosis
        </Link>
      </div>
    </PageTransition>
  )
}
