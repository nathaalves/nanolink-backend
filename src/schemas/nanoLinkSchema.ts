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
const dataUrlRegex =
  /^data:image\/(?:png|jpeg);base64,[a-z0-9!$&',()*+,;=\-._~:@\/?%\s]*$/i;

export const customNanoLinkBodySchema = z.object({
  originalURL,
  title: z.string().optional(),
  image: z
    .string()
    .regex(dataUrlRegex, {
      message: 'Apenas imagens no formato png e jpeg são válidas.',
    })
    .nullable(),
  nanoId: nanoId.optional(),
});

export const nanoLinkParamSchema = z.object({
  nanoId,
});
