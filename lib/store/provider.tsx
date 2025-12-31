// lib/store/provider.tsx

"use client"

import { useRef, useEffect, useMemo } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from "./store"
import { registrationStorage } from "@/lib/utils/registration-storage"
import { loadFromStorage } from "./slices/registration-slice"

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), [])

  useEffect(() => {
    const savedState = registrationStorage.load()
    if (savedState) {
      store.dispatch(loadFromStorage(savedState))
    }
  }, [store])

  return <Provider store={store}>{children}</Provider>
}
