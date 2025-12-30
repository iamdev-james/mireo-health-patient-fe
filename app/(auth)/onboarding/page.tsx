"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const onboardingSlides = [
  {
    id: 1,
    title: "Meet Mireo your smart health companion",
    description: "Get personalized care, reliable guidance, and the support you need to stay well",
    image: "/images/onboarding-1.svg",
  },
  {
    id: 2,
    title: "Smart Health Assessment Made Convenient",
    description: "Smart screening that helps detect early signs of conditions like hypertension or diabetes.",
    image: "/images/onboarding-2.svg",
  },
  {
    id: 3,
    title: "Your personal health assistant, powered by Real Doctors",
    description: "Mireo's smart AI learns from your answers to recommend personalized care and doctor guidance",
    image: "/images/onboarding-3.svg",
  },
]

const SLIDE_INTERVAL = 4000

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length)
    }, SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  const handleSignIn = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    router.push("/sign-in")
  }

  const handleCreateAccount = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    router.push("/create-account")
  }

  const slide = onboardingSlides[currentSlide]

  return (
    <div className="m-auto flex min-h-screen max-w-2xl flex-col bg-white">
      <div className="mt-8 flex flex-1 flex-col items-center justify-center px-0 pb-8">
        <div className="w-full max-w-md">
          <div className="relative h-[485px] w-full md:h-[540px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide?.id}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="flex h-full flex-col space-y-5">
                  <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden">
                    <Image
                      src={slide?.image || ""}
                      alt={slide?.title || "Onboarding Image"}
                      width={360}
                      height={360}
                      className="m-auto object-contain"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />
                  </div>

                  <div className="flex-1 space-y-3 px-6 text-center">
                    <h2 className="text-[28px] leading-10 font-bold text-gray-900 md:text-3xl">{slide?.title}</h2>
                    <p className="text-sm leading-relaxed font-medium text-gray-400">{slide?.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {onboardingSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-300"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`w-1 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "h-6 bg-[#0066CC]" : "h-4 bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 p-6">
        <Button onClick={handleSignIn} size={"xl"} className="w-full">
          Sign In
        </Button>
        <Button onClick={handleCreateAccount} variant="outline" className="w-full" size={"xl"}>
          Create Account
        </Button>
      </div>
    </div>
  )
}
