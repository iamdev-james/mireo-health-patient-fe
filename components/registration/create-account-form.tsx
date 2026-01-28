// components/registration/create-account-form.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRY_CODES } from "@/lib/constants/registration"
import { APIError } from "@/lib/utils/api"
import { authService } from "@/lib/services/auth-service"
import { useAppDispatch } from "@/lib/store/hooks"
import { setAccountInfo, setCurrentStep } from "@/lib/store/slices/registration-slice"
import { type CreateAccountInput, createAccountSchema } from "@/lib/validations/registration"

export default function CreateAccountForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      countryCode: "+234",
    },
  })

  const countryCode = watch("countryCode")

  const onSubmit = async (data: CreateAccountInput) => {
    setIsLoading(true)
    setApiError(null)

    try {
      // 1. Register
      const registerData = {
        first_name: data.firstname,
        last_name: data.surname,
        email: data.email,
        phone: `${data.countryCode}${data.phoneNumber}`,
        role: "patient" as const,
        invitation_code: "",
      }

      await authService.register(registerData)

      // 2. Send OTP
      await authService.sendOtp({ identifier: data.email })

      dispatch(setAccountInfo(data))
      dispatch(setCurrentStep(1))
      router.push("/create-account/verify-otp")
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
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key="sign-in-form"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen bg-white"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4">
          <button onClick={() => router.back()} className="rounded-full p-2 hover:bg-gray-100" aria-label="Go back">
            <ArrowLeft className="h-6 w-6 font-light" />
          </button>
          <p className="absolute left-1/2 -mt-0.5 -translate-x-1/2 text-lg font-medium md:text-xl">
            Create Your Account
          </p>
          <div className="w-10" /> {/* Spacer to balance the back button */}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
          {apiError && <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">{apiError}</div>}

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  {...register("surname")}
                  className={errors.surname ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.surname && <p className="text-xs text-red-500">{errors.surname.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstname">Firstname</Label>
                <Input
                  id="firstname"
                  {...register("firstname")}
                  className={errors.firstname ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.firstname && <p className="text-xs text-red-500">{errors.firstname.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <div className="flex gap-2">
                <Select
                  value={countryCode}
                  onValueChange={(value) => setValue("countryCode", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                  className={`flex-1 ${errors.phoneNumber ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
              </div>
              {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
            </div>
          </div>

          <Button type="submit" className="mt-8 w-full" size={"xl"} disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-in")}
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}
