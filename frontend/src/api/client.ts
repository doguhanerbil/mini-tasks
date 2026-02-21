/**
 * Lightweight fetch wrapper.
 * - Attaches JWT from localStorage when present.
 * - On 401 responses clears the token and redirects to /login.
 * - Throws with the backend error message on non-OK responses.
 */

const TOKEN_KEY = 'token';

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

// Generic API error that mirrors the backend ApiError shape
export interface ApiError {
    status: number;
    message: string;
    path: string;
    timestamp: string;
}

/**
 * Core request function used by all API modules.
 */
export async function request<T>(
    url: string,
    options: RequestInit = {},
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    // Handle 401 – session expired or invalid token
    if (response.status === 401) {
        clearToken();
        window.location.href = '/login';
        throw new Error('Unauthorized');
    }

    // Handle other error statuses
    if (!response.ok) {
        let message = `Request failed (${response.status})`;
        try {
            const err: ApiError = await response.json();
            message = err.message;
        } catch {
            // response body wasn't JSON – use default message
        }
        throw new Error(message);
    }

    // 204 No Content or empty body
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return undefined as T;
    }

    // Some responses (e.g. register 201) may have no body
    const text = await response.text();
    if (!text) return undefined as T;

    return JSON.parse(text) as T;
}
