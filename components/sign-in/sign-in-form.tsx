// components/signin/sign-in-form.tsx

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
import { APIError, signInAPI } from "@/lib/services/sign-in-api"
import { type SignInInput, signInSchema } from "@/lib/validations/sign-in"

export default function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
    },
  })

  const onSubmit = async (data: SignInInput) => {
    setIsLoading(true)
    setApiError(null)

    try {
      await signInAPI.requestOTP(data)
      sessionStorage.setItem("sign_in_identifier", data.identifier)
      router.push("/sign-in/verify-otp")
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
        <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
          <button
            onClick={() => router.back()}
            className="justify-self-start rounded-full p-2 hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6 font-light" />
          </button>

          <p className="text-center text-lg font-medium md:text-xl">Sign In</p>

          <div />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8">
          {apiError && <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">{apiError}</div>}

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Phone number</Label>
              <Input
                id="identifier"
                type="text"
                {...register("identifier")}
                className={`h-12 ${errors.identifier ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.identifier && <p className="text-xs text-red-500">{errors.identifier.message}</p>}
            </div>
          </div>

          <Button type="submit" className="mt-10 w-full" size={"xl"} disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Sign In"}
          </Button>

          <p className="mt-8 text-center text-sm">
            Don't have an account yet?{" "}
            <button
              type="button"
              onClick={() => router.push("/create-account")}
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}
