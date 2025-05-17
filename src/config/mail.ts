import { MessageTemplatesType, replaceDynamicDataInTemplate } from '@/templates/templates';
import { SendMailOptions, createTransport } from 'nodemailer';
import { env } from './env';

export const mailConfig = createTransport({
  service: 'gmail',
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASSWORD,
  },
});

export const mailOptions = ({
  to,
  subject,
  templateType,
  data,
}: {
  to: string;
  subject: string;
  templateType: MessageTemplatesType;
  data: Record<string, any>;
}): SendMailOptions => {
  const html = replaceDynamicDataInTemplate(templateType, data);
  return {
    from: env.MAIL_USER,
    to,
    subject,
    html,
  };
};
