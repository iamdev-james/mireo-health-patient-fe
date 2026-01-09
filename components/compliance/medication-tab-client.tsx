// components/compliance/medication-tab-client.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Medication } from "@/types/compliance"
import { MonthNavigator } from "./month-navigator"
import { MedicationCalendar } from "./medication-calendar"

interface MedicationTabClientProps {
  initialMedications: Medication[]
  initialMonth: string
}

export function MedicationTabClient({ initialMedications, initialMonth }: MedicationTabClientProps) {
  const router = useRouter()
  const [medications] = useState(initialMedications)
  const [currentMonth, setCurrentMonth] = useState(initialMonth)

  const handleDayClick = (medicationId: string, day: number) => {
    const date = `${currentMonth}-${day.toString().padStart(2, "0")}`
    router.push(`/compliance/medication/${date}`)
  }

  const handleLogClick = () => {
    router.push("/compliance/medication/log")
  }

  const handlePreviousMonth = () => {
    // TODO: Implement month navigation
    console.log("Previous month")
  }

  const handleNextMonth = () => {
    // TODO: Implement month navigation
    console.log("Next month")
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <MonthNavigator currentMonth={currentMonth} onPrevious={handlePreviousMonth} onNext={handleNextMonth} />

        <button
          onClick={handleLogClick}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          Log
        </button>
      </div>

      {medications.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-medium text-black">No Medications</h3>
            <p className="text-sm text-gray-400">Start tracking your medication compliance</p>
          </div>
        </div>
      ) : (
        medications.map((medication) => (
          <MedicationCalendar key={medication.id} medication={medication} onDayClick={handleDayClick} />
        ))
      )}
    </div>
  )
}
