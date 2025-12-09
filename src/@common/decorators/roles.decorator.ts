import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/users/entities/user-role.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
