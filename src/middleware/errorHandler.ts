import { ERROR_MESSAGES, HTTP_STATUS } from '@/config/constants';
import { env } from '@/config/env';
import { ApiError } from '@/utils/apiError';
import { logger } from '@/utils/logger';
import { sendError } from '@/utils/responseHandler';
import { NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

/**
 * Global error handler middleware
 */
export const errorHandler = (err: Error, _req: Request, res: Response): void => {
  // Log error
  logger.error(err);

  // Set default values
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR as number;
  let message = ERROR_MESSAGES.SERVER_ERROR as string;
  let errors: any = undefined;
  let stack: string | undefined = undefined;

  // API Errors (known operational errors)
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Mongoose validation errors
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = ERROR_MESSAGES.VALIDATION_ERROR;
    errors = Object.values(err.errors).map((val) => val.message);
  }
  // Mongoose casting errors (e.g., invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  }
  // MongoDB duplicate key
  else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys((err as any).keyValue)[0];
    message =
      field === 'email' ? ERROR_MESSAGES.DUPLICATE_EMAIL : `Duplicate field value: ${field}`;
  }
  // JWT errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  } else if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  }
  // Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = ERROR_MESSAGES.VALIDATION_ERROR;
    errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  }

  // Include stack trace in development
  if (env.NODE_ENV === 'development') {
    stack = err.stack;
  }

  // Send error response
  sendError(res, message, errors, statusCode, stack);
};
