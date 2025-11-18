/**
 * API Service - Centralized fetch wrapper for all API requests
 * Uses native fetch API with environment variables for configuration
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://www.quizzydock.com';
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10);

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  error?: unknown;
}

/**
 * Fetch wrapper with timeout, error handling, and consistent response format
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Generic API request handler
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || `HTTP Error: ${response.status}`,
        error: errorData,
      };
    }

    // Parse and return response
    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw {
        status: 0,
        message: 'Network error. Please check your connection.',
        error,
      };
    }
    throw error;
  }
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'GET',
  });
}

/**
 * POST request
 */
export async function apiPost<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export async function apiPut<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
  });
}

/**
 * Get the API base URL (useful for debugging)
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
