import { Role } from 'src/modules/users/entities/user-role.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  userId: number;
  roles: Role[];
}
