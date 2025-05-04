import { z } from 'zod';

export const tokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
  // query: z.object({}).strict(),
  // params: z.object({}).strict(),
});

export type TokenInput = z.infer<typeof tokenSchema>['body'];
