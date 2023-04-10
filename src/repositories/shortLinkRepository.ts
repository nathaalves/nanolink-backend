import { prisma } from '../config/prisma';
import { ShortLinkInsertDataType } from '../types/shortLinkTypes';

async function insert(data: ShortLinkInsertDataType) {
  const shortLink = await prisma.link.create({
    data,
  });

  return shortLink;
}

async function find(id: string) {
  const shortLink = await prisma.link.findUnique({
    where: {
      nanoId: id,
    },
  });

  return shortLink;
}

export const shortLinkRepository = {
  insert,
  find,
};
