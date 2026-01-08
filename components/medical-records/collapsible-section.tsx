// components/medical-records/collapsible-section.tsx

"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
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
    <div className={cn("", className)}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-1 flex w-full items-center justify-between">
        <h3 className="text-xl text-black">{title}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-700" /> : <ChevronDown className="h-5 w-5 text-gray-700" />}
      </button>

      {isOpen && <div className="pt-4">{children}</div>}
    </div>
  )
}
