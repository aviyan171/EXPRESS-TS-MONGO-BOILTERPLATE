import compression from 'compression';
import type { CorsOptions } from 'cors';
import rateLimit from 'express-rate-limit';
import { APP_CONSTANTS } from './constants';

/**
 * Rate limiter configuration
 */
export const rateLimiter = rateLimit({
  windowMs: APP_CONSTANTS.RATE_LIMIT.WINDOW_MS,
  max: APP_CONSTANTS.RATE_LIMIT.MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * CORS configuration
 */
export const corsOptions: CorsOptions = {
  origin: [...APP_CONSTANTS.CORS.ALLOWED_ORIGINS],
  methods: [...APP_CONSTANTS.CORS.ALLOWED_METHODS],
  allowedHeaders: [...APP_CONSTANTS.CORS.ALLOWED_HEADERS],
  exposedHeaders: [...APP_CONSTANTS.CORS.EXPOSE_HEADERS],
  maxAge: APP_CONSTANTS.CORS.MAX_AGE,
  credentials: true,
};

/**
 * Helmet configuration
 */
export const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,
  dnsPrefetchControl: true,
  frameguard: true,
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: true,
  xssFilter: true,
};

/**
 * Compression configuration
 */
export const compressionOptions = {
  level: 6, // compression level
  threshold: 1024, // minimum size to compress (in bytes)
  filter: (req: any, res: any) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
};
