import type { NextFunction, Request, Response } from 'express';
import { parsePagination, type PaginationOptions } from '../utils/pagination';

/**
 * Parse `?page=` và `?limit=` từ query string, gắn vào `req.pagination`.
 *
 * @example
 *   // GET /api/users?page=2&limit=50
 *   // req.pagination = { page: 2, limit: 50, skip: 50 }
 */
declare global {
  namespace Express {
    interface Request {
      pagination: PaginationOptions;
    }
  }
}

export const paginationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  req.pagination = parsePagination(req.query as Record<string, unknown>);
  next();
};
