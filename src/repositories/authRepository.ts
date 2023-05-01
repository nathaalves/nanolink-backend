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

async function createSession(userId: string) {
  const session = await prisma.session.create({
    data: {
      userId,
    },
  });
  return session;
}

async function findSession(id: string) {
  const session = await prisma.session.findUnique({
    where: {
      id,
    },
  });
  return session;
}

async function removeSession(id: string) {
  await prisma.session.delete({
    where: {
      id,
    },
  });
}

export const authRepository = {
  createUser,
  findUserByEmail,
  createSession,
  findSession,
  removeSession,
};
