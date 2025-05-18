import { QUEUE_NAMES, QUEUE_PRIORITIES, queueConfig } from '@/config/queue';
import { BaseJobData, QueueConfig, QueueJob } from '@/interfaces/queue.interface';
import { Job, Queue, Worker } from 'bullmq';
import { logger } from '../logger';

export abstract class QueueService<T extends BaseJobData = BaseJobData> {
  protected queue: Queue;
  protected worker: Worker;

  constructor(config: QueueConfig) {
    const { name, concurrency = 1 } = config;

    this.queue = new Queue(QUEUE_NAMES[name], {
      connection: queueConfig.connection,
      defaultJobOptions: { ...queueConfig.defaultJobOptions },
    });

    this.worker = new Worker(
      QUEUE_NAMES[name],
      async (job: Job<T>) => {
        try {
          logger.info(`Processing job ${job.id} in queue ${name}`);
          await this.processJob(job);
        } catch (error) {
          logger.error(`Error processing job ${job.id} in queue ${name}: ${error}`);
        }
      },
      {
        connection: queueConfig.connection,
        concurrency,
      },
    );

    this.setupWorkerEvents(name);
  }

  private setupWorkerEvents(queueName: string): void {
    this.worker.on('completed', (job) => {
      logger.info(`Job ${job.id} in queue ${queueName} completed successfully`);
    });

    this.worker.on('failed', (job, error) => {
      logger.error(`Job ${job?.id} in queue ${queueName} failed with error: ${error}`);
    });

    this.worker.on('error', (error) => {
      logger.error(`Worker error in queue ${queueName}: ${error}`);
    });
  }

  async addJob(job: QueueJob<T>): Promise<Job<T>> {
    try {
      const { name, data, priority = 'MEDIUM', attempts, delay, options } = job;
      const jobInstance = await this.queue.add(name, data, {
        priority: QUEUE_PRIORITIES[priority],
        attempts,
        delay,
        ...options,
      });
      logger.info(`Job ${jobInstance.id} added to queue ${name}`);
      return jobInstance;
    } catch (error) {
      logger.error(`Failed to add job to queue: ${error}`);
      throw error;
    }
  }

  async getJobStatus(jobId: string): Promise<string | null> {
    const job = await this.queue.getJob(jobId);
    return job ? await job.getState() : null;
  }

  async removeJob(jobId: string): Promise<void> {
    const job = await this.queue.getJob(jobId);
    if (job) {
      await job.remove();
      logger.info(`Job ${jobId} removed from queue`);
    }
  }

  async close(): Promise<void> {
    await this.queue.close();
    await this.worker.close();
  }

  protected abstract processJob(job: Job<T>): Promise<void>;

  // Abstract method that must be implemented by child classes
  protected abstract validateJobData(data: T): void;
}
