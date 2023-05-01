import { Request, Response } from 'express';
import { UserSignupBodyType } from '../types/authTypes';
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

  const { id: sessionId } = await authService.createSession(userId);

  const accessToken = generateToken({
    sessionId,
    userId,
    type: 'access',
  });

  const refreshToken = generateToken({
    sessionId,
    userId,
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

export const authController = {
  signup,
  signin,
};
