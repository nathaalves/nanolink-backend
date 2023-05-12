import { Router } from 'express';
import { nanoLinkRouter } from './nanoLinkRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use(nanoLinkRouter);
router.use('/auth', authRouter);

export { router };
