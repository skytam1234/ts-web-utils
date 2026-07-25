import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { correlationMiddleware } from './middlewares/correlation.middleware';
import { paginationMiddleware } from './middlewares/pagination.middleware';
import { globalErrorMiddleware } from './middlewares/error.middleware';

/**
 * Express application factory.
 *
 * Middleware order (quan trọng):
 *   1. correlation  - inject req.id (dùng cho logging)
 *   2. security     - helmet, cors, rate-limit
 *   3. body parsers
 *   4. pagination   - gắn req.pagination
 *   5. routes
 *   6. global error - PHẢI cuối cùng
 */
export const createApp = (): Express => {
  const app = express();

  // 1. Correlation ID (đầu tiên để logs trace được)
  app.use(correlationMiddleware);

  // 2. Security
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ?? '*',
      credentials: true,
    }),
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 phút
      max: 100, // 100 requests / IP
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // 3. Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 4. Pagination (sau body parsers)
  app.use(paginationMiddleware);

  // 5. Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 6. Routes (sẽ thêm sau)
  // app.use('/api/users', userRouter);

  // 7. 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  // 8. Global error handler - PHẢI cuối cùng
  app.use(globalErrorMiddleware);

  return app;
};
