// components/compliance/month-navigator.tsx
"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface MonthNavigatorProps {
  currentMonth: string
  onPrevious: () => void
  onNext: () => void
}

export function MonthNavigator({ currentMonth, onPrevious, onNext }: MonthNavigatorProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <button
        onClick={onPrevious}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <ChevronLeft className="h-5 w-5 text-black" />
      </button>

      <h2 className="text-xl font-semibold text-black">{currentMonth}</h2>

      <button
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <ChevronRight className="h-5 w-5 text-black" />
      </button>
    </div>
  )
}
