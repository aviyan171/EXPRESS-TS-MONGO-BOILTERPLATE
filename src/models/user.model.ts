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
          password: ret.password,
        };
      },
    },
  },
);

const UserModel = model<User>('User', userSchema);

export { UserModel };
