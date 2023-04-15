import { z } from 'zod';

export const linkBodySchema = z.object({
  url: z
    .string()
    .regex(
      /^(?:(?:https?:\/\/)?(?:www\.)?|www\.)[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]$/,
      {
        message: 'Informe uma URL válida.',
      }
    )
    .transform((string) => {
      if (string.includes('http')) return string;
      return `https://${string}`;
    }),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().optional(),
  slug: z.string().min(1).optional(),
});

export const linkParamsSchema = z.object({
  id: z
    .string()
    .regex(/[a-zA-Z]{7}/g)
    .length(7),
});
