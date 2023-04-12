import { Router } from 'express';
import { shortLinkController } from '../controllers/shortLinkController';
import { validateSchema } from '../middlewares/validateSchema';
import { linkBodySchema, linkParamsSchema } from '../schemas/shortLinkSchema';

const linkRouter = Router();

linkRouter.post(
  '/create',
  validateSchema.body(linkBodySchema),
  shortLinkController.create
);

linkRouter.get(
  '/:id',
  validateSchema.params(linkParamsSchema),
  shortLinkController.getURL
);

linkRouter.get('/', shortLinkController.goToHomeApp);

export { linkRouter };
