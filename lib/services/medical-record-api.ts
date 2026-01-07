import { APIError } from "@/lib/utils/api"

export const medicalRecordsAPI = {
  uploadLabResult: async (testId: string, file: File): Promise<{ success: boolean }> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("testId", testId)

    // Note: For FormData, we need to override headers
    const token = typeof window !== "undefined" ? sessionStorage.getItem("auth_token") : null

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "/api"}/medical-records/lab-tests/upload`, {
      method: "POST",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    return response.json() as Promise<{ success: boolean }>
  },
}

export { APIError }
