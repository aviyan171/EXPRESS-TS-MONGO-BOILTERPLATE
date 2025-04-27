import type { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

export class AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    return user ? user.toJSON() : null;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = await UserModel.create({
      ...userData,
      email: userData.email?.toLowerCase(),
    });
    return user.toJSON();
  }
}
