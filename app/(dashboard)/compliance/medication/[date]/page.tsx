// app/compliance/medication/[date]/page.tsx

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Medication, MedicationDose } from "@/types/compliance"
import { TimeSlotSelector } from "@/components/compliance/time-slot-selector"

async function getMedicationsByDate(date: string): Promise<Medication[]> {
  // TODO: Replace with actual API call
  return [
    {
      id: "1",
      name: "Amlodipine 5mg",
      dosage: "5mg",
      frequency: 3,
      totalDays: 31,
      takenDays: 18,
      calendar: [],
    },
    {
      id: "2",
      name: "Amlodipine 5mg",
      dosage: "5mg",
      frequency: 3,
      totalDays: 31,
      takenDays: 18,
      calendar: [],
    },
  ]
}

interface MedicationDetailPageProps {
  params: { date: string }
}

export default async function MedicationDetailPage({ params }: MedicationDetailPageProps) {
  const medications = await getMedicationsByDate(params.date)

  // Format date for display
  const displayDate = "Oct 3" // TODO: Format from params.date

  return (
    <div className="bg-gray-background min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gray-background pt-safe sticky top-0 z-10 px-4">
        <div className="relative flex items-center justify-center py-4">
          <Link
            href="/compliance"
            className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <ChevronLeft className="h-6 w-6 text-black" />
          </Link>
          <h1 className="text-xl font-semibold text-black">{displayDate}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 px-4 pb-8">
        {medications.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-400">No medications for this date</p>
          </div>
        ) : (
          medications.map((med) => {
            // Mock doses for display - should come from API
            const doses: MedicationDose[] = [
              { time: "morning", taken: true },
              { time: "afternoon", taken: false },
              { time: "night", taken: false },
            ].slice(0, med.frequency)

            return (
              <div key={med.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                <h3 className="mb-4 text-base font-medium text-black">{med.name}</h3>

                <TimeSlotSelector doses={doses} readonly={true} />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
