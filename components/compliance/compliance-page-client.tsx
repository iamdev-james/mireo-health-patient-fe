// components/compliance/compliance-page-client.tsx
"use client"

import { useState } from "react"
import { UserProfileHeader } from "@/components/account/user-profile-header"
import { ComplianceData } from "@/types/compliance"
import { MedicationTabClient } from "./medication-tab-client"
import { ReadingsTabClient } from "./readings-tab-client"
import { TabSwitcher } from "./tab-switcher"

interface CompliancePageClientProps {
  data: ComplianceData
  userName: string
  userImage?: string
  currentMonth: string
}

const tabs = [
  { id: "medication", label: "Medication" },
  { id: "readings", label: "Readings" },
]

export function CompliancePageClient({ data, userName, userImage, currentMonth }: CompliancePageClientProps) {
  const [activeTab, setActiveTab] = useState<string>("medication")

  return (
    <div className="bg-gray-background min-h-screen pb-20">
      <div className="pt-safe px-4">
        {/* Header */}
        <div className="py-6">
          <UserProfileHeader title="Compliance" name={userName} profileImage={userImage} />
        </div>

        {/* Tabs */}
        <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="pb-8">
          {activeTab === "medication" && (
            <MedicationTabClient initialMedications={data.medications} initialMonth={currentMonth} />
          )}

          {activeTab === "readings" && <ReadingsTabClient initialReadings={data.readings} />}
        </div>
      </div>
    </div>
  )
}
