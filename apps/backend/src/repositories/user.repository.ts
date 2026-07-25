import type { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';

/**
 * Example UserRepository mở rộng BaseRepository.
 *
 * @example
 *   const user = await container.getUserRepository().findById('xxx');
 */
export class UserRepository extends BaseRepository {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async findById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      return this.ensureExists(user, `User ${id} not found`);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findManyWithPagination(skip: number, limit: number) {
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take: limit }),
      this.prisma.user.count(),
    ]);
    return { items, total };
  }
}
