import { Router } from 'express';
import { linkRouter } from './shortLinkRouter';

const router = Router();

router.use(linkRouter);

export { router };
