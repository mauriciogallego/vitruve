import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { omit } from 'lodash';
import { IAccessToken } from '../interfaces/types';
import { errorCodes } from './auth.constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      if (await compare(pass, user.password)) {
        const result = omit(user, 'password');
        return result;
      }
    }
    return null;
  }

  async login(user?: User): Promise<IAccessToken> {
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Unauthorized',
        message: errorCodes.AUTHORIZATION_REQUIRED,
      });
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      active: user.active,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
