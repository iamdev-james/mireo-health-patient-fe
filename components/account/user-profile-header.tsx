// components/account/user-profile-header.tsx

import Image from "next/image"

interface UserProfileHeaderProps {
  name: string
  profileImage?: string
  title: string
}

export function UserProfileHeader({ name, profileImage, title }: UserProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl font-medium text-gray-900">{title}</p>
      <div className="relative h-13 w-13 overflow-hidden rounded-full bg-gray-200">
        <Image src={profileImage || "/images/userimg.svg"} alt={name} fill className="object-cover" sizes="80px" />
      </div>
    </div>
  )
}
