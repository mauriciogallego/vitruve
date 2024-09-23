import { Prisma, PrismaClient, Role } from '@prisma/client';
import { Model } from '../seed';
import * as bcrypt from 'bcryptjs';

const hashedPassword = bcrypt.hashSync('Test*1234', 10);

const model: Model & {
  data: Prisma.UserCreateInput[];
} = {
  data: [
    {
      email: 'mauricio@gmail.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
    {
      email: 'gallego@gmail.com',
      password: hashedPassword,
      role: Role.USER,
    },
  ],

  async run(prisma: PrismaClient) {
    for (const user of this.data) {
      await prisma.user.create({
        data: user,
      });
    }

    return true;
  },
};

export default model;
