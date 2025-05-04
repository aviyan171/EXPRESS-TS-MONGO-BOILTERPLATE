import bcrypt from 'bcrypt';
import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwtConfig';

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class JwtService {
  private readonly accessTokenSecret: Secret;
  private readonly refreshTokenSecret: Secret;
  private readonly accessTokenOptions: SignOptions;
  private readonly refreshTokenOptions: SignOptions;

  constructor() {
    this.accessTokenSecret = jwtConfig.accessTokenSecret as Secret;
    this.refreshTokenSecret = jwtConfig.refreshTokenSecret as Secret;
    this.accessTokenOptions = {
      expiresIn: jwtConfig.accessTokenExpiresIn,
    };
    this.refreshTokenOptions = {
      expiresIn: jwtConfig.refreshTokenExpiresIn,
    };
  }

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.accessTokenSecret, this.accessTokenOptions);
  }

  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, this.accessTokenSecret) as TokenPayload;
  }

  async generateRefreshToken(
    payload: TokenPayload,
  ): Promise<{ refreshToken: string; hashedRefreshToken: string }> {
    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, this.refreshTokenOptions);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return { refreshToken, hashedRefreshToken };
  }

  verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, this.refreshTokenSecret) as TokenPayload;
  }
}
