import { mailConfig, mailOptions } from '@/config/mail';
import { MessageTemplatesType } from '@/templates/templates';
import { Transporter } from 'nodemailer';
import { logger } from '../logger';

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = mailConfig;
  }

  async sendMail({
    to,
    subject,
    templateType,
    data,
  }: {
    to: string;
    subject: string;
    templateType: MessageTemplatesType;
    data: Record<string, any>;
  }) {
    try {
      const info = await this.transporter.sendMail(
        mailOptions({ to, subject, templateType, data }),
      );
      logger.info(`Message sent: ${info.response}`);
    } catch (_error) {
      logger.error(`Failed to send email: ${_error}`);
    }
  }
}

export const mailService = new MailService();
