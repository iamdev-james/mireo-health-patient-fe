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
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-3 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Monthly Report</p>
        <div />
      </div>

      <div className="px-4 py-3">
        {reports.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-gray-500">No reports available</p>
            <p className="mt-2 text-sm text-gray-400">Your monthly reports will appear here</p>
          </div>
        ) : (
          <div className="space-y-5">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/monthly-reports/${report.id}`}
                className="flex items-center justify-between rounded-xl border border-gray-50 bg-white p-4 transition-colors"
              >
                <div>
                  <h3 className="text-lg">
                    {report.month}, {report.year}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{report.label}</p>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
