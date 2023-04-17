import { prisma } from '../config/prisma';
import { ShortLinkInsertDataType } from '../types/shortLinkTypes';

async function insert(data: ShortLinkInsertDataType) {
  const shortLink = await prisma.link.create({
    data,
  });

  return shortLink;
}

async function find(nanoId: string) {
  const shortLink = await prisma.link.findUnique({
    where: {
      nanoId,
    },
  });

  if (shortLink) {
    await prisma.link.update({
      where: {
        nanoId,
      },
      data: {
        clicks: shortLink.clicks + 1,
      },
    });
  }

  return shortLink;
}

async function findOriginalURL(originalURL: string) {
  const shortLink = await prisma.link.findUnique({
    where: {
      originalURL,
    },
  });

  return shortLink;
}

export const shortLinkRepository = {
  insert,
  find,
  findOriginalURL,
};
