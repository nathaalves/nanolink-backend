import { Request, Response } from 'express';
import { nanoLinkService } from '../services/nanoLinkService';
import { NanoLinkRequestBodyType } from '../types/nanoLinkTypes';
import { JWTPayload } from '../types/authTypes';

async function createNanoLink(_req: Request, res: Response) {
  const nanotLinkData: NanoLinkRequestBodyType = res.locals.body;
  const payload: JWTPayload | undefined = res.locals.payload;

  const userId = payload ? payload.userId : null;

  const nanoLink = await nanoLinkService.createNanoLink({
    ...nanotLinkData,
    userId,
  });

  res.status(201).send(nanoLink);
}

async function getNanoLinks(_req: Request, res: Response) {
  const payload: JWTPayload = res.locals.payload;

  const nanoLinks = await nanoLinkService.getNanoLinks(payload.userId);

  res.status(200).send(nanoLinks);
}

async function redirectToOriginalURL(_req: Request, res: Response) {
  const nanoId: string = res.locals.params.nanoId;
  const nanoLink: NanoLinkRequestBodyType = res.locals.nanoLink;

  await nanoLinkService.updateClicksCount(nanoId);

  res
    .writeHead(301, {
      Location: nanoLink.originalURL,
    })
    .end();
}

async function goToHomeApp(_req: Request, res: Response) {
  res
    .writeHead(301, {
      Location: `https://nanolink.app.br`,
    })
    .end();
}

export const nanoLinkController = {
  createNanoLink,
  getNanoLinks,
  redirectToOriginalURL,
  goToHomeApp,
};
