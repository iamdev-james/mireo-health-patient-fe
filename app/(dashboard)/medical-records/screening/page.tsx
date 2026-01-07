// app/(dashboard)/medical-records/screening/page.tsx

import { notFound } from 'next/navigation'
import ScreeningResultsPageClient from '@/components/medical-records/screening-results-page'
import { ScreeningResult } from '@/types/medical-records'

export const metadata = {
  title: 'Screening Results | Mireo Health',
  description: 'View your screening results',
}

async function getScreeningResult(): Promise<ScreeningResult | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || '/api'}/medical-records/screening`,
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

    const data = await response.json() as { data: ScreeningResult }
    return data.data
  } catch (error) {
    console.error('Failed to fetch screening result:', error)
    return null
  }
}

export default async function ScreeningResultPage() {
  // Mock data for development
  const screeningData: ScreeningResult = {
    id: '1',
    date: '12, Nov 2025',
    vitalSigns: {
      pulse: { label: 'Pulse', value: '78', unit: 'bpm', status: 'high' },
      bloodPressure: { label: 'Blood Pressure', value: '145/90', unit: 'mmHg', status: 'normal' },
      respiratoryRate: { label: 'Respiratory Rate', value: '18', unit: '/min', status: 'low' },
      temperature: { label: 'Temperature', value: '36.7', unit: '°C', status: 'normal' },
    },
    bmi: {
      height: 64,
      heightUnit: 'in',
      weight: 58,
      weightUnit: 'kg',
      bmi: 26.4,
      bmiUnit: 'kg/m³',
      status: 'normal',
    },
    baselineTests: {
      bloodSugar: {
        random: { value: '132', unit: 'mg/dL', status: 'high' },
        fasting: { value: '132', unit: 'mg/dL', status: 'high' },
      },
      urinalysis: [
        { label: 'PH', value: '5.0', status: 'normal' },
        { label: 'Specific Gravity', value: '1.010', status: 'normal' },
        { label: 'Protein', value: 'Negative', status: 'normal' },
        { label: 'Glucose', value: 'Negative', status: 'normal' },
        { label: 'Ketones', value: '1+', status: 'normal' },
        { label: 'Bilirubin', value: 'Negative', status: 'normal' },
        { label: 'Urobilinogen', value: '1.0 mg/dL', status: 'normal' },
        { label: 'Blood', value: 'Negative', status: 'normal' },
        { label: 'Nitrite', value: 'Negative', status: 'normal' },
        { label: 'Leukocyte Esterase', value: 'Negative', status: 'normal' },
      ],
    },
  }

  // Uncomment when backend is ready:
  // const screeningData = await getScreeningResult()
  // if (!screeningData) {
  //   notFound()
  // }

  return <ScreeningResultsPageClient data={screeningData} />
}