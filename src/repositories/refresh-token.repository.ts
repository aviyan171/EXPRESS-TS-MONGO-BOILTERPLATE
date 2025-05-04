import { RefreshToken } from '@/interfaces/refresh-token.interface';
import RefreshTokenModel from '@/models/refresh-token.model';
import { UpdateWriteOpResult } from 'mongoose';

export class RefreshTokenRepository {
  async revokeRefreshToken(userId: string): Promise<UpdateWriteOpResult> {
    return await RefreshTokenModel.updateOne({ userId }, { revoked: true });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return RefreshTokenModel.findOne({ token, revoked: false });
  }

  async findUnrevokedByUserId(userId: string): Promise<RefreshToken | null> {
    return RefreshTokenModel.findOne({ userId, revoked: false });
  }

  async findByUserId(userId: string): Promise<RefreshToken | null> {
    return RefreshTokenModel.findOne({ userId });
  }

  async createRefreshToken(userId: string, token: string, expiresAt: Date): Promise<RefreshToken> {
    return RefreshTokenModel.create({ userId, token, expiresAt });
  }

  async updateRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date,
    revoked = false,
  ): Promise<UpdateWriteOpResult> {
    return RefreshTokenModel.updateOne(
      { userId },
      { token, expiresAt, revoked, updatedAt: new Date() },
    );
  }
}
