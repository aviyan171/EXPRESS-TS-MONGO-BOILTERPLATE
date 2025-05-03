import type { User } from '@/interfaces/user.interface';

// Extend Express Request
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: Required for TypeScript modules
export {};
