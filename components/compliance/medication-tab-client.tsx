// components/compliance/medication-tab-client.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useRef, useState, Suspense } from "react"
import { Medication } from "@/types/compliance"
import { MedicationCalendar } from "./medication-calendar"
import { MonthNavigator } from "./month-navigator"
import { Button } from "../ui/button"

interface MedicationTabClientProps {
  initialMedications: Medication[]
  initialMonth: string
}

function MedicationTabContent({ initialMedications, initialMonth }: MedicationTabClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [medications] = useState(initialMedications)

  const savedMonthIndex = searchParams.get("monthIndex")
  const [currentMonthIndex, setCurrentMonthIndex] = useState(savedMonthIndex ? parseInt(savedMonthIndex) : 0)

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentMonth = medications[0]?.months?.[currentMonthIndex]
  const maxMonths = medications[0]?.months?.length || 0

  const handleDayClick = (medicationId: string, day: number) => {
    const monthData = medications[0]?.months?.[currentMonthIndex]
    if (!monthData) return

    const monthNumber = getMonthNumber(monthData.month)
    const date = `${monthData.year}-${monthNumber}-${day.toString().padStart(2, "0")}`

    router.push(`/compliance/medication/${date}?returnMonthIndex=${currentMonthIndex}`)
  }

  const handleLogClick = () => {
    router.push(`/compliance/medication/log?returnMonthIndex=${currentMonthIndex}`)
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
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      return
    }
    setTouchStart(e.targetTouches[0]?.clientX ?? 0)
    setTouchEnd(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === 0) {
      return
    }
    setTouchEnd(e.targetTouches[0]?.clientX ?? 0)
  }

  const handleTouchEnd = () => {
    if (touchStart === 0) {
      setTouchStart(0)
      setTouchEnd(0)
      return
    }

    const swipeDistance = touchStart - touchEnd

    if (swipeDistance > 75) {
      handleNextMonth()
    } else if (swipeDistance < -75) {
      handlePreviousMonth()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

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
    return (index + 1).toString().padStart(2, "0")
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
          style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
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

export function MedicationTabClient(props: MedicationTabClientProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MedicationTabContent {...props} />
    </Suspense>
  )
}
