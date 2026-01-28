// components/registration/health-check-form.tsx

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HEALTH_CHECK_QUESTIONS } from "@/lib/constants/registration"
import { APIError, registrationAPI } from "@/lib/services/registration-api"
import { useAppDispatch } from "@/lib/store/hooks"
import { setCurrentStep, setHealthCheckAnswers } from "@/lib/store/slices/registration-slice"
import { HealthCheckAnswer } from "@/types/registration"

export default function HealthCheckForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  // const isVerified = useAppSelector((state) => state.registration.isVerified)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<HealthCheckAnswer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const question = HEALTH_CHECK_QUESTIONS[currentQuestion]
  const totalQuestions = HEALTH_CHECK_QUESTIONS.length

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

  const handleSkip = () => {
    dispatch(setCurrentStep(4))
    router.push("/dashboard")
  }

  const handleSubmit = async (finalAnswers: HealthCheckAnswer[]) => {
    setIsLoading(true)
    setError(null)

    try {
      // API integration deferred
      // await registrationAPI.submitHealthCheck(finalAnswers)
      // await registrationAPI.completeRegistration()

      dispatch(setHealthCheckAnswers(finalAnswers))
      dispatch(setCurrentStep(4))
      router.push("/dashboard")
    } catch (error) {
     console.error(error)
     // Fallback to dashboard even on error for now
     router.push("/dashboard")
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
        <div className="px-6 py-8">
          <div className="mb-12 text-center relative">
            <div className="absolute right-0 top-0">
                <Button variant="ghost" onClick={handleSkip} className="text-gray-500 hover:text-gray-900">
                    Skip
                </Button>
            </div>
            <h1 className="text-2xl font-medium md:font-semibold">Let's do a quick health check</h1>
            <p className="mt-4 text-sm text-gray-400">
              Answer a few simple questions. We'll use your responses to assess key health indicators and recommend next
              steps
            </p>
          </div>

          {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

          <div className="mt-12 rounded-xl border border-gray-50 p-5 md:p-8">
            <p className="mb-8 text-center text-sm text-gray-400">
              {currentQuestion + 1}/{totalQuestions}
            </p>

            <div className="relative h-32 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={question?.id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center text-center text-2xl font-medium"
                >
                  {question?.question}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => handleAnswer(true)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary h-12 w-full border font-medium hover:text-white"
                disabled={isLoading}
              >
                Yes
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary h-12 w-full border font-medium hover:text-white"
                disabled={isLoading}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
