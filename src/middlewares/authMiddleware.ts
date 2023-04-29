import { NextFunction, Request, Response } from 'express';
import { authRepository } from '../repositories/authRepository';
import { ConflictError } from '../errors/ConflictError';
import { LoginRequestBodyType, UserSignupBodyType } from '../types/authTypes';
import { UnauthorizedError } from '../errors/UnauthorizedError';

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

async function verifyIfUserExists(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { email }: LoginRequestBodyType = res.locals.body;

  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError(
      'Email ou senha inválido',
      'Informe credenciais válidas.'
    );
  }

  res.locals.user = user;
  next();
}

export const authMiddleware = {
  verifyIfUserAlreadyRegistered,
  verifyIfPasswordsMatch,
  verifyIfUserExists,
};
