import { z } from 'zod';

export const registrationSchema = z.object({
  name: z
    .string({
      required_error: 'O campo nome é obrigatório',
    })
    .min(1, { message: 'O nome deve ter no mínimo 1 caractere.' }),
  email: z
    .string({
      required_error: 'O campo e-mail é obrigatório',
    })
    .email({ message: 'Informe um e-mail válido.' })
    .transform((string) => string.toLowerCase()),
  password: z
    .string({
      required_error: 'O campo senha é obrigatório',
    })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
  passwordConfirmation: z
    .string({
      required_error: 'O campo confirmação de senha é obrigatório',
    })
    .min(8, {
      message: 'A confirmação da senha deve ter no mínimo 8 caracteres.',
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'O campo e-mail é obrigatório',
    })
    .email({
      message: 'Informe um e-mail válido.',
    })
    .transform((string) => string.toLowerCase()),
  password: z
    .string({
      required_error: 'O campo senha é obrigatório',
    })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});
