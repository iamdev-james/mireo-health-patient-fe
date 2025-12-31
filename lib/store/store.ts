// lib/store/store.ts

import { configureStore } from "@reduxjs/toolkit"
import registrationReducer from "./slices/registration-slice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      registration: registrationReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
