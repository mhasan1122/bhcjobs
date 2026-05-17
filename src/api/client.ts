import { API_BASE_URL } from '../constants/config';
import type { ApiResponse, FieldErrors } from '../types/api';

export class ApiError extends Error {
  errors: FieldErrors | null;
  status: number | null;

  constructor(message: string, errors: FieldErrors | null = null, status: number | null = null) {
    super(message);
    this.name = 'ApiError';
    this.errors = errors;
    this.status = status;
  }
}

interface ErrorBody {
  status?: boolean;
  message?: string;
  error?: Record<string, string | string[]>;
}

function parseErrorBody(body: ErrorBody): { message: string; fieldErrors: FieldErrors | null } {
  if (body?.error && typeof body.error === 'object') {
    const fieldErrors: FieldErrors = {};
    Object.entries(body.error).forEach(([key, messages]) => {
      fieldErrors[key] = Array.isArray(messages) ? messages[0] : String(messages);
    });
    return { message: body.message || 'Validation failed', fieldErrors };
  }
  return { message: body?.message || 'Something went wrong', fieldErrors: null };
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  token?: string;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, token } = options;

  const config: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, config);
  } catch {
    throw new ApiError('Network error. Check your connection and try again.');
  }

  let data: ErrorBody & ApiResponse<T>;
  try {
    data = await response.json();
  } catch {
    throw new ApiError('Invalid server response');
  }

  if (data?.status === false || (!response.ok && data?.status !== true)) {
    const { message, fieldErrors } = parseErrorBody(data);
    throw new ApiError(message, fieldErrors, response.status);
  }

  return data;
}
