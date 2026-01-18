// app/(dashboard)/compliance/reading/blood-sugar/page.tsx

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ReadingTypeSelector } from "@/components/dashboard/reading-type-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTransition } from "@/components/ui/page-transition"
import { APIError, readingAPI } from "@/lib/services/reading-api"
import { type BloodSugarInput, bloodSugarSchema } from "@/lib/validations/readings"
import { BLOOD_SUGAR_TYPES } from "@/types/readings"
import type { BloodSugarType } from "@/types/readings"

export default function BloodSugarPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<BloodSugarType | null>(null)
  const [showValueInput, setShowValueInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BloodSugarInput>({
    resolver: zodResolver(bloodSugarSchema),
  })

  const handleTypeSelect = (type: BloodSugarType) => {
    setSelectedType(type)
  }

  const handleContinue = () => {
    if (selectedType) {
      setShowValueInput(true)
    }
  }

  const onSubmit = async (data: BloodSugarInput) => {
    if (!selectedType) return

    setIsLoading(true)
    setApiError(null)

    try {
      //   await readingAPI.submitBloodSugar(selectedType, Number(data.value))
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof APIError) {
        setApiError(error.message)
      } else {
        setApiError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = () => {
    if (showValueInput && selectedType) {
      return BLOOD_SUGAR_TYPES.find((t) => t.id === selectedType)?.title || "Blood Sugar"
    }
    return "Blood Sugar"
  }

  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <button
          onClick={() => (showValueInput ? setShowValueInput(false) : router.back())}
          className="justify-self-start rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 font-light" />
        </button>

        <p className="-ml-2 text-center text-lg font-medium text-nowrap md:text-xl">{getTitle()}</p>

        <div />
      </div>

      <div className="px-6 py-4">
        {!showValueInput ? (
          <>
            <p className="mb-6 text-sm font-medium text-gray-400 md:text-base">
              Select what reading type you want to log
            </p>

            <ReadingTypeSelector options={BLOOD_SUGAR_TYPES} selected={selectedType} onSelect={handleTypeSelect} />

            <Button onClick={handleContinue} className="mt-10 w-full" size="xl" disabled={!selectedType}>
              Continue
            </Button>
          </>
        ) : (
          <>
            <p className="mb-6 text-sm font-medium text-gray-400">Enter {selectedType} blood sugar value</p>

            {apiError && <div className="text-error-500 mb-6 rounded-lg bg-red-50 p-4 text-sm">{apiError}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("value")}
                    type="text"
                    inputMode="numeric"
                    placeholder="120"
                    className={`h-12 pr-20`}
                    disabled={isLoading}
                  />
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-gray-800">
                    mg/dl
                  </span>
                </div>
                {errors.value && <p className="text-xs text-red-500">{errors.value.message}</p>}
              </div>

              <Button type="submit" className="mt-5 w-full" size="xl" disabled={isLoading}>
                {isLoading ? "Logging reading..." : "Log reading"}
              </Button>
            </form>
          </>
        )}
      </div>
    </PageTransition>
  )
}
