import type { Env } from '../schemas/env.schema';
import { envSchema } from '../schemas/env.schema';
import { ApiError } from '../utils/apiError';
import { logger, updateLoggerLevel } from '../utils/logger';
import { HTTP_STATUS } from './constants';

/**
 * Validate and load environment variables
 */
const loadEnv = (): Env => {
  const result = envSchema.safeParse(process.env);

  logger.info('Validating environment variables...');

  if (!result.success) {
    const formattedError = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    logger.error('❌ Invalid environment variables:');
    logger.error(formattedError);

    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Invalid environment variables. Check server logs for details.',
    );
  }

  // Update logger level after validation
  updateLoggerLevel(result.data.LOG_LEVEL);
  logger.info('✅ Environment variables loaded successfully');

  return result.data;
};

// Load and export environment variables
export const env = loadEnv();
