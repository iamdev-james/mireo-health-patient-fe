// types/subscription.ts

export interface SubscriptionPlan {
  name: string
  status: "active" | "not_active"
  price: string
  nextBillingDate: string
}

export interface BenefitItem {
  text: string
}

export interface BankAccount {
  accountName: string
  bankName: string
  accountNumber: string
}

export interface PaymentMethod {
  lastFourDigits: string
  status?: "failed" | null
}

export interface SubscriptionData {
  plan: SubscriptionPlan
  benefits: BenefitItem[]
  bankAccount: BankAccount
  paymentMethod: PaymentMethod | null
  promoMessage: string
}

export interface PaymentMethodForm {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export interface DeleteAccountData {
  warningMessage: string
}

export interface CancelSubscriptionData {
  benefits: string[]
  retentionMessage: string
}
