// app/(dashboard)/medical-records/pre-diagnosis/page.tsx

import { notFound } from 'next/navigation'
import PreDiagnosisPageClient from '@/components/medical-records/pre-diagnosis-page'
import { PreDiagnosis } from '@/types/medical-records'

export const metadata = {
  title: 'Pre-diagnosis | Mireo Health',
  description: 'View your pre-diagnosis',
}

async function getPreDiagnosis(): Promise<PreDiagnosis | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || '/api'}/medical-records/pre-diagnosis`,
      {
        headers: {
          // In production, get token from cookies
          // Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Failed to fetch pre-diagnosis:', error)
    return null
  }
}

export default async function PreDiagnosisPage() {
  // Mock data for development
  const preDiagnosisData: PreDiagnosis = {
    description: 'Patient shows indicators consistent with Stage 1 Hypertension.',
    disclaimer:
      "This doesn't confirm a diagnosis. It simply means a doctor will review your results for a more detailed assessment.",
  }

  // Uncomment when backend is ready:
  // const preDiagnosisData = await getPreDiagnosis()
  // if (!preDiagnosisData) {
  //   notFound()
  // }

  return <PreDiagnosisPageClient data={preDiagnosisData} />
}