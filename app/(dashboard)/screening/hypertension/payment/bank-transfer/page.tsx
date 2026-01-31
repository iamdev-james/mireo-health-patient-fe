// app/(dashboard)/screening/hypertension/payment/bank-transfer/page.tsx
"use client"

import { ArrowLeft, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const BANK_DETAILS = {
  accountNumber: "0824560058",
  bankName: "Wema Bank",
  accountName: "Rufus Oluwaseyi",
}

interface ScreeningData {
  amount: number
  fee: string
}

export default function BankTransferPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [fee, setFee] = useState("₦20,000")

  useEffect(() => {
    // Get fee from session storage
    const screeningData = sessionStorage.getItem("screening_data")
    if (screeningData) {
      const parsed = JSON.parse(screeningData) as ScreeningData
      if (parsed.amount) {
        // Format amount from kobo to naira
        const amountInNaira = parsed.amount / 100
        setFee(`₦${amountInNaira.toLocaleString()}`)
      } else if (parsed.fee) {
        setFee(parsed.fee)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} minutes`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(BANK_DETAILS.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = () => {
    // In a real app, this would call an API to verify payment
    router.push("/screening/hypertension/success")
  }

  return (
    <div className="m-auto min-h-screen w-full max-w-2xl bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4">
        <button
          onClick={() => router.back()}
          className="justify-self-start rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <p className="text-center text-lg font-medium">Bank transfer</p>

        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <p className="mb-1 text-gray-700">
          Send <span className="font-bold text-gray-900">{fee}</span> to the bank account below
        </p>
        <p className="mb-6 text-sm text-gray-500">
          Account is valid for <span className="text-primary font-medium">{formatTime(timeLeft)}</span>
        </p>

        {/* Bank Details Card */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between border-b border-gray-200 py-3">
            <span className="text-sm text-gray-500">Account number</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{BANK_DETAILS.accountNumber}</span>
              <button onClick={handleCopy} className="text-primary" aria-label="Copy account number">
                {copied ? <span className="text-xs text-green-600">Copied!</span> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 py-3">
            <span className="text-sm text-gray-500">Bank name</span>
            <span className="font-medium text-gray-900">{BANK_DETAILS.bankName}</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-500">Account name</span>
            <span className="font-medium text-gray-900">{BANK_DETAILS.accountName}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <Button size="xl" className="mt-8 w-full" onClick={handleConfirmPayment}>
          I've sent the money
        </Button>
      </div>
    </div>
  )
}
