import { Job } from 'bullmq';
import { logger } from '../utils/logger';
import { mailService } from '../utils/services/mail.service';
import { QueueService } from '../utils/services/queue.service';

import { MessageTemplatesType } from '@/templates/templates';
import { ApiError } from '../utils/apiError';

interface EmailJobData {
  to: string;
  subject: string;
  templateType: MessageTemplatesType;
  data: Record<string, any>;
}

export class EmailQueueService extends QueueService<EmailJobData> {
  constructor() {
    super({
      name: 'EMAIL',
      concurrency: 1, // Process 1 emails at a time
    });
  }

  async addEmailJob(data: EmailJobData): Promise<Job<EmailJobData>> {
    this.validateJobData(data);
    return await this.addJob({
      name: 'send-email',
      data,
      priority: 'HIGH',
    });
  }

  protected async processJob(job: Job<EmailJobData, any, string>): Promise<void> {
    try {
      await mailService.sendMail(job.data);
    } catch (error) {
      logger.error('Failed to process email job:', error);
      throw error;
    }
  }

  protected validateJobData(data: EmailJobData): void {
    if (!data.to) {
      throw ApiError.validationError('Email recipient is required');
    }
    if (!data.subject) {
      throw ApiError.badRequest('Email subject is required');
    }
    if (!data.templateType) {
      throw ApiError.badRequest('Email template type is required');
    }
    if (!data.data) {
      throw ApiError.badRequest('Email template data is required');
    }
  }

  async getEmailJobStatus(jobId: string): Promise<string | null> {
    return this.getJobStatus(jobId);
  }

  async removeEmailJob(jobId: string): Promise<void> {
    await this.removeJob(jobId);
  }

  async close(): Promise<void> {
    await super.close();
  }
}

// Create a singleton instance
export const emailQueueService = new EmailQueueService();
