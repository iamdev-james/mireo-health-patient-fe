// lib/utils/registration-storage.ts

import { RegistrationState } from "@/types/registration"
import { REGISTRATION_STORAGE_KEY } from "@/lib/constants/registration"

const isClient = typeof window !== "undefined"

export const registrationStorage = {
  save: (state: RegistrationState) => {
    if (!isClient) return
    try {
      localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error("Failed to save registration state:", error)
    }
  },

  load: () => {
    if (!isClient) return null
    try {
      const data = localStorage.getItem(REGISTRATION_STORAGE_KEY)
      if (!data) return null

      const parsed = JSON.parse(data) as RegistrationState
      return parsed
    } catch (error) {
      console.error("Failed to load registration state:", error)
      return null
    }
  },

  clear: () => {
    if (!isClient) return
    try {
      localStorage.removeItem(REGISTRATION_STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear registration state:", error)
    }
  },

  update: (updates: Partial<RegistrationState>) => {
    const current = registrationStorage.load()
    if (current) {
      registrationStorage.save({ ...current, ...updates })
    }
  },
}
