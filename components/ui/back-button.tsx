// components/ui/back-button.tsx

"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="justify-self-start rounded-full p-2 hover:bg-gray-100"
      aria-label="Go back"
    >
      <ArrowLeft className="h-6 w-6 font-light" />
    </button>
  )
}
