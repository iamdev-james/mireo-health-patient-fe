// app/dashboard/page.tsx

import Image from "next/image"
import { DashboardData, PatientStatus } from "@/types/dashboard"
import { StatusCard } from "@/components/dashboard/status-card"
import { Board } from "@/components/dashboard/board"
import { TreatmentView } from "@/components/dashboard/treatment-view"
import { Button } from "@/components/ui/button"
import { UserProfileHeader } from "@/components/account/user-profile-header"
import { Sparkles } from "lucide-react"
import { getStatusConfig, isActiveTreatment, hasCountdown } from "@/lib/utils/dashboard-helpers"

async function getDashboardData(): Promise<DashboardData> {
  // const res = await fetch(`${process.env.API_URL}/dashboard`, {
  //   headers: { Authorization: `Bearer ${token}` },
  //   cache: "no-store"
  // })
  // return res.json()

  return {
    status: PatientStatus.NEW_USER,
    patient: {
      name: "Rufus",
      avatar: undefined,
    },
    statusCard: getStatusConfig(PatientStatus.NEW_USER),
    boardItems: [
      {
        id: "1",
        type: "doctor-review",
        title: "Laboratory Test Request",
        message:
          "The doctor has recommended you to take the following tests at a medical laboratory and upload the results",
        tests: [
          { id: "1", name: "Urinalysis", uploaded: true },
          { id: "2", name: "Fasting Blood Sugar", uploaded: false },
          { id: "3", name: "Lipid Profile", uploaded: false },
          { id: "4", name: "Microalbuminuria Test", uploaded: false },
          { id: "5", name: "HbA1c Test (Glycated Hemoglobin)", uploaded: false },
        ],
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
        className="fixed right-6 bottom-24 z-50 h-14 w-14 rounded-full bg-blue-600 p-0 shadow-lg hover:bg-blue-700"
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
