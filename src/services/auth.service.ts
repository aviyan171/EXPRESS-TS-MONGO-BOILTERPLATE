import { env } from '@/config/env';
import { RefreshTokenRepository } from '@/repositories/refresh-token.repository';

import { UserRepository } from '@/repositories/user.repository';
import type { RegisterInput } from '@/schemas/auth.schema';
import { compareBcrypt } from '@/utils/bcrypt';
import { omitAttributes } from '@/utils/common';
import { toMs } from '@/utils/ms';
import { mailService } from '@/utils/services/mail.service';
import type { User } from '../interfaces/user.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { ApiError } from '../utils/apiError';
import { JwtService } from '../utils/services/jwt.service';
import { PasswordService } from '../utils/services/password.service';

interface AuthResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private authRepository: AuthRepository;
  private jwtService: JwtService;
  private passwordService: PasswordService;
  private refreshTokenRepository: RefreshTokenRepository;
  private userRepository: UserRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.jwtService = new JwtService();
    this.passwordService = new PasswordService();
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.userRepository = new UserRepository();
  }

  async register(userData: RegisterInput): Promise<Pick<AuthResponse, 'user'>> {
    const existingUser = await this.authRepository.findUserByEmail(userData.email);

    if (existingUser) {
      throw ApiError.badRequest('Email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(userData.password);
    const user = await this.authRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    const userWithoutPassword = omitAttributes(user, ['password']);

    await mailService.sendMail({
      to: userWithoutPassword.email,
      subject: 'Registration successful',
      templateType: 'registrationSuccess',
      data: userWithoutPassword,
    });

    return {
      user: userWithoutPassword,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const userWithoutPassword = omitAttributes(user, ['password']);

    const accessToken = this.jwtService.generateAccessToken(userWithoutPassword);
    const { refreshToken, hashedRefreshToken } =
      await this.jwtService.generateRefreshToken(userWithoutPassword);

    const refreshTokenOfUser = await this.refreshTokenRepository.findByUserId(
      userWithoutPassword.userId,
    );

    if (refreshTokenOfUser) {
      await this.refreshTokenRepository.updateRefreshToken(
        userWithoutPassword.userId,
        hashedRefreshToken,
        new Date(Date.now() + toMs(env.REFRESH_TOKEN_EXPIRES_IN)),
      );
    } else {
      await this.refreshTokenRepository.createRefreshToken(
        userWithoutPassword.userId,
        hashedRefreshToken,
        new Date(Date.now() + toMs(env.REFRESH_TOKEN_EXPIRES_IN)),
      );
    }

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenBody: string): Promise<{ accessToken: string }> {
    const decodedRefreshToken = this.jwtService.verifyRefreshToken(refreshTokenBody);

    const userId = decodedRefreshToken.userId;

    const refreshTokenOfUser = await this.refreshTokenRepository.findUnrevokedByUserId(userId);
    if (!refreshTokenOfUser) throw ApiError.badRequest('no refresh token found of this user');

    const isRefreshTokenValid = await compareBcrypt(refreshTokenBody, refreshTokenOfUser.token);
    if (!isRefreshTokenValid) throw ApiError.badRequest('Invalid refresh token');

    const user = await this.userRepository.findById(userId);
    if (!user) throw ApiError.badRequest('User not found');

    const newAccessToken = this.jwtService.generateAccessToken(omitAttributes(user, ['password']));
    return { accessToken: newAccessToken };
  }

  async logout(refreshTokenBody: string) {
    const decodedRefreshToken = this.jwtService.verifyRefreshToken(refreshTokenBody);
    const userId = decodedRefreshToken.userId;

    const { acknowledged } = await this.refreshTokenRepository.revokeRefreshToken(userId);
    if (!acknowledged) throw ApiError.unauthorized('Refresh token is not revoked');

    return acknowledged;
  }
}
