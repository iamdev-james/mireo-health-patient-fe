// app/compliance/medication/log/page.tsx

"use client"

import { useState } from "react"
import { TimeSlotSelector } from "@/components/compliance/time-slot-selector"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import { Medication, MedicationDose, TimeOfDay } from "@/types/compliance"

// Extended type for UI state
interface MedicationWithDoses extends Omit<Medication, "doses"> {
  doses: MedicationDose[]
  recorded?: boolean
}

// TODO: Fetch from API
const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Amlodipine 5mg",
    dosage: "5mg",
    frequency: 3,
    months: [],
  },
  {
    id: "2",
    name: "Amlodipine 5mg",
    dosage: "5mg",
    frequency: 3,
    months: [],
  },
]

export default function LogMedicationPage() {
  const [medications, setMedications] = useState<MedicationWithDoses[]>(
    mockMedications.map((med) => ({
      ...med,
      doses: [
        { time: "morning" as TimeOfDay, taken: false },
        { time: "afternoon" as TimeOfDay, taken: false },
        { time: "night" as TimeOfDay, taken: false },
      ].slice(0, med.frequency),
      recorded: false,
    }))
  )

  const handleToggleDose = (medIndex: number, time: TimeOfDay | string) => {
    setMedications((prev) => {
      const updated = [...prev]
      const med = updated[medIndex]
      if (med) {
        updated[medIndex] = {
          ...med,
          doses: med.doses.map((d) => (d.time === time ? { ...d, taken: !d.taken } : d)),
        }
      }
      return updated
    })
  }

  const handleRecord = async (medIndex: number) => {
    const med = medications[medIndex]
    if (!med) return

    // const takenCount = med.doses.filter((d) => d.taken).length

    setMedications((prev) => {
      const updated = [...prev]
      const currentMed = updated[medIndex]
      if (currentMed) {
        updated[medIndex] = { ...currentMed, recorded: true }
      }
      return updated
    })
  }

  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-3 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Log Medication</p>
        <div />
      </div>

      <div className="space-y-4 px-4 pb-8">
        {medications.map((med, index) => {
          const takenCount = med.doses.filter((d) => d.taken).length
          const isRecorded = med.recorded

          return (
            <div key={med.id} className="rounded-xl border border-gray-50 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base text-black">{med.name}</h3>
                <div className="flex min-w-[35%] flex-col items-end gap-1">
                  <p className="text-xs text-gray-400 md:text-sm">
                    {takenCount}/{med.frequency}
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${(takenCount / med.frequency) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <TimeSlotSelector
                doses={med.doses}
                onToggle={(time) => handleToggleDose(index, time)}
                readonly={isRecorded}
              />

              <div className="mt-4">
                {isRecorded ? (
                  <p className="text-sm font-medium text-blue-600">Recorded</p>
                ) : (
                  <Button onClick={() => handleRecord(index)} disabled={takenCount === 0} className="px-5" size={"sm"}>
                    Record
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </PageTransition>
  )
}
