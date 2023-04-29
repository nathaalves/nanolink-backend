import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateSchema } from '../middlewares/validateSchema';
import { registrationSchema } from '../schemas/authSchema';
import { authMiddleware } from '../middlewares/authMiddleware';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema.body(registrationSchema),
  authMiddleware.verifyIfPasswordsMatch,
  authMiddleware.verifyIfUserAlreadyExists,
  authController.signup
);

export { authRouter };
