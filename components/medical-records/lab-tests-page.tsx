// components/medical-records/medical-records-page.tsx

import { FileCheck, FileText } from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import { LabTest } from "@/types/medical-records"

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
    <PageTransition className="bg-gray-350 min-h-screen pb-24 md:bg-white">
      <div className="bg-gray-350 sticky top-0 z-10 grid grid-cols-3 items-center px-4 py-4 md:bg-white">
        <BackButton />
        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Laboratory Tests</p>
        <div />
      </div>

      <div className="px-6 pt-2 pb-5">
        {tests.length === 0 ? (
          <div className="mt-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4">No lab tests yet</p>
            <p className="mt-2 text-sm text-gray-400">Your laboratory test results will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tests.map((test) => (
              <div key={test.id} className="rounded-xl border border-gray-50 bg-white px-4 py-3">
                <h3 className="text-lg font-medium">{test.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                  <FileCheck className="h-4 w-4" />
                  <span>Image uploaded</span>
                  <span>•</span>
                  <span>{formatDate(test.uploadDate)}</span>
                </div>
                {test.resultLink && (
                  <Link href={test.resultLink} className="text-primary mt-1 ml-7 inline-block text-xs underline">
                    View result
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload results button */}
      <div className="bg-gray-350 fixed inset-x-0 bottom-0 p-6 shadow-lg">
        <Link href="/medical-records/lab-tests/upload">
          <Button className="w-full" size={"xl"} disabled>
            Upload results
          </Button>
        </Link>
      </div>
    </PageTransition>
  )
}
