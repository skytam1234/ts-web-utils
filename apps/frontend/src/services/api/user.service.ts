import { apiClient } from '@/lib/api-client';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
}

/**
 * User API service - thin wrapper quanh apiClient.
 * Component chỉ gọi service, không gọi apiClient trực tiếp.
 */
export const userService = {
  list: () => apiClient.get<User[]>('/users'),

  get: (id: string) => apiClient.get<User>(`/users/${id}`),

  create: (input: CreateUserInput) => apiClient.post<User>('/users', input),

  update: (id: string, input: Partial<CreateUserInput>) =>
    apiClient.patch<User>(`/users/${id}`, input),

  delete: (id: string) => apiClient.delete<void>(`/users/${id}`),
};
