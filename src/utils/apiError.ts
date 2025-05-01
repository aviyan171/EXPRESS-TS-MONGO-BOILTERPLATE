import { HTTP_STATUS } from '../config/constants';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: any,
    public isOperational = true,
  ) {
    super(message);
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message);
  }

  static notFound(message: string): ApiError {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  static forbidden(message: string): ApiError {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message);
  }

  static internalServerError(message: string): ApiError {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
  static validationError(message: string, errors?: any): ApiError {
    return new ApiError(HTTP_STATUS.UNPROCESSABLE_ENTITY, message, errors);
  }
}
