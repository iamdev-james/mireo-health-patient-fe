// app/(dashboard)/subscription/page.tsx

import SubscriptionPageClient from "@/components/subscription/subscription-page"
import { SubscriptionData } from "@/types/subscription"

export const metadata = {
  title: "Subscription | Mireo Health",
  description: "Manage your subscription",
}

// async function getSubscriptionData(): Promise<SubscriptionData> {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/subscription`, {
//       headers: {

//       },
//       cache: "no-store",
//     })

//     if (!response.ok) {
//       throw new Error("Failed to fetch subscription data")
//     }

//     const data = (await response.json()) as { data: SubscriptionData }
//     return data.data
//   } catch (error) {
//     console.error("Failed to fetch subscription data:", error)
//     throw error
//   }
// }

export default async function SubscriptionPage() {
  // Mock data for development
  const subscriptionData: SubscriptionData = {
    plan: {
      name: "Mireo Comply",
      status: "active", // or 'not_active'
      price: "₦20,000/month",
      nextBillingDate: "November 25",
    },
    benefits: [
      { text: "Monthly Prescription by health provider" },
      { text: "Health improvement monitoring" },
      { text: "Treatment plan compliant with" },
      { text: "Regular doctor health review" },
      { text: "Regular health care provider check in" },
    ],
    bankAccount: {
      accountName: "Rufus Oluwaseyi",
      bankName: "Wema bank",
      accountNumber: "0025617281",
    },
    paymentMethod: {
      lastFourDigits: "3099*********9182",
      status: null, // or 'failed'
    },
    promoMessage: "Get ₦1000 off when you pay with your card",
  }

  // Uncomment when backend is ready:
  // const subscriptionData = await getSubscriptionData()

  return <SubscriptionPageClient data={subscriptionData} />
}
