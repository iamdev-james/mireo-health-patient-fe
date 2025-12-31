// types/signin.ts

export interface SignInFormData {
  identifier: string
}

export interface SignInOTPData {
  code: string
  identifier: string
}

export interface SignInState {
  identifier: string
  isIdentifierSubmitted: boolean
}
