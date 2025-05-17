import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants';
import { AuthService } from '../services/auth.service';
import { sendSuccess } from '../utils/responseHandler';

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
      const result = await this.authService.login(email, password);
      sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      const result = await this.authService.refreshToken(refreshToken);
      sendSuccess(res, result, 'New access token generated successfully');
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.logout(refreshToken);
      sendSuccess(res, result, 'Logout successful');
    } catch (error) {
      next(error);
    }
  };
}
