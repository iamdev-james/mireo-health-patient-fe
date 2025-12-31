// app/(auth)/create-account/verify-otp/page.tsx

import OTPVerificationForm from "@/components/registration/otp-verification-form"

export const metadata = {
  title: "Verify OTP | Mireo Health",
  description: "Verify your phone number and email",
}

export default function VerifyOTPPage() {
  return <OTPVerificationForm />
}
