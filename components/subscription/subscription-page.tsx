// components/subscription/subscription-page.tsx

"use client"

import { CheckCircle2, ChevronRight, CreditCard, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
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
      setShowCancelModal(false)
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
    } finally {
      setIsCanceling(false)
    }
  }

  const handlePayNow = () => {
    console.log("Pay now clicked")
  }

  const handleRenewSubscription = () => {
    console.log("Renew subscription clicked")
  }

  return (
    <>
      <PageTransition className="min-h-screen bg-white pb-20">
        <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-3 py-4">
          <BackButton />
          <p className="text-center text-lg font-medium text-nowrap md:text-xl">Subscription</p>
          <div />
        </div>

        <div className="space-y-6 px-4 pt-2 pb-6">
          <div className="border-primary-200/50 bg-primary-200/10 rounded-xl border px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-medium md:text-xl">{data.plan.name}</p>
              <span
                className={`text-sm font-medium md:text-base ${
                  data.plan.status === "active" ? "text-primary" : "text-gray-500"
                }`}
              >
                {data.plan.status === "active" ? "Active" : "Not active"}
              </span>
            </div>
            <div className="border-primary-200/10 space-y-2 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Price :</span>
                <span className="text-primary-200 text-sm font-medium md:text-base">{data.plan.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Next billing date:</span>
                <span className="text-primary-200 text-sm font-medium md:text-base">{data.plan.nextBillingDate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 fill="currentColor" stroke="white" className="h-7 w-7 flex-shrink-0 text-[#0066CC]" />
                <p className="text-sm font-medium md:text-base">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* Bank Account Info */}
          <div className="rounded-2xl border border-gray-50 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="">
                <Image src="/images/bank.svg" alt="Bank Icon" width={28} height={28} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">
                  {data.bankAccount.accountName} | {data.bankAccount.bankName}
                </p>
              </div>
            </div>
            <div className="mt-1 ml-10 flex items-center gap-2">
              <p className="font-medium">{data.bankAccount.accountNumber}</p>
              <button onClick={copyAccountNumber} className="">
                <Image src="/images/copy.svg" alt="Copy Icon" width={14} height={14} />
              </button>
            </div>
          </div>

          <div className="bg-primary rounded-t-3xl rounded-b-2xl pt-4">
            <p className="pb-4 pl-5 text-sm font-medium text-white md:text-base">{data.promoMessage}</p>

            {/* Payment Method Section */}
            <div className="rounded-2xl border border-gray-50 bg-white p-4">
              {data.paymentMethod ? (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-medium md:text-lg">Payment method</h3>
                    {data.paymentMethod?.status === "failed" && (
                      <span className="text-destructive text-sm">Failed</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-primary h-6 w-6" />
                      <span className="text-base text-gray-900">{data.paymentMethod?.lastFourDigits}</span>
                    </div>
                    <button
                      onClick={() => router.push("/subscription/change-payment-method")}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm md:text-base"
                    >
                      <span>Change</span>
                      <ChevronRight className="mt-0.5 h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/subscription/add-payment-method")}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-primary h-6 w-6" />
                    <span className="text-base font-medium">Add payment method</span>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>
              )}
            </div>
          </div>

          <div>
            {data.plan.status === "active" ? (
              <div className="space-y-4">
                <button
                  onClick={handlePayNow}
                  className="text-primary w-full text-center text-base font-medium underline"
                >
                  Pay for next subscription now
                </button>
                <Button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full"
                  size={"xl"}
                  variant={"destructiveOutline"}
                >
                  Cancel subscription
                </Button>
              </div>
            ) : (
              <Button onClick={handleRenewSubscription} className="w-full" size={"xl"}>
                Renew subscription
              </Button>
            )}
          </div>
        </div>
      </PageTransition>

      {/* Cancel Subscription Modal */}
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
              <h2 className="text-destructive text-xl font-medium md:text-xl">Cancel subscription</h2>
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-gray-350 rounded-full p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-gray-350 mb-6 rounded-2xl border border-gray-50 p-5">
              <p className="mb-5 text-sm font-medium text-gray-400">If you cancel, you'll lose access to:</p>
              <ul className="space-y-3">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-gray-900">•</span>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-medium text-gray-400">
                You'll keep premium access until your current billing period ends.
              </p>
            </div>

            <Button
              onClick={handleCancelSubscription}
              disabled={isCanceling}
              className="w-full"
              variant={"destructive"}
              size={"xl"}
            >
              {isCanceling ? "Canceling..." : "Cancel subscription"}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
