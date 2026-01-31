// lib/utils/api.ts

import { ProgressService } from "@/lib/services/progress-service"

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

  ProgressService.start()

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    })

    if (!response.ok) {
      // Handle 401 Unauthorized globally
      if (response.status === 401 && typeof window !== "undefined") {
        try {
          // Prevent infinite loops if refresh token itself expires or is invalid
          // The refresh endpoint needs to be called without requiring auth to avoid circular checks
          // But our fetchAPI wrapper defaults `requiresAuth` to false only if not specified,
          // so we must be careful not to use `fetchAPI` for the refresh call if it re-triggers this logic recursively.

          // However, simplest way effectively is:
          const refreshToken = sessionStorage.getItem("refresh_token")
          if (refreshToken) {
            // We use a direct fetch or a separate instance to avoid circular dependency if fetchAPI is reused
            // But reuse is cleaner if we ensure REFRESH_TOKEN endpoint doesn't trigger 401 handling same way

            // Let's try to refresh
            const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh_token: refreshToken }),
            })

            if (refreshResponse.ok) {
              const data = (await refreshResponse.json()) as { access_token: string; refresh_token?: string }
              if (data.access_token) {
                sessionStorage.setItem("auth_token", data.access_token)
                if (data.refresh_token) {
                  sessionStorage.setItem("refresh_token", data.refresh_token)
                }

                // Retry original request with new token
                const newHeaders = { ...headers, Authorization: `Bearer ${data.access_token}` }
                const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
                  ...fetchOptions,
                  headers: newHeaders,
                })

                if (retryResponse.ok) {
                  return (await retryResponse.json()) as T
                }
                // If retry fails, fall through to error
              }
            }
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError)
        }

        // If refresh failed or no refresh token, logout
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("refresh_token")
        window.location.href = "/sign-in"
      }

      const error = (await response.json().catch(() => ({}))) as APIErrorResponse
      throw new APIError(error.message || "An error occurred", response.status, error.errors)
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof APIError) throw error
    throw new APIError("Network error occurred", 500)
  } finally {
    ProgressService.done()
  }
}
