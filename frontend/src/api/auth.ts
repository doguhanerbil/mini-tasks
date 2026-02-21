/**
 * Auth API module.
 * Handles login and register calls against /api/auth.
 */

import { request } from './client';

interface AuthResponse {
    token: string;
}

/** POST /api/auth/login – returns a JWT token */
export async function login(email: string, password: string): Promise<AuthResponse> {
    return request<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

/** POST /api/auth/register – creates a new user (201, no body) */
export async function register(email: string, password: string): Promise<void> {
    return request<void>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}
