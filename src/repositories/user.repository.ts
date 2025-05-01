import type { BaseRepository } from '../interfaces/repository.interface';
import type { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

export class UserRepository implements BaseRepository<User> {
  async create(data: Partial<User>): Promise<User> {
    const user = await UserModel.create(data);
    return user.toJSON();
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? user.toJSON() : null;
  }

  async findOne(filter: Partial<User>): Promise<User | null> {
    const user = await UserModel.findOne(filter);
    return user ? user.toJSON() : null;
  }

  async find(filter: Partial<User>): Promise<User[]> {
    const users = await UserModel.find(filter);
    return users.map((user) => user.toJSON());
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );
    return user ? user.toJSON() : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Custom methods specific to User
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    return user ? user.toJSON() : null;
  }

  async emailExists(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email: email.toLowerCase() });
    return count > 0;
  }
}
