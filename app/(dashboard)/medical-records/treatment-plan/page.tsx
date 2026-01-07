// app/(dashboard)/medical-records/treatment-plan/page.tsx

import TreatmentPlanPageClient from '@/components/medical-records/treatment-plan-page'
import { TreatmentPlan } from '@/types/medical-records'

export const metadata = {
  title: 'Treatment Plan | Mireo Health',
  description: 'View your treatment plan',
}

export async function getTreatmentPlan(): Promise<TreatmentPlan | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || '/api'}/medical-records/treatment-plan`,
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

    const data = await response.json() as { data: TreatmentPlan }
    return data.data
  } catch (error) {
    console.error('Failed to fetch treatment plan:', error)
    return null
  }
}

export default async function TreatmentPlanPage() {
  // Mock data for development
  const treatmentData: TreatmentPlan = {
    id: '1',
    date: '12, Nov 2025',
    consultationNoteLink: '/consultation-note',
    diagnosis: {
      title: 'Hypertension (Stage 1)',
      description:
        'Your blood pressure readings and symptoms suggest early-stage hypertension.',
    },
    medications: [
      {
        name: 'Amlodipine 5mg',
        dosage: '30 days',
        frequency: '1 Night • 1 Afternoon • 1 Night',
      },
      {
        name: 'Hydrochlorothiazide 12.5mg',
        dosage: '30 days',
        frequency: '1 Night • 1 Afternoon • 1 Night',
      },
      {
        name: 'Losartan 50mg',
        dosage: '30 days',
        frequency: '1 Night • 1 Afternoon • 1 Night',
      },
    ],
    lifestyleRecommendations: [
      { text: 'Reduce salt intake in meals' },
      { text: '30 minutes of moderate walking daily' },
      { text: 'Monitor blood pressure daily' },
    ],
    hospitalReferral: {
      hospitalName: 'Hossanna Hospital',
      location: 'Ibadan',
      reason: 'continued care and prescription adjustment',
      mapsLink: 'https://maps.google.com/?q=Hossanna+Hospital+Ibadan',
    },
  }

  // Uncomment when backend is ready:
  // const treatmentData = await getTreatmentPlan()
  // if (!treatmentData) {
  //   notFound()
  // }

  return <TreatmentPlanPageClient data={treatmentData} />
}