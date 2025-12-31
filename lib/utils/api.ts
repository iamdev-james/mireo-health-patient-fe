// lib/utils/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "APIError"
  }
}

interface APIErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = (await response.json().catch(() => ({}))) as APIErrorResponse
      throw new APIError(error.message || "An error occurred", response.status, error.errors)
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof APIError) throw error
    throw new APIError("Network error occurred", 500)
  }
}
