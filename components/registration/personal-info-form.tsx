// components/registration/personal-info-form.tsx

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS, RELIGION_OPTIONS } from "@/lib/constants/registration"
import { APIError, registrationAPI } from "@/lib/services/registration-api"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setCurrentStep, setPersonalInfo } from "@/lib/store/slices/registration-slice"
import { type PersonalInfoInput, personalInfoSchema } from "@/lib/validations/registration"

export default function PersonalInfoForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isVerified = useAppSelector((state) => state.registration.isVerified)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
  })

  const onSubmit = async (data: PersonalInfoInput) => {
    // if (!isVerified) {
    //   router.push("/create-account/verify-otp")
    //   return
    // }

    setIsLoading(true)
    setApiError(null)

    try {
      const token = sessionStorage.getItem("registration_token")
      if (!token) throw new Error("Authentication token not found")

      await registrationAPI.submitPersonalInfo(data, token)
      dispatch(setPersonalInfo(data))
      dispatch(setCurrentStep(3))
      router.push("/create-account/health-check")
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
    <div className="min-h-screen bg-white">
      <div className="px-6 py-8">
        <div className="mb-8 text-center">
          <p className="text-2xl font-semibold">Tell us a bit about yourself</p>
          <p className="mt-2 px-10 text-sm text-gray-400">
            We keep your data safe and use it only for personalized care
          </p>
        </div>

        {apiError && <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gender">What is your gender?</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ""} disabled={isLoading}>
                  <SelectTrigger className={`w-full ${errors.gender ? "border-red-500" : ""}`} size={"xl"}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of birth</Label>
              <Input
                id="dateOfBirth"
                placeholder="DD/MM/YYYY"
                {...register("dateOfBirth")}
                className={`h-12 ${errors.dateOfBirth ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.dateOfBirth && <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""} disabled={isLoading}>
                    <SelectTrigger className={`w-full ${errors.maritalStatus ? "border-red-500" : ""}`} size={"xl"}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MARITAL_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.maritalStatus && <p className="text-xs text-red-500">{errors.maritalStatus.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Controller
                name="religion"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""} disabled={isLoading}>
                    <SelectTrigger className={`w-full ${errors.religion ? "border-red-500" : ""}`} size={"xl"}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIGION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.religion && <p className="text-xs text-red-500">{errors.religion.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tribe">Tribe</Label>
              <Input
                id="tribe"
                {...register("tribe")}
                className={`h-12 ${errors.tribe ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.tribe && <p className="text-xs text-red-500">{errors.tribe.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">What is your Occupation?</Label>
            <Input
              id="occupation"
              {...register("occupation")}
              className={`h-12 ${errors.occupation ? "border-red-500" : ""}`}
              disabled={isLoading}
            />
            {errors.occupation && <p className="text-xs text-red-500">{errors.occupation.message}</p>}
          </div>

          <Button type="submit" className="mt-14 w-full" size={"xl"} disabled={isLoading}>
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  )
}
