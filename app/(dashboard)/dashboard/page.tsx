"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UserProfileHeader } from "@/components/account/user-profile-header"
import { Board } from "@/components/dashboard/board"
import { ScreeningOptionsSheet } from "@/components/dashboard/screening-options-sheet"
import { StatusCard } from "@/components/dashboard/status-card"
import { TreatmentView } from "@/components/dashboard/treatment-view"
import { Button } from "@/components/ui/button"
import { FullScreenLoader } from "@/components/ui/full-screen-loader"
import { LoaderService } from "@/lib/services/loader-service"
import { userService } from "@/lib/services/user-service"
import {
  calculateCountdown,
  formatScheduledDate,
  getStatusConfig,
  hasCountdown,
  isActiveTreatment,
} from "@/lib/utils/dashboard-helpers"
import { DashboardData, PatientStatus } from "@/types/dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScreeningSheetOpen, setIsScreeningSheetOpen] = useState(false)

  useEffect(() => {
    async function loadData() {
      // Check auth token
      const token = sessionStorage.getItem("auth_token")
      if (!token) {
        router.push("/sign-in")
        return
      }

      LoaderService.show()
      try {
        const [profile, statusData] = await Promise.all([userService.getProfile(), userService.getDashboardStatus()])

        // Logic: specific checks for stage
        let currentStatus: PatientStatus = (statusData.status as PatientStatus) || PatientStatus.NEW_USER

        // Handle specific screening statuses
        if (statusData.stage === "screening") {
          if (statusData.status === "screening_awaiting_confirmation") {
            currentStatus = PatientStatus.SCREENING_BOOKED
          } else if (!statusData.screening_id) {
            currentStatus = PatientStatus.NEW_USER
          }
        }

        const dashboardData: DashboardData = {
          status: currentStatus,
          patient: {
            name: profile.first_name,
            avatar: undefined, // Add avatar logic if available
            diagnosis: "Hypertension", // This should probably come from the API too
          },
          statusCard: getStatusConfig(currentStatus),
          boardItems: [],
          weeklyReadings: [
            { day: "Mon", status: "good" },
            { day: "Tue", status: "slightly-off" },
            { day: "Wed", status: "needs-review" },
            { day: "Thu", status: "good" },
            { day: "Fri", status: "good" },
            { day: "Sat", status: "good" },
            { day: "Sun", status: "good" },
          ], // Fixed for now
          healthReadings: [
            {
              id: "1",
              label: "Blood Pressure",
              type: "blood-pressure",
              value: "120/80 mmHg",
              lastReading: "Yesterday, 2:00pm",
            },
            {
              id: "2",
              label: "Blood Sugar",
              type: "blood-sugar",
              value: "120/80 mmHg",
              lastReading: "Yesterday, 2:00pm",
            },
          ], // Fixed for now
          medications: [
            {
              id: "1",
              name: "Amlodipine 500mg",
              schedule: "1 Morning • 1 Afternoon • 1 Night",
              taken: 1,
              total: 3,
            },
          ], // Fixed for now
        }

        // Specific overrides for SCREENING_BOOKED
        if (currentStatus === PatientStatus.SCREENING_BOOKED && statusData.scheduled_at) {
          const formattedDate = formatScheduledDate(statusData.scheduled_at)
          const countdown = calculateCountdown(statusData.scheduled_at)

          // Update Status Card
          dashboardData.statusCard.message = `Your assessment is set for ${formattedDate}`
          dashboardData.statusCard.countdown = countdown

          // Update Board Items
          dashboardData.boardItems = [
            {
              id: "screening-booked",
              type: "booking-confirmation",
              title: "Booking Confirmed",
              message: `Your screening is scheduled for ${formattedDate}`,
              action: {
                label: "Track progress",
                href: "/screening/track", // Placeholder
              },
            },
          ]
        }

        setData(dashboardData)
      } catch (err) {
        console.error("Failed to load dashboard data", err)
        setError("Failed to load dashboard")
      } finally {
        LoaderService.hide()
      }
    }

    loadData()
  }, [router])

  if (!data) {
    // Return empty or loader - loader is handled globally but we need to render something
    return <FullScreenLoader />
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="m-auto min-h-screen w-full max-w-2xl px-4 py-6 pb-32 sm:bg-white">
      <UserProfileHeader
        name={""}
        profileImage={undefined}
        title={"Welcome" + " " + data.patient.name}
        subtitle={"Let's help you stay on top of your health"}
      />

      {isActiveTreatment(data.status) ? (
        <TreatmentView data={data} />
      ) : (
        <>
          <StatusCard
            data={{
              ...data.statusCard,
              countdown: hasCountdown(data.status) ? "02d :10h :53m" : undefined,
            }}
            onActionClick={data.status === PatientStatus.NEW_USER ? () => setIsScreeningSheetOpen(true) : undefined}
          />

          <Board items={data.boardItems} />
        </>
      )}

      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 fixed right-6 bottom-24 z-50 h-14 w-14 rounded-full p-0 shadow-lg"
        aria-label="Quick actions"
      >
        <Image
          src="/images/sparkles.svg"
          alt="Sparkles Icon"
          width={24}
          height={24}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </Button>

      <ScreeningOptionsSheet isOpen={isScreeningSheetOpen} onClose={() => setIsScreeningSheetOpen(false)} />
    </div>
  )
}
