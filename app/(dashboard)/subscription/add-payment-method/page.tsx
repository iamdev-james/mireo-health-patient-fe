// app/(dashboard)/subscription/add-payment-method/page.tsx

import PaymentMethodPageClient from "@/components/subscription/payment-method-page"

export const metadata = {
  title: "Add Payment Method | Mireo Health",
  description: "Add a payment method",
}

export default function AddPaymentMethodPage() {
  return <PaymentMethodPageClient mode="add" />
}
