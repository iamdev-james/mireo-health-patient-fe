// app/(dashboard)/account/medical-history/page.tsx

import MedicalHistoryPageClient from "@/components/account/medical-history-page-client"

export const metadata = {
  title: "Medical History | Mireo Health",
  description: "View your medical history",
}

// async function getMedicalHistory(token: string) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/account/medical-history`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     })

//     if (!response.ok) {
//       return null
//     }

//     const data: any = await response.json()
//     return data.data
//   } catch (error) {
//     console.error("Failed to fetch medical history:", error)
//     return null
//   }
// }

export default async function MedicalHistoryPage() {
  const medicalHistory = {
    hypertension: false,
    diabetes: false,
    currentMedication: "None",
    allergies: "None",
  }

  // const cookieStore = await cookies()
  // const token = cookieStore.get('auth_token')?.value
  // if (!token) {
  //   redirect('/sign-in')
  // }
  // const medicalHistory = await getMedicalHistory(token)
  // if (!medicalHistory) {
  //   redirect('/sign-in')
  // }

  return <MedicalHistoryPageClient data={medicalHistory} />
}
