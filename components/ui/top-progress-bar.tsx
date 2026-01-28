"use client"

import { motion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { ProgressService } from "@/lib/services/progress-service"

export function TopProgressBar() {
  const [isVisible, setIsVisible] = useState(false)
  const scaleX = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    return ProgressService.subscribe((progress) => {
      // setIsInProgress(progress) // Removed unused state
      if (progress) {
        setIsVisible(true)
        scaleX.set(0.2) // Start at 20%
        // Slowly animate to 90%
        const interval = setInterval(() => {
          const current = scaleX.get()
          if (current < 0.9) {
            scaleX.set(current + Math.random() * 0.1)
          }
        }, 500)
        return () => clearInterval(interval)
      } else {
        scaleX.set(1) // Complete
        setTimeout(() => {
          setIsVisible(false)
          scaleX.set(0) // Reset without animation
        }, 500)
      }
    })
  }, [scaleX])

  return (
    <motion.div
      className="bg-primary fixed left-0 top-0 z-[100] h-1 w-full origin-left"
      style={{ scaleX, opacity: isVisible ? 1 : 0 }}
    />
  )
}
