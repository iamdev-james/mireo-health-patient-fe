// app/(dashboard)/account/bio-data/page.tsx

import BioDataPageClient from "@/components/account/bio-data-page-client"

export const metadata = {
  title: "Bio-data | Mireo Health",
  description: "View and edit your personal information",
}

// async function getBioData(token: string) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/account/bio-data`, {
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
//     console.error("Failed to fetch bio data:", error)
//     return null
//   }
// }

export default async function BioDataPage() {
  const bioData = {
    name: "Rufus Oluwaseyi Oluwasegun",
    email: "Rufusseyi1@gmail.com",
    phoneNumber: "07066160533",
    gender: "Male",
    age: 56,
    maritalStatus: "Single",
    religion: "Christian",
    tribe: "Yoruba",
    occupation: "Accountant",
  }

  // const cookieStore = await cookies()
  // const token = cookieStore.get('auth_token')?.value
  // if (!token) {
  //   redirect('/sign-in')
  // }
  // const bioData = await getBioData(token)
  // if (!bioData) {
  //   redirect('/sign-in')
  // }

  return <BioDataPageClient initialData={bioData} />
}
