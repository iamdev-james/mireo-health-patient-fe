// types/account.ts

export interface UserProfile {
  id: string
  name: string
  email: string
  phoneNumber: string
  profileImage?: string
}

export interface BioData {
  name: string
  email: string
  phoneNumber: string
  gender: string
  age: number
  dateOfBirth: string
  maritalStatus: string
  religion: string
  tribe: string
  occupation: string
}

export interface MedicalHistory {
  hypertension: boolean
  diabetes: boolean
  currentMedication: string
  allergies: string
}

export interface AccountMenuItem {
  id: string
  label: string
  href: string
  icon?: React.ReactNode
}

export interface AccountSection {
  title: string
  items: AccountMenuItem[]
}
