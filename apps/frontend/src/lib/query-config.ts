/**
 * React Query defaults - chuẩn hoá cache time, retry, refetch behavior.
 *
 * Cache strategy:
 *   - Realtime (messages, online status): stale ngay, refetch thường xuyên
 *   - Frequent (lists, feeds): stale 30s
 *   - Stable (user profile, settings): stale 5min, cache 30min
 *   - Static (categories, countries): stale 1h, cache 24h
 */
export const queryConfig = {
  realtime: {
    staleTime: 0,
    gcTime: 5 * 60 * 1000, // 5 phút
    refetchInterval: 30 * 1000, // 30s
    refetchOnWindowFocus: true,
  },
  frequent: {
    staleTime: 30 * 1000, // 30s
    gcTime: 10 * 60 * 1000, // 10 phút
    refetchOnWindowFocus: true,
  },
  stable: {
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 30 * 60 * 1000, // 30 phút
    refetchOnWindowFocus: false,
  },
  static: {
    staleTime: 60 * 60 * 1000, // 1 giờ
    gcTime: 24 * 60 * 60 * 1000, // 24 giờ
    refetchOnWindowFocus: false,
  },
} as const;

/**
 * Default cho QueryClient - áp dụng nếu useQuery không truyền options.
 */
export const defaultQueryOptions = {
  queries: {
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: true,
  },
  mutations: {
    retry: 0,
  },
} as const;
