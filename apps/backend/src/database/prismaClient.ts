import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client.
 * Dùng trong Container và jobs (ngoài request scope).
 */
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'warn', 'error']
      : ['error'],
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
