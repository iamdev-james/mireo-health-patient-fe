// app/layout.tsx

import { Metadata } from "next"
import { InstallPrompt } from "./Install-pwa"
import { RegisterServiceWorker } from "./register-sw"

import { satoshi } from "./fonts/satoshi"
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        {children}
        <RegisterServiceWorker />
        <InstallPrompt />
      </body>
    </html>
  )
}
