import type { User } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  async getAllUsers(filter: Partial<User> = {}): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  async isEmailTaken(email: string): Promise<boolean> {
    return this.userRepository.emailExists(email);
  }
}
