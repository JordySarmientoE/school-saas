import { ApiProperty } from '@nestjs/swagger';
import { SchoolUser } from '../entities/school-user.entity';

export class ParentStudentDto {
  @ApiProperty({ example: 1 })
  parentStudentId: number;

  @ApiProperty({ type: SchoolUser })
  student: SchoolUser;

  @ApiProperty({ type: SchoolUser })
  parent: SchoolUser;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  updatedAt: Date;

  @ApiProperty({ nullable: true, example: null })
  deletedAt: Date | null;
}
