// components/account/account-page-client.tsx

"use client"

import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { MenuListItem } from "@/components/account/menu-list-item"
import { UserProfileHeader } from "@/components/account/user-profile-header"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import { accountAPI } from "@/lib/services/account-api"

interface AccountPageClientProps {
  userData: {
    name: string
    profileImage?: string
  }
}

export default function AccountPageClient({ userData }: AccountPageClientProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await accountAPI.signOut()
      sessionStorage.removeItem("auth_token")
      router.push("/sign-in")
    } catch (error) {
      console.error("Sign out error:", error)
      sessionStorage.removeItem("auth_token")
      router.push("/sign-in")
    }
  }

  const handleDeleteAccount = () => {
    router.push("/account/delete")
  }

  return (
    <PageTransition className="bg-gray-350 min-h-screen pb-20">
      <div className="m-auto min-h-screen w-full max-w-2xl px-6 py-6">
        <UserProfileHeader name={userData.name} profileImage={userData.profileImage} />

        <div className="mt-6 space-y-6">
          <div className="space-y-3 rounded-2xl bg-white px-2 pt-4 pb-2">
            <p className="px-3 text-sm md:text-base">Personal Information</p>
            <div className="space-y-2">
              <MenuListItem label="Bio-data" href="/account/bio-data" />
            </div>
          </div>

          <div className="space-y-3 rounded-2xl bg-white px-2 pt-4 pb-2">
            <p className="px-3 text-sm md:text-base">Medical Information</p>
            <div className="">
              <MenuListItem label="Past medical history" href="/account/medical-history" />
              <hr className="mx-3 my-1" />
              <MenuListItem label="Medical records" href="/account/medical-records" />
              <hr className="mx-3 my-1" />
              <MenuListItem label="Monthly report" href="/account/monthly-report" />
            </div>
          </div>

          <div className="rounded-2xl bg-white px-2 py-2">
            <MenuListItem label="Subscription" href="/account/subscription" />
          </div>
          <div className="rounded-2xl bg-white px-2 py-2">
            <MenuListItem
              label="Delete account"
              href="#"
              variant="danger"
              icon={<Trash2 className="h-5 w-5" />}
              onClick={handleDeleteAccount}
            />
          </div>

          <Button onClick={handleSignOut} className="mt-8 w-full" variant={"destructive"} size={"xl"}>
            Sign Out
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
