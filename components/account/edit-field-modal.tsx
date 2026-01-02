// components/account/edit-field-modal.tsx

"use client"

import { useState } from "react"
import { X } from "lucide-react"
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

  if (!isOpen) return null

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit {fieldLabel}</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100" disabled={isLoading}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

        <div className="mb-6">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-12"
            disabled={isLoading}
            autoFocus
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isLoading || !value.trim()}
          className="h-14 w-full rounded-xl bg-[#0066CC] text-lg font-medium text-white hover:bg-[#0052A3]"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  )
}
