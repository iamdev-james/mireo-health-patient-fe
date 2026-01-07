// app/(dashboard)/subscription/change-payment-method/page.tsx

import PaymentMethodPageClient from "@/components/subscription/payment-method-page"

export const metadata = {
  title: "Change Payment Method | Mireo Health",
  description: "Change your payment method",
}

export default function ChangePaymentMethodPage() {
  return <PaymentMethodPageClient mode="change" />
}
