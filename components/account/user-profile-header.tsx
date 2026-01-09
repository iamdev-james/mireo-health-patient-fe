// components/account/user-profile-header.tsx

import Image from "next/image"

interface UserProfileHeaderProps {
  name: string
  profileImage?: string
}

export function UserProfileHeader({ name, profileImage }: UserProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl font-medium text-gray-900">Account</p>
      <div className="relative h-13 w-13 overflow-hidden rounded-full bg-gray-200">
        <Image src={profileImage || "/images/userimg.svg"} alt={name} fill className="object-cover" sizes="80px" />
      </div>
    </div>
  )
}
