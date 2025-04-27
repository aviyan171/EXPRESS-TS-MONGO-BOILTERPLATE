import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwtConfig';

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export class JwtService {
  private readonly jwtSecret: Secret;
  private readonly jwtOptions: SignOptions;

  constructor() {
    this.jwtSecret = jwtConfig.jwtSecret as Secret;
    this.jwtOptions = {
      expiresIn: jwtConfig.jwtExpiresIn,
    };
  }

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.jwtSecret, this.jwtOptions);
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this.jwtSecret) as TokenPayload;
  }
}
