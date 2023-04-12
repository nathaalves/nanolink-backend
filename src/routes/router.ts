import { Router } from 'express';
import { shortLinkController } from '../controllers/shortLinkController';
import { linkRouter } from './shortLinkRouter';

const router = Router();

router.use('/short-link', linkRouter);
// router.use('/', shortLinkController.goToHomeApp);

export { router };
