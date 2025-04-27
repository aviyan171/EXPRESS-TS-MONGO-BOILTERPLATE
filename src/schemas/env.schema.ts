import { z } from 'zod';

/**
 * Server environment schema
 */
export const serverEnvSchema = z.object({
  PORT: z.string().transform(Number).pipe(z.number().positive()),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Database environment schema
 */
export const databaseEnvSchema = z.object({
  MONGODB_URI: z.string().url('Invalid MongoDB URI'),
});

/**
 * JWT environment schema
 */
export const jwtEnvSchema = z.object({
  JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().transform(Number).pipe(z.number().positive()),
});

/**
 * Logging environment schema
 */
export const loggingEnvSchema = z.object({
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
});

/**
 * Combined environment schema
 */
export const envSchema = z.object({
  ...serverEnvSchema.shape,
  ...databaseEnvSchema.shape,
  ...jwtEnvSchema.shape,
  ...loggingEnvSchema.shape,
});

/**
 * Environment variables type
 */
export type Env = z.infer<typeof envSchema>;

// Inferred types for each section
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type DatabaseEnv = z.infer<typeof databaseEnvSchema>;
export type JWTEnv = z.infer<typeof jwtEnvSchema>;
export type LoggingEnv = z.infer<typeof loggingEnvSchema>;
