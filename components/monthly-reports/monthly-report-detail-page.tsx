// components/monthly-reports/monthly-report-detail-page.tsx

import { BackButton } from "@/components/ui/back-button"
import { PageTransition } from "@/components/ui/page-transition"
import { MonthlyReportDetail } from "@/types/monthly-reports"

interface MonthlyReportDetailPageClientProps {
  report: MonthlyReportDetail
}

export default function MonthlyReportDetailPageClient({ report }: MonthlyReportDetailPageClientProps) {
  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white pb-20">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-3 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Monthly Report</p>
        <div />
      </div>

      <div className="space-y-6 px-5 pt-2 pb-6">
        {/* User Information */}
        <div className="space-y-1">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-400">Name :</span>
            <span className="text-sm font-medium md:text-base">{report.userInfo.name}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-400">Report month :</span>
            <span className="text-sm font-medium md:text-base">{report.userInfo.reportMonth}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-400">Date of Birth :</span>
            <span className="text-sm font-medium md:text-base">{report.userInfo.dateOfBirth}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-400">Gender</span>
            <span className="text-sm font-medium md:text-base">{report.userInfo.gender}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-400">Diagnosis</span>
            <span className="text-sm font-medium md:text-base">{report.userInfo.diagnosis}</span>
          </div>
        </div>

        {/* Report Summary */}
        <div className="rounded-xl border border-gray-50 bg-white p-4">
          <h3 className="text-primary mb-2 text-lg font-medium">Report summary</h3>
          <p className="text-xs leading-relaxed text-gray-800">{report.reportSummary}</p>
        </div>

        {/* Blood Pressure */}
        <div className="rounded-xl border border-gray-50 bg-white">
          <div className="p-4 pb-0">
            <h3 className="mb-4 text-lg font-medium">Blood Pressure</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Average reading</p>
                <p className="mt-1 text-sm font-medium md:text-base">{report.bloodPressure.averageReading}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Range</p>
                <p className="mt-1 text-sm font-medium md:text-base">{report.bloodPressure.range}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-350 rounded-b-md p-4">
            <p className="text-primary mb-2 text-xs font-medium md:text-sm">Interpretation</p>
            <p className="text-xs leading-relaxed md:text-sm">{report.bloodPressure.interpretation}</p>
          </div>
        </div>

        {/* Blood Sugar */}
        <div className="rounded-xl border border-gray-50 bg-white">
          <div className="p-4 pb-0">
            <h3 className="mb-4 text-lg font-medium">Blood Sugar</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Average reading</p>
                <p className="mt-1 text-sm font-medium md:text-base">{report.bloodSugar.averageReading}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Range</p>
                <p className="mt-1 text-sm font-medium md:text-base">{report.bloodSugar.range}</p>
              </div>
            </div>
          </div>{" "}
          <div className="bg-gray-350 rounded-b-md p-4">
            <p className="text-primary mb-2 text-xs font-medium md:text-sm">Interpretation</p>
            <p className="text-xs leading-relaxed md:text-sm">{report.bloodSugar.interpretation}</p>
          </div>
        </div>

        {/* Medication Adherence */}
        <div className="rounded-xl border border-gray-50 bg-white">
          <div className="p-4 pb-0">
            <h3 className="mb-4 text-lg font-medium">Medication adherence</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Monthly adherence rate</p>
                <p className="mt-1 text-sm font-medium">{report.medicationAdherence.monthlyAdherenceRate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Days fully compliant</p>
                <p className="mt-1 text-sm font-medium">
                  {report.medicationAdherence.daysFullyCompliant} of {report.medicationAdherence.totalDays}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Missed doses</p>
                <p className="mt-1 text-sm font-medium">{report.medicationAdherence.missedDoses}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-350 rounded-b-md p-4">
            <p className="text-primary mb-2 text-xs font-medium md:text-sm">Interpretation</p>
            <p className="text-xs leading-relaxed md:text-sm">{report.medicationAdherence.interpretation}</p>
          </div>
        </div>

        {/* Findings and Trends */}
        <div className="rounded-xl border border-gray-50 bg-white p-4">
          <h3 className="text-primary mb-3 text-lg font-medium">Findings and trends</h3>
          <ul className="list-disc space-y-4 pl-5">
            {report.findingsAndTrends.map((trend, index) => (
              <li key={index} className="text-sm">
                {trend}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageTransition>
  )
}
