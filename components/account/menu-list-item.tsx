// components/account/menu-list-item.tsx

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuListItemProps {
  label: string
  href: string
  variant?: "default" | "danger"
  icon?: React.ReactNode
  onClick?: () => void
}

export function MenuListItem({ label, href, variant = "default", icon, onClick }: MenuListItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl bg-white px-6 py-4 transition-colors hover:bg-gray-50",
        variant === "danger" && "text-red-600"
      )}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="text-base font-normal">{label}</span>
      </div>
      {variant === "default" && <ChevronRight className="h-5 w-5 text-gray-400" />}
      {variant === "danger" && icon}
    </div>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    )
  }

  return <Link href={href}>{content}</Link>
}
