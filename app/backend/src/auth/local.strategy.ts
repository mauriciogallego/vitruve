import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { errorCodes } from './auth.constants';
import { UsersService } from '../users/users.service';
import { ReqStrategy } from '../interfaces/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
    super();
  }

  async validate(req: ReqStrategy) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: errorCodes.INVALID_EMAIL_PASSWORD,
      });
    }
    await this.userService.throwIfUserIsNotValid(user);
    return user;
  }
}
