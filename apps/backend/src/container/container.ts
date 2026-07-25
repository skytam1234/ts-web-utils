import { PrismaClient } from '@prisma/client';
import { prisma } from '../database/prismaClient';
import type { UserRepository } from '../repositories/user.repository';

/**
 * Dependency Injection Container (Singleton).
 *
 * Quy tắc: Chỉ nơi duy nhất trong codebase được phép gọi `new`.
 * Mọi controllers/services đều lấy instances từ container.
 *
 * Initialization order:
 *   Prisma → Repositories → Services → Controllers
 *
 * @example
 *   const userRepo = Container.getInstance().getUserRepository();
 */
export class Container {
  private static instance: Container;

  private readonly prismaClient: PrismaClient;
  private readonly userRepository: UserRepository;

  private constructor() {
    this.prismaClient = prisma;
    this.userRepository = new UserRepository(this.prismaClient);
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  getPrisma(): PrismaClient {
    return this.prismaClient;
  }

  getUserRepository(): UserRepository {
    return this.userRepository;
  }
}
