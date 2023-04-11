import { z } from 'zod';

export const linkBodySchema = z.object({
  url: z.string().url(),
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
