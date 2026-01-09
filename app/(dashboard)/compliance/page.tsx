// app/compliance/page.tsx

import { CompliancePageClient } from "@/components/compliance/compliance-page-client"
import { ComplianceData, MedicationStatus } from "@/types/compliance"

async function getComplianceData(): Promise<ComplianceData> {
  // TODO: Replace with actual API call
  // For offline-first PWA, this should check IndexedDB first, then API

  return {
    readings: [
      {
        date: "2024-10-05",
        displayDate: "Today",
        readings: [
          {
            id: "1",
            type: "blood-pressure",
            value: "120/80",
            unit: "mmHg",
            status: "good",
            timestamp: "2024-10-05T08:00:00Z",
            time: "8:00 AM",
          },
          // No blood sugar for today - will show "Not logged"
        ],
      },
      {
        date: "2024-10-04",
        displayDate: "Yesterday",
        readings: [
          {
            id: "3",
            type: "blood-pressure",
            value: "120/80",
            unit: "mmHg",
            status: "good",
            timestamp: "2024-10-04T08:00:00Z",
            time: "8:00 AM",
          },
          {
            id: "4",
            type: "blood-sugar",
            value: "120/80",
            unit: "mg/dl",
            status: "needs-review",
            timestamp: "2024-10-04T08:00:00Z",
            time: "8:00 AM",
          },
        ],
      },
      {
        date: "2024-10-03",
        displayDate: "Tuesday, 22 November",
        readings: [
          {
            id: "5",
            type: "blood-pressure",
            value: "120/80",
            unit: "mmHg",
            status: "good",
            timestamp: "2024-10-03T08:00:00Z",
            time: "8:00 AM",
          },
          {
            id: "6",
            type: "blood-sugar",
            value: "140",
            unit: "mg/dl",
            status: "slightly-off",
            timestamp: "2024-10-03T08:00:00Z",
            time: "8:00 AM",
          },
        ],
      },
    ],
    medications: [
      {
        id: "1",
        name: "Amlodipine 5mg",
        dosage: "5mg",
        frequency: 1,
        totalDays: 31,
        takenDays: 18,
        calendar: Array.from({ length: 31 }, (_, i) => {
          const day = i + 1
          let status: MedicationStatus = "future"

          if (day <= 10) status = "taken"
          else if (day === 3 || day === 7 || day === 8) status = "missed"
          else if (day <= 20) status = "taken"

          return {
            day,
            status,
            doses: [{ time: "morning" as const, taken: status === "taken" }],
          }
        }),
      },
    ],
  }
}

export default async function CompliancePage() {
  const data = await getComplianceData()
  const currentMonth = "October"

  // TODO: Get user data from auth
  const userName = "John Doe"
  const userImage = "/images/userimg.svg"

  return <CompliancePageClient data={data} userName={userName} userImage={userImage} currentMonth={currentMonth} />
}
