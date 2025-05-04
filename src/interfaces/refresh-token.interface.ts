export interface RefreshToken {
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  revoked?: boolean; //soft delete
  updatedAt?: Date;
}
