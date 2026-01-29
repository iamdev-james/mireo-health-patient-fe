"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  /** Height of the sheet. Can be 'auto', 'full', or any valid CSS height value like '50vh', '400px' */
  height?: string
  /** Whether to show the close button */
  showCloseButton?: boolean
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  height = "auto",
  showCloseButton = true,
}: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 bottom-0 z-50 m-auto w-full max-w-2xl overflow-hidden rounded-t-3xl bg-white"
            style={{ height: height === "auto" ? "auto" : height, maxHeight: "90vh" }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-lg font-medium md:text-xl">{title}</h2>
                {showCloseButton && (
                  <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-50" aria-label="Close">
                    <X className="h-6 w-6" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div
              className="overflow-y-auto px-6 pb-8"
              style={{ maxHeight: height === "auto" ? "70vh" : "calc(100% - 80px)" }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
