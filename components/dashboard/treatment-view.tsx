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
        <div className="mt-9 mb-4">
          <span className="text-sm text-gray-400">Diagnosis: </span>
          <span className="text-sm font-medium text-black">{data.patient.diagnosis}</span>
        </div>
      )}

      {data.weeklyReadings && (
        <div className="bg-gray-350 rounded-xl border border-gray-50 p-4">
          <p className="mb-4 text-xs text-gray-400 md:text-sm">
            Here&apos;s how your readings are looking over the{" "}
            <span className="font-medium text-black">last 7 days</span>
          </p>

          <div className="mb-6 flex items-end justify-between">
            {data.weeklyReadings.map((reading, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className={cn("h-8 w-8 rounded-full", READING_STATUS_COLORS[reading.status])} />
                <span className="text-xs text-gray-400">{reading.day}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="bg-success-500 h-2 w-2 rounded-full" />
              <span className="text-success-500">Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="bg-warning-500 h-2 w-2 rounded-full" />
              <span className="text-warning-500">Slightly off range</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="bg-error-500 h-2 w-2 rounded-full" />
              <span className="text-error-500">Needs Review</span>
            </div>
          </div>
        </div>
      )}

      {data.healthReadings && (
        <section className="mt-10">
          <h2 className="mb-5 text-lg text-black">My Readings</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.healthReadings.map((reading) => (
              <div key={reading.id} className="border-primary/30 bg-primary/15 rounded-lg border p-3">
                <h3 className="text-primary mb-3 text-xs font-medium md:text-sm">{reading.label}</h3>
                <p className="mb-1 text-base font-medium text-gray-800 md:text-lg">{reading.value}</p>
                <p className="mb-4 text-xs text-gray-400">Last reading: {reading.lastReading}</p>

                <Button asChild className="text-xs">
                  <Link href={`/compliance/reading/${reading.type}`}>Log reading</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.medications && (
        <section className="mt-10">
          <h2 className="mb-3 text-lg text-black">Medication of the day</h2>
          <div className="bg-gray-350 space-y-4 rounded-xl border border-gray-50 p-4 pt-0">
            <div>
              {data.medications.map((med) => {
                const progress = Math.round((med.taken / med.total) * 100)

                return (
                  <div key={med.id} className="flex items-center gap-x-6 border-b py-5 last:border-b-0">
                    <div className="mb-3 flex flex-3/4 items-start justify-between">
                      <div>
                        <h3 className="text-base font-medium text-black md:text-lg">{med.name}</h3>
                        <p className="mt-1 text-xs text-gray-400 md:text-sm">{med.schedule}</p>
                      </div>
                    </div>

                    <div className="flex flex-1/4 flex-col items-end gap-1">
                      <span className="text-sm font-medium text-gray-400">
                        {med.taken}/{med.total}
                      </span>

                      <div className="bg-gray-70 h-2 w-32 overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(Math.max(progress, 0), 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button size="xl" className="w-full">
              <Link href={`/compliance/medication/log`} prefetch>
                Log today&apos;s dose
              </Link>
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
