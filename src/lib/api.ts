/**
 * Centralized API client for interacting with the backend.
 * Uses native fetch and falls back gracefully if the backend is unavailable or unconfigured.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // If no base URL is configured, throw a distinct error to trigger mock fallbacks
  if (!API_BASE) {
    throw new Error('VITE_API_BASE_URL is not configured.')
  }

  const url = `${API_BASE.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
  
  const headers = new Headers(options?.headers)
  if (!headers.has('Content-Type') && !(options?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new ApiError(response.status, `API request failed with status ${response.status}`)
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    // If it's already an ApiError (from the !response.ok block), just throw it
    if (error instanceof ApiError) {
      throw error
    }
    
    // Otherwise it's a network error (e.g. backend down or CORS failure)
    throw new Error(`Network error: ${(error as Error).message}`)
  }
}
