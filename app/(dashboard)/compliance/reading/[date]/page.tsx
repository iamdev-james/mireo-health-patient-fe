// app/compliance/reading/[date]/page.tsx
"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BloodSugarGroup } from "@/components/compliance/blood-sugar-group"
import { ReadingCard } from "@/components/compliance/reading-card"
import { TabSwitcher } from "@/components/compliance/tab-switcher"
import { Reading } from "@/types/compliance"

async function getReadingsByDate(date: string): Promise<Reading[]> {
  // TODO: Replace with actual API call
  return [
    // Blood pressure readings
    {
      id: "1",
      type: "blood-pressure",
      value: "120/80",
      unit: "mmHg",
      status: "good",
      timestamp: "2024-10-03T08:03:00Z",
      time: "8:03 AM",
    },
    {
      id: "2",
      type: "blood-pressure",
      value: "120/80",
      unit: "mmHg",
      status: "good",
      timestamp: "2024-10-03T08:03:00Z",
      time: "8:03 AM",
    },
    // Blood sugar readings - Random
    {
      id: "3",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "good",
      timestamp: "2024-10-03T08:03:00Z",
      time: "8:03 AM",
      subType: "random",
    },
    {
      id: "4",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "good",
      timestamp: "2024-10-03T08:03:00Z",
      time: "8:03 AM",
      subType: "random",
    },
    // Blood sugar readings - Fasting
    {
      id: "5",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "good",
      timestamp: "2024-10-03T08:03:00Z",
      time: "8:03 AM",
      subType: "fasting",
    },
    {
      id: "6",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "slightly-off",
      timestamp: "2024-10-03T10:15:00Z",
      time: "8:03 AM",
      subType: "fasting",
    },
    {
      id: "7",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "needs-review",
      timestamp: "2024-10-03T14:30:00Z",
      time: "8:03 AM",
      subType: "fasting",
    },
    // Blood sugar readings - Post-meal
    {
      id: "8",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "good",
      timestamp: "2024-10-03T09:00:00Z",
      time: "8:03 AM",
      subType: "post-meal",
    },
    {
      id: "9",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "slightly-off",
      timestamp: "2024-10-03T13:00:00Z",
      time: "8:03 AM",
      subType: "post-meal",
    },
    {
      id: "10",
      type: "blood-sugar",
      value: "120",
      unit: "mg/dl",
      status: "needs-review",
      timestamp: "2024-10-03T19:00:00Z",
      time: "8:03 AM",
      subType: "post-meal",
    },
  ]
}

export default function ReadingDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [readings, setReadings] = useState<Reading[]>([])

  const date = params.date as string
  const activeType = searchParams.get("type") || "blood-pressure"

  useEffect(() => {
    getReadingsByDate(date).then(setReadings)
  }, [date])

  const tabs = [
    { id: "blood-pressure", label: "Blood pressure" },
    { id: "blood-sugar", label: "Blood sugar" },
  ]

  const filteredReadings = readings.filter((r) => r.type === activeType)

  // Group blood sugar readings by subType
  const randomReadings = filteredReadings.filter((r) => r.subType === "random")
  const fastingReadings = filteredReadings.filter((r) => r.subType === "fasting")
  const postMealReadings = filteredReadings.filter((r) => r.subType === "post-meal")

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
          <h1 className="text-xl font-semibold text-black">Oct 3</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8">
        <TabSwitcher
          tabs={tabs}
          activeTab={activeType}
          onTabChange={(type) => {
            router.push(`/compliance/reading/${date}?type=${type}`)
          }}
        />

        {activeType === "blood-pressure" ? (
          <div className="space-y-4">
            {filteredReadings.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-400">No readings for this type</p>
              </div>
            ) : (
              filteredReadings.map((reading) => (
                <div key={reading.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="mb-3 text-sm text-gray-400">{reading.time}</p>
                  <ReadingCard reading={reading} />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <BloodSugarGroup
              title="Random blood sugar"
              subtitle="Taken 2 hours after eating"
              readings={randomReadings}
            />
            <BloodSugarGroup title="Fasting blood sugar" subtitle="Taken before eating" readings={fastingReadings} />
            <BloodSugarGroup
              title="Post-meal blood sugar"
              subtitle="Taken 2 hours after eating"
              readings={postMealReadings}
            />

            {filteredReadings.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-400">No blood sugar readings for this date</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
