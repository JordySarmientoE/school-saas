import { ApiProperty } from '@nestjs/swagger';
import { SchoolRole } from '../entities/school-user.entity';
import { SchoolDto } from './school.dto';
import { ParentStudent } from '../entities/parent-student.entity';

export class SchoolUserDto {
  @ApiProperty({ example: 1 })
  schoolUserId: number;

  @ApiProperty({ type: SchoolDto })
  school: SchoolDto;

  @ApiProperty({ example: SchoolRole.TEACHER, enum: SchoolRole })
  role: SchoolRole;

  @ApiProperty({ type: [ParentStudent] })
  parentRelations: ParentStudent[];

  @ApiProperty({ type: [ParentStudent] })
  childrenRelations: ParentStudent[];

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  updatedAt: Date;

  @ApiProperty({ nullable: true, example: null })
  deletedAt: Date | null;
}
