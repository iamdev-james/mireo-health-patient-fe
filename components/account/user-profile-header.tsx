// components/account/user-profile-header.tsx

import Image from "next/image"

interface UserProfileHeaderProps {
  name: string
  profileImage?: string
  title: string
  subtitle?: string
}

export function UserProfileHeader({ name, profileImage, title, subtitle }: UserProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-medium text-gray-900">{title}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="relative h-13 w-13 overflow-hidden rounded-full bg-gray-200">
        <Image src={profileImage || "/images/userimg.svg"} alt={name} fill className="object-cover" sizes="80px" />
      </div>
    </div>
  )
}
