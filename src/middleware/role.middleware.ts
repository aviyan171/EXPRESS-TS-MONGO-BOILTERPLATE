import { ERROR_MESSAGES } from '@/config/constants';
import { UserRole } from '@/enum/user.enum';
import { ApiError } from '@/utils/apiError';
import type { NextFunction, Request, Response } from 'express';

export const adminRoleValidation = (request: Request, _response: Response, next: NextFunction) => {
  const { user } = request;
  if (user?.role !== UserRole.ADMIN) throw ApiError.forbidden(ERROR_MESSAGES.ADMIN_ONLY);
  next();
};
