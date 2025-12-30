import { InstallPrompt } from "./Install-pwa"
import { RegisterServiceWorker } from "./register-sw"

import "styles/tailwind.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <RegisterServiceWorker />
        <InstallPrompt />
      </body>
    </html>
  )
}
