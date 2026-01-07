// components/subscription/payment-method-page.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/ui/page-transition"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { PaymentMethodForm } from "@/types/subscription"

interface PaymentMethodPageClientProps {
  mode: "add" | "change"
}

export default function PaymentMethodPageClient({ mode }: PaymentMethodPageClientProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PaymentMethodForm>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (field: keyof PaymentMethodForm, value: string) => {
    if (field === "cardNumber") {
      // Format card number with spaces
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData((prev) => ({ ...prev, [field]: formatted }))
    } else if (field === "expiryDate") {
      // Format expiry date as MM/YY
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // API call to save payment method
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay

      // Navigate back to subscription page
      router.push("/subscription")
    } catch (error) {
      console.error("Failed to save payment method:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="text-center text-lg font-medium md:text-xl">
          {mode === "add" ? "Add Payment Method" : "Change Payment Method"}
        </p>
        <div />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="mb-2 block text-base font-medium text-gray-900">
            Card number
          </label>
          <input
            id="cardNumber"
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            placeholder="0000 0000 0000 00000"
            maxLength={19}
            className="w-full rounded-xl border-0 bg-gray-50 px-4 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
            required
          />
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="mb-2 block text-base font-medium text-gray-900">
              Expiry date
            </label>
            <input
              id="expiryDate"
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full rounded-xl border-0 bg-gray-50 px-4 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="mb-2 block text-base font-medium text-gray-900">
              CVV
            </label>
            <input
              id="cvv"
              type="password"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              placeholder="***"
              maxLength={3}
              className="w-full rounded-xl border-0 bg-gray-50 px-4 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 w-full rounded-xl bg-[#0066CC] text-lg font-medium text-white hover:bg-[#0052A3] disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </PageTransition>
  )
}
