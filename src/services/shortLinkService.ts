import { customAlphabet } from 'nanoid';
import { shortLinkRepository } from '../repositories/shortLinkRepository';
import { ShortLinkRequestBodyType } from '../types/shortLinkTypes';
import { NotFoundError } from '../errors/NotFoundError';

async function addId(data: ShortLinkRequestBodyType) {
  const nanoid = customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    7
  );

  const shortLinkData = {
    ...data,
    nanoId: nanoid(),
  };

  const { nanoId, originalURL } = await shortLinkRepository.insert(
    shortLinkData
  );

  const SHORT_LINK_BASE_URL = process.env.SHORT_LINK_BASE_URL as string;

  return {
    shortLink: `${SHORT_LINK_BASE_URL}/${nanoId}`,
    originalURL,
  };
}

async function getURL(id: string) {
  const shortLink = await shortLinkRepository.find(id);

  if (!shortLink)
    throw new NotFoundError('Link não encontrado!', 'Informe um link válido');

  return { originalURL: shortLink.originalURL };
}

export const shortLinkService = {
  addId,
  getURL,
};
