// app/(dashboard)/screening/hypertension/page.tsx
"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { BookSessionSheet } from "@/components/screening/book-session-sheet"
import { ScreeningInfoCard } from "@/components/screening/screening-info-card"
import { Button } from "@/components/ui/button"

const SCREENING_INFO_ITEMS = [
  {
    icon: "🩸",
    title: "Vital Signs",
    description: "Pulse, Respiratory rate, Blood pressure, Temperature",
  },
  {
    icon: "⚖️",
    title: "BMI",
    description: "Height and Weight",
  },
  {
    icon: "💉",
    title: "Baseline Tests",
    description: "Blood Sugar (finger-prick), Urine Test (dipstick test)",
  },
]

function HypertensionScreeningContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false)

  useEffect(() => {
    // Check if we should auto-open the booking sheet (coming back from payment page)
    if (searchParams.get("openBooking") === "true") {
      setIsBookingSheetOpen(true)
    }
  }, [searchParams])

  return (
    <div className="m-auto min-h-screen w-full max-w-2xl bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-14 bg-white px-4 py-4">
        <button
          onClick={() => router.back()}
          className="justify-self-start rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="text-center">
          <p className="text-lg font-medium">Assessment for</p>
          <p className="text-lg font-medium">Hypertension & Diabetes</p>
        </div>

        <div />
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <p className="mb-8 text-gray-600">
          Your assessment starts with a quick health check done by a health worker to screen for hypertension and
          diabetes. This covers:
        </p>

        {/* Info Cards */}
        <div className="flex flex-col gap-4">
          {SCREENING_INFO_ITEMS.map((item) => (
            <ScreeningInfoCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>

        {/* Additional Info */}
        <p className="mt-8 text-sm text-gray-600">
          Your results will help us know if you may have hypertension or diabetes. If needed, a doctor will follow up
          for further assessment.
        </p>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed inset-x-0 bottom-0 m-auto w-full max-w-2xl bg-white px-6 py-6">
        <Button size="xl" className="w-full" onClick={() => setIsBookingSheetOpen(true)}>
          Book a session
        </Button>
      </div>

      {/* Booking Sheet */}
      <BookSessionSheet
        isOpen={isBookingSheetOpen}
        onClose={() => setIsBookingSheetOpen(false)}
        screeningType="hypertension"
      />
    </div>
  )
}

export default function HypertensionScreeningPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <HypertensionScreeningContent />
    </Suspense>
  )
}
