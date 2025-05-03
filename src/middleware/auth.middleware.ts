import { User } from '@/interfaces/user.interface';
import { JwtService } from '@/utils/services/jwt.service';
import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiError';

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw ApiError.unauthorized('No token provided');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw ApiError.unauthorized('Invalid token format');
    }

    try {
      const decoded = new JwtService().verifyToken(token) as User;
      req.user = decoded;
      next();
    } catch (_error) {
      throw ApiError.unauthorized('Invalid or expired token');
    }
  } catch (error) {
    next(error);
  }
};
