// app/(dashboard)/screening/hypertension/payment/page.tsx
"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ScreeningData {
  screening_id: string
  access_code: string
  authorization_url: string
  amount: number
  status: string
  date: string
  lga: string
  state?: string
  address: string
  fee: string
  screeningType: string
}

interface PaymentOption {
  id: string
  title: string
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "bank-transfer",
    title: "Bank Transfer",
  },
  {
    id: "card",
    title: "Pay with Card",
  },
]

export default function PaymentMethodPage() {
  const router = useRouter()
  const [screeningData, setScreeningData] = useState<ScreeningData | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("screening_data")
    if (data) {
      setScreeningData(JSON.parse(data) as ScreeningData)
    }
  }, [])

  const handleBack = () => {
    // Go back to the screening page and potentially reopen the booking sheet
    router.push("/screening/hypertension?openBooking=true")
  }

  const handleOptionClick = (option: PaymentOption) => {
    if (option.id === "card") {
      // Redirect to Paystack authorization URL
      if (screeningData?.authorization_url) {
        window.location.href = screeningData.authorization_url
      } else {
        alert("Payment URL not available. Please try again.")
      }
    } else {
      router.push("/screening/hypertension/payment/bank-transfer")
    }
  }

  return (
    <div className="m-auto min-h-screen w-full max-w-2xl bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4">
        <button
          onClick={handleBack}
          className="justify-self-start rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <p className="text-center text-lg font-medium">Choose Payment Method</p>

        <div className="w-10" />
      </div>

      {/* Payment Options */}
      <div className="px-6 py-4">
        <div className="flex flex-col">
          {PAYMENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="mb-2 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-4 text-left"
            >
              <span className="text-base text-gray-900">{option.title}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
