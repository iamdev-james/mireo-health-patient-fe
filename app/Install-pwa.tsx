// app/install-pwa.tsx

"use client"

import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    if (isStandalone) {
      console.log("App is already installed")
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      console.log("Install prompt event fired")

      setDeferredPrompt(e as BeforeInstallPromptEvent)

      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("No install prompt available")
      return
    }

    await deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    console.log(`User ${outcome} the install prompt`)

    if (outcome === "accepted") {
      console.log("User accepted the install prompt")
    } else {
      console.log("User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (!showInstallButton) {
    return null
  }

  return (
    <div className="animate-in slide-in-from-bottom fixed right-4 bottom-4 z-50">
      <div className="max-w-sm rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-semibold">Mireo Health</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Install our app for a better experience and offline access
            </p>
          </div>
          <button
            onClick={() => setShowInstallButton(false)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Install
          </button>
          <button
            onClick={() => setShowInstallButton(false)}
            className="px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  )
}
