// app/layout.tsx

import { Metadata, Viewport } from "next"
import StoreProvider from "@/lib/store/provider"
import { satoshi } from "./fonts/satoshi"
import { Toaster } from "sonner"
import { FullScreenLoader } from "@/components/ui/full-screen-loader"
import { TopProgressBar } from "@/components/ui/top-progress-bar"
import { InstallPrompt } from "./Install-pwa"
import { RegisterServiceWorker } from "./register-sw"

import "styles/tailwind.css"

export const metadata: Metadata = {
  title: "Mireo Health - Patient App",
  manifest: "/manifest.json",
  // openGraph: {
  //   url: "https://next-enterprise.vercel.app/",
  //   images: [
  //     {
  //       width: 1200,
  //       height: 630,
  //       url: "",
  //     },
  //   ],
  // },
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0066CC",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body suppressHydrationWarning>
        <StoreProvider>
          <TopProgressBar />
          <FullScreenLoader />
          {children}
          <Toaster />
          <RegisterServiceWorker />
          <InstallPrompt />
        </StoreProvider>
      </body>
    </html>
  )
}
