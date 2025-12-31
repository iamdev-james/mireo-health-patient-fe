// app/(auth)/create-account/personal-info/page.tsx

import PersonalInfoForm from "@/components/registration/personal-info-form"

export const metadata = {
  title: "Personal Information | Mireo Health",
  description: "Tell us about yourself",
}

export default function PersonalInfoPage() {
  return <PersonalInfoForm />
}
