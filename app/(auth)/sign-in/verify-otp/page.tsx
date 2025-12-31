// app/(auth)/sign-in/verify-otp/page.tsx

import SignInOTPForm from "@/components/sign-in/sign-in-otp-form"

export const metadata = {
  title: "Verify OTP | Mireo Health",
  description: "Verify your sign-in OTP",
}

export default function SignInVerifyOTPPage() {
  return <SignInOTPForm />
}
