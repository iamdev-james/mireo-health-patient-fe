// lib/store/slices/registration-slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegistrationState, CreateAccountFormData, PersonalInfoFormData, HealthCheckAnswer } from "@/types/registration"
import { registrationStorage } from "@/lib/utils/registration-storage"

const initialState: RegistrationState = {
  currentStep: 0,
  accountInfo: {},
  personalInfo: {},
  healthCheckAnswers: [],
  isVerified: false,
  completedSteps: [],
}

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setAccountInfo: (state, action: PayloadAction<CreateAccountFormData>) => {
      state.accountInfo = action.payload
      if (!state.completedSteps.includes(0)) {
        state.completedSteps.push(0)
      }
      registrationStorage.save(state)
    },
    setOTPVerified: (state) => {
      state.isVerified = true
      if (!state.completedSteps.includes(1)) {
        state.completedSteps.push(1)
      }
      registrationStorage.save(state)
    },
    setPersonalInfo: (state, action: PayloadAction<PersonalInfoFormData>) => {
      state.personalInfo = action.payload
      if (!state.completedSteps.includes(2)) {
        state.completedSteps.push(2)
      }
      registrationStorage.save(state)
    },
    setHealthCheckAnswers: (state, action: PayloadAction<HealthCheckAnswer[]>) => {
      state.healthCheckAnswers = action.payload
      if (!state.completedSteps.includes(3)) {
        state.completedSteps.push(3)
      }
      registrationStorage.save(state)
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
      registrationStorage.save(state)
    },
    loadFromStorage: (state, action: PayloadAction<RegistrationState>) => {
      return action.payload
    },
    resetRegistration: () => {
      registrationStorage.clear()
      return initialState
    },
  },
})

export const {
  setAccountInfo,
  setOTPVerified,
  setPersonalInfo,
  setHealthCheckAnswers,
  setCurrentStep,
  loadFromStorage,
  resetRegistration,
} = registrationSlice.actions

export default registrationSlice.reducer
