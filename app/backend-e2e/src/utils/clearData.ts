import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@vitruve/backend/database/prisma.service';

export const cleanData = async (
  prisma: PrismaService,
  app: INestApplication
) => {
  await prisma.performanceMetric.deleteMany({});
  await prisma.passwordRecoveryToken.deleteMany({});
  await prisma.athlete.deleteMany({});
  await prisma.user.deleteMany({});

  await app.close();
  await prisma.$disconnect();
};
