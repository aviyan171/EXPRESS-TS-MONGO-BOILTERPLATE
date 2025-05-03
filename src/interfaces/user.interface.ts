import { UserRole } from '@/enum/user.enum';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  role: UserRole;
}
