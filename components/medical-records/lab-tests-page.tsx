// components/medical-records/medical-records-page.tsx

import { FileText } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/ui/page-transition"
import { LabTest } from "@/types/medical-records"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"

interface LabTestsPageClientProps {
  tests: LabTest[]
}

export default function LabTestsPageClient({ tests }: LabTestsPageClientProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <PageTransition className="min-h-screen bg-white pb-24">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">Laboratory Tests</p>
        <div />
      </div>

      <div className="px-6 py-6">
        {tests.length === 0 ? (
          <div className="mt-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 text-gray-500">No lab tests yet</p>
            <p className="mt-2 text-sm text-gray-400">Your laboratory test results will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tests.map((test) => (
              <div key={test.id} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>Image uploaded</span>
                  <span>•</span>
                  <span>{formatDate(test.uploadDate)}</span>
                </div>
                {test.resultLink && (
                  <Link href={test.resultLink} className="mt-4 inline-block font-medium text-[#0066CC] hover:underline">
                    View result
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload results button */}
      <div className="fixed inset-x-0 bottom-0 bg-white p-6 shadow-lg">
        <Link href="/medical-records/lab-tests/upload">
          <Button className="h-14 w-full rounded-xl bg-[#0066CC] text-lg font-medium text-white hover:bg-[#0052A3]">
            Upload results
          </Button>
        </Link>
      </div>
    </PageTransition>
  )
}
