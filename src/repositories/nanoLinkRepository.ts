import { prisma } from '../config/prisma';
import { NanoLinkRequestBodyType } from '../types/nanoLinkTypes';

async function insert(data: NanoLinkRequestBodyType) {
  const shortLink = await prisma.link.create({
    data,
  });

  return shortLink;
}

async function findNanoId(nanoId: string) {
  const shortLink = await prisma.link.findUnique({
    where: {
      nanoId,
    },
  });

  return shortLink;
}

async function updateClicksCount(nanoId: string) {
  await prisma.link.update({
    where: {
      nanoId,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
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

export const nanoLinkRepository = {
  insert,
  findNanoId,
  findOriginalUrlByUserId,
  updateClicksCount,
};
