import type { Response } from 'express';
import type { PaginationMeta } from '../utils/pagination';

/**
 * Response format chuẩn cho MỌI endpoint.
 *
 * Success: { success: true, data: T, meta?: PaginationMeta }
 * Error:   { success: false, error: { code, message } }
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/**
 * Base Controller chuẩn hoá response format.
 *
 * @example
 *   export class UserController extends BaseController {
 *     create = asyncHandler(async (req, res) => {
 *       const user = await this.userService.create(req.body);
 *       this.created(res, user);
 *     });
 *   }
 */
export abstract class BaseController {
  protected ok<T>(res: Response, data: T): Response {
    const body: ApiResponse<T> = { success: true, data };
    return res.status(200).json(body);
  }

  protected created<T>(res: Response, data: T): Response {
    const body: ApiResponse<T> = { success: true, data };
    return res.status(201).json(body);
  }

  protected accepted<T>(res: Response, data: T): Response {
    const body: ApiResponse<T> = { success: true, data };
    return res.status(202).json(body);
  }

  protected noContent(res: Response): Response {
    return res.status(204).send();
  }

  protected paginated<T>(
    res: Response,
    data: T[],
    meta: PaginationMeta,
  ): Response {
    const body: ApiResponse<T[]> = { success: true, data, meta };
    return res.status(200).json(body);
  }
}
