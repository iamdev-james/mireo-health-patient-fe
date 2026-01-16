// components/dashboard/treatment-view.tsx

import { DashboardData } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { READING_STATUS_COLORS } from "@/lib/constants/dashboard"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TreatmentViewProps {
  data: DashboardData
}

export function TreatmentView({ data }: TreatmentViewProps) {
  return (
    <>
      {data.patient.diagnosis && (
        <div className="mb-6">
          <span className="text-sm text-gray-500">Diagnosis: </span>
          <span className="text-sm font-semibold text-black">{data.patient.diagnosis}</span>
        </div>
      )}

      {data.weeklyReadings && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <p className="mb-4 text-sm text-gray-500">
            Here&apos;s how your readings are looking over the{" "}
            <span className="font-medium text-black">last 7 days</span>
          </p>

          <div className="mb-6 flex items-end justify-between">
            {data.weeklyReadings.map((reading, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className={cn("h-12 w-12 rounded-full", READING_STATUS_COLORS[reading.status])} />
                <span className="text-xs text-gray-500">{reading.day}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-gray-600">Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-gray-600">Slightly off range</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-gray-600">Needs Review</span>
            </div>
          </div>
        </div>
      )}

      {data.healthReadings && (
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-semibold text-black">My Readings</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.healthReadings.map((reading) => (
              <div key={reading.id} className="rounded-2xl border border-gray-100 bg-blue-50/30 p-5">
                <h3 className="mb-1 text-base font-medium text-blue-600">{reading.label}</h3>
                <p className="mb-1 text-3xl font-semibold text-black">{reading.value}</p>
                <p className="mb-4 text-sm text-gray-500">Last reading: {reading.lastReading}</p>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl bg-blue-600 py-5 text-base font-medium hover:bg-blue-700"
                >
                  <Link href="/readings/log">Log reading</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.medications && (
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-semibold text-black">Medication of the day</h2>
          <div className="space-y-4">
            {data.medications.map((med) => {
              const progress = Math.round((med.taken / med.total) * 100)

              return (
                <div key={med.id} className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-black">{med.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{med.schedule}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-400">
                      {med.taken}/{med.total}
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )
            })}

            <Button size="lg" className="w-full rounded-xl bg-blue-600 py-6 text-lg font-medium hover:bg-blue-700">
              Log today&apos;s dose
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
