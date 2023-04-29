import { NextFunction, Request, Response } from 'express';
import { authRepository } from '../repositories/authRepository';
import { ConflictError } from '../errors/ConflictError';

async function verifyIfUserAlreadyExists(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = res.locals.body;

  const user = await authRepository.findUserByEmail(email);

  if (user) {
    throw new ConflictError(
      'Usuário já registrado.',
      'Utilize outro e-mail ou faça login.'
    );
  }

  next();
}

export const authMiddleware = {
  verifyIfUserAlreadyExists,
};
