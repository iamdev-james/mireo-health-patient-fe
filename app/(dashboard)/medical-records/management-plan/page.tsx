// app/(dashboard)/medical-records/management-plan/page.tsx

import ManagementPlanPageClient from '@/components/medical-records/management-plan-page'
import { ManagementPlan } from '@/types/medical-records'

export const metadata = {
  title: 'Management Plan | Mireo Health',
  description: 'View your management plan',
}

export async function getManagementPlan(): Promise<ManagementPlan | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || '/api'}/medical-records/management-plan`,
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

    const data = await response.json() as { data: ManagementPlan }
    return data.data
  } catch (error) {
    console.error('Failed to fetch management plan:', error)
    return null
  }
}

export default async function ManagementPlanPage() {
  // Mock data for development
  const managementData: ManagementPlan = {
    id: '1',
    date: '12, Nov 2025',
    preDiagnosis: {
      description: 'Patient shows indicators consistent with Stage 1 Hypertension.',
      disclaimer:
        "This doesn't confirm a diagnosis. It simply means a doctor will review your results for a more detailed assessment.",
    },
    provisionalDiagnosis: {
      conditions: ['Hypertension', 'Diabetes'],
    },
    labTestRequest: {
      description:
        'The doctor has recommended you to take the following tests at a medical laboratory and upload the results',
      tests: [
        'Urinalysis',
        'Fasting Blood Sugar',
        'Lipid Profile',
        'Microalbuminuria Test',
        'HbA1c Test (Glycated Hemoglobin)',
      ],
      resultsLink: '/medical-records/lab-tests',
    },
    medications: [
      {
        name: 'Amlodipine 5mg',
        dosage: '30 days',
        frequency: '1 tablet in the morning',
      },
      {
        name: 'Hydrochlorothiazide 12.5mg',
        dosage: '30 days',
        frequency: '1 tablet in the morning',
      },
      {
        name: 'Losartan 50mg',
        dosage: '30 days',
        frequency: '1 tablet in the morning',
      },
    ],
    hospitalReferral: {
      hospitalName: 'Hossanna Hospital',
      location: 'Ibadan',
      reason: 'continued care and prescription adjustment',
      mapsLink: 'https://maps.google.com/?q=Hossanna+Hospital+Ibadan',
    },
  }

  // Uncomment when backend is ready:
  // const managementData = await getManagementPlan()
  // if (!managementData) {
  //   notFound()
  // }

  return <ManagementPlanPageClient data={managementData} />
}