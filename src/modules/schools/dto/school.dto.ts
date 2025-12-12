import { ApiProperty } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-school.dto';
import { SchoolUser } from '../entities/school-user.entity';

export class SchoolDto extends CreateSchoolDto {
  @ApiProperty({ example: 1 })
  schoolId: number;

  @ApiProperty({ type: [SchoolUser] })
  members: SchoolUser[];

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  updatedAt: Date;

  @ApiProperty({ nullable: true, example: null })
  deletedAt: Date | null;
}
