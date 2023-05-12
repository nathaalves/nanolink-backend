import { Request, Response, NextFunction } from 'express';
import { NanoLinkRequestBodyType } from '../types/nanoLinkTypes';
import { nanoLinkRepository } from '../repositories/nanoLinkRepository';
import { ConflictError, NotFoundError } from '../errors';
import { JWTPayload } from '../types/authTypes';

async function verifyIfURLExists(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const data: NanoLinkRequestBodyType = res.locals.body;
  const payload: JWTPayload | undefined = res.locals.payload;

  const userId = payload ? payload.userId : null;

  const nanoLink = await nanoLinkRepository.findOriginalUrlByUserId(
    data.originalURL,
    userId
  );

  if (nanoLink) {
    const NANO_LINK_BASE_URL = process.env.NANO_LINK_BASE_URL as string;

    return res.status(200).send({
      ...nanoLink,
      shortLink: `${NANO_LINK_BASE_URL}/${nanoLink.nanoId}`,
    });
  }

  next();
}

async function verifyNanoIdExists(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const nanoId: string = res.locals.params.nanoId;

  const nanoLink = await nanoLinkRepository.findNanoId(nanoId);

  if (!nanoLink) {
    throw new NotFoundError('Link não encontrado!', 'Informe um link válido.');
  }

  res.locals.nanoLink = nanoLink;

  next();
}

async function verifyNanoIdAlreadyCreated(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const nanoId: string = res.locals.body.nanoId;

  if (!nanoId) return next();

  const nanoLink = await nanoLinkRepository.findNanoId(nanoId);

  if (nanoLink) {
    throw new ConflictError(
      'Já existe um link com esse slug!',
      'Informe um slug diferente.'
    );
  }

  next();
}

export const nanoLinkMiddleware = {
  verifyIfURLExists,
  verifyNanoIdExists,
  verifyNanoIdAlreadyCreated,
};
