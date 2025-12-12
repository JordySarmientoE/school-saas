import { ApiProperty } from '@nestjs/swagger';
import { SchoolDto } from 'src/modules/schools/dto/school.dto';
import { RoleDto } from './role.dto';
import { UserBaseDto } from './user-base.dto';

export class UserDto extends UserBaseDto {
  @ApiProperty({ type: [SchoolDto] })
  schools: SchoolDto[];

  @ApiProperty({ type: [UserBaseDto], nullable: true })
  parent: UserBaseDto | null;

  @ApiProperty({ nullable: true })
  parentId: number | null;

  @ApiProperty({ type: [RoleDto] })
  roles: RoleDto[];

  @ApiProperty({ type: [UserBaseDto] })
  children: UserBaseDto[];
}
