import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject, ZodError } from 'zod';
import { ApiError } from '../utils/apiError';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(ZodError.create(error.errors));
      }
      return next(ApiError.internalServerError('Validation failed'));
    }
  };
};
