// components/dashboard/reading-type-selector.tsx
"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { BloodSugarType, ReadingTypeOption } from "@/types/readings"

interface ReadingTypeSelectorProps {
  options: ReadingTypeOption[]
  selected: BloodSugarType | null
  onSelect: (type: BloodSugarType) => void
}

export function ReadingTypeSelector({ options, selected, onSelect }: ReadingTypeSelectorProps) {
  return (
    <div className="rounded-2xl border border-gray-50 bg-white px-5">
      {options.map((option, index) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={cn(
            "w-full cursor-pointer py-5 text-left transition-colors",
            index !== options.length - 1 && "border-b border-gray-50"
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-medium text-black md:text-lg">{option.title}</h3>
              <p className="mt-1 text-sm font-medium text-gray-400">{option.description}</p>
            </div>
            {selected === option.id ? (
              <div className="bg-primary mt-2 mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </div>
            ) : (
              <div className="bg-gray-70 border-gray-150 mt-2 mr-2 h-6 w-6 shrink-0 rounded-full border" />
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
