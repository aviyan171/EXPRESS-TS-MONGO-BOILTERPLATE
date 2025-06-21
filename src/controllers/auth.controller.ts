import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants';
import { AuthService } from '../services/auth.service';
import { sendSuccess } from '../utils/responseHandler';
import { env } from '@/config/env';
import { toMs } from '@/utils/ms';
import { CookieHelper } from '@/utils/cookie-helper';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.register(req.body);

      sendSuccess(res, result, 'User registered successfully', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await this.authService.login(email, password);
      new CookieHelper('refreshToken',{maxAge: toMs(env.REFRESH_TOKEN_EXPIRES_IN)}).setCookie(res,refreshToken)
      sendSuccess(res, { accessToken }, 'Login successful');
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.cookies;

      const result = await this.authService.refreshToken(refreshToken);
      sendSuccess(res, result, 'New access token generated successfully');
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.cookies;

      const result = await this.authService.logout(refreshToken);
      new CookieHelper('refreshToken').deleteCookie(res);
      sendSuccess(res, result, 'Logout successful');
    } catch (error) {
      next(error);
    }
  };
}
