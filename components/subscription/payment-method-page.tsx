// components/subscription/payment-method-page.tsx

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import { PaymentMethodForm } from "@/types/subscription"
import { Input } from "../ui/input"

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
      router.push("/subscription")
    } catch (error) {
      console.error("Failed to save payment method:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />
        <p className="-ml-5 text-center text-lg font-medium text-nowrap md:text-xl">
          {mode === "add" ? "Add Payment Method" : "Change Payment Method"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
        <div>
          <label htmlFor="cardNumber" className="mb-2 block text-sm md:text-base">
            Card number
          </label>
          <Input
            id="cardNumber"
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            placeholder="0000 0000 0000 00000"
            maxLength={19}
            required
            className="h-14"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="mb-2 block text-sm md:text-base">
              Expiry date
            </label>
            <Input
              id="expiryDate"
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              className="h-14"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="mb-2 block text-sm md:text-base">
              CVV
            </label>
            <Input
              id="cvv"
              type="password"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              placeholder="***"
              maxLength={3}
              className="h-14"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full" size={"xl"}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </PageTransition>
  )
}
