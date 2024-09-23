import { Prisma, PrismaClient } from '@prisma/client';
import { Model } from '../seed';

const model: Model & {
  data: Prisma.AthleteCreateInput[];
} = {
  data: [
    {
      name: 'andres',
      team: 'bolivar',
      age: 21,
    },
    {
      name: 'felipe',
      team: 'bolivar',
      age: 22,
    },
    {
      name: 'carlos',
      team: 'mexico',
      age: 23,
    },
  ],

  async run(prisma: PrismaClient) {
    for (const athlete of this.data) {
      await prisma.athlete.create({
        data: athlete,
      });
    }

    return true;
  },
};

export default model;
