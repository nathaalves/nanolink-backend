import { NextFunction, Request, Response } from 'express';
import { authRepository } from '../repositories/authRepository';
import { ConflictError } from '../errors/ConflictError';
import { UserSignupBodyType } from '../types/authTypes';

async function verifyIfUserAlreadyRegistered(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { email }: UserSignupBodyType = res.locals.body;

  const user = await authRepository.findUserByEmail(email);

  if (user) {
    throw new ConflictError(
      'Usuário já registrado.',
      'Utilize outro e-mail ou faça login.'
    );
  }

  next();
}

async function verifyIfPasswordsMatch(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, passwordConfirmation }: UserSignupBodyType =
    res.locals.body;

  if (password !== passwordConfirmation) {
    throw new ConflictError(
      'Password diferente do password de confirmação.',
      'verifique os campos e tente novamente.'
    );
  }

  next();
}

export const authMiddleware = {
  verifyIfUserAlreadyRegistered,
  verifyIfPasswordsMatch,
};
