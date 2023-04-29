import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .email()
    .transform((string) => string.toLowerCase()),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
});
