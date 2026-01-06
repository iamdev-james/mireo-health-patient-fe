// types/medical-records.ts

export type RecordType = "screening" | "consultation" | "lab_test"
export type VitalStatus = "normal" | "high" | "low"
export type TestStatus = "normal" | "high" | "low" | "negative" | "positive"

export interface VitalSign {
  label: string
  value: string
  unit: string
  status: VitalStatus
}

export interface BMIData {
  height: number
  heightUnit: string
  weight: number
  weightUnit: string
  bmi: number
  bmiUnit: string
  status: VitalStatus
}

export interface UrinalysisTest {
  label: string
  value: string
  status: TestStatus
}

export interface ScreeningResult {
  id: string
  date: string
  vitalSigns: {
    pulse: VitalSign
    bloodPressure: VitalSign
    respiratoryRate: VitalSign
    temperature: VitalSign
  }
  bmi: BMIData
  baselineTests: {
    bloodSugar: {
      random: { value: string; unit: string; status: VitalStatus }
      fasting: { value: string; unit: string; status: VitalStatus }
    }
    urinalysis: UrinalysisTest[]
  }
}

export interface Diagnosis {
  title: string
  description: string
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
}

export interface LifestyleRecommendation {
  text: string
}

export interface HospitalReferral {
  hospitalName: string
  location: string
  reason: string
  mapsLink?: string
}

export interface TreatmentPlan {
  id: string
  date: string
  consultationNoteLink?: string
  diagnosis: Diagnosis
  medications: Medication[]
  lifestyleRecommendations: LifestyleRecommendation[]
  hospitalReferral?: HospitalReferral
}

export interface PreDiagnosis {
  description: string
  disclaimer: string
}

export interface ProvisionalDiagnosis {
  conditions: string[]
}

export interface ManagementPlan {
  id: string
  date: string
  preDiagnosis?: PreDiagnosis
  provisionalDiagnosis?: ProvisionalDiagnosis
  labTestRequest?: {
    description: string
    tests: string[]
    resultsLink?: string
  }
  medications?: Medication[]
  hospitalReferral?: HospitalReferral
}

export interface LabTest {
  id: string
  name: string
  uploadDate: string
  imageUrl?: string
  resultLink?: string
}

export interface LabTestsList {
  tests: LabTest[]
}

export interface MedicalRecord {
  id: string
  type: RecordType
  title: string
  date: string
  summary?: string
}

export interface MedicalRecordsResponse {
  success: boolean
  data: MedicalRecord[]
}

export interface ScreeningResultResponse {
  success: boolean
  data: ScreeningResult
}

export interface TreatmentPlanResponse {
  success: boolean
  data: TreatmentPlan
}

export interface ManagementPlanResponse {
  success: boolean
  data: ManagementPlan
}

export interface LabTestsResponse {
  success: boolean
  data: LabTestsList
}
