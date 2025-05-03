/**
 * Application-wide constants
 */

export const APP_CONSTANTS = {
  // API Versions
  API_VERSION: 'v1',

  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
  },

  // JWT
  JWT: {
    ACCESS_TOKEN_EXPIRES_IN: '15m',
    REFRESH_TOKEN_EXPIRES_IN: '7d',
  },

  // Password hashing
  BCRYPT_SALT_ROUNDS: 12,

  // Cache
  CACHE_TTL: 60 * 60, // 1 hour in seconds

  // File upload
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  },

  // Cookie options
  COOKIE: {
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'lax' as const,
    MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
  },

  // Cors options
  CORS: {
    ALLOWED_ORIGINS: ['http://localhost:3000'] as string[],
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as string[],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization'] as string[],
    EXPOSE_HEADERS: ['Content-Range', 'X-Total-Count'] as string[],
    MAX_AGE: 600, // 10 minutes
  },
} as const;

/**
 * HTTP Status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Regular expressions for validation
 */
export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  PHONE: /^\+?[\d\s-]{10,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Internal server error',
  DUPLICATE_EMAIL: 'Email already exists',
  INVALID_TOKEN: 'Invalid or expired token',
  ADMIN_ONLY: 'This action is only available to admins',
} as const;
