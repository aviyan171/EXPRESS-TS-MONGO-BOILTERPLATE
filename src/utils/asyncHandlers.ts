import type { NextFunction, Request, Response } from 'express';

/**
 * Wraps an async controller function to handle errors
 * @param fn The async controller function to wrap
 * @returns A function that catches any errors and passes them to next()
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      return result;
    } catch (error) {
      next(error);
    }
  };
};
