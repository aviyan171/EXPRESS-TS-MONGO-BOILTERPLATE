import { Schema, model } from 'mongoose';
import type { User } from '../interfaces/user.interface';

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        return {
          _id: ret._id,
          email: ret.email,
          createdAt: ret.createdAt,
          updatedAt: ret.updatedAt,
        };
      },
    },
  },
);

const UserModel = model<User>('User', userSchema);

export { UserModel };
