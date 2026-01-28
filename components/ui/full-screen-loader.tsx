"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { LoaderService } from "@/lib/services/loader-service"

export function FullScreenLoader() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return LoaderService.subscribe((loading) => {
      setIsLoading(loading)
    })
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="text-primary h-12 w-12 animate-spin" />
      </div>
    </div>
  )
}
