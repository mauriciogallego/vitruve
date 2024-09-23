import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import { errorCodes } from '../auth/auth.constants';

@Injectable()
export class UsersService {
  constructor(readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
      select: {
        email: true,
        password: true,
        role: true,
      },
    });
  }

  throwIfUserIsNotValid(user: User) {
    if (user.active === false) {
      throw new ForbiddenException({
        statusCode: 403,
        message: errorCodes.NOT_ACTIVE_USER,
      });
    }

    return Promise.resolve(user);
  }
}
