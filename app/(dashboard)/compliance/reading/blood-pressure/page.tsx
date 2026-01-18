// app/(dashboard)/compliance/reading/blood-pressure/page.tsx

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { BackButton } from "@/components/ui/back-button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTransition } from "@/components/ui/page-transition"
import { APIError, readingAPI } from "@/lib/services/reading-api"
import { bloodPressureSchema, type BloodPressureInput } from "@/lib/validations/readings"

export default function BloodPressurePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BloodPressureInput>({
    resolver: zodResolver(bloodPressureSchema),
  })

  const onSubmit = async (data: BloodPressureInput) => {
    setIsLoading(true)
    setApiError(null)

    try {
      const [systolic, diastolic] = data.value.split("/").map(Number)
      //   await readingAPI.submitBloodPressure(systolic, diastolic)
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

  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <BackButton />

        <p className="text-center text-lg font-medium text-nowrap md:text-xl">Blood pressure</p>

        <div />
      </div>

      <div className="px-6 py-8">
        <p className="mb-6 text-sm font-medium text-gray-400">Enter blood pressure value</p>

        {apiError && <div className="text-error-500 mb-6 rounded-lg bg-red-50 p-4 text-sm">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Input
                {...register("value")}
                type="text"
                inputMode="numeric"
                placeholder="120/80"
                className={`h-12 pr-20`}
                disabled={isLoading}
              />
              <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-gray-800">mmHg</span>
            </div>
            {errors.value && <p className="text-error-500 text-xs">{errors.value.message}</p>}
          </div>

          <Button type="submit" className="mt-5 w-full" size="xl" disabled={isLoading}>
            {isLoading ? "Logging reading..." : "Log reading"}
          </Button>
        </form>
      </div>
    </PageTransition>
  )
}
