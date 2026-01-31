// app/(dashboard)/screening/hypertension/success/page.tsx
"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { screeningService } from "@/lib/services/screening-service"

type VerificationStatus = "loading" | "success" | "failed"

export default function ScreeningSuccessPage() {
  const router = useRouter()
  const [status, setStatus] = useState<VerificationStatus>("loading")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get screening_id from session storage
        const screeningData = sessionStorage.getItem("screening_data")
        if (!screeningData) {
          setErrorMessage("No screening data found. Please try booking again.")
          setStatus("failed")
          return
        }

        const parsed = JSON.parse(screeningData) as { screening_id?: string }
        if (!parsed.screening_id) {
          setErrorMessage("Screening ID not found. Please try booking again.")
          setStatus("failed")
          return
        }

        // Verify payment
        const response = await screeningService.verifyPayment(parsed.screening_id)

        // Check if payment was successful
        if (response.status === "success") {
          setStatus("success")
        } else {
          setErrorMessage("Payment verification pending. Please check your payment status.")
          setStatus("failed")
        }
      } catch (error) {
        console.error("Payment verification failed:", error)
        setErrorMessage(error instanceof Error ? error.message : "Payment verification failed. Please try again.")
        setStatus("failed")
      }
    }

    verifyPayment()
  }, [])

  const handleContinue = () => {
    // Clear screening data
    sessionStorage.removeItem("screening_data")
    router.push("/dashboard")
  }

  const handleRetry = () => {
    setStatus("loading")
    setErrorMessage("")
    // Re-trigger verification
    window.location.reload()
  }

  if (status === "loading") {
    return (
      <div className="m-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center bg-white px-6">
        <div className="border-t-primary mb-8 h-12 w-12 animate-spin rounded-full border-4 border-gray-200" />
        <p className="text-center text-gray-600">Verifying your payment...</p>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="m-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center bg-white px-6">
        <div className="mb-8 text-6xl">❌</div>
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">Payment Verification Failed</h1>
        <p className="mb-8 text-center text-gray-500">{errorMessage}</p>

        <div className="fixed inset-x-0 bottom-0 m-auto flex w-full max-w-2xl flex-col gap-3 bg-white px-6 py-6">
          <Button size="xl" className="w-full" onClick={handleRetry}>
            Try Again
          </Button>
          <Button size="xl" variant="outline" className="w-full" onClick={handleContinue}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="m-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center bg-white px-6">
      {/* Success Image */}
      <div className="mb-8">
        <Image src="/succes-bitmoji.svg" alt="Success" width={180} height={180} />
      </div>

      {/* Success Message */}
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">
        Your Assessment Has
        <br />
        Been Scheduled!
      </h1>

      <p className="mb-12 text-center text-gray-500">
        We will send booking confirmation to your email within the next 30 minutes
      </p>

      {/* Continue Button */}
      <div className="fixed inset-x-0 bottom-0 m-auto w-full max-w-2xl bg-white px-6 py-6">
        <Button size="xl" className="w-full" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
