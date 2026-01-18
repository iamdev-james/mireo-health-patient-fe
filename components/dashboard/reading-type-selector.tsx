// components/dashboard/reading-type-selector.tsx
"use client"

import { Check } from "lucide-react"
import { BloodSugarType, ReadingTypeOption } from "@/types/readings"
import { cn } from "@/lib/utils"

interface ReadingTypeSelectorProps {
  options: ReadingTypeOption[]
  selected: BloodSugarType | null
  onSelect: (type: BloodSugarType) => void
}

export function ReadingTypeSelector({ options, selected, onSelect }: ReadingTypeSelectorProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      {options.map((option, index) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={cn(
            "w-full py-4 text-left transition-colors hover:bg-gray-50",
            index !== options.length - 1 && "border-b border-gray-100"
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-black">{option.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{option.description}</p>
            </div>
            {selected === option.id && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
