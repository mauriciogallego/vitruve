import { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const createUser = (prisma: PrismaClient, data: Prisma.UserCreateInput) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};
const createUserToken = (user: User) => {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    active: user.active,
  };

  return jwt.sign(payload, 'secret', {
    expiresIn: '10y',
  });
};

const createUserAndToken = async (
  prisma: PrismaClient,
  data: Prisma.UserCreateInput
) => {
  const user = await createUser(prisma, data);
  const token = createUserToken(user);
  return { user, token };
};

export { createUserAndToken };
