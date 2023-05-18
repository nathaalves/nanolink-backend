import { Request, Response } from 'express';
import { JWTPayload, UserSignupBodyType } from '../types/authTypes';
import { authService } from '../services/authService';
import { generateToken } from '../utils/handleToken';
import { User } from '@prisma/client';

async function signup(_req: Request, res: Response) {
  const user: UserSignupBodyType = res.locals.body;

  const id = await authService.encryptPassword(user);

  res.status(201).send({ id });
}

async function signin(_req: Request, res: Response) {
  const { id: userId, name, email }: User = res.locals.user;

  const accessToken = generateToken({
    userId,
    name,
    email,
    type: 'access',
  });

  const refreshToken = generateToken({
    userId,
    name,
    email,
    type: 'refresh',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  res.status(200).send({ name, email, accessToken });
}

async function refresh(_req: Request, res: Response) {
  const { userId, name, email }: JWTPayload = res.locals.payload;

  const accessToken = generateToken({ userId, name, email, type: 'access' });

  res.status(200).send({ name, email, accessToken });
}

async function signout(_req: Request, res: Response) {
  res.clearCookie('refreshToken');

  res.status(200).send({ message: 'Logout realizado com sucesso.' });
}

export const authController = {
  signup,
  signin,
  refresh,
  signout,
};
