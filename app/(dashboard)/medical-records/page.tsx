// app/(dashboard)/medical-records/page.tsx

import MedicalRecordsPageClient from "@/components/medical-records/medical-records-page"
import { MedicalRecord } from "@/types/medical-records"

export const metadata = {
  title: "Medical Records | Mireo Health",
  description: "View your medical records",
}

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/medical-records`, {
      headers: {
        // In production, get token from cookies
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as { data: MedicalRecord[] }
    return data.data
  } catch (error) {
    console.error("Failed to fetch medical records:", error)
    return []
  }
}

export default async function MedicalRecordsPage() {
  // Mock data for development
  const records: MedicalRecord[] = [
    {
      id: "1",
      type: "screening",
      title: "Initial screening",
      date: "12, Nov 2025",
    },
    {
      id: "2",
      type: "consultation",
      title: "Doctor's consultation",
      date: "12, Nov 2025",
    },
    {
      id: "3",
      type: "consultation",
      title: "Doctor's consultation",
      date: "12, Nov 2025",
    },
  ]

  // Uncomment when backend is ready:
  // const records = await getMedicalRecords()

  return <MedicalRecordsPageClient records={records} />
}
