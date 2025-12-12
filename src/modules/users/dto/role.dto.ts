import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user-role.entity';

export class RoleDto {
  @ApiProperty({ example: 1 })
  userRoleId: number;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  updatedAt: Date;

  @ApiProperty({ nullable: true, example: null })
  deletedAt: Date | null;

  @ApiProperty({ example: 'TEACHER', enum: Role })
  role: Role;
}
