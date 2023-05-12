import { Router } from 'express';
import { nanoLinkController } from '../controllers/nanoLinkController';
import { validateSchema } from '../middlewares/validateSchema';
import {
  customNanoLinkBodySchema,
  nanoLinkBodySchema,
  nanoLinkParamSchema,
} from '../schemas/nanoLinkSchema';
import { nanoLinkMiddleware } from '../middlewares/nanoLinkMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const nanoLinkRouter = Router();

nanoLinkRouter.post(
  '/nanolink/create',
  validateSchema.body(nanoLinkBodySchema),
  nanoLinkMiddleware.verifyIfURLExists,
  nanoLinkController.createNanoLink
);

nanoLinkRouter.post(
  '/nanolink/create-custom',
  validateSchema.body(customNanoLinkBodySchema),
  authMiddleware.verifyToken('access'),
  nanoLinkMiddleware.verifyNanoIdAlreadyCreated,
  nanoLinkMiddleware.verifyIfURLExists,
  nanoLinkController.createNanoLink
);

nanoLinkRouter.get(
  '/:nanoId',
  validateSchema.params(nanoLinkParamSchema),
  nanoLinkMiddleware.verifyNanoIdExists,
  nanoLinkController.redirectToOriginalURL
);

nanoLinkRouter.get('/', nanoLinkController.goToHomeApp);

export { nanoLinkRouter };
