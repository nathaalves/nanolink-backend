import { Router } from 'express';
import { shortLinkController } from '../controllers/shortLinkController';
import { validateSchema } from '../middlewares/validateSchema';
import { linkBodySchema, linkParamsSchema } from '../schemas/shortLinkSchema';
import { shortLinkMiddleware } from '../middlewares/shortLinkMiddleware';

const linkRouter = Router();

linkRouter.post(
  '/create',
  validateSchema.body(linkBodySchema),
  shortLinkMiddleware.verifyIfURLExists,
  shortLinkController.create
);

linkRouter.get(
  '/:id',
  validateSchema.params(linkParamsSchema),
  shortLinkController.getURL
);

linkRouter.get('/', shortLinkController.goToHomeApp);

export { linkRouter };
