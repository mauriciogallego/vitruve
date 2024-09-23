import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@prisma/client';
import { errorCodes } from './auth.constants';

// It restricts access to routes based on the user's role.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve the required roles for the route from metadata.
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    // If no roles are required for the route, allow access.
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Retrieve the user object from the request.
    const { user } = context.switchToHttp().getRequest();

    if (requiredRoles.includes(user.role)) {
      return true;
    }

    throw new ForbiddenException({
      error: 'Forbidden',
      statusCode: 403,
      message: errorCodes.AUTHORIZATION_REQUIRED,
    });
  }
}
