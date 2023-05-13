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

const nanoId = z.string().regex(/^[0-9a-zA-Z-_]*$/);

export const customNanoLinkBodySchema = z.object({
  originalURL,
  title: z.string().optional(),
  image: z.string().optional(),
  nanoId: nanoId.optional(),
});

export const nanoLinkParamSchema = z.object({
  nanoId,
});
