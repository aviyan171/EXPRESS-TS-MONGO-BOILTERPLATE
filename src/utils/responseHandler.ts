import type { Response } from 'express';
import { HTTP_STATUS } from '../config/constants';

interface SuccessResponse<T> {
  success: true;
  message?: string;
  data?: T;
}

interface ErrorResponse {
  success: false;
  error: string;
  details?: unknown;
  stack?: string;
}

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = HTTP_STATUS.OK,
): void => {
  const response: SuccessResponse<T> = {
    success: true,
  };

  if (message) response.message = message;
  if (data) response.data = data;

  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  error: string,
  details?: unknown,
  statusCode: number = HTTP_STATUS.BAD_REQUEST,
  stack?: string,
): void => {
  const response: ErrorResponse = {
    success: false,
    error,
  };

  if (details) response.details = details;
  if (stack) response.stack = stack;
  res.status(statusCode).json(response);
};
