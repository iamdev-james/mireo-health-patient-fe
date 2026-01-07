// app/(dashboard)/monthly-reports/[id]/page.tsx

import { notFound } from "next/navigation"
import MonthlyReportDetailPageClient from "@/components/monthly-reports/monthly-report-detail-page"
import { MonthlyReportDetail } from "@/types/monthly-reports"

export const metadata = {
  title: "Monthly Report | Mireo Health",
  description: "View your monthly report details",
}

async function getMonthlyReportDetail(id: string): Promise<MonthlyReportDetail | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/monthly-reports/${id}`, {
      headers: {
        // In production, get token from cookies
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { data: MonthlyReportDetail }
    return data.data
  } catch (error) {
    console.error("Failed to fetch monthly report detail:", error)
    return null
  }
}

export default async function MonthlyReportDetailPage({ params }: { params: { id: string } }) {
  // Mock data for development
  const reportData: MonthlyReportDetail = {
    id: params.id,
    userInfo: {
      name: "Rufus Oluwaseyi",
      reportMonth: "November 2025",
      dateOfBirth: "02/08/2002",
      gender: "Male",
      diagnosis: "Hypertension",
    },
    reportSummary:
      "During the month under review, your blood pressure, blood glucose levels, medication adherence, and clinical activities were evaluated. Your overall clinical status remains stable.",
    bloodPressure: {
      averageReading: "132/84 mmHg",
      range: "118/74 — 146/92 mmHg",
      interpretation:
        "Readings were mostly within the acceptable range with occasional elevations. No hypertensive urgency or crisis values detected. Patient advised to continue routine monitoring.",
    },
    bloodSugar: {
      averageReading: "104 mg/dL",
      range: "87 — 142 mg/dL",
      interpretation:
        "Glycemic values were generally within target range with periodic post-prandial elevations. No hypoglycemic emergencies recorded. Continual adherence to prescribed regimen is recommended.",
    },
    medicationAdherence: {
      monthlyAdherenceRate: "77%",
      daysFullyCompliant: "22",
      totalDays: "31",
      missedDoses: 8,
      interpretation:
        "Adherence was adequate for therapeutic benefit but can be optimized. Missed doses occurred intermittently, mostly on weekends. Improved consistency may enhance long-term outcomes.",
    },
    findingsAndTrends: [
      "Noted variability in morning readings compared to evening measurements",
      "Higher BP values observed mid-month",
      "Medication adherence correlated with improved readings",
    ],
  }

  // Uncomment when backend is ready:
  // const reportData = await getMonthlyReportDetail(params.id)
  // if (!reportData) {
  //   notFound()
  // }

  return <MonthlyReportDetailPageClient report={reportData} />
}
