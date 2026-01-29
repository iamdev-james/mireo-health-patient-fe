// components/account/user-profile-header.tsx
"use client"

import { LogOut, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface UserProfileHeaderProps {
  name: string
  profileImage?: string
  title: string
  subtitle?: string
}

export function UserProfileHeader({ name, profileImage, title, subtitle }: UserProfileHeaderProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("refresh_token")
    sessionStorage.removeItem("screening_data")
    sessionStorage.removeItem("booking_data")

    // Redirect to sign-in
    router.push("/sign-in")
  }

  const handleAccountClick = () => {
    setIsMenuOpen(false)
    router.push("/account")
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-medium text-gray-900">{title}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="relative" ref={menuRef}>
        {/* Profile Image Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:ring-primary/30 focus:ring-primary/50 relative h-13 w-13 overflow-hidden rounded-full bg-gray-200 ring-2 ring-transparent transition-all focus:outline-none"
          aria-label="User menu"
        >
          <Image src={profileImage || "/images/userimg.svg"} alt={name} fill className="object-cover" sizes="80px" />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
            <button
              onClick={handleAccountClick}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              <User className="h-4 w-4" />
              Account
            </button>
            <div className="mx-4 border-t border-gray-100" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
