// components/monthly-reports/monthly-reports-list-page.tsx

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { MonthlyReportListItem } from "@/types/monthly-reports"

interface MonthlyReportsListPageClientProps {
  reports: MonthlyReportListItem[]
}

export default function MonthlyReportsListPageClient({ reports }: MonthlyReportsListPageClientProps) {
  return (
    <PageTransition className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Monthly Report</p>
        <div />
      </div>

      <div className="px-6 py-6">
        {reports.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-gray-500">No reports available</p>
            <p className="mt-2 text-sm text-gray-400">Your monthly reports will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/monthly-reports/${report.id}`}
                className="flex items-center justify-between rounded-2xl bg-white p-6 transition-colors hover:bg-gray-50"
              >
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {report.month}, {report.year}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{report.label}</p>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
