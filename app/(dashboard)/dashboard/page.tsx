// app/dashboard/page.tsx

import Image from "next/image"
import { UserProfileHeader } from "@/components/account/user-profile-header"
import { Board } from "@/components/dashboard/board"
import { StatusCard } from "@/components/dashboard/status-card"
import { TreatmentView } from "@/components/dashboard/treatment-view"
import { Button } from "@/components/ui/button"
import { getStatusConfig, hasCountdown, isActiveTreatment } from "@/lib/utils/dashboard-helpers"
import { DashboardData, PatientStatus } from "@/types/dashboard"

async function getDashboardData(): Promise<DashboardData> {
  // const res = await fetch(`${process.env.API_URL}/dashboard`, {
  //   headers: { Authorization: `Bearer ${token}` },
  //   cache: "no-store"
  // })
  // return res.json()

  return {
    status: PatientStatus.ACTIVE_TREATMENT,
    patient: {
      name: "Rufus",
      avatar: undefined,
      diagnosis: "Hypertension",
    },
    statusCard: getStatusConfig(PatientStatus.ACTIVE_TREATMENT),
    boardItems: [
      // {
      //   id: "1",
      //   type: "doctor-review",
      //   title: "Laboratory Test Request",
      //   message:
      //     "The doctor has recommended you to take the following tests at a medical laboratory and upload the results",
      //   tests: [
      //     { id: "1", name: "Urinalysis", uploaded: true },
      //     { id: "2", name: "Fasting Blood Sugar", uploaded: false },
      //     { id: "3", name: "Lipid Profile", uploaded: false },
      //     { id: "4", name: "Microalbuminuria Test", uploaded: false },
      //     { id: "5", name: "HbA1c Test (Glycated Hemoglobin)", uploaded: false },
      //   ],
      // },
    ],
    weeklyReadings: [
      { day: "Mon", status: "good" },
      { day: "Tue", status: "slightly-off" },
      { day: "Wed", status: "needs-review" },
      { day: "Thu", status: "good" },
      { day: "Fri", status: "good" },
      { day: "Sat", status: "good" },
      { day: "Sun", status: "good" },
    ],
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
    ],
    medications: [
      {
        id: "1",
        name: "Amlodipine 500mg",
        schedule: "1 Morning • 1 Afternoon • 1 Night",
        taken: 1,
        total: 3,
      },
      {
        id: "2",
        name: "Metformin 500mg",
        schedule: "1 Night • 1 Afternoon • 1 Night",
        taken: 2,
        total: 3,
      },
      {
        id: "3",
        name: "Amlodipine 500mg",
        schedule: "1 Night • 1 Afternoon • 1 Night",
        taken: 0,
        total: 3,
      },
    ],
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

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
    </div>
  )
}
