import { compareBcrypt, hashBcrypt } from '@/utils/bcrypt';

export class PasswordService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return hashBcrypt(password, this.saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return compareBcrypt(plainPassword, hashedPassword);
  }
}
