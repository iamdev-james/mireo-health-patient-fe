// components/account/account-page-client.tsx

"use client"

import { Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      // API call to delete account
      router.push("/sign-in")
    } catch (error) {
      console.error("Failed to delete account:", error)
    } finally {
      setIsDeleting(false)
    }
  }

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
              <MenuListItem label="Medical records" href="/medical-records" />
              <hr className="mx-3 my-1" />
              <MenuListItem label="Monthly report" href="/monthly-reports" />
            </div>
          </div>

          <div className="rounded-2xl bg-white px-2 py-2">
            <MenuListItem label="Subscription" href="/subscription" />
          </div>
          <div className="rounded-2xl bg-white px-2 py-2">
            <MenuListItem
              label="Delete account"
              href="#"
              variant="danger"
              icon={<Trash2 className="h-5 w-5" />}
              onClick={() => setShowDeleteModal(true)}
            />
          </div>

          <Button onClick={handleSignOut} className="mt-8 w-full" variant={"destructive"} size={"xl"}>
            Sign Out
          </Button>
        </div>
      </div>
      {/* Delete Account Modal - Bottom Drawer */}
      {showDeleteModal && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className={`w-full rounded-t-3xl bg-white p-6 ${
              showDeleteModal ? "animate-slide-up" : "animate-slide-down"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-red-600">Delete account?</h2>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 rounded-2xl bg-gray-50 p-6">
              <p className="text-sm leading-relaxed text-gray-700">
                This will permanently remove your profile and medical records from Mireo. Once deleted, you will lose
                access to all screening history, prescriptions, follow-up schedules, and messages.
              </p>
            </div>

            <Button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-lg font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              <Trash2 className="h-5 w-5" />
              {isDeleting ? "Deleting..." : "Delete account"}
            </Button>
          </div>
        </div>
      )}
    </PageTransition>
  )
}
