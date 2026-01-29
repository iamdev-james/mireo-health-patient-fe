"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { BottomSheet } from "@/components/ui/bottom-sheet"

interface ScreeningOption {
  id: string
  title: string
  subtitle?: string
  icon: string
  backgroundColor: string
  borderColor: string
  disabled?: boolean
  href?: string
}

const SCREENING_OPTIONS: ScreeningOption[] = [
  {
    id: "hypertension",
    title: "Hypertension/Diabetes Screening",
    icon: "/images/icons/hypertension.svg",
    backgroundColor: "#5B9DE80D",
    borderColor: "#5B9DE833",
    href: "/screening/hypertension",
  },
  {
    id: "sti",
    title: "STI Screening",
    subtitle: "(Coming soon)",
    icon: "/images/icons/sti-screening.svg",
    backgroundColor: "#3BCC500D",
    borderColor: "#3BCC504D",
    disabled: true,
  },
  {
    id: "medical-checkup",
    title: "Medical Check Up",
    subtitle: "(Coming soon)",
    icon: "/images/icons/medical-checkup.svg",
    backgroundColor: "#D65BFF0D",
    borderColor: "#D65BFF33",
    disabled: true,
  },
]

interface ScreeningOptionsSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function ScreeningOptionsSheet({ isOpen, onClose }: ScreeningOptionsSheetProps) {
  const router = useRouter()

  const handleOptionClick = (option: ScreeningOption) => {
    if (option.disabled) return
    if (option.href) {
      onClose()
      router.push(option.href)
    }
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="What will you like to screen for?">
      <div className="flex flex-col gap-4">
        {SCREENING_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={option.disabled}
            className="flex flex-col items-start rounded-xl p-4 text-left transition-opacity"
            style={{
              backgroundColor: option.backgroundColor,
              border: `1px solid ${option.borderColor}`,
              opacity: option.disabled ? 0.7 : 1,
              cursor: option.disabled ? "not-allowed" : "pointer",
            }}
          >
            <Image src={option.icon} alt={option.title} width={24} height={24} className="mb-3" />
            <span className="text-sm font-medium text-gray-900">{option.title}</span>
            {option.subtitle && <span className="text-xs text-gray-500">{option.subtitle}</span>}
          </button>
        ))}
      </div>
    </BottomSheet>
  )
}
