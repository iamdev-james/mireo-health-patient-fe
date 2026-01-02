// components/account/edit-field-modal.tsx

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EditFieldModalProps {
  isOpen: boolean
  onClose: () => void
  fieldLabel: string
  currentValue: string
  onSave: (value: string) => Promise<void>
}

export function EditFieldModal({ isOpen, onClose, fieldLabel, currentValue, onSave }: EditFieldModalProps) {
  const [value, setValue] = useState(currentValue)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!value.trim()) {
      setError("This field cannot be empty")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await onSave(value)
      onClose()
    } catch (err) {
      setError("Failed to update. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 bottom-0 z-50 m-auto w-full max-w-2xl rounded-t-3xl bg-white p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium md:text-xl">Edit {fieldLabel}</h2>
              <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-50" disabled={isLoading}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

            <div className="mb-6">
              <Input value={value} onChange={(e) => setValue(e.target.value)} className="h-12" disabled={isLoading} />
            </div>

            <Button onClick={handleSave} disabled={isLoading || !value.trim()} className="w-full" size={"xl"}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
