import { readFile } from '@/utils/fs';
import { logger } from '@/utils/logger';
import { getPath } from '@/utils/path';

export type MessageTemplatesType = 'registrationSuccess';

export const templatePaths: Record<MessageTemplatesType, string> = {
  registrationSuccess: getPath(__dirname, './email/registration-success.html'),
};

export const templates: Record<MessageTemplatesType, string> = {
  registrationSuccess: readFile(templatePaths.registrationSuccess),
};

export const replaceDynamicDataInTemplate = (
  template: MessageTemplatesType,
  data: Record<string, any>,
) => {
  const parsedTemplate = templates[template];

  if (!parsedTemplate) {
    logger.error(`Template ${template} not found`);
  }

  return parsedTemplate.replace(/\{\{([^}]+)\}\}/g, (match, p1) => data[p1] || match);
};
