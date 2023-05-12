import { z } from 'zod';

const originalURL = z
  .string()
  .regex(
    /^(?:(?:https?:\/\/)?(?:www\.)?|www\.)[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]$/,
    {
      message: 'Informe uma URL válida.',
    }
  )
  .transform((url) => {
    const trimedUrl = url.trim();
    const newUrl = trimedUrl.replace(/\/$/, '');
    if (newUrl.includes('http')) return newUrl;
    return `https://${newUrl}`;
  });

export const nanoLinkBodySchema = z.object({
  originalURL,
});

const nanoId = z.string().regex(/^[a-zA-Z0-9_-]+$/);

export const customNanoLinkBodySchema = z.object({
  originalURL,
  title: z.string().min(1).optional(),
  image: z.string().optional(),
  nanoId: nanoId.optional(),
});

export const nanoLinkParamSchema = z.object({
  nanoId,
});
