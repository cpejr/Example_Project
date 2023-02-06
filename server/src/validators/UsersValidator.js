import { z } from 'zod';
import ROLES_LIST from '../config/rolesList.js';

export const createUserValidator = z
  .object({
    body: z
      .object({
        fullName: z.string({
          required_error: 'fullName is required',
        }),
        password: z
          .string({
            required_error: 'Password is required',
          })
          .min(6, { message: 'Password must be atleast 6 characters' }),
        confirmPassword: z.string({
          required_error: 'Confirm Password is required',
        }),
        email: z
          .string({ required_error: 'Email is required' })
          .email('Must be a valida email'),
        cpf: z.string({ required_error: 'CPF is required' }),
        role: z
          .nativeEnum(ROLES_LIST, {
            errorMap: () => ({ message: 'Invalid permission code' }),
          })
          .default(ROLES_LIST.USER),
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Password don't match",
      }),
  })
  .transform(({ body }) => body);
