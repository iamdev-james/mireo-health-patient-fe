// app/(auth)/create-account/page.tsx

import CreateAccountForm from "@/components/registration/create-account-form"

export const metadata = {
  title: "Create Account | Mireo Health",
  description: "Create your Mireo Health account",
}

export default function CreateAccountPage() {
  return <CreateAccountForm />
}
