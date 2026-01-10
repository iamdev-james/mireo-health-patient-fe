// app/compliance/medication/[date]/page.tsx

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { TimeSlotSelector } from "@/components/compliance/time-slot-selector"
import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { Medication, MedicationDose } from "@/types/compliance"

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
      dosage_taken: [
        { time: "morning", taken: true },
        { time: "afternoon", taken: false },
        { time: "night", taken: false },
      ],
    },
    {
      id: "2",
      name: "Amlodipine 5mg",
      dosage: "5mg",
      frequency: 3,
      totalDays: 31,
      takenDays: 18,
      calendar: [],
      dosage_taken: [
        { time: "morning", taken: true },
        { time: "afternoon", taken: true },
        { time: "night", taken: false },
      ],
    },
  ]
}

interface MedicationDetailPageProps {
  params: Promise<{
    date: string
  }>
}

export default async function MedicationDetailPage({ params }: MedicationDetailPageProps) {
  const { date } = await params
  const medications = await getMedicationsByDate(date)

  const displayDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-3 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">{displayDate}</p>
        <div />
      </div>

      <div className="space-y-4 px-4 pb-8">
        {medications.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-400">No medications for this date</p>
          </div>
        ) : (
          medications.map((med) => {
            const doses: MedicationDose[] = med.dosage_taken?.slice(0, med.frequency) || []

            return (
              <div key={med.id} className="rounded-xl border border-gray-50 bg-white p-3.5">
                <h3 className="mb-4 text-base text-black">{med.name}</h3>

                <TimeSlotSelector doses={doses} readonly={true} />
              </div>
            )
          })
        )}
      </div>
    </PageTransition>
  )
}
