// components/account/menu-list-item.tsx

import { ChevronRight } from "lucide-react"
import Link from "next/link"
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
        "hover:bg-gray-350 flex cursor-pointer items-center justify-between rounded-xl bg-transparent px-3 py-4 transition-colors",
        variant === "danger" && "text-destructive"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm md:text-base">{label}</span>
      </div>
      {variant === "default" && <ChevronRight className="h-5 w-5 text-gray-700" />}
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
