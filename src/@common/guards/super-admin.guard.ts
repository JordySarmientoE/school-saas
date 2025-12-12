import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_SUPER_ADMIN } from '../decorators/super-admin.decorator';
import { SchoolRole } from 'src/modules/schools/entities/school-user.entity';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request;

    if (user.isSuperAdmin) {
      return true;
    }

    const requiredRoles = this.reflector.get<SchoolRole[]>(
      IS_SUPER_ADMIN,
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    if (
      !user.schoolUsers.some((schoolUser) =>
        requiredRoles.includes(schoolUser.role),
      )
    ) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );
    }

    return true;
  }
}
