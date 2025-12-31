// components/registration/health-check-form.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HEALTH_CHECK_QUESTIONS } from "@/lib/constants/registration"
import { registrationAPI, APIError } from "@/lib/services/registration-api"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setHealthCheckAnswers, setCurrentStep } from "@/lib/store/slices/registration-slice"
import { HealthCheckAnswer } from "@/types/registration"

export default function HealthCheckForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isVerified = useAppSelector((state) => state.registration.isVerified)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<HealthCheckAnswer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const question = HEALTH_CHECK_QUESTIONS[currentQuestion]
  const totalQuestions = HEALTH_CHECK_QUESTIONS.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleAnswer = (answer: boolean) => {
    const newAnswer: HealthCheckAnswer = {
      questionId: question?.id,
      answer,
    }

    const updatedAnswers = [...answers.filter((a) => a.questionId !== question?.id), newAnswer]
    setAnswers(updatedAnswers)

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmit(updatedAnswers)
    }
  }

  const handleSubmit = async (finalAnswers: HealthCheckAnswer[]) => {
    if (!isVerified) {
      router.push("/create-account/verify-otp")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = sessionStorage.getItem("registration_token")
      if (!token) throw new Error("Authentication token not found")

      await registrationAPI.submitHealthCheck(finalAnswers, token)
      await registrationAPI.completeRegistration(token)

      dispatch(setHealthCheckAnswers(finalAnswers))
      dispatch(setCurrentStep(4))
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof APIError) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Let's do a quick health check</h1>
          <p className="mt-2 text-sm text-gray-600">
            Answer a few simple questions. We'll use your responses to assess key health indicators and recommend next
            steps
          </p>
        </div>

        <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full bg-[#0066CC] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

        <div className="mt-12 rounded-3xl border-2 border-gray-100 bg-gray-50 p-8">
          <p className="mb-8 text-center text-sm text-gray-500">
            {currentQuestion + 1}/{totalQuestions}
          </p>

          <h2 className="mb-12 text-center text-xl font-semibold text-gray-900">{question?.question}</h2>

          <div className="space-y-4">
            <Button
              onClick={() => handleAnswer(true)}
              variant="outline"
              className="h-16 w-full rounded-xl border-2 border-[#0066CC] text-lg font-medium text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
              disabled={isLoading}
            >
              Yes
            </Button>
            <Button
              onClick={() => handleAnswer(false)}
              variant="outline"
              className="h-16 w-full rounded-xl border-2 border-[#0066CC] text-lg font-medium text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
              disabled={isLoading}
            >
              No
            </Button>
          </div>
        </div>

        {currentQuestion > 0 && !isLoading && (
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="mt-6 w-full text-center text-sm text-gray-600 hover:text-gray-900"
          >
            Previous Question
          </button>
        )}
      </div>
    </div>
  )
}
