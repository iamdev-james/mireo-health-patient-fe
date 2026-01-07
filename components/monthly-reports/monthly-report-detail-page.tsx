// components/monthly-reports/monthly-report-detail-page.tsx

import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { MonthlyReportDetail } from "@/types/monthly-reports"

interface MonthlyReportDetailPageClientProps {
  report: MonthlyReportDetail
}

export default function MonthlyReportDetailPageClient({ report }: MonthlyReportDetailPageClientProps) {
  return (
    <PageTransition className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Monthly Report</p>
        <div />
      </div>

      <div className="space-y-6 px-6 py-6">
        {/* User Information */}
        <div className="space-y-1">
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-500">Name :</span>
            <span className="text-base font-medium text-gray-900">{report.userInfo.name}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-500">Report month :</span>
            <span className="text-base font-medium text-gray-900">{report.userInfo.reportMonth}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-500">Date of Birth :</span>
            <span className="text-base font-medium text-gray-900">{report.userInfo.dateOfBirth}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-500">Gender</span>
            <span className="text-base font-medium text-gray-900">{report.userInfo.gender}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-500">Diagnosis</span>
            <span className="text-base font-medium text-gray-900">{report.userInfo.diagnosis}</span>
          </div>
        </div>

        {/* Report Summary */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#0066CC]">Report summary</h3>
          <p className="text-sm leading-relaxed text-gray-700">{report.reportSummary}</p>
        </div>

        {/* Blood Pressure */}
        <div className="rounded-2xl bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Blood Pressure</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Average reading</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{report.bloodPressure.averageReading}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Range</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{report.bloodPressure.range}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-[#0066CC]">Interpretation</p>
            <p className="text-sm leading-relaxed text-gray-700">{report.bloodPressure.interpretation}</p>
          </div>
        </div>

        {/* Blood Sugar */}
        <div className="rounded-2xl bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Blood Sugar</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Average reading</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{report.bloodSugar.averageReading}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Range</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{report.bloodSugar.range}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-[#0066CC]">Interpretation</p>
            <p className="text-sm leading-relaxed text-gray-700">{report.bloodSugar.interpretation}</p>
          </div>
        </div>

        {/* Medication Adherence */}
        <div className="rounded-2xl bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Medication adherence</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Monthly adherence rate</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{report.medicationAdherence.monthlyAdherenceRate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Days fully compliant</p>
              <p className="mt-1 text-base font-semibold text-gray-900">
                {report.medicationAdherence.daysFullyCompliant} of {report.medicationAdherence.totalDays}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Missed doses</p>
              <p className="mt-1 text-base font-semibold text-gray-900">{report.medicationAdherence.missedDoses}</p>
            </div>
            <div className="pt-2">
              <p className="mb-2 text-sm font-semibold text-[#0066CC]">Interpretation</p>
              <p className="text-sm leading-relaxed text-gray-700">{report.medicationAdherence.interpretation}</p>
            </div>
          </div>
        </div>

        {/* Findings and Trends */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#0066CC]">Findings and trends</h3>
          <ul className="list-disc space-y-2 pl-5">
            {report.findingsAndTrends.map((trend, index) => (
              <li key={index} className="text-sm text-gray-700">
                {trend}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageTransition>
  )
}
