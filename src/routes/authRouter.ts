import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateSchema } from '../middlewares/validateSchema';
import { registrationSchema, loginSchema } from '../schemas/authSchema';
import { authMiddleware } from '../middlewares/authMiddleware';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema.body(registrationSchema),
  authMiddleware.verifyIfPasswordsMatch,
  authMiddleware.verifyIfUserAlreadyRegistered,
  authController.signup
);

authRouter.post(
  '/signin',
  validateSchema.body(loginSchema),
  authMiddleware.verifyIfUserExists,
  authMiddleware.verifyIfPasswordIsCorrect,
  authController.signin
);

authRouter.get(
  '/refresh',
  authMiddleware.verifyToken('refresh'),
  authController.refresh
);

export { authRouter };
