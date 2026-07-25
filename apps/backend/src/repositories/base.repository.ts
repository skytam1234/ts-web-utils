import type { PrismaClient } from '@prisma/client';
import { ConflictError, NotFoundError } from '../errors/app-error';

/**
 * Base Repository chuẩn hoá Prisma error handling và pagination.
 *
 * @example
 *   export class UserRepository extends BaseRepository {
 *     async findById(id: string) {
 *       try {
 *         return await this.prisma.user.findUnique({ where: { id } });
 *       } catch (err) {
 *         this.handlePrismaError(err);
 *       }
 *     }
 *   }
 */
export abstract class BaseRepository {
  protected readonly prisma: PrismaClient;

  protected constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Convert Prisma errors sang AppError với status code đúng.
   * Throw lại nếu không phải Prisma error.
   */
  protected handlePrismaError(error: unknown): never {
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: { target?: string[] } };

      switch (prismaError.code) {
        case 'P2002': {
          // Unique constraint failed
          const target = prismaError.meta?.target?.join(', ') ?? 'field';
          throw new ConflictError(`Duplicate value for ${target}`);
        }
        case 'P2025': {
          // Record not found
          throw new NotFoundError('Resource not found');
        }
        case 'P2003': {
          // Foreign key constraint failed
          throw new ConflictError('Referenced resource does not exist');
        }
      }
    }

    throw error;
  }

  /**
   * Helper: throw NotFoundError nếu entity không tồn tại.
   */
  protected ensureExists<T>(entity: T | null, message = 'Resource not found'): T {
    if (!entity) {
      throw new NotFoundError(message);
    }
    return entity;
  }
}
