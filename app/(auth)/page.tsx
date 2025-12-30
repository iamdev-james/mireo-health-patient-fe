// app/(auth)/page.tsx

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")

      if (hasSeenOnboarding) {
        router.push("/sign-in")
      } else {
        router.push("/onboarding")
      }
    }, 9000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0066CC]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white">Mireo Health</h1>
      </motion.div>
    </div>
  )
}
