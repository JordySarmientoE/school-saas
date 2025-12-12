import { SetMetadata } from '@nestjs/common';
import { SchoolRole } from 'src/modules/schools/entities/school-user.entity';

export const IS_SUPER_ADMIN = 'isSuperAdmin';

export const SuperAdmin = (...roles: SchoolRole[]) =>
  SetMetadata(IS_SUPER_ADMIN, roles);
