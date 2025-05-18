import { QueueName, QueuePriority } from '@/config/queue';
import { JobsOptions } from 'bullmq';

export interface BaseJobData {
  [key: string]: any;
}

export interface QueueJob<T> {
  name: string;
  data: T;
  priority?: QueuePriority;
  attempts?: number;
  delay?: number;
  options?: Omit<JobsOptions, 'name' | 'data' | 'priority' | 'attempts' | 'delay'>;
}

export interface QueueConfig {
  name: QueueName;
  concurrency?: number;
}
