import type { RegisterInput } from '@/schemas/auth.schema';
import type { User } from '../interfaces/user.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { ApiError } from '../utils/apiError';
import { JwtService } from '../utils/services/jwt.service';
import { PasswordService } from '../utils/services/password.service';
import { omitAttributes } from '@/utils/common';

interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export class AuthService {
  private authRepository: AuthRepository;
  private jwtService: JwtService;
  private passwordService: PasswordService;

  constructor() {
    this.authRepository = new AuthRepository();
    this.jwtService = new JwtService();
    this.passwordService = new PasswordService();
  }

  async register(userData: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.authRepository.findUserByEmail(userData.email);

    if (existingUser) {
      throw ApiError.badRequest('Email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(userData.password);
    const user = await this.authRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    const token = this.jwtService.generateToken(omitAttributes(user, ['password']));

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = this.jwtService.generateToken(omitAttributes(user, ['password']));

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }
}
