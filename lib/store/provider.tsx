// lib/store/provider.tsx

"use client"

import { useEffect, useMemo, useRef } from "react"
import { Provider } from "react-redux"
import { registrationStorage } from "@/lib/utils/registration-storage"
import { loadFromStorage } from "./slices/registration-slice"
import { AppStore, makeStore } from "./store"

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
