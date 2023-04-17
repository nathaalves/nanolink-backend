import { Request, Response, NextFunction } from 'express';
import { ShortLinkRequestBodyType } from '../types/shortLinkTypes';
import { shortLinkRepository } from '../repositories/shortLinkRepository';

async function verifyIfURLExists(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const data: ShortLinkRequestBodyType = res.locals.body;

  const shortLink = await shortLinkRepository.findOriginalURL(data.originalURL);

  if (shortLink) {
    return res.status(200).send({
      originalURL: shortLink.originalURL,
      shortLink: `nnlk.nl/${shortLink.nanoId}`,
    });
  }

  next();
}

export const shortLinkMiddleware = {
  verifyIfURLExists,
};
