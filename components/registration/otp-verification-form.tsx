// components/registration/otp-verification-form.tsx

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { OTP_RESEND_COOLDOWN } from "@/lib/constants/registration"
import { APIError, registrationAPI } from "@/lib/services/registration-api"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setCurrentStep, setOTPVerified } from "@/lib/store/slices/registration-slice"

export default function OTPVerificationForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accountInfo = useAppSelector((state) => state.registration.accountInfo)

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendTimer, setResendTimer] = useState(OTP_RESEND_COOLDOWN)
  const [canResend, setCanResend] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // if (!accountInfo.email || !accountInfo.phoneNumber) {
    //   router.push("/create-account")
    //   return
    // }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [accountInfo, router])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError(null)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6)
    setOtp(newOtp)
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
  }

  const handleSubmit = async () => {
    const code = otp.join("")

    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await registrationAPI.verifyOTP({
        code,
        phoneNumber: accountInfo.phoneNumber!,
        email: accountInfo.email!,
      })

      if (result?.token) {
        sessionStorage.setItem("registration_token", result?.token)
      }

      dispatch(setOTPVerified())
      dispatch(setCurrentStep(2))
      router.push("/create-account/personal-info")
    } catch (error) {
      if (error instanceof APIError) {
        setError(error.message)
      } else {
        setError("Verification failed. Please try again.")
      }
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return

    try {
      await registrationAPI.resendOTP(accountInfo.phoneNumber!, accountInfo.email!)
      setResendTimer(OTP_RESEND_COOLDOWN)
      setCanResend(false)
    } catch (error) {
      setError("Failed to resend OTP. Please try again.")
      console.error(error)
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
          <p className="absolute left-1/2 -mt-0.5 -translate-x-1/2 text-lg font-medium md:text-xl">Confirm OTP</p>
          <div className="w-10" /> {/* Spacer to balance the back button */}
        </div>

        <div className="px-6 py-8">
          <p className="px-6 text-center text-gray-400">
            We've sent a code to your <span className="font-medium text-gray-900">Phone number</span> and{" "}
            <span className="font-medium text-gray-900">email address</span>. Please enter it below.
          </p>

          {error && <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

          <div className="mt-12 flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="bg-gray-350 h-14 w-12 rounded-lg text-center text-lg font-medium focus:outline-none"
                disabled={isLoading}
              />
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            className="mt-12 w-full"
            size={"xl"}
            disabled={isLoading || otp.join("").length !== 6}
          >
            {isLoading ? "Confirming..." : "Confirm"}
          </Button>

          <p className="mt-8 text-center text-sm">
            Didn't receive OTP?{" "}
            {canResend ? (
              <button onClick={handleResend} className="text-primary cursor-pointer font-medium hover:underline">
                Resend
              </button>
            ) : (
              <span className="text-primary font-medium">{resendTimer}s</span>
            )}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
