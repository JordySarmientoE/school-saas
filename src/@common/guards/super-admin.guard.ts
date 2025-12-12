import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_SUPER_ADMIN } from '../decorators/super-admin.decorator';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isSuperAdminRoute = this.reflector.get<boolean>(
      IS_SUPER_ADMIN,
      context.getHandler(),
    );

    if (!isSuperAdminRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request;

    if (!user?.isSuperAdmin) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );
    }

    return true;
  }
}
