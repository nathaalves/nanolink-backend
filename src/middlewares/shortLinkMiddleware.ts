import { Request, Response, NextFunction } from 'express';
import { ShortLinkRequestBodyType } from '../types/shortLinkTypes';
import { shortLinkRepository } from '../repositories/shortLinkRepository';

async function verifyIfURLExists(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const data: ShortLinkRequestBodyType = res.locals.body;

  const shortLink = await shortLinkRepository.findOriginalUrlByUserId(
    data.originalURL,
    null
  );

  const SHORT_LINK_BASE_URL = process.env.SHORT_LINK_BASE_URL as string;

  if (shortLink) {
    return res.status(200).send({
      originalURL: shortLink.originalURL,
      shortLink: `${SHORT_LINK_BASE_URL}/${shortLink.nanoId}`,
    });
  }

  next();
}

export const shortLinkMiddleware = {
  verifyIfURLExists,
};
