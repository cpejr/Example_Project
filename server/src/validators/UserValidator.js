import { z } from 'zod';
import validate from '../config/validate.js';

export const validator = z.object({
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
      roles: z
        .number({ required_error: 'Roles are required' })
        .positive()
        .int()
        .array(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: "Password don't match",
    }),
});

const createUserValidator = validate(validator);

export default createUserValidator;
