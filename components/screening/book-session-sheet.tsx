// components/screening/book-session-sheet.tsx
"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { LGA, screeningService, State } from "@/lib/services/screening-service"

interface BookSessionSheetProps {
  isOpen: boolean
  onClose: () => void
  assessmentFee?: string
  screeningType?: string
}

// Generate dates from Jan 29, 2026 onwards
const generateAvailableDates = (): { label: string; value: string }[] => {
  const dates: { label: string; value: string }[] = []
  const baseDate = new Date("2026-02-19T10:00:00")

  const timeSlots = ["10:00 AM", "2:00 PM", "9:00 AM"]

  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i)

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
    const monthName = date.toLocaleDateString("en-US", { month: "short" })
    const dayNum = date.getDate()
    const year = date.getFullYear()
    const timeSlot = timeSlots[i % timeSlots.length] ?? "10:00 AM"

    // Parse time slot for ISO date
    const [time, period] = timeSlot.split(" ")
    const [hours, minutes] = (time ?? "10:00").split(":").map(Number)
    let hour24 = hours ?? 10
    if (period === "PM" && hour24 !== 12) hour24 += 12
    if (period === "AM" && hour24 === 12) hour24 = 0

    const isoDate = new Date(date)
    isoDate.setHours(hour24, minutes ?? 0, 0, 0)

    dates.push({
      label: `${dayName}, ${monthName} ${dayNum}, ${year} - ${timeSlot}`,
      value: isoDate.toISOString(),
    })
  }

  return dates
}

const AVAILABLE_DATES = generateAvailableDates()

export function BookSessionSheet({
  isOpen,
  onClose,
  assessmentFee = "₦20,000",
  screeningType = "hypertension",
}: BookSessionSheetProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<{ label: string; value: string } | null>(null)
  const [selectedState, setSelectedState] = useState<State | null>(null)
  const [selectedLGA, setSelectedLGA] = useState<LGA | null>(null)
  const [address, setAddress] = useState<string>("")

  const [states, setStates] = useState<State[]>([])
  const [lgas, setLGAs] = useState<LGA[]>([])

  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [showLGADropdown, setShowLGADropdown] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch states on mount
  useEffect(() => {
    if (isOpen && states.length === 0) {
      screeningService
        .getStates()
        .then(setStates)
        .catch((err) => {
          console.error("Failed to fetch states:", err)
        })
    }
  }, [isOpen, states.length])

  // Fetch LGAs when state changes
  useEffect(() => {
    if (selectedState) {
      setLGAs([])
      setSelectedLGA(null)
      screeningService
        .getLGAs(selectedState.id)
        .then(setLGAs)
        .catch((err) => {
          console.error("Failed to fetch LGAs:", err)
        })
    }
  }, [selectedState])

  const handleProceedToPay = async () => {
    if (!selectedDate || !selectedLGA || !address.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await screeningService.requestScreening({
        lga_id: selectedLGA.id,
        address: address.trim(),
        scheduled_at: selectedDate.value,
      })

      // Store screening response for payment flow
      sessionStorage.setItem(
        "screening_data",
        JSON.stringify({
          ...response,
          date: selectedDate.label,
          lga: selectedLGA.name,
          state: selectedState?.name,
          address: address.trim(),
          fee: assessmentFee,
          screeningType,
        })
      )

      onClose()
      router.push(`/screening/${screeningType}/payment`)
    } catch (err) {
      console.error("Failed to request screening:", err)
      setError(err instanceof Error ? err.message : "Failed to request screening. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = selectedDate && selectedLGA && address.trim()

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Book Session">
      <div className="flex flex-col gap-6">
        {/* Assessment Fee */}
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
          <span className="text-sm text-gray-500">Assessment Fee:</span>
          <span className="text-xl font-bold text-gray-900">{assessmentFee}</span>
        </div>

        <div className="border-t border-gray-100" />

        {/* Date Selection */}
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">Choose from available time and date</p>
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Image src="/images/icons/calendar.svg" alt="Calendar" width={18} height={20} />
                <span className={`text-sm ${selectedDate ? "text-gray-900" : "text-gray-400"}`}>
                  {selectedDate?.label || "Select date and time"}
                </span>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>

            {showDateDropdown && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                {AVAILABLE_DATES.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => {
                      setSelectedDate(date)
                      setShowDateDropdown(false)
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-900 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50"
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* State Selection */}
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">State</p>
          <div className="relative">
            <button
              onClick={() => setShowStateDropdown(!showStateDropdown)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Image src="/images/icons/location.svg" alt="Location" width={16} height={20} />
                <span className={`text-sm ${selectedState ? "text-gray-900" : "text-gray-400"}`}>
                  {selectedState?.name || "Select state"}
                </span>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>

            {showStateDropdown && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                {states.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Loading states...</div>
                ) : (
                  states.map((state) => (
                    <button
                      key={state.id}
                      onClick={() => {
                        setSelectedState(state)
                        setShowStateDropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-gray-900 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50"
                    >
                      {state.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* LGA Selection */}
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">Local Government Area (LGA)</p>
          <div className="relative">
            <button
              onClick={() => selectedState && setShowLGADropdown(!showLGADropdown)}
              disabled={!selectedState}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Image src="/images/icons/location.svg" alt="Location" width={16} height={20} />
                <span className={`text-sm ${selectedLGA ? "text-gray-900" : "text-gray-400"}`}>
                  {selectedLGA?.name || (selectedState ? "Select LGA" : "Select state first")}
                </span>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>

            {showLGADropdown && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                {lgas.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Loading LGAs...</div>
                ) : (
                  lgas.map((lga) => (
                    <button
                      key={lga.id}
                      onClick={() => {
                        setSelectedLGA(lga)
                        setShowLGADropdown(false)
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-gray-900 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50"
                    >
                      {lga.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Address Input */}
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">Address</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:outline-none"
          />
        </div>

        <p className="text-xs text-gray-500">
          Please choose a location that you're comfortable with. Also ensure that someone is with you throughout the
          assessment process
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Proceed Button */}
        <Button size="xl" className="w-full" onClick={handleProceedToPay} disabled={!isFormValid || isLoading}>
          {isLoading ? "Processing..." : "Proceed to Pay"}
        </Button>
      </div>
    </BottomSheet>
  )
}
