// app/(dashboard)/monthly-reports/page.tsx

import MonthlyReportsListPageClient from "@/components/monthly-reports/monthly-reports-list-page"
import { MonthlyReportListItem } from "@/types/monthly-reports"

export const metadata = {
  title: "Monthly Reports | Mireo Health",
  description: "View your monthly health reports",
}

// async function getMonthlyReports(): Promise<MonthlyReportListItem[]> {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/monthly-reports`, {
//       headers: {
//         // In production, get token from cookies
//         // Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     })

//     if (!response.ok) {
//       return []
//     }

//     const data = (await response.json()) as { data: MonthlyReportListItem[] }
//     return data.data
//   } catch (error) {
//     console.error("Failed to fetch monthly reports:", error)
//     return []
//   }
// }

export default async function MonthlyReportsPage() {
  // Mock data for development
  const reports: MonthlyReportListItem[] = [
    {
      id: "1",
      month: "November",
      year: "2025",
      label: "Report",
    },
    {
      id: "2",
      month: "December",
      year: "2025",
      label: "Report",
    },
    {
      id: "3",
      month: "January",
      year: "2026",
      label: "Report",
    },
  ]

  // Uncomment when backend is ready:
  // const reports = await getMonthlyReports()

  return <MonthlyReportsListPageClient reports={reports} />
}
