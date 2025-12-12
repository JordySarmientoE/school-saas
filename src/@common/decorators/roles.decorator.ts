import { SetMetadata } from '@nestjs/common';
import { SchoolRole } from 'src/modules/schools/entities/school-user.entity';

export const Roles = (...roles: SchoolRole[]) => SetMetadata('roles', roles);
