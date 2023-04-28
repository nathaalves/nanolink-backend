import { Request, Response } from 'express';
import { UserSignupBodyType } from '../types/authTypes';
import { authService } from '../services/authService';

async function register(req: Request, res: Response) {
  const user: UserSignupBodyType = res.locals.body;

  const id = await authService.encryptPassword(user);

  res.status(201).send({ id });
}

export const authController = {
  register,
};
