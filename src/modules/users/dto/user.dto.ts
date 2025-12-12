import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { SchoolUserDto } from 'src/modules/schools/dto/school-user.dto';

export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ type: [SchoolUserDto] })
  schoolUsers: SchoolUserDto[];

  @ApiProperty({ example: false })
  isSuperAdmin: boolean;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  updatedAt: Date;

  @ApiProperty({ nullable: true, example: null })
  deletedAt: Date | null;
}
