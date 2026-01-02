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

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem("auth_token")
}

export async function fetchAPI<T>(endpoint: string, options?: RequestInit & { requiresAuth?: boolean }): Promise<T> {
  const { requiresAuth = false, ...fetchOptions } = options || {}

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (fetchOptions?.headers) {
    const existingHeaders = new Headers(fetchOptions.headers)
    existingHeaders.forEach((value, key) => {
      headers[key] = value
    })
  }

  if (requiresAuth) {
    const token = getAuthToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
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
