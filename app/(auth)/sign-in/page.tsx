// app/(auth)/sign-in/page.tsx

import SignInForm from "@/components/sign-in/sign-in-form"

export const metadata = {
  title: "Sign In | Mireo Health",
  description: "Sign in to your Mireo Health account",
}

export default function SignInPage() {
  return <SignInForm />
}
