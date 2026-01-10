// components/compliance/month-navigator.tsx

"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface MonthNavigatorProps {
  currentMonth: string
  onPrevious: () => void
  onNext: () => void
  canGoPrevious?: boolean
  canGoNext?: boolean
}

export function MonthNavigator({
  currentMonth,
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
}: MonthNavigatorProps) {
  return (
    <div className="-ml-3 flex items-center gap-2">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Previous month"
      >
        <ChevronLeft className="h-5 w-auto text-gray-700" />
      </button>

      <h2 className="min-w-[100px] text-center text-xl text-black">{currentMonth}</h2>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Next month"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  )
}
