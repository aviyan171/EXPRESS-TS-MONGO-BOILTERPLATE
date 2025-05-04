import { RefreshToken } from '@/interfaces/refresh-token.interface';
import { Schema, model } from 'mongoose';

const refreshTokenSchema = new Schema<RefreshToken>({
  userId: { required: true, ref: 'User', refPath: 'userId', type: String },
  token: { type: String, required: true, index: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
  revoked: { type: Boolean, required: false, default: false },
});

const RefreshTokenModel = model<RefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshTokenModel;
