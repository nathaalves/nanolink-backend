import { customAlphabet } from 'nanoid';
import { nanoLinkRepository } from '../repositories/nanoLinkRepository';
import { NanoLinkRequestBodyType } from '../types/nanoLinkTypes';
import { load } from 'cheerio';
import fetch from 'node-fetch';

const genNanoId = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  7
);

const getCherioAPI = async (url: string) => {
  try {
    const response = await fetch(url);
    const body = await response.text();
    return load(body);
  } catch (error) {
    return null;
  }
};

const handleNanoLinkData = async (data: NanoLinkRequestBodyType) => {
  const nanoLinkData = { ...data };

  const { title, image, nanoId, originalURL, userId } = nanoLinkData;

  nanoLinkData.nanoId = nanoId ? nanoId : genNanoId();

  const needCheerioAPI = (!title || !image) && userId;
  const cherioAPI = needCheerioAPI ? await getCherioAPI(originalURL) : null;

  if (!title) {
    nanoLinkData.title = cherioAPI ? cherioAPI('title').text() : originalURL;
  }

  if (!image && cherioAPI) {
    const faviconElement = cherioAPI(
      'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
    ).first();

    const href = faviconElement.attr('href');

    if (href) {
      const faviconUrl =
        href.substring(0, 4) === 'http'
          ? href
          : new URL(originalURL).origin + href;

      const response = await fetch(faviconUrl);

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image/')) {
        const buffer = await response.arrayBuffer();

        const base64 = Buffer.from(buffer).toString('base64');

        nanoLinkData.image = `data:image/png;base64,${base64}`;
      }
    }
  }

  return nanoLinkData;
};

async function createNanoLink(data: NanoLinkRequestBodyType) {
  const nanoLinkData = await handleNanoLinkData(data);

  const nanoLink = await nanoLinkRepository.insert(nanoLinkData);

  const NANO_LINK_BASE_URL = process.env.NANO_LINK_BASE_URL as string;

  return {
    ...nanoLink,
    shortLink: `${NANO_LINK_BASE_URL}/${nanoLink.nanoId}`,
  };
}

async function updateClicksCount(id: string) {
  await nanoLinkRepository.updateClicksCount(id);
}

export const nanoLinkService = {
  createNanoLink,
  updateClicksCount,
};
