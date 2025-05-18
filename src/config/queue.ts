import { env } from './env';

export const queueConfig = {
  connection: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
} as const;

export const QUEUE_NAMES = {
  EMAIL: 'email-queue',
} as const;

export const QUEUE_PRIORITIES = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
} as const;

export type QueueName = keyof typeof QUEUE_NAMES;
export type QueuePriority = keyof typeof QUEUE_PRIORITIES;
