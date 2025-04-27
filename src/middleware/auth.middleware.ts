import { HTTP_STATUS } from '@/config/constants';
import { jwtConfig } from '@/config/jwtConfig';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'No token provided');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token format');
    }

    try {
      const decoded = jwt.verify(token, jwtConfig.jwtSecret) as TokenPayload;
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
      };
      next();
    } catch (_error) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token');
    }
  } catch (error) {
    next(error);
  }
};
