import { ERROR_MESSAGES, HTTP_STATUS } from '@/config/constants';
import { ApiError } from '@/utils/apiError';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Health check route
router.get('/health', (_req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for undefined routes
router.use('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND));
});

export { router as routes };
