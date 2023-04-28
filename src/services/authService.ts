import { authRepository } from '../repositories/authRepository';
import { UserCreationType } from '../types/authTypes';
import { createHash } from '../utils/handleHash';

async function encryptPassword(userData: UserCreationType) {
  const { email, name, password } = userData;

  const password_hash = createHash(password);
  const { id } = await authRepository.createUser({
    name,
    email,
    password: password_hash,
  });

  return id;
}

export const authService = {
  encryptPassword,
};
