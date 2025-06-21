import { errorHandler } from '@/middleware/errorHandler';
import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { routes } from '../routes';
import { logger } from '../utils/logger';

import { APP_CONSTANTS } from './constants';
import { env } from './env';
import { compressionOptions, corsOptions, helmetOptions, rateLimiter } from './middleware';

/**
 * Express app configuration options
 */
interface AppOptions {
  enableCors?: boolean;
  enableHelmet?: boolean;
  enableCompression?: boolean;
  enableMorgan?: boolean;
  enableRateLimiter?: boolean;
}

const defaultOptions: AppOptions = {
  enableCors: true,
  enableHelmet: true,
  enableCompression: true,
  enableMorgan: env.NODE_ENV === 'development',
  enableRateLimiter: true,
};

/**
 * Create and configure Express application
 */
export const createApp = (options: AppOptions = defaultOptions): Express => {
  const app = express();

  // Body parsing middleware
  app.use(express.json({ limit: APP_CONSTANTS.UPLOAD.MAX_FILE_SIZE }));
  app.use(express.urlencoded({ extended: true, limit: APP_CONSTANTS.UPLOAD.MAX_FILE_SIZE }));

  // Cookie parsing middleware
  app.use(cookieParser());

  // Security middleware
  if (options.enableHelmet) {
    app.use(helmet(helmetOptions));
  }

  // CORS middleware
  if (options.enableCors) {
    app.use(cors(corsOptions));
  }

  // Compression middleware
  if (options.enableCompression) {
    app.use(compression(compressionOptions));
  }

  // Logging middleware
  if (options.enableMorgan) {
    app.use(
      morgan('dev', {
        stream: {
          write: (message) => logger.http(message.trim()),
        },
      }),
    );
  }

  // Rate limiter middleware
  if (options.enableRateLimiter) {
    app.use(rateLimiter);
  }

  // API routes
  app.use(`/api/${APP_CONSTANTS.API_VERSION}`, routes);

  // Error handling middleware - must be last
  app.use(errorHandler);

  return app;
};
