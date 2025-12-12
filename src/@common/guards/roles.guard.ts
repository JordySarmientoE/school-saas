import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SchoolRole } from 'src/modules/schools/entities/school-user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<SchoolRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request;

    const { schoolId } = request.params;
    if (!schoolId) {
      throw new ForbiddenException(
        'No se proporcionó el ID de la escuela en los parámetros de la ruta',
      );
    }

    if (
      !user?.schoolUsers.some(
        (schoolUser) =>
          requiredRoles.includes(schoolUser.role) &&
          schoolUser.school.schoolId === Number(schoolId),
      )
    ) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );
    }

    return true;
  }
}
