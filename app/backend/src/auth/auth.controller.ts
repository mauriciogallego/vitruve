import { Login } from './entities/login';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { UserPasswordInput } from './entities/user-password-input.entity';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Login with email and password',
  })
  @ApiBody({
    type: UserPasswordInput,
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<Login> {
    return this.authService.login(req.user);
  }
}
