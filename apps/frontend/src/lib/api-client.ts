/**
 * Response format chuẩn từ backend (xem apps/backend/src/controllers/base.controller.ts).
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

/**
 * Centralized fetch wrapper. Tự động:
 *   - Prepend base URL
 *   - Set JSON headers
 *   - Gửi correlation ID
 *   - Parse response theo ApiResponse<T>
 *   - Throw ApiClientError khi success: false
 *
 * @example
 *   const users = await apiClient<User[]>('/users');
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-correlation-id': crypto.randomUUID(),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json();

  if (!response.ok || payload.success === false) {
    const err = payload.error ?? {
      code: 'UNKNOWN',
      message: response.statusText,
    };
    throw new ApiClientError(response.status, err.code, err.message);
  }

  return payload.data as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
