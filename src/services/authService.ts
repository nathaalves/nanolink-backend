import { InternalServerError } from '../errors';
import { authRepository } from '../repositories/authRepository';
import { UserSignupBodyType } from '../types/authTypes';
import { createHash } from '../utils/handleHash';

async function encryptPassword(userData: UserSignupBodyType) {
  const { email, name, password } = userData;

  const password_hash = createHash(password);

  const { id } = await authRepository.createUser({
    name,
    email,
    password: password_hash,
  });

  return id;
}

async function createSession(userId: string) {
  const session = await authRepository.createSession(userId);

  return session;
}

export const authService = {
  encryptPassword,
  createSession,
};
