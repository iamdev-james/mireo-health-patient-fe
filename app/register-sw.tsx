// app/components/register-sw.tsx
"use client"

import { useEffect } from "react"

export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          })

          console.log("Service Worker registered:", registration.scope)

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            console.log("🔄 New service worker available")

            newWorker?.addEventListener("statechange", () => {
              if (newWorker.state === "activated") {
                console.log("New service worker activated")

                // Optional: Show update notification
                if (confirm("New version available! Reload to update?")) {
                  window.location.reload()
                }
              }
            })
          })

          // Check if already installed
          const isStandalone =
            window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

          if (isStandalone) {
            console.log("App is running as installed PWA")
          }
        } catch (error) {
          console.error("Service Worker registration failed:", error)
        }
      })
    }
  }, [])

  return null
}
