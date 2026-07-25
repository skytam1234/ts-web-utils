import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

/**
 * Inject correlation ID vào mỗi request để trace logs.
 *
 * Nếu client gửi header `x-correlation-id`, dùng luôn (để trace distributed).
 * Ngược lại tự generate UUID mới.
 *
 * Response header `x-correlation-id` sẽ chứa cùng giá trị.
 */
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const correlationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const incoming = req.headers['x-correlation-id'];
  const id =
    typeof incoming === 'string' && incoming.length > 0 ? incoming : randomUUID();

  req.id = id;
  res.setHeader('x-correlation-id', id);
  next();
};
