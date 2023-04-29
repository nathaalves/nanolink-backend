import { Router } from 'express';
import { linkRouter } from './shortLinkRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use(linkRouter);
router.use('/auth', authRouter);

export { router };
