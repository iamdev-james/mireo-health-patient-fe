// app/(dashboard)/medical-records/lab-tests/page.tsx

import LabTestsPageClient from "@/components/medical-records/lab-tests-page"
import { LabTest } from "@/types/medical-records"

export const metadata = {
  title: "Laboratory Tests | Mireo Health",
  description: "View and upload your lab test results",
}

export async function getLabTests(): Promise<LabTest[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/medical-records/lab-tests`, {
      headers: {
        // In production, get token from cookies
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as { data: { tests: LabTest[] } }
    return data?.data.tests
  } catch (error) {
    console.error("Failed to fetch lab tests:", error)
    return []
  }
}

export default async function LabTestsPage() {
  // Mock data for development
  const tests: LabTest[] = [
    {
      id: "1",
      name: "Urinalysis",
      uploadDate: "2023-10-23T13:32:00Z",
      resultLink: "/lab-results/1",
    },
    {
      id: "2",
      name: "Microalbuminuria Test",
      uploadDate: "2023-10-23T13:32:00Z",
      resultLink: "/lab-results/2",
    },
    {
      id: "3",
      name: "Lipid Profile",
      uploadDate: "2023-10-23T13:32:00Z",
      resultLink: "/lab-results/3",
    },
    {
      id: "4",
      name: "Microalbuminuria Test",
      uploadDate: "2023-10-23T13:32:00Z",
      resultLink: "/lab-results/4",
    },
    {
      id: "5",
      name: "HbA1c Test (Glycated Hemoglobin)",
      uploadDate: "2023-10-23T13:32:00Z",
      resultLink: "/lab-results/5",
    },
  ]

  // Uncomment when backend is ready:
  // const tests = await getLabTests()

  return <LabTestsPageClient tests={tests} />
}
