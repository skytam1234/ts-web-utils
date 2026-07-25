/**
 * Query key factory - centralized keys cho React Query.
 *
 * Lợi ích:
 *   - 1 nơi duy nhất định nghĩa keys
 *   - Auto invalidate: queryKeys.users.all() invalidate mọi users.*
 *   - Refactor an toàn: đổi key chỉ sửa 1 chỗ
 *
 * @example
 *   // GET /users
 *   useQuery({ queryKey: queryKeys.users.list(), queryFn: ... })
 *
 *   // GET /users/123
 *   useQuery({ queryKey: queryKeys.users.detail('123'), queryFn: ... })
 *
 *   // Invalidate tất cả users
 *   queryClient.invalidateQueries({ queryKey: queryKeys.users.all() })
 */
export const queryKeys = {
  users: {
    all: () => ['users'] as const,
    lists: () => [...queryKeys.users.all(), 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.users.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.users.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  posts: {
    all: () => ['posts'] as const,
    lists: () => [...queryKeys.posts.all(), 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.posts.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.posts.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
  },
  messages: {
    all: () => ['messages'] as const,
    byConversation: (conversationId: string) =>
      [...queryKeys.messages.all(), 'conversation', conversationId] as const,
  },
  auth: {
    all: () => ['auth'] as const,
    me: () => [...queryKeys.auth.all(), 'me'] as const,
  },
} as const;
