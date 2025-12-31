// components/signin/sign-in-otp-form.tsx

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { OTP_RESEND_COOLDOWN } from "@/lib/constants/registration"
import { APIError, signInAPI } from "@/lib/services/sign-in-api"

export default function SignInOTPForm() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState<string | null>(null)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendTimer, setResendTimer] = useState(OTP_RESEND_COOLDOWN)
  const [canResend, setCanResend] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const storedIdentifier = sessionStorage.getItem("sign_in_identifier") || "james@gmail.com"
    if (!storedIdentifier) {
      router.push("/sign-in")
      return
    }
    setIdentifier(storedIdentifier)

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
  }, [router])

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

    if (!identifier) {
      router.push("/sign-in")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await signInAPI.verifyOTP({
        code,
        identifier,
      })

      if (result.token) {
        sessionStorage.setItem("auth_token", result.token)
        sessionStorage.removeItem("sign_in_identifier")
      }

      router.push("/dashboard")
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
    if (!canResend || !identifier) return

    try {
      await signInAPI.resendOTP(identifier)
      setResendTimer(OTP_RESEND_COOLDOWN)
      setCanResend(false)
    } catch (error) {
      setError("Failed to resend OTP. Please try again.")
      console.error(error)
    }
  }

  if (!identifier) {
    return null
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

          <p className="text-center text-lg font-medium md:text-xl">Confirm OTP</p>

          <div />
        </div>

        <div className="px-6 py-4">
          <p className="px-6 text-center text-gray-400">
            We've sent a code to your{" "}
            <span className="font-semibold text-gray-900">
              {identifier?.includes("@") ? "email address" : "phone number"}
            </span>
            . Please enter it below.
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

          <p className="mt-6 text-center text-sm">
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
