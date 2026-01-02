// app/(dashboard)/account/page.tsx

// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
import AccountPageClient from "@/components/account/account-page-client"

export const metadata = {
  title: "Account | Mireo Health",
  description: "Manage your account settings",
}

// async function getUserProfile(token: string) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/account/profile`, {
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
//     console.error("Failed to fetch user profile:", error)
//     return null
//   }
// }

export default async function AccountPage() {
  const userData = {
    name: "User",
    profileImage: undefined,
  }

  // const cookieStore = await cookies()
  // const token = cookieStore.get('auth_token')?.value
  // if (!token) {
  //   redirect('/sign-in')
  // }
  // const userData = await getUserProfile(token)
  // if (!userData) {
  //   redirect('/sign-in')
  // }

  return <AccountPageClient userData={userData} />
}
