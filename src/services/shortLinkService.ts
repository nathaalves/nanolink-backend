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

  const { nanoId, url } = await shortLinkRepository.insert(shortLinkData);

  return {
    shortLink: `https://nnlk.nl/${nanoId}`,
    url,
  };
}

async function getURL(id: string) {
  const shortLink = await shortLinkRepository.find(id);

  if (!shortLink)
    throw new NotFoundError('Link não encontrado!', 'Informe um link válido');

  return { url: shortLink.url };
}

export const shortLinkService = {
  addId,
  getURL,
};
