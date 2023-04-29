import { prisma } from '../config/prisma';
import { UserCreationType } from '../types/authTypes';

async function createUser(data: UserCreationType) {
  const user = await prisma.user.create({
    data,
  });

  return user;
}

async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export const authRepository = {
  createUser,
  findUserByEmail,
};
