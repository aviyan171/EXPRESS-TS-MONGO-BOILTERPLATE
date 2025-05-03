import { UserRole } from '@/enum/user.enum';
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: false,
      enum: UserRole,
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        return {
          email: ret.email,
          firstName: ret.firstName,
          lastName: ret.lastName,
          middleName: ret.middleName,
          createdAt: ret.createdAt,
          updatedAt: ret.updatedAt,
          userId: ret.userId,
          role: ret.role,
          password: ret.password,
        };
      },
    },
  },
);

const UserModel = model<User>('User', userSchema);

export { UserModel };
