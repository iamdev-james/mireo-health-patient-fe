// components/account/user-profile-header.tsx

import Image from "next/image"

interface UserProfileHeaderProps {
  name: string
  profileImage?: string
}

export function UserProfileHeader({ name, profileImage }: UserProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">Account</h1>
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-200">
        {profileImage ? (
          <Image src={profileImage} alt={name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#0066CC] text-2xl font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  )
}
