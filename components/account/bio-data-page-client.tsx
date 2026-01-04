// components/account/bio-data-page-client.tsx

"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EditFieldModal } from "@/components/account/edit-field-modal"
import { PageTransition } from "@/components/ui/page-transition"
import { accountAPI, APIError } from "@/lib/services/account-api"

interface BioDataPageClientProps {
  initialData: {
    name: string
    email: string
    phoneNumber: string
    gender: string
    age: number
    maritalStatus: string
    religion: string
    tribe: string
    occupation: string
  }
}

type EditableField = "email" | "phoneNumber" | "occupation"

export default function BioDataPageClient({ initialData }: BioDataPageClientProps) {
  const router = useRouter()
  const [bioData, setBioData] = useState(initialData)
  const [editingField, setEditingField] = useState<EditableField | null>(null)

  const editableFields: Record<EditableField, string> = {
    email: "Email",
    phoneNumber: "Phone number",
    occupation: "Occupation",
  }

  const handleSaveField = async (field: EditableField, value: string) => {
    try {
      await accountAPI.updateBioDataField(field, value)
      setBioData((prev) => ({ ...prev, [field]: value }))
      setEditingField(null)
    } catch (error) {
      if (error instanceof APIError) {
        throw new Error(error.message)
      }
      throw error
    }
  }

  return (
    <PageTransition className="m-auto min-h-screen w-full max-w-2xl bg-white">
      <div className="sticky top-0 z-10 grid grid-cols-3 items-center bg-white px-4 py-4">
        <button
          onClick={() => router.back()}
          className="justify-self-start rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 font-light" />
        </button>

        <p className="text-center text-lg font-medium md:text-xl">Bio-data</p>

        <div />
      </div>

      <div className="px-6 py-2">
        <div className="rounded-2xl border border-gray-50 bg-white px-4 pt-3 pb-5">
          <BioDataRow label="Name" value={bioData.name} />

          <BioDataRow label="Email" value={bioData.email} editable onEdit={() => setEditingField("email")} />

          <BioDataRow
            label="Phone number"
            value={bioData.phoneNumber}
            editable
            onEdit={() => setEditingField("phoneNumber")}
          />

          <BioDataRow label="Gender" value={bioData.gender} />

          <BioDataRow label="Age" value={bioData.age.toString()} />

          <BioDataRow label="Marital status" value={bioData.maritalStatus} />

          <BioDataRow label="Religion" value={bioData.religion} />

          <BioDataRow label="Tribe" value={bioData.tribe} />

          <BioDataRow
            label="Occupation"
            value={bioData.occupation}
            editable
            onEdit={() => setEditingField("occupation")}
          />
        </div>
      </div>

      {editingField && (
        <EditFieldModal
          isOpen={true}
          onClose={() => setEditingField(null)}
          fieldLabel={editableFields[editingField]}
          currentValue={bioData[editingField]}
          onSave={(value) => handleSaveField(editingField, value)}
        />
      )}
    </PageTransition>
  )
}

interface BioDataRowProps {
  label: string
  value: string
  editable?: boolean
  onEdit?: () => void
}

export function BioDataRow({ label, value, editable = false, onEdit }: BioDataRowProps) {
  return (
    <div className="my-1.5 py-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 md:text-sm">{label}</span>
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium md:text-sm">{value}</p>
        </div>
      </div>
      {editable && onEdit && (
        <button onClick={onEdit} className="text-primary float-right cursor-pointer text-xs hover:underline md:text-sm">
          Edit
        </button>
      )}
    </div>
  )
}
