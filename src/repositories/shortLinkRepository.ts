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

async function findOriginalUrlByUserId(
  originalURL: string,
  userId: string | null
) {
  const shortLink = await prisma.link.findFirst({
    where: {
      originalURL,
      userId,
    },
  });

  return shortLink;
}

export const shortLinkRepository = {
  insert,
  find,
  findOriginalUrlByUserId,
};
