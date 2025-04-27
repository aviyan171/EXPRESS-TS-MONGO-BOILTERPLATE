import { env } from './env';

export const jwtConfig = {
  jwtSecret: env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: env.JWT_EXPIRES_IN, // 1 day in seconds
};
