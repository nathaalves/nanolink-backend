import { prisma } from '../config/prisma';
import { UserCreationType } from '../types/authTypes';

async function createUser(data: UserCreationType) {
  const user = await prisma.user.create({
    data,
  });

  return user;
}

export const authRepository = {
  createUser,
};
