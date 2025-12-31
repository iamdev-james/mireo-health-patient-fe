// app/(auth)/create-account/health-check/page.tsx

import HealthCheckForm from "@/components/registration/health-check-form"

export const metadata = {
  title: "Health Check | Mireo Health",
  description: "Quick health assessment",
}

export default function HealthCheckPage() {
  return <HealthCheckForm />
}
