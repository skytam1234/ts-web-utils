import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/app-error';
import type { ErrorResponse } from '../controllers/base.controller';

/**
 * Global error handler. Format MỌI errors thành response JSON nhất quán.
 *
 * Mount cuối cùng trong middleware chain: app.use(globalErrorMiddleware)
 */
export const globalErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  // Log với correlation ID để trace
  console.error(`[${req.id}]`, err);

  // AppError - biết trước status code
  if (err instanceof AppError) {
    const body: ErrorResponse = {
      success: false,
      error: { code: err.code, message: err.message },
    };
    res.status(err.statusCode).json(body);
    return;
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    const body: ErrorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; '),
      },
    };
    res.status(422).json(body);
    return;
  }

  // Unknown errors - ẩn chi tiết ở production
  const isDev = process.env.NODE_ENV === 'development';
  const body: ErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: isDev ? err.message : 'Internal server error',
    },
  };
  res.status(500).json(body);
};
