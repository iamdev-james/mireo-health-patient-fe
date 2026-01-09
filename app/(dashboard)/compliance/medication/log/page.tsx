// app/compliance/medication/log/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Medication, TimeOfDay, MedicationDose } from "@/types/compliance"
import { TimeSlotSelector } from "@/components/compliance/time-slot-selector"

// Extended type for UI state
interface MedicationWithDoses extends Medication {
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

export default function LogMedicationPage() {
  const router = useRouter()
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

  const handleToggleDose = (medIndex: number, time: TimeOfDay) => {
    setMedications((prev) => {
      const updated = [...prev]
      const doses = updated[medIndex].doses.map((d) => (d.time === time ? { ...d, taken: !d.taken } : d))
      updated[medIndex] = { ...updated[medIndex], doses }
      return updated
    })
  }

  const handleRecord = async (medIndex: number) => {
    // TODO: Save to API and IndexedDB
    const med = medications[medIndex]
    const takenCount = med.doses.filter((d) => d.taken).length

    console.log("Recording medication:", {
      id: med.id,
      doses: med.doses,
      takenCount,
    })

    // Update UI to show recorded state
    setMedications((prev) => {
      const updated = [...prev]
      updated[medIndex] = { ...updated[medIndex], recorded: true }
      return updated
    })
  }

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
          <h1 className="text-xl font-semibold text-black">Log Medication</h1>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 px-4 pb-8">
        {medications.map((med, index) => {
          const takenCount = med.doses.filter((d) => d.taken).length
          const isRecorded = med.recorded

          return (
            <div key={med.id} className="rounded-2xl border border-gray-100 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-medium text-black">{med.name}</h3>
                <p className="text-sm text-gray-400">
                  {takenCount}/{med.frequency}
                </p>
              </div>

              <div className="mb-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${(takenCount / med.frequency) * 100}%` }}
                  />
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
                  <button
                    onClick={() => handleRecord(index)}
                    disabled={takenCount === 0}
                    className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    Record
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
