/**
 * Pagination metadata trong API response.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Options parse từ query string.
 */
export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Parse page/limit từ query string với defaults an toàn.
 *
 * @example
 *   const opts = parsePagination(req.query);
 *   // { page: 1, limit: 20, skip: 0 }
 */
export const parsePagination = (query: Record<string, unknown>): PaginationOptions => {
  const rawPage = Number(query.page) || 1;
  const rawLimit = Number(query.limit) || 20;

  const page = Math.max(1, Math.floor(rawPage));
  const limit = Math.min(100, Math.max(1, Math.floor(rawLimit)));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Build metadata từ total và options hiện tại.
 *
 * @example
 *   const meta = buildPaginationMeta({ page: 1, limit: 20, skip: 0 }, 123);
 *   // { page: 1, limit: 20, total: 123, totalPages: 7, hasNext: true, hasPrev: false }
 */
export const buildPaginationMeta = (
  options: PaginationOptions,
  total: number,
): PaginationMeta => {
  const totalPages = Math.ceil(total / options.limit);
  return {
    page: options.page,
    limit: options.limit,
    total,
    totalPages,
    hasNext: options.page < totalPages,
    hasPrev: options.page > 1,
  };
};
