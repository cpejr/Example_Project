import { z } from 'zod';

export const loginValidator = z
  .object({
    body: z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .email('Must be a valida email'),
      password: z.string({
        required_error: 'Password is required',
      }),
      rememberMe: z.boolean().optional().default(false),
    }),
  })
  .transform(({ body }) => body);
