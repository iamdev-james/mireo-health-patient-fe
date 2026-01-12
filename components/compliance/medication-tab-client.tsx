// components/compliance/medication-tab-client.tsx
"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { Medication } from "@/types/compliance"
import { MedicationCalendar } from "./medication-calendar"
import { MonthNavigator } from "./month-navigator"
import { Button } from "../ui/button"

interface MedicationTabClientProps {
  initialMedications: Medication[]
  initialMonth: string
}

export function MedicationTabClient({ initialMedications, initialMonth }: MedicationTabClientProps) {
  const router = useRouter()
  const [medications] = useState(initialMedications)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentMonth = medications[0]?.months?.[currentMonthIndex]
  const maxMonths = medications[0]?.months?.length || 0

  const handleDayClick = (medicationId: string, day: number) => {
    if (!currentMonth) return
    const date = `${currentMonth.year}-${getMonthNumber(currentMonth.month)}-${day.toString().padStart(2, "0")}`
    router.push(`/compliance/medication/${date}`)
  }

  const handleLogClick = () => {
    router.push("/compliance/medication/log")
  }

  const handlePreviousMonth = () => {
    if (currentMonthIndex > 0 && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentMonthIndex((prev) => prev - 1)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  const handleNextMonth = () => {
    if (currentMonthIndex < maxMonths - 1 && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentMonthIndex((prev) => prev + 1)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0]?.clientX ?? 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX ?? 0)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNextMonth()
    }

    if (touchStart - touchEnd < -75) {
      handlePreviousMonth()
    }
  }

  // Helper function to get month number from name
  const getMonthNumber = (monthName: string): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const index = months.findIndex((m) => m.toLowerCase() === monthName.toLowerCase())
    return index.toString().padStart(2, "0")
  }

  const displayMonth = currentMonth ? `${currentMonth.month}` : initialMonth

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <MonthNavigator
          currentMonth={displayMonth}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
          canGoPrevious={currentMonthIndex > 0 && !isTransitioning}
          canGoNext={currentMonthIndex < maxMonths - 1 && !isTransitioning}
        />

        <Button onClick={handleLogClick} className="px-7">
          Log
        </Button>
      </div>

      {medications.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-medium text-black">No Medications</h3>
            <p className="text-sm text-gray-400">Start tracking your medication compliance</p>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}
        >
          {medications.map((medication) => (
            <MedicationCalendar
              key={medication.id}
              medication={medication}
              monthIndex={currentMonthIndex}
              onDayClick={handleDayClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
