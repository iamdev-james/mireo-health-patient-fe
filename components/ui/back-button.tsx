// components/ui/back-button.tsx
"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  route?: string
  className?: string
}

export function BackButton({ route, className = "" }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (route) {
      router.push(route)
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`justify-self-start rounded-full p-2 hover:bg-gray-100 ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-6 w-6 font-light" />
    </button>
  )
}
