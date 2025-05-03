import { HTTP_STATUS } from '@/config/constants';
import { sendSuccess } from '@/utils/responseHandler';
import type { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ApiError } from '../utils/apiError';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      sendSuccess(res, users, 'Users fetched successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      sendSuccess(res, user, 'User fetched successfully', HTTP_STATUS.OK);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;

      if (await this.userService.isEmailTaken(userData.email)) {
        throw new ApiError(400, 'Email already exists');
      }

      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userData = req.body;

      const user = await this.userService.updateUser(id, userData);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        throw new ApiError(404, 'User not found');
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
