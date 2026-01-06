// components/medical-records/collapsible-section.tsx

"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function CollapsibleSection({ title, defaultOpen = false, children, className }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white", className)}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>

      {isOpen && <div className="border-t border-gray-100 px-6 pt-4 pb-6">{children}</div>}
    </div>
  )
}
