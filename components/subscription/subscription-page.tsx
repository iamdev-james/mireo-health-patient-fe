// components/subscription/subscription-page.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, CreditCard, X, CheckCircle2 } from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { SubscriptionData } from "@/types/subscription"

interface SubscriptionPageClientProps {
  data: SubscriptionData
}

export default function SubscriptionPageClient({ data }: SubscriptionPageClientProps) {
  const router = useRouter()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(data.bankAccount.accountNumber)
  }

  const handleCancelSubscription = async () => {
    setIsCanceling(true)
    try {
      // API call to cancel subscription
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay
      // Handle success
      setShowCancelModal(false)
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
    } finally {
      setIsCanceling(false)
    }
  }

  const handlePayNow = () => {
    // Handle payment
    console.log("Pay now clicked")
  }

  const handleRenewSubscription = () => {
    // Handle renewal
    console.log("Renew subscription clicked")
  }

  return (
    <>
      <PageTransition className="min-h-screen bg-white pb-20">
        <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
          <BackButton />
          <p className="text-center text-lg font-medium md:text-xl">Subscription</p>
          <div />
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Subscription Status Card */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">{data.plan.name}</h3>
              <span
                className={`text-base font-medium ${
                  data.plan.status === "active" ? "text-[#0066CC]" : "text-gray-500"
                }`}
              >
                {data.plan.status === "active" ? "Active" : "Not active"}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Price :</span>
                <span className="text-base font-medium text-[#0066CC]">{data.plan.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Next billing date:</span>
                <span className="text-base font-medium text-[#0066CC]">{data.plan.nextBillingDate}</span>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-3">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-[#0066CC]" />
                <p className="text-base text-gray-900">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* Bank Account Info */}
          <div className="rounded-2xl bg-gray-50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <svg className="h-6 w-6 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21h18M3 7v13M21 7v13M7 21V7m10 14V7M9 5l3-3 3 3M9 19h6"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  {data.bankAccount.accountName} | {data.bankAccount.bankName}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-900">{data.bankAccount.accountNumber}</p>
                  <button onClick={copyAccountNumber} className="text-[#0066CC] hover:text-[#0052A3]">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Message */}
          <div className="rounded-t-2xl bg-[#0066CC] p-4">
            <p className="text-center text-base font-medium text-white">{data.promoMessage}</p>
          </div>

          {/* Payment Method Section */}
          <div className="rounded-b-2xl bg-white px-4 pb-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Payment method</h3>
              {data.paymentMethod?.status === "failed" && (
                <span className="text-sm font-medium text-red-600">Failed</span>
              )}
            </div>

            {data.paymentMethod ? (
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-[#0066CC]" />
                  <span className="text-base text-gray-900">{data.paymentMethod.lastFourDigits}</span>
                </div>
                <button
                  onClick={() => router.push("/subscription/change-payment-method")}
                  className="text-base font-medium text-[#0066CC] hover:text-[#0052A3]"
                >
                  Change →
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/subscription/add-payment-method")}
                className="flex w-full items-center justify-between rounded-xl bg-gray-50 p-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-[#0066CC]" />
                  <span className="text-base text-gray-900">Add payment method</span>
                </div>
                <span className="text-[#0066CC]">→</span>
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {data.plan.status === "active" ? (
              <button
                onClick={handlePayNow}
                className="w-full text-center text-base font-medium text-[#0066CC] underline"
              >
                Pay for next subscription now
              </button>
            ) : (
              <Button
                onClick={handleRenewSubscription}
                className="h-14 w-full rounded-xl bg-[#0066CC] text-lg font-medium text-white hover:bg-[#0052A3]"
              >
                Renew subscription
              </Button>
            )}

            <button
              onClick={() => setShowCancelModal(true)}
              className="w-full rounded-xl bg-red-50 py-4 text-center text-base font-medium text-red-600 hover:bg-red-100"
            >
              Cancel subscription
            </button>
          </div>
        </div>
      </PageTransition>

      {/* Cancel Subscription Modal - Bottom Drawer */}
      {showCancelModal && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur"
          onClick={() => setShowCancelModal(false)}
        >
          <div
            className={`w-full rounded-t-3xl bg-white p-6 ${
              showCancelModal ? "animate-slide-up" : "animate-slide-down"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-red-600">Cancel subscription</h2>
              <button onClick={() => setShowCancelModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 rounded-2xl bg-gray-50 p-6">
              <p className="mb-4 text-sm text-gray-600">If you cancel, you'll lose access to:</p>
              <ul className="space-y-2">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-900">•</span>
                    <span className="text-sm text-gray-900">{benefit.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                You'll keep premium access until your current billing period ends.
              </p>
            </div>

            <Button
              onClick={handleCancelSubscription}
              disabled={isCanceling}
              className="h-14 w-full rounded-xl bg-red-600 text-lg font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isCanceling ? "Canceling..." : "Cancel subscription"}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
