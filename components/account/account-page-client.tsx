// components/account/account-page-client.tsx

"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"
import { UserProfileHeader } from "@/components/account/user-profile-header"
import { MenuSection } from "@/components/account/menu-section"
import { MenuListItem } from "@/components/account/menu-list-item"
import { Button } from "@/components/ui/button"
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
    <PageTransition className="min-h-screen bg-gray-50 pb-20">
      <div className="px-6 py-6">
        <UserProfileHeader name={userData.name} profileImage={userData.profileImage} />

        <div className="mt-8 space-y-6">
          <MenuSection title="Personal Information">
            <MenuListItem label="Bio-data" href="/account/bio-data" />
          </MenuSection>

          <MenuSection title="Medical Information">
            <MenuListItem label="Past medical history" href="/account/medical-history" />
            <MenuListItem label="Medical records" href="/account/medical-records" />
            <MenuListItem label="Monthly report" href="/account/monthly-report" />
          </MenuSection>

          <MenuSection title="">
            <MenuListItem label="Subscription" href="/account/subscription" />
          </MenuSection>

          <div className="pt-4">
            <MenuListItem
              label="Delete account"
              href="#"
              variant="danger"
              icon={<Trash2 className="h-5 w-5" />}
              onClick={handleDeleteAccount}
            />
          </div>

          <Button
            onClick={handleSignOut}
            className="h-14 w-full rounded-xl bg-red-600 text-lg font-medium text-white hover:bg-red-700"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
