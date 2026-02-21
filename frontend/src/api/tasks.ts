/**
 * Tasks API module.
 * Full CRUD against /api/tasks (JWT required).
 */

import { request } from './client';

/** Mirrors the backend TaskResponse DTO */
export interface TaskResponse {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

/** Fields accepted when creating a task */
export interface TaskCreateRequest {
    title: string;
    description?: string;
}

/** Fields accepted when updating a task */
export interface TaskUpdateRequest {
    title?: string;
    description?: string;
    completed?: boolean;
}

/** GET /api/tasks */
export async function getTasks(): Promise<TaskResponse[]> {
    return request<TaskResponse[]>('/api/tasks');
}

/** POST /api/tasks */
export async function createTask(data: TaskCreateRequest): Promise<TaskResponse> {
    return request<TaskResponse>('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/** PUT /api/tasks/:id */
export async function updateTask(id: number, data: TaskUpdateRequest): Promise<TaskResponse> {
    return request<TaskResponse>(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

/** DELETE /api/tasks/:id */
export async function deleteTask(id: number): Promise<void> {
    return request<void>(`/api/tasks/${id}`, {
        method: 'DELETE',
    });
}
