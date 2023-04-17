import { Request, Response } from 'express';
import { shortLinkService } from '../services/shortLinkService';
import { ShortLinkRequestBodyType } from '../types/shortLinkTypes';

async function create(_req: Request, res: Response) {
  const data: ShortLinkRequestBodyType = res.locals.body;

  const urls = await shortLinkService.addId(data);

  res.status(201).send(urls);
}

async function getURL(_req: Request, res: Response) {
  const id: string = res.locals.params.id;

  const { originalURL } = await shortLinkService.getURL(id);

  res
    .writeHead(301, {
      Location: originalURL,
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

export const shortLinkController = {
  create,
  getURL,
  goToHomeApp,
};
