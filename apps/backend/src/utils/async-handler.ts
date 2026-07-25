import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wrap async controller để tự động forward errors tới error middleware.
 * Loại bỏ try/catch thừa trong mọi controller.
 *
 * @example
 *   export const createUser = asyncHandler(async (req, res) => {
 *     const user = await userService.create(req.body);
 *     res.status(201).json({ success: true, data: user });
 *   });
 */
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler = (fn: AsyncHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
